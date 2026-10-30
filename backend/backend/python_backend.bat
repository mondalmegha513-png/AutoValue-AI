@echo off
setlocal
cd /d "%~dp0"
if defined AUTOVALUE_PYTHON (
  "%AUTOVALUE_PYTHON%" %*
  exit /b
)
if exist "%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe" (
  "%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe" %*
  exit /b
)
where py >nul 2>nul
if not errorlevel 1 (
  py %*
  exit /b
)
python %*
