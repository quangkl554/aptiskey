@echo off
cd /d "%~dp0"
start "Aptis Studio Server" /min py -m http.server 8765 --bind 127.0.0.1
timeout /t 1 /nobreak >nul
start "" http://127.0.0.1:8765/index.html
