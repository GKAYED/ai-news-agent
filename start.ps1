#!/usr/bin/env pwsh
# Quick Start Script for AI Agent
# Run this with: .\start.ps1

Write-Host "🤖 AI Agent - Quick Start" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if Docker is available
$dockerAvailable = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)

if ($dockerAvailable) {
    Write-Host "✅ Docker detected!" -ForegroundColor Green
    Write-Host "`nStarting with Docker...`n" -ForegroundColor Yellow
    
    # Check if docker-compose is available
    $composeAvailable = $null -ne (Get-Command docker-compose -ErrorAction SilentlyContinue)
    
    if ($composeAvailable) {
        Write-Host "Using docker-compose..." -ForegroundColor Gray
        docker-compose up -d
    } else {
        Write-Host "Building Docker image..." -ForegroundColor Gray
        docker build -t ai-agent:latest .
        
        Write-Host "Starting container..." -ForegroundColor Gray
        docker run -d -p 3000:3000 -v ${PWD}/data:/usr/src/app/data --name ai-agent ai-agent:latest
    }
    
    Write-Host "`n✅ AI Agent is running!" -ForegroundColor Green
    Write-Host "🌐 Open your browser to: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "`nTo view logs: docker logs -f ai-agent" -ForegroundColor Gray
    Write-Host "To stop: docker stop ai-agent" -ForegroundColor Gray
    
} else {
    # Check if Node.js is available
    $nodeAvailable = $null -ne (Get-Command node -ErrorAction SilentlyContinue)
    
    if ($nodeAvailable) {
        Write-Host "✅ Node.js detected!" -ForegroundColor Green
        Write-Host "`nStarting with Node.js...`n" -ForegroundColor Yellow
        
        # Check if node_modules exists
        if (-not (Test-Path "node_modules")) {
            Write-Host "Installing dependencies..." -ForegroundColor Gray
            npm install
        }
        
        Write-Host "`nStarting server..." -ForegroundColor Gray
        Write-Host "🌐 Open your browser to: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Gray
        
        npm run server
        
    } else {
        Write-Host "❌ Neither Docker nor Node.js found!" -ForegroundColor Red
        Write-Host "`nPlease install one of the following:" -ForegroundColor Yellow
        Write-Host "  Option 1: Docker Desktop - https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor White
        Write-Host "  Option 2: Node.js 18+ - https://nodejs.org/" -ForegroundColor White
        Write-Host "`nAfter installation, run this script again." -ForegroundColor Yellow
        exit 1
    }
}
