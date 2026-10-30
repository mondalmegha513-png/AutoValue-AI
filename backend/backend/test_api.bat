@echo off
cd /d "%~dp0"
call python_backend.bat -m unittest discover -s tests -v
pause
