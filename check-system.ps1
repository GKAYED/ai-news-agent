#!/usr/bin/env pwsh
# Check prerequisites for AI Agent

Write-Host "`n🔍 AI Agent - System Check" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

$allGood = $true

# Check Docker
Write-Host "Checking for Docker..." -NoNewline
$dockerAvailable = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)
if ($dockerAvailable) {
    $dockerVersion = docker --version
    Write-Host " ✅" -ForegroundColor Green
    Write-Host "  Found: $dockerVersion" -ForegroundColor Gray
    
    # Check if Docker is running
    $dockerRunning = docker ps 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Docker is running ✓" -ForegroundColor Gray
    } else {
        Write-Host "  ⚠️  Docker is installed but not running" -ForegroundColor Yellow
        Write-Host "     Please start Docker Desktop" -ForegroundColor Yellow
    }
} else {
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "  Not found. Install from: https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor Yellow
}

# Check Node.js
Write-Host "`nChecking for Node.js..." -NoNewline
$nodeAvailable = $null -ne (Get-Command node -ErrorAction SilentlyContinue)
if ($nodeAvailable) {
    $nodeVersion = node --version
    Write-Host " ✅" -ForegroundColor Green
    Write-Host "  Found: $nodeVersion" -ForegroundColor Gray
    
    # Check npm
    $npmVersion = npm --version
    Write-Host "  npm: v$npmVersion" -ForegroundColor Gray
    
    # Check if node_modules exists
    if (Test-Path "node_modules") {
        Write-Host "  Dependencies installed ✓" -ForegroundColor Gray
    } else {
        Write-Host "  ⚠️  Dependencies not installed yet" -ForegroundColor Yellow
        Write-Host "     Run: npm install" -ForegroundColor Yellow
    }
} else {
    Write-Host " ❌" -ForegroundColor Red
    Write-Host "  Not found. Install from: https://nodejs.org/" -ForegroundColor Yellow
}

# Check Git (optional but useful)
Write-Host "`nChecking for Git (optional)..." -NoNewline
$gitAvailable = $null -ne (Get-Command git -ErrorAction SilentlyContinue)
if ($gitAvailable) {
    $gitVersion = git --version
    Write-Host " ✅" -ForegroundColor Green
    Write-Host "  Found: $gitVersion" -ForegroundColor Gray
} else {
    Write-Host " ⚠️  Not found (optional)" -ForegroundColor Yellow
}

# Summary
Write-Host "`n============================`n" -ForegroundColor Cyan

if ($dockerAvailable -or $nodeAvailable) {
    Write-Host "✅ You're ready to run AI Agent!" -ForegroundColor Green
    Write-Host "`nTo start:" -ForegroundColor Cyan
    Write-Host "  .\start.ps1" -ForegroundColor White
    Write-Host "`nOr manually:" -ForegroundColor Cyan
    if ($dockerAvailable) {
        Write-Host "  docker-compose up -d" -ForegroundColor White
    }
    if ($nodeAvailable) {
        Write-Host "  npm install && npm run server" -ForegroundColor White
    }
} else {
    Write-Host "❌ Please install Docker or Node.js to continue" -ForegroundColor Red
    Write-Host "`nOptions:" -ForegroundColor Yellow
    Write-Host "  1. Docker Desktop: https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor White
    Write-Host "  2. Node.js 18+: https://nodejs.org/" -ForegroundColor White
}

Write-Host ""
