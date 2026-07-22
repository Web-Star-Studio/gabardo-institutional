# ============================================================
# CONFIGURAÇÕES - Altere com seus dados reais
# ============================================================
# Mantém acentos corretos ao executar pelo Windows PowerShell/Code Runner.
try {
    [Console]::InputEncoding = New-Object System.Text.UTF8Encoding -ArgumentList $false
    [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding -ArgumentList $false
    $OutputEncoding = [Console]::OutputEncoding
} catch {}

$supabaseUrl = "https://eofkiyvsslugkfmjbgqn.supabase.co"
$edgeFunctionName = "receber-inventario"
$supabaseAnonKey = "sb_publishable_043664-45ny7BpFfJAmFwA_MUFOWuoO"
$tableName = "inventario"
$hashFilePath = "$env:ProgramData\SystemInventory\machine_id.key"
$scriptVersion = "2.8.1"
# ============================================================
# Funções auxiliares (hashkey)
# ============================================================
function New-LocalHash {
    return [System.Guid]::NewGuid().ToString("N").ToLower()
}
function Get-LocalHash {
    if (Test-Path $hashFilePath) {
        $hash = Get-Content $hashFilePath -Raw -ErrorAction SilentlyContinue
        if ($hash -and $hash.Trim().Length -gt 10) {
            return $hash.Trim()
        }
    }
    return $null
}
function Save-LocalHash {
    param([string]$Hash)
    $folder = Split-Path $hashFilePath
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
    Set-Content -Path $hashFilePath -Value $Hash -Force
    Write-Host "Hashkey salva localmente: $Hash" -ForegroundColor Green
}
function Test-HashExistsInDatabase {
    param([string]$Hash)
    $headers = @{
        "apikey" = $supabaseAnonKey
        "Authorization" = "Bearer $supabaseAnonKey"
        "Content-Type" = "application/json"
    }
    try {
        $uri = "$supabaseUrl/rest/v1/$tableName`?id=eq.$Hash&select=id"
        $result = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get -ErrorAction Stop
        return ($result.Count -gt 0)
    }
    catch {
        Write-Host "Erro ao verificar existencia no banco: $($_.Exception.Message)" -ForegroundColor Yellow
        return $false
    }
}
function Test-IsElevated {
    $id = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object System.Security.Principal.WindowsPrincipal($id)
    return $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Converte datas vindas de CIM/WMI, DateTime, DateTimeOffset ou string.
# Evita o erro "não é possível localizar uma sobrecarga para ToString".
function Convert-ToFormattedDate {
    param(
        $Value,
        [string]$Format = "yyyy-MM-dd"
    )

    if ($null -eq $Value) {
        return $null
    }

    $text = [string]$Value
    if ([string]::IsNullOrWhiteSpace($text)) {
        return $null
    }

    try {
        if ($Value -is [System.DateTimeOffset]) {
            return ([System.DateTimeOffset]$Value).ToString(
                $Format,
                [System.Globalization.CultureInfo]::InvariantCulture
            )
        }

        if ($Value -is [System.DateTime]) {
            return ([System.DateTime]$Value).ToString(
                $Format,
                [System.Globalization.CultureInfo]::InvariantCulture
            )
        }

        # Algumas propriedades CIM chegam como texto DMTF.
        if ($text -match '^\d{14}\.\d{6}[\+\-]\d{3}$') {
            try {
                $dmtfDate = [System.Management.ManagementDateTimeConverter]::ToDateTime($text)
                return $dmtfDate.ToString(
                    $Format,
                    [System.Globalization.CultureInfo]::InvariantCulture
                )
            }
            catch {}
        }

        $parsedDate = [System.DateTime]::MinValue
        $parsed = [System.DateTime]::TryParse(
            $text,
            [System.Globalization.CultureInfo]::CurrentCulture,
            [System.Globalization.DateTimeStyles]::AllowWhiteSpaces,
            [ref]$parsedDate
        )

        if (-not $parsed) {
            $parsed = [System.DateTime]::TryParse(
                $text,
                [System.Globalization.CultureInfo]::InvariantCulture,
                [System.Globalization.DateTimeStyles]::AllowWhiteSpaces,
                [ref]$parsedDate
            )
        }

        if ($parsed) {
            return $parsedDate.ToString(
                $Format,
                [System.Globalization.CultureInfo]::InvariantCulture
            )
        }

        # Se não conseguir interpretar, retorna o valor original sem interromper a coleta.
        return $text
    }
    catch {
        return $text
    }
}

# Horário local sem o sufixo -03:00.
# Isso impede que uma coluna/Edge Function em UTC transforme 16:00 em 19:00.
function Get-LocalTimestamp {
    param(
        [System.DateTime]$Date = (Get-Date)
    )

    return $Date.ToString(
        "yyyy-MM-ddTHH:mm:ss.fff",
        [System.Globalization.CultureInfo]::InvariantCulture
    )
}
# ============================================================
# COLETA COMPLETA DO INVENTÁRIO
# ============================================================
function Get-SystemInventory {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $isElevated = Test-IsElevated
    $usuario = $env:USERNAME

    # -------------------- SISTEMA --------------------
    $os = Get-CimInstance Win32_OperatingSystem -ErrorAction SilentlyContinue
    $cs = Get-CimInstance Win32_ComputerSystem -ErrorAction SilentlyContinue
    $bios = Get-CimInstance Win32_BIOS -ErrorAction SilentlyContinue
    $tz = (Get-TimeZone).Id
    $secureBoot = $null
    try { $secureBoot = Confirm-SecureBootUEFI -ErrorAction Stop } catch { $secureBoot = $null }

    # Firmware (UEFI x Legacy BIOS)
    $firmwareTipo = "Desconhecido"
    $isUEFI = $false
    try {
        $fwType = (Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control" -Name "PEFirmwareType" -ErrorAction Stop).PEFirmwareType
        if ($fwType -eq 2) {
            $isUEFI = $true
            $firmwareTipo = "UEFI"
        }
        elseif ($fwType -eq 1) {
            $isUEFI = $false
            $firmwareTipo = "Legacy BIOS"
        }
    }
    catch {
        try {
            $ci = Get-ComputerInfo -Property BiosFirmwareType -ErrorAction Stop
            if ($ci.BiosFirmwareType -eq "Uefi") {
                $isUEFI = $true
                $firmwareTipo = "UEFI"
            }
            elseif ($ci.BiosFirmwareType -eq "Bios") {
                $isUEFI = $false
                $firmwareTipo = "Legacy BIOS"
            }
        } catch {}
    }

    $tpmInfo = @{ presente = $false; versao = $null; status = $null }
    try {
        $tpm = Get-Tpm -ErrorAction Stop
        $tpmInfo = @{
            presente = $tpm.TpmPresent
            versao = if ($tpm.TpmPresent) { "$($tpm.ManufacturerVersionMajor).$($tpm.ManufacturerVersionMinor)" } else { $null }
            status = if ($tpm.TpmReady) { "Pronto" } elseif ($tpm.TpmPresent) { "Presente" } else { "Ausente" }
        }
    } catch {}

    $bitlocker = @{ c_drive = "Desconhecido"; protecao = $null }
    try {
        $bl = Get-BitLockerVolume -MountPoint "C:" -ErrorAction Stop
        $bitlocker.c_drive = if ($bl.ProtectionStatus -eq "On") { "Ativado" } else { "Desativado" }
        $bitlocker.protecao = ($bl.KeyProtector | ForEach-Object { $_.KeyProtectorType }) -join " + "
    } catch {}

    $ultimoBoot = $os.LastBootUpTime
    $uptime = [math]::Round(((Get-Date) - $ultimoBoot).TotalDays, 2)

    $sistema = @{
        nome = $os.Caption
        versao = $os.Version
        build = $os.BuildNumber
        arquitetura = if ($os.OSArchitecture -match "64") { "64-bit" } else { "32-bit" }
        idioma = (Get-Culture).Name
        timezone = $tz
        ultimo_boot = Convert-ToFormattedDate -Value $ultimoBoot -Format "o"
        uptime_dias = $uptime
        instalacao = Convert-ToFormattedDate -Value $os.InstallDate -Format "o"
        produto_id = $os.SerialNumber
        ativacao = if ($os.LicenseStatus -eq 1) { "Licenciado" } else { "Nao licenciado / Desconhecido" }
        secure_boot = $secureBoot
        firmware = @{
            tipo = $firmwareTipo
            uefi = $isUEFI
        }
        tpm = $tpmInfo
        bitlocker = $bitlocker
        # Novos campos detalhados
        fabricante_computador = $cs.Manufacturer
        modelo_computador = $cs.Model
        dominio = $cs.Domain
        workgroup = $cs.Workgroup
        parte_dominio = $cs.PartOfDomain
        total_processadores_logicos = $cs.NumberOfLogicalProcessors
        total_processadores_fisicos = $cs.NumberOfProcessors
        system_type = $cs.SystemType
        primary_owner = $cs.PrimaryOwnerName
        bootup_state = $cs.BootupState
    }

    # -------------------- PROCESSADOR --------------------
    $cpu = Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue | Select-Object -First 1
    $cpuLoad = $cpu.LoadPercentage
    $nucleos = @()
    try {
        $counters = Get-Counter '\Processor(*)\% Processor Time' -ErrorAction Stop
        $coresCounter = $counters.CounterSamples | Where-Object { $_.InstanceName -ne "_Total" } | Sort-Object InstanceName
        $i = 0
        foreach ($c in $coresCounter) {
            $nucleos += @{
                id = $i
                uso = [math]::Round($c.CookedValue, 1)
                freq_mhz = $null
                temp_c = $null
            }
            $i++
        }
    } catch {}

    $processador = @{
        nome = $cpu.Name.Trim()
        fabricante = $cpu.Manufacturer
        familia = $cpu.Family
        modelo = $cpu.Model
        stepping = $cpu.Stepping
        nucleos_fisicos = $cpu.NumberOfCores
        nucleos_logicos = $cpu.NumberOfLogicalProcessors
        threads_por_nucleo = if ($cpu.NumberOfCores -gt 0) { [math]::Round($cpu.NumberOfLogicalProcessors / $cpu.NumberOfCores, 1) } else { $null }
        socket = $cpu.SocketDesignation
        frequencia_base_mhz = $cpu.MaxClockSpeed
        frequencia_max_mhz = $cpu.MaxClockSpeed
        frequencia_atual_mhz = $cpu.CurrentClockSpeed
        cache_l1_kb = $null
        cache_l2_kb = $cpu.L2CacheSize
        cache_l3_mb = if ($cpu.L3CacheSize) { [math]::Round($cpu.L3CacheSize / 1024, 0) } else { $null }
        instrucoes = @()
        uso_percentual = $cpuLoad
        temperatura_celsius = $null
        temperatura_max_historico = $null
        tdp_watts = $null
        consumo_atual_watts = $null
        status = "Saudavel"
        nucleos = $nucleos
        # Novos campos
        virtualizacao = $cpu.VirtualizationFirmwareEnabled
        address_width = $cpu.AddressWidth
        data_width = $cpu.DataWidth
        description = $cpu.Description
        processor_id = $cpu.ProcessorId
    }

    try {
        $thermal = Get-CimInstance -Namespace root/wmi -ClassName MSAcpi_ThermalZoneTemperature -ErrorAction Stop
        if ($thermal) {
            $tempK = ($thermal | Select-Object -First 1).CurrentTemperature
            $processador.temperatura_celsius = [math]::Round(($tempK / 10) - 273.15, 0)
        }
    } catch {}

    # -------------------- MEMÓRIA --------------------
    $memModules = Get-CimInstance Win32_PhysicalMemory -ErrorAction SilentlyContinue
    $totalGB = [math]::Round($cs.TotalPhysicalMemory / 1GB, 2)
    $livreGB = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
    $usadoGB = [math]::Round($totalGB - $livreGB, 2)
    $modulos = @()
    $slotIndex = 0
    foreach ($m in $memModules) {
        $modulos += @{
            slot = if ($m.DeviceLocator) { $m.DeviceLocator } else { "DIMM_$slotIndex" }
            fabricante = $m.Manufacturer
            part_number = $m.PartNumber.Trim()
            capacidade_gb = [math]::Round($m.Capacity / 1GB, 0)
            velocidade_mhz = $m.Speed
            serial = $m.SerialNumber
            temperatura_celsius = $null
            # Novos
            bank_label = $m.BankLabel
            configured_clock_speed = $m.ConfiguredClockSpeed
            form_factor = $m.FormFactor
            memory_type = $m.SMBIOSMemoryType
            total_width = $m.TotalWidth
            data_width = $m.DataWidth
        }
        $slotIndex++
    }

    $memoria = @{
        total_gb = $totalGB
        livre_gb = $livreGB
        usado_gb = $usadoGB
        uso_percentual = [math]::Round(($usadoGB / $totalGB) * 100, 1)
        slots_usados = $memModules.Count
        slots_totais = $cs.NumberOfMemorySlots
        tipo = ($memModules | Select-Object -First 1).SMBIOSMemoryType
        fator_forma = ($memModules | Select-Object -First 1).FormFactor
        velocidade_mhz = ($memModules | Select-Object -First 1).Speed
        latencia_cl = $null
        ecc = ($memModules | Select-Object -First 1).TotalWidth -gt ($memModules | Select-Object -First 1).DataWidth
        modulos = $modulos
        status = "Saudavel"
    }
    $tipoMap = @{ 20 = "DDR"; 21 = "DDR2"; 24 = "DDR3"; 26 = "DDR4"; 34 = "DDR5" }
    if ($tipoMap.ContainsKey([int]$memoria.tipo)) { $memoria.tipo = $tipoMap[[int]$memoria.tipo] }

    # -------------------- DISCOS --------------------
    $discos = @()
    $physicalDisks = Get-PhysicalDisk -ErrorAction SilentlyContinue
    foreach ($pd in $physicalDisks) {
        $partitions = Get-Partition -DiskNumber $pd.DeviceId -ErrorAction SilentlyContinue | Where-Object { $_.DriveLetter }
        $volumes = @()
        $letraPrincipal = $null
        $labelPrincipal = $null
        $fsPrincipal = $null
        $livrePrincipal = $null
        $tamanhoPrincipal = $null
        foreach ($part in $partitions) {
            $vol = Get-Volume -DriveLetter $part.DriveLetter -ErrorAction SilentlyContinue
            if ($vol) {
                $volumes += @{
                    letra = "$($part.DriveLetter):"
                    tamanho_gb = [math]::Round($vol.Size / 1GB, 2)
                    livre_gb = [math]::Round($vol.SizeRemaining / 1GB, 2)
                    tipo = $part.Type
                    # Novo
                    file_system_label = $vol.FileSystemLabel
                    health_status = $vol.HealthStatus
                }
                if (-not $letraPrincipal) {
                    $letraPrincipal = "$($part.DriveLetter):"
                    $labelPrincipal = $vol.FileSystemLabel
                    $fsPrincipal = $vol.FileSystem
                    $livrePrincipal = [math]::Round($vol.SizeRemaining / 1GB, 2)
                    $tamanhoPrincipal = [math]::Round($vol.Size / 1GB, 2)
                }
            }
        }
        $rel = $null
        try { $rel = $pd | Get-StorageReliabilityCounter -ErrorAction Stop } catch {}
        $tamanhoGB = [math]::Round($pd.Size / 1GB, 2)
        $usadoPct = if ($tamanhoPrincipal -and $livrePrincipal) {
            [math]::Round((($tamanhoPrincipal - $livrePrincipal) / $tamanhoPrincipal) * 100, 1)
        } else { $null }

        $discos += @{
            modelo = $pd.FriendlyName
            serial = $pd.SerialNumber
            firmware = $pd.FirmwareVersion
            tipo = $pd.MediaType
            interface = $pd.BusType
            tamanho_gb = $tamanhoGB
            livre_gb = $livrePrincipal
            usado_percentual = $usadoPct
            letra = $letraPrincipal
            sistema_arquivos = $fsPrincipal
            label = $labelPrincipal
            smart_status = $pd.HealthStatus
            saude_percentual = if ($pd.HealthStatus -eq "Healthy") { 100 } else { 50 }
            temperatura_celsius = if ($rel -and $rel.Temperature) { $rel.Temperature } else { $null }
            temperatura_max_historico = $null
            horas_ligado = if ($rel -and $rel.PowerOnHours) { $rel.PowerOnHours } else { $null }
            ciclos_power = if ($rel -and $rel.StartStopCycle) { $rel.StartStopCycle } else { $null }
            total_escrito_tb = $null
            particoes = $volumes
            status = if ($pd.HealthStatus -eq "Healthy") { "Saudavel" } else { $pd.HealthStatus }
            # Novos
            operational_status = $pd.OperationalStatus
            unique_id = $pd.UniqueId
            physical_location = $pd.PhysicalLocation
            can_pool = $pd.CanPool
            usage = $pd.Usage
        }
    }

    # -------------------- PLACA-MÃE + BIOS --------------------
    $bb = Get-CimInstance Win32_BaseBoard -ErrorAction SilentlyContinue
    $placa_mae = @{
        fabricante = $bb.Manufacturer
        modelo = $bb.Product
        versao = $bb.Version
        serial = $bb.SerialNumber
        chipset = $null
        bios = @{
            fabricante = $bios.Manufacturer
            versao = $bios.SMBIOSBIOSVersion
            data = if ($bios.ReleaseDate) { Convert-ToFormattedDate -Value $bios.ReleaseDate -Format "yyyy-MM-dd" } else { $null }
            tamanho_kb = $bios.BIOSVersion
            # Novos
            serial_number = $bios.SerialNumber
            smbios_version = $bios.SMBIOSMajorVersion.ToString() + "." + $bios.SMBIOSMinorVersion.ToString()
            status = $bios.Status
        }
        status = "Saudavel"
        # Novos
        tag = $bb.Tag
        hosting_board = $bb.HostingBoard
    }

    # -------------------- PLACA DE VÍDEO --------------------
    $gpus = @()
    $videoControllers = Get-CimInstance Win32_VideoController -ErrorAction SilentlyContinue | Where-Object { $_.Name -notmatch "Microsoft Basic|Remote" }
    foreach ($gpu in $videoControllers) {
        $gpuInfo = @{
            nome = $gpu.Name
            fabricante = $gpu.AdapterCompatibility
            chip = $gpu.VideoProcessor
            memoria_gb = if ($gpu.AdapterRAM -and $gpu.AdapterRAM -lt [int32]::MaxValue) { [math]::Round($gpu.AdapterRAM / 1GB, 0) } else { $null }
            memoria_tipo = $null
            driver = $gpu.DriverVersion
            driver_data = if ($gpu.DriverDate) { Convert-ToFormattedDate -Value $gpu.DriverDate -Format "yyyy-MM-dd" } else { $null }
            resolucao_atual = if ($gpu.CurrentHorizontalResolution) { "$($gpu.CurrentHorizontalResolution)x$($gpu.CurrentVerticalResolution)" } else { $null }
            refresh_rate = $gpu.CurrentRefreshRate
            uso_gpu_percentual = $null
            uso_memoria_percentual = $null
            temperatura_celsius = $null
            temperatura_hotspot = $null
            temperatura_max_historico = $null
            clock_core_mhz = $null
            clock_memoria_mhz = $null
            consumo_watts = $null
            fan_rpm = $null
            fan_percentual = $null
            status = "Saudavel"
            # Novos
            device_id = $gpu.DeviceID
            pnp_device_id = $gpu.PNPDeviceID
            video_mode_description = $gpu.VideoModeDescription
            current_bits_per_pixel = $gpu.CurrentBitsPerPixel
            adapter_dac_type = $gpu.AdapterDACType
            installed_display_drivers = $gpu.InstalledDisplayDrivers
        }
        if ($gpu.Name -match "NVIDIA" -and (Get-Command nvidia-smi -ErrorAction SilentlyContinue)) {
            try {
                $nvsmi = nvidia-smi --query-gpu=utilization.gpu,utilization.memory,temperature.gpu,clocks.current.graphics,clocks.current.memory,power.draw,fan.speed --format=csv,noheader,nounits 2>$null
                if ($nvsmi) {
                    $vals = $nvsmi -split "," | ForEach-Object { $_.Trim() }
                    $gpuInfo.uso_gpu_percentual = [double]$vals[0]
                    $gpuInfo.uso_memoria_percentual = [double]$vals[1]
                    $gpuInfo.temperatura_celsius = [int]$vals[2]
                    $gpuInfo.clock_core_mhz = [int]$vals[3]
                    $gpuInfo.clock_memoria_mhz = [int]$vals[4]
                    $gpuInfo.consumo_watts = [math]::Round([double]$vals[5], 0)
                    $gpuInfo.fan_percentual = if ($vals[6] -ne "[N/A]") { [int]$vals[6] } else { $null }
                }
            } catch {}
        }
        $gpus += $gpuInfo
    }

    # -------------------- REDE --------------------
    $rede = @()
    $adapters = Get-NetAdapter -ErrorAction SilentlyContinue | Where-Object { $_.HardwareInterface -eq $true }
    foreach ($adapter in $adapters) {
        $ip = Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue | Select-Object -First 1
        $ip6 = Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv6 -ErrorAction SilentlyContinue | Select-Object -First 1
        $dns = (Get-DnsClientServerAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue).ServerAddresses
        $stats = Get-NetAdapterStatistics -Name $adapter.Name -ErrorAction SilentlyContinue
        $driver = Get-NetAdapterAdvancedProperty -Name $adapter.Name -ErrorAction SilentlyContinue | Select-Object -First 1

        $rede += @{
            nome = $adapter.Name
            descricao = $adapter.InterfaceDescription
            mac = $adapter.MacAddress
            tipo = $adapter.MediaType
            velocidade_mbps = if ($adapter.LinkSpeed -match "(\d+)") { [int]$matches[1] } else { $null }
            duplex = $adapter.FullDuplex
            ip_v4 = if ($ip) { $ip.IPAddress } else { $null }
            mascara = if ($ip) { $ip.PrefixLength } else { $null }
            gateway = (Get-NetRoute -InterfaceIndex $adapter.ifIndex -DestinationPrefix "0.0.0.0/0" -ErrorAction SilentlyContinue | Select-Object -First 1).NextHop
            dns = $dns
            dhcp = (Get-NetIPInterface -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue).Dhcp
            status = $adapter.Status
            bytes_enviados_gb = if ($stats) { [math]::Round($stats.SentBytes / 1GB, 2) } else { $null }
            bytes_recebidos_gb = if ($stats) { [math]::Round($stats.ReceivedBytes / 1GB, 2) } else { $null }
            ssid = $null
            sinal_dbm = $null
            # Novos
            ip_v6 = if ($ip6) { $ip6.IPAddress } else { $null }
            driver_version = $adapter.DriverVersion
            driver_date = if ($adapter.DriverDate) { Convert-ToFormattedDate -Value $adapter.DriverDate -Format "yyyy-MM-dd" } else { $null }
            driver_provider = $adapter.DriverProvider
            driver_description = $adapter.DriverDescription
            mtu = $adapter.MtuSize
            link_speed = $adapter.LinkSpeed
            media_connection_state = $adapter.MediaConnectionState
            admin_status = $adapter.AdminStatus
            if_index = $adapter.ifIndex
        }
    }

    # -------------------- SENSORES --------------------
    $sensores = @{
        cpu_package = $processador.temperatura_celsius
        cpu_cores_media = $null
        gpu = if ($gpus.Count -gt 0) { $gpus[0].temperatura_celsius } else { $null }
        gpu_hotspot = $null
        motherboard = $null
        chipset = $null
        vram = $null
        ssd_c = ($discos | Where-Object { $_.letra -eq "C:" }).temperatura_celsius
        ssd_d = ($discos | Where-Object { $_.letra -eq "D:" }).temperatura_celsius
        ram_dimm_a1 = $null
        ram_dimm_b1 = $null
        vr_vrm = $null
        fans = @()
    }

    # -------------------- ENERGIA --------------------
    $energia = @{
        fonte = @{
            modelo = $null
            potencia_watts = $null
            eficiencia = $null
            status = "Desconhecido"
        }
        consumo_sistema_estimado_watts = $null
        bateria = $null
    }
    try {
        $bat = Get-CimInstance Win32_Battery -ErrorAction Stop
        if ($bat) {
            $energia.bateria = @{
                carga_percentual = $bat.EstimatedChargeRemaining
                status = $bat.BatteryStatus
                # Novos
                nome = $bat.Name
                chemistry = $bat.Chemistry
                design_capacity = $bat.DesignCapacity
                full_charge_capacity = $bat.FullChargeCapacity
                time_on_battery = $bat.TimeOnBattery
                expected_life = $bat.ExpectedLife
            }
        }
    } catch {}

    # -------------------- SEGURANÇA --------------------
    $av = @{ nome = "Desconhecido"; estado = "Desconhecido"; atualizado = $null; ultima_verificacao = $null; ameacas_detectadas = $null }
    try {
        $avProd = Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntiVirusProduct -ErrorAction Stop | Select-Object -First 1
        if ($avProd) {
            $av.nome = $avProd.displayName
            $state = $avProd.productState
            $av.estado = if ($state -band 0x1000) { "Ativo" } else { "Inativo" }
            $av.path = $avProd.pathToSignedProductExe
        }
    } catch {}

    # Windows Defender mais detalhado
    $defender = $null
    try {
        $mp = Get-MpComputerStatus -ErrorAction Stop
        $defender = @{
            antivirus_enabled = $mp.AntivirusEnabled
            real_time_protection = $mp.RealTimeProtectionEnabled
            antivirus_signature_version = $mp.AntivirusSignatureVersion
            antivirus_signature_last_updated = $mp.AntivirusSignatureLastUpdated
            nis_enabled = $mp.NISEnabled
            quick_scan_end_time = $mp.QuickScanEndTime
            full_scan_end_time = $mp.FullScanEndTime
            computer_state = $mp.ComputerState
        }
    } catch {}

    $firewall = "Desconhecido"
    try {
        $fw = Get-NetFirewallProfile -ErrorAction Stop
        $firewall = if ($fw | Where-Object { $_.Enabled }) { "Ativado" } else { "Desativado" }
    } catch {}

    $uac = "Desconhecido"
    try {
        $uacReg = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name EnableLUA -ErrorAction Stop
        $uac = if ($uacReg.EnableLUA -eq 1) { "Ativado" } else { "Desativado" }
    } catch {}

    $seguranca = @{
        antivirus = $av
        windows_defender = $defender
        firewall = $firewall
        uac = $uac
        windows_update = @{
            pendentes = $null
            ultima_verificacao = $null
            ultima_instalacao = $null
        }
    }

    # -------------------- SOFTWARE COMPLETO (SEM CORTE) --------------------
    $uninstallPaths = @(
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
        "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
        "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*"
    )
    $apps = @()
    foreach ($path in $uninstallPaths) {
        $items = Get-ItemProperty $path -ErrorAction SilentlyContinue |
                 Where-Object { $_.DisplayName }
        foreach ($item in $items) {
            $apps += @{
                nome = $item.DisplayName
                versao = $item.DisplayVersion
                editor = $item.Publisher
                data_instalacao = $item.InstallDate
                local_instalacao = $item.InstallLocation
                tamanho_estimado_kb = $item.EstimatedSize
                uninstall_string = $item.UninstallString
                quiet_uninstall = $item.QuietUninstallString
                registry_key = $item.PSChildName
                system_component = $item.SystemComponent
                windows_installer = $item.WindowsInstaller
            }
        }
    }
    $apps = $apps | Sort-Object nome -Unique

    # Microsoft Store / Appx Packages
    $storeApps = @()
    try {
        $storeApps = Get-AppxPackage -AllUsers -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                nome_completo = $_.PackageFullName
                versao = $_.Version.ToString()
                editor = $_.Publisher
                local_instalacao = $_.InstallLocation
                arquitetura = $_.Architecture.ToString()
                status = $_.Status.ToString()
                is_framework = $_.IsFramework
                is_resource_package = $_.IsResourcePackage
            }
        }
    } catch {
        $storeApps = Get-AppxPackage -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                nome_completo = $_.PackageFullName
                versao = $_.Version.ToString()
                editor = $_.Publisher
                local_instalacao = $_.InstallLocation
                arquitetura = $_.Architecture.ToString()
                status = $_.Status.ToString()
                is_framework = $_.IsFramework
                is_resource_package = $_.IsResourcePackage
            }
        }
    }

    $software = @{
        programas_instalados_total = $apps.Count
        programas = $apps
        store_apps_total = $storeApps.Count
        store_apps = $storeApps
    }

    # -------------------- HOTFIXES / WINDOWS UPDATES --------------------
    $hotfixes = @()
    try {
        $hotfixes = Get-HotFix -ErrorAction SilentlyContinue | Sort-Object InstalledOn -Descending | ForEach-Object {
            @{
                id = $_.HotFixID
                descricao = $_.Description
                instalado_por = $_.InstalledBy
                data_instalacao = if ($_.InstalledOn) { Convert-ToFormattedDate -Value $_.InstalledOn -Format "o" } else { $null }
            }
        }
    } catch {}

    # -------------------- SERVIÇOS --------------------
    $servicos = @()
    try {
        $servicos = Get-Service -ErrorAction SilentlyContinue | ForEach-Object {
            $cim = Get-CimInstance Win32_Service -Filter "Name='$($_.Name)'" -ErrorAction SilentlyContinue
            @{
                nome = $_.Name
                display_name = $_.DisplayName
                status = $_.Status.ToString()
                start_type = $_.StartType.ToString()
                can_stop = $_.CanStop
                can_pause = $_.CanPauseAndContinue
                path = if ($cim) { $cim.PathName } else { $null }
                start_name = if ($cim) { $cim.StartName } else { $null }
                description = if ($cim) { $cim.Description } else { $null }
            }
        }
    } catch {}

    # -------------------- PROGRAMAS DE INICIALIZAÇÃO --------------------
    $startup = @()
    $startupPaths = @(
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
        "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
        "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
        "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run"
    )
    foreach ($p in $startupPaths) {
        try {
            $props = Get-ItemProperty $p -ErrorAction SilentlyContinue
            if ($props) {
                $props.PSObject.Properties | Where-Object { $_.Name -notmatch "^PS" } | ForEach-Object {
                    $startup += @{
                        nome = $_.Name
                        comando = $_.Value
                        local = $p
                    }
                }
            }
        } catch {}
    }
    $startupFolders = @(
        "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup",
        "$env:ProgramData\Microsoft\Windows\Start Menu\Programs\Startup"
    )
    foreach ($folder in $startupFolders) {
        if (Test-Path $folder) {
            Get-ChildItem $folder -ErrorAction SilentlyContinue | ForEach-Object {
                $startup += @{
                    nome = $_.Name
                    comando = $_.FullName
                    local = $folder
                }
            }
        }
    }

    # -------------------- PROCESSOS EM EXECUÇÃO --------------------
    $processos = @()
    try {
        $processos = Get-Process -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                id = $_.Id
                nome = $_.ProcessName
                caminho = $_.Path
                memoria_mb = [math]::Round($_.WorkingSet64 / 1MB, 2)
                cpu_s = [math]::Round($_.CPU, 2)
                threads = $_.Threads.Count
                handles = $_.Handles
                start_time = if ($_.StartTime) { Convert-ToFormattedDate -Value $_.StartTime -Format "o" } else { $null }
                company = $_.Company
                product = $_.Product
                file_version = $_.FileVersion
            }
        }
    } catch {}
    $top_cpu = $processos | Sort-Object cpu_s -Descending | Select-Object -First 15
    $top_memoria = $processos | Sort-Object memoria_mb -Descending | Select-Object -First 15

    # -------------------- IMPRESSORAS --------------------
    $impressoras = @()
    try {
        $impressoras = Get-Printer -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                driver = $_.DriverName
                porta = $_.PortName
                compartilhada = $_.Shared
                status = $_.PrinterStatus.ToString()
                tipo = $_.Type.ToString()
                local = $_.Location
                comentario = $_.Comment
            }
        }
    } catch {}

    # -------------------- DISPOSITIVOS USB --------------------
    $usb = @()
    try {
        $usb = Get-PnpDevice -Class USB -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.FriendlyName
                status = $_.Status
                instance_id = $_.InstanceId
                class = $_.Class
                manufacturer = $_.Manufacturer
            }
        }
    } catch {}

    # -------------------- RECURSOS OPCIONAIS DO WINDOWS --------------------
    $optionalFeatures = @()
    try {
        $optionalFeatures = Get-WindowsOptionalFeature -Online -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.FeatureName
                estado = $_.State.ToString()
            }
        }
    } catch {}

    # -------------------- TAREFAS AGENDADAS --------------------
    $tarefas = @()
    try {
        $tarefas = Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object { $_.State -ne "Disabled" } | ForEach-Object {
            $info = $_ | Get-ScheduledTaskInfo -ErrorAction SilentlyContinue
            @{
                nome = $_.TaskName
                caminho = $_.TaskPath
                estado = $_.State.ToString()
                ultima_execucao = if ($info.LastRunTime) { Convert-ToFormattedDate -Value $info.LastRunTime -Format "o" } else { $null }
                proxima_execucao = if ($info.NextRunTime) { Convert-ToFormattedDate -Value $info.NextRunTime -Format "o" } else { $null }
                resultado_ultima = $info.LastTaskResult
                autor = $_.Author
            }
        }
    } catch {}

    # ============================================================
    # NOVAS SEÇÕES (2.8.0)
    # ============================================================

    # -------------------- MONITORES / DISPLAYS --------------------
    $monitores = @()
    try {
        $monitores = Get-CimInstance Win32_DesktopMonitor -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                fabricante = $_.MonitorManufacturer
                tipo = $_.MonitorType
                status = $_.Status
                screen_width = $_.ScreenWidth
                screen_height = $_.ScreenHeight
                pixels_por_x = $_.PixelsPerXLogicalInch
                pixels_por_y = $_.PixelsPerYLogicalInch
                availability = $_.Availability
            }
        }
        # Também tenta via WmiMonitorID (mais detalhado)
        $monitoresEdid = @()
        try {
            $monitoresEdid = Get-CimInstance -Namespace root/wmi -ClassName WmiMonitorID -ErrorAction SilentlyContinue | ForEach-Object {
                $name = ($_.UserFriendlyName | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ }) -join ""
                $serial = ($_.SerialNumberID | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ }) -join ""
                $manufacturer = ($_.ManufacturerName | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ }) -join ""
                @{
                    nome_amigavel = $name.Trim()
                    serial = $serial.Trim()
                    fabricante = $manufacturer.Trim()
                    ano_fabricacao = $_.YearOfManufacture
                    semana_fabricacao = $_.WeekOfManufacture
                    active = $_.Active
                }
            }
        } catch {}
    } catch {}

    # -------------------- DISPOSITIVOS DE ÁUDIO --------------------
    $audio = @()
    try {
        $audio = Get-CimInstance Win32_SoundDevice -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                fabricante = $_.Manufacturer
                status = $_.Status
                pnp_device_id = $_.PNPDeviceID
                product_name = $_.ProductName
            }
        }
    } catch {}

    # -------------------- PLANO DE ENERGIA --------------------
    $planoEnergia = $null
    try {
        $plano = powercfg /getactivescheme
        if ($plano -match "GUID:\s+([a-f0-9\-]+)\s+\((.+)\)") {
            $planoEnergia = @{
                guid = $matches[1]
                nome = $matches[2].Trim()
            }
        }
    } catch {}

    # -------------------- ARQUIVO DE PAGINAÇÃO (PAGEFILE) --------------------
    $pagefile = @()
    try {
        $pagefile = Get-CimInstance Win32_PageFileUsage -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                allocated_base_size_mb = $_.AllocatedBaseSize
                current_usage_mb = $_.CurrentUsage
                peak_usage_mb = $_.PeakUsage
            }
        }
    } catch {}

    # -------------------- CONTAS DE USUÁRIO LOCAIS --------------------
    $usuariosLocais = @()
    try {
        $usuariosLocais = Get-LocalUser -ErrorAction SilentlyContinue | ForEach-Object {
            @{
                nome = $_.Name
                enabled = $_.Enabled
                description = $_.Description
                last_logon = if ($_.LastLogon) { Convert-ToFormattedDate -Value $_.LastLogon -Format "o" } else { $null }
                password_required = $_.PasswordRequired
                password_expires = $_.PasswordExpires
                user_may_change_password = $_.UserMayChangePassword
                principal_source = $_.PrincipalSource.ToString()
            }
        }
    } catch {}

    # -------------------- UNIDADES MAPEADAS / SHARES --------------------
    $unidadesMapeadas = @()
    try {
        $unidadesMapeadas = Get-PSDrive -PSProvider FileSystem -ErrorAction SilentlyContinue | Where-Object { $_.DisplayRoot } | ForEach-Object {
            @{
                nome = $_.Name
                root = $_.Root
                display_root = $_.DisplayRoot
                description = $_.Description
                used_gb = if ($_.Used) { [math]::Round($_.Used / 1GB, 2) } else { $null }
                free_gb = if ($_.Free) { [math]::Round($_.Free / 1GB, 2) } else { $null }
            }
        }
    } catch {}

    # -------------------- DRIVERS INSTALADOS (resumo) --------------------
    $drivers = @()
    try {
        $drivers = Get-CimInstance Win32_PnPSignedDriver -ErrorAction SilentlyContinue | 
            Where-Object { $_.DeviceName -and $_.DriverVersion } |
            Select-Object -First 300 | ForEach-Object {
            @{
                device_name = $_.DeviceName
                driver_version = $_.DriverVersion
                driver_date = if ($_.DriverDate) { Convert-ToFormattedDate -Value $_.DriverDate -Format "yyyy-MM-dd" } else { $null }
                manufacturer = $_.Manufacturer
                driver_provider = $_.DriverProviderName
                inf_name = $_.InfName
                is_signed = $_.IsSigned
                device_class = $_.DeviceClass
            }
        }
    } catch {}

    # -------------------- VARIÁVEIS DE AMBIENTE --------------------
    $envVars = @{
        sistema = @{}
        usuario = @{}
    }
    try {
        Get-ChildItem Env: | ForEach-Object {
            if ($_.Name -match "^(Path|TEMP|TMP|USERPROFILE|SystemRoot|windir|ProgramFiles|ProgramFiles\(x86\)|ProgramData|APPDATA|LOCALAPPDATA|USERNAME|COMPUTERNAME|USERDOMAIN|NUMBER_OF_PROCESSORS|PROCESSOR_ARCHITECTURE|PROCESSOR_IDENTIFIER)$") {
                $envVars.sistema[$_.Name] = $_.Value
            }
        }
    } catch {}

    # -------------------- STATUS GERAL --------------------
    $alertas = @()
    $avisos = @()
    $tempMax = @($processador.temperatura_celsius, $sensores.gpu) | Where-Object { $_ -ne $null } | Measure-Object -Maximum | Select-Object -ExpandProperty Maximum
    if ($discos | Where-Object { $_.smart_status -ne "Healthy" -and $_.smart_status -ne $null }) {
        $alertas += "Disco com status SMART diferente de Healthy"
    }
    $status_geral = @{
        saude = if ($alertas.Count -eq 0) { "Excelente" } else { "Atencao" }
        alertas = $alertas
        avisos = $avisos
        temperatura_maxima_detectada = $tempMax
        componentes_criticos = $alertas.Count
        componentes_atencao = $avisos.Count
    }

    $sw.Stop()
    return @{
        coleta = @{
            versao_script = $scriptVersion
            data_hora = (Get-LocalTimestamp)
            data_hora_com_fuso = (Get-Date).ToString("o")
            tempo_coleta_ms = $sw.ElapsedMilliseconds
            usuario_executando = $usuario
            elevado = $isElevated
        }
        sistema = $sistema
        processador = $processador
        memoria = $memoria
        discos = $discos
        placa_mae = $placa_mae
        placa_video = $gpus
        rede = $rede
        sensores = $sensores
        energia = $energia
        seguranca = $seguranca
        software = $software
        hotfixes = $hotfixes
        servicos = $servicos
        startup = $startup
        processos = @{
            total = $processos.Count
            top_cpu = $top_cpu
            top_memoria = $top_memoria
        }
        impressoras = $impressoras
        usb_devices = $usb
        optional_features = $optionalFeatures
        tarefas_agendadas = $tarefas
        # Novas seções 2.8.0
        monitores = $monitores
        monitores_edid = $monitoresEdid
        audio_devices = $audio
        plano_energia = $planoEnergia
        pagefile = $pagefile
        usuarios_locais = $usuariosLocais
        unidades_mapeadas = $unidadesMapeadas
        drivers = $drivers
        variaveis_ambiente = $envVars
        status_geral = $status_geral
    }
}
# ============================================================
# LÓGICA PRINCIPAL
# ============================================================
Write-Host "`n=== Iniciando verificacao de Hashkey ===" -ForegroundColor Cyan
$localHash = Get-LocalHash
$isNewHash = $false
if (-not $localHash) {
    Write-Host "Nenhuma hashkey local encontrada. Gerando nova..." -ForegroundColor Yellow
    $localHash = New-LocalHash
    $isNewHash = $true
}
else {
    Write-Host "Hashkey local encontrada: $localHash" -ForegroundColor Green
}
$maxAttempts = 8
$attempt = 0
$hashReady = $false
$action = $null
while (-not $hashReady -and $attempt -lt $maxAttempts) {
    $attempt++
    $existsInDb = Test-HashExistsInDatabase -Hash $localHash
    if ($existsInDb) {
        if ($isNewHash) {
            Write-Host "Hash $localHash ja existe no banco. Gerando outra... (tentativa $attempt)" -ForegroundColor Yellow
            $localHash = New-LocalHash
            continue
        }
        else {
            Write-Host "Hash ja existe no banco -> sera feito UPDATE" -ForegroundColor Cyan
            $hashReady = $true
            $action = "update"
        }
    }
    else {
        Write-Host "Hash livre no banco -> sera feito INSERT" -ForegroundColor Cyan
        $hashReady = $true
        $action = "insert"
    }
}
if (-not $hashReady) {
    Write-Host "Nao foi possivel obter uma hashkey valida apos $maxAttempts tentativas." -ForegroundColor Red
    exit 1
}
# ============================================================
# COLETA + ENVIO
# ============================================================
Write-Host "`n=== Coletando inventario completo do sistema ===" -ForegroundColor Cyan
$resultado = Get-SystemInventory
Write-Host "Coleta finalizada em $($resultado.coleta.tempo_coleta_ms) ms" -ForegroundColor Green
$payload = @{
    id = $localHash
    action = $action
    timestamp = (Get-LocalTimestamp)
    timestamp_com_fuso = (Get-Date).ToString("o")
    timezone = (Get-TimeZone).Id
    hostname = $env:COMPUTERNAME
    data = $resultado
} | ConvertTo-Json -Depth 25 -Compress
$headers = @{
    "Authorization" = "Bearer $supabaseAnonKey"
    "apikey" = $supabaseAnonKey
    "Content-Type" = "application/json"
}
Write-Host "Enviando dados para a Edge Function (acao: $action)..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod `
        -Uri "$supabaseUrl/functions/v1/$edgeFunctionName" `
        -Method Post `
        -Headers $headers `
        -Body $payload `
        -ErrorAction Stop
    Write-Host "Envio realizado com sucesso!" -ForegroundColor Green
    Write-Host "Resposta da Edge Function: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
    if ($isNewHash) {
        Save-LocalHash -Hash $localHash
    }
}
catch {
    Write-Host "ERRO ao enviar para a Edge Function:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($isNewHash) {
        Write-Host "Hashkey NAO foi salva localmente porque o envio falhou." -ForegroundColor Yellow
    }
}