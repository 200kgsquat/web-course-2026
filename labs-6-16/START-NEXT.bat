@echo off
cd /d "%~dp0..\task12-13"
where node >nul 2>nul
if errorlevel 1 goto missing
if not exist node_modules (
 call npm.cmd install
 if errorlevel 1 goto failed
)
echo Open http://localhost:3000
call npm.cmd run dev
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
