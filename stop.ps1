#!/usr/bin/env pwsh
# Stop Script for AI Agent

Write-Host "🛑 Stopping AI Agent..." -ForegroundColor Yellow

$dockerAvailable = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)

if ($dockerAvailable) {
    # Check if using docker-compose
    if (Test-Path "docker-compose.yml") {
        docker-compose down
        Write-Host "✅ Docker Compose stopped" -ForegroundColor Green
    }
    
    # Stop named container if exists
    $container = docker ps -q -f name=ai-agent
    if ($container) {
        docker stop ai-agent
        docker rm ai-agent
        Write-Host "✅ Container stopped and removed" -ForegroundColor Green
    }
} else {
    Write-Host "Docker not found. If running with Node.js, press Ctrl+C in the terminal window." -ForegroundColor Yellow
}

Write-Host "`n✅ AI Agent stopped" -ForegroundColor Green
