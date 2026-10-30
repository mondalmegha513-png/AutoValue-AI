@echo off
cd /d "%~dp0"
call python_backend.bat train.py
pause
