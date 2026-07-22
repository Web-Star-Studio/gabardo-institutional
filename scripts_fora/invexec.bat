@echo off
:: ============================================================
::  Agendar Inventário - Executa a cada 1 hora (silencioso)
:: ============================================================

:: >>> ALTERE ESTES CAMINHOS <<<
set "SCRIPT_PS1=C:\Inventario.ps1"
set "TASK_NAME=InventarioSistema"

:: Verifica se o script existe
if not exist "%SCRIPT_PS1%" (
    echo [ERRO] Script nao encontrado: %SCRIPT_PS1%
    echo Coloque o arquivo .ps1 no caminho correto e tente novamente.
    pause
    exit /b 1
)

:: Remove a tarefa antiga (se existir)
schtasks /Delete /TN "%TASK_NAME%" /F >nul 2>&1

:: Cria a tarefa:
:: - Roda a cada 1 hora
:: - Em background (sem janela)
:: - Com privilégios mais altos
:: - Mesmo se o usuário não estiver logado
schtasks /Create ^
    /TN "%TASK_NAME%" ^
    /TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File \"%SCRIPT_PS1%\"" ^
    /SC HOURLY ^
    /MO 1 ^
    /RU "SYSTEM" ^
    /RL HIGHEST ^
    /F

if %errorlevel% equ 0 (
    echo.
    echo [OK] Tarefa criada com sucesso!
    echo.
    echo Nome da tarefa : %TASK_NAME%
    echo Frequencia     : A cada 1 hora
    echo Visibilidade   : Invisivel (nao aparece na tela)
    echo Usuario        : SYSTEM (roda mesmo sem ninguem logado)
    echo.
    echo Para verificar:  schtasks /Query /TN "%TASK_NAME%" /V /FO LIST
    echo Para remover  :  schtasks /Delete /TN "%TASK_NAME%" /F
) else (
    echo.
    echo [ERRO] Nao foi possivel criar a tarefa.
    echo Execute este .bat como Administrador.
)

echo.
pause