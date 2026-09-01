@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Opening a public HTTPS tunnel to http://127.0.0.1:8787
echo Keep this window open. Close it to stop the public link.
echo.
echo If local preview is not running, start 雙擊預覽.bat first.
echo.
npx --yes cloudflared tunnel --url http://127.0.0.1:8787
pause
