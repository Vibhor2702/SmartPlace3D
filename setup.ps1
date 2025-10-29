# SmartPlace3D Quick Setup Script

Write-Host "🚀 SmartPlace3D Setup Starting..." -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm installation
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found. Please install npm" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "2. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "3. Allow camera permissions when prompted" -ForegroundColor White
Write-Host "4. Start placing 3D objects in AR!" -ForegroundColor White
Write-Host ""
Write-Host "Optional:" -ForegroundColor Cyan
Write-Host "- Copy .env.example to .env and add your Sketchfab API key for AI model search" -ForegroundColor White
Write-Host ""
Write-Host "📚 For more info, check README.md and DEVELOPMENT.md" -ForegroundColor Yellow
Write-Host ""

# Ask if user wants to start dev server
$response = Read-Host "Would you like to start the development server now? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host ""
    Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
    npm run dev
}
