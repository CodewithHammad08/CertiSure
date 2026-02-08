@echo off
echo ===================================================
echo   Starting Certificate Verification System V2
echo ===================================================

echo [1/3] Starting AI Service (Python)...
start "AI Service" /min cmd /c "python backend/ai_service/app.py"

echo [2/3] Starting Backend Server (Node.js)...
start "Backend Server" /min cmd /c "node backend/server.js"

echo [3/3] Opening Application...
timeout /t 3 >nul
explorer "http://localhost:3000"

echo.
echo All services started! 
echo - Backend: http://localhost:3000
echo - AI Service: http://localhost:5000
echo.
echo Press any key to stop all services...
pause >nul

taskkill /F /IM node.exe
taskkill /F /IM python.exe
echo Services stopped.
