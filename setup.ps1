# PowerShell setup script for Smart Tourist Safety System
Write-Host "🚀 Setting up Smart Tourist Safety System..." -ForegroundColor Cyan

# Check if Node.js is installed
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if Python is installed
Write-Host "🐍 Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not found. Please install from https://python.org/" -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "🔧 Setting up Backend..." -ForegroundColor Yellow
Set-Location backend
if (Test-Path "package.json") {
    npm install
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ Backend not initialized yet" -ForegroundColor Yellow
}
Set-Location ..

# Setup Frontend
Write-Host "🎨 Setting up Frontend..." -ForegroundColor Yellow
Set-Location frontend
if (Test-Path "package.json") {
    npm install
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ Frontend not initialized yet" -ForegroundColor Yellow
}
Set-Location ..

# Setup AI Service
Write-Host "🤖 Setting up AI Service..." -ForegroundColor Yellow
Set-Location ai_service
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
    Write-Host "✅ AI Service dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ AI Service not initialized yet" -ForegroundColor Yellow
}
Set-Location ..

# Setup Blockchain Stub
Write-Host "⛓️ Setting up Blockchain Stub..." -ForegroundColor Yellow
Set-Location blockchain_stub
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
    Write-Host "✅ Blockchain Stub dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ Blockchain Stub not initialized yet" -ForegroundColor Yellow
}
Set-Location ..

Write-Host "🎉 Setup complete! Run each service in separate terminals:" -ForegroundColor Green
Write-Host "Backend: cd backend && npm start" -ForegroundColor Cyan
Write-Host "Frontend: cd frontend && npm start" -ForegroundColor Cyan
Write-Host "AI Service: cd ai_service && python app.py" -ForegroundColor Cyan
Write-Host "Blockchain: cd blockchain_stub && python blockchain_server.py" -ForegroundColor Cyan