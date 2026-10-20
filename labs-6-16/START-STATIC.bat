@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 goto missing
echo Open http://localhost:8080/labs-6-16/
node serve.cjs
if errorlevel 1 goto failed
goto end
:missing
echo Install Node.js 24 LTS and reopen this file.
pause
goto end
:failed
echo Startup failed. Read the error above.
pause
:end
