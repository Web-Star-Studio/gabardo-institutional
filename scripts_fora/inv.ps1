$supabaseUrl = "https://eofkiyvsslugkfmjbgqn.supabase.co"
$supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZmtpeXZzc2x1Z2tmbWpiZ3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTg5NzYsImV4cCI6MjEwMDEzNDk3Nn0.ZWQLDrDToCYTM58QaET0ig14IgXShI0WKbTxn4Iatbcllkçç"

$paths = @(
    "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*"
)

$programas = Get-ItemProperty $paths -ErrorAction SilentlyContinue |
Where-Object { $_.DisplayName } |
Select-Object @{Name = 'nome_exibicao'; Expression = { $_.DisplayName } },
@{Name = 'versao'; Expression = { $_.DisplayVersion } },
@{Name = 'publicador'; Expression = { $_.Publisher } } |
Sort-Object nome_exibicao

$monitores = Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID -ErrorAction SilentlyContinue |
ForEach-Object {
    [PSCustomObject]@{
        fabricante   = -join ($_.ManufacturerName | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ })
        modelo       = -join ($_.UserFriendlyName | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ })
        numero_serie = -join ($_.SerialNumberID   | Where-Object { $_ -ne 0 } | ForEach-Object { [char]$_ })
        ativo        = $_.Active
    }
}

$user = Get-CimInstance Win32_ComputerSystem
$os = Get-CimInstance Win32_OperatingSystem
$userAccount = Get-CimInstance Win32_UserAccount -Filter "LocalAccount=True" -ErrorAction SilentlyContinue

$usuariosLocais = $userAccount | Select-Object `
@{Name = 'nome'; Expression = { $_.Name } },
@{Name = 'nome_completo'; Expression = { $_.FullName } },
@{Name = 'desabilitado'; Expression = { $_.Disabled } },
@{Name = 'descricao'; Expression = { $_.Description } }

$gpus = Get-CimInstance Win32_VideoController -ErrorAction SilentlyContinue |
Select-Object `
@{Name = 'nome'; Expression = { $_.Name } },
@{Name = 'processador_video'; Expression = { $_.VideoProcessor } },
@{Name = 'vram_gb'; Expression = {
        if ($_.AdapterRAM -and $_.AdapterRAM -gt 0) {
            [math]::Round($_.AdapterRAM / 1GB, 2)
        }
        else { $null }
    }
},
@{Name = 'versao_driver'; Expression = { $_.DriverVersion } },
@{Name = 'data_driver'; Expression = {
        if ($_.DriverDate) { $_.DriverDate.ToString("o") } else { $null }
    }
},
@{Name = 'resolucao'; Expression = {
        if ($_.CurrentHorizontalResolution -and $_.CurrentVerticalResolution) {
            "$($_.CurrentHorizontalResolution) x $($_.CurrentVerticalResolution)"
        }
        else { $_.VideoModeDescription }
    }
},
@{Name = 'taxa_atualizacao'; Expression = { $_.CurrentRefreshRate } },
@{Name = 'status'; Expression = { $_.Status } }

$cpuRaw = Get-CimInstance Win32_Processor | Select-Object -First 1
$cpu = [PSCustomObject]@{
    nome                  = $cpuRaw.Name
    fabricante            = $cpuRaw.Manufacturer
    nucleos               = $cpuRaw.NumberOfCores
    processadores_logicos = $cpuRaw.NumberOfLogicalProcessors
    clock_max_ghz         = [math]::Round($cpuRaw.MaxClockSpeed / 1000, 2)
    id_processador        = $cpuRaw.ProcessorId
    soquete               = $cpuRaw.SocketDesignation
}

$pc = Get-CimInstance Win32_ComputerSystem |
Select-Object Manufacturer, Model, SystemFamily

$placaMae = Get-CimInstance Win32_BaseBoard |
Select-Object Manufacturer, Product, SerialNumber

$conexoes = Get-CimInstance Win32_PnPEntity -ErrorAction SilentlyContinue |
Where-Object { $_.Status -eq "OK" } |
Select-Object `
@{Name = 'nome'; Expression = { $_.Name } },
@{Name = 'fabricante'; Expression = { $_.Manufacturer } },
@{Name = 'class_guid'; Expression = { $_.ClassGuid } },
@{Name = 'pnp_class'; Expression = { $_.PNPClass } },
@{Name = 'device_id'; Expression = { $_.DeviceID } },
@{Name = 'pnp_device_id'; Expression = { $_.PNPDeviceID } },
@{Name = 'status'; Expression = { $_.Status } } |
Sort-Object pnp_class, nome

$payload = [PSCustomObject]@{
    nome_computador      = $user.Name
    dominio              = $user.Domain
    usuario_atual        = $user.UserName
    fabricante           = $pc.Manufacturer
    modelo               = $pc.Model
    familia_sistema      = $pc.SystemFamily
    placa_mae_fabricante = $placaMae.Manufacturer
    placa_mae_produto    = $placaMae.Product
    placa_mae_serial     = $placaMae.SerialNumber
    sistema_operacional  = $os.Caption
    versao_so            = $os.Version
    arquitetura          = $os.OSArchitecture

    cpu                  = $cpu
    gpus                 = @($gpus)
    monitores            = @($monitores)
    programas            = @($programas)
    conexoes             = @($conexoes)
    usuarios_locais      = @($usuariosLocais)
}

$headers = @{
    "apikey"        = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type"  = "application/json"
    "Prefer"        = "return=representation"
}

$bodyObject = @{
    payload = $payload
}

$jsonBody = $bodyObject | ConvertTo-Json -Depth 20 -Compress

Write-Host "Tamanho do JSON: $($jsonBody.Length) caracteres" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod `
        -Uri "$supabaseUrl/rest/v1/rpc/upsert_maquina_inventario" `
        -Method Post `
        -Headers $headers `
        -Body ([System.Text.Encoding]::UTF8.GetBytes($jsonBody)) `
        -ContentType "application/json; charset=utf-8"

    Write-Host "`n✅ Sucesso! Resposta:" -ForegroundColor Green
    $response
}
catch {
    Write-Host "`n❌ ERRO DETALHADO:" -ForegroundColor Red
    Write-Host "Mensagem: $($_.Exception.Message)" -ForegroundColor Red

    if ($_.ErrorDetails.Message) {
        Write-Host "Detalhes do Supabase:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message
    }

    # Tenta ler o body do erro
    try {
        $stream = $_.Exception.Response.GetResponseStream()
        if ($stream) {
            $reader = New-Object System.IO.StreamReader($stream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Body do erro: $errorBody" -ForegroundColor Yellow
        }
    }
    catch {}
}