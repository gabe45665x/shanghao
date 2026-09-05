@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starting 飛田新天地 preview on port 8787 ...
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8787/"
node serve.mjs
pause
