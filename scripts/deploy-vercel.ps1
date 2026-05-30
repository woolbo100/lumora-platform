$ErrorActionPreference = "Stop"

$globalConfig = Join-Path $env:APPDATA "com.vercel.cli\Data"

if (-not (Test-Path $globalConfig)) {
  Write-Error "Vercel global config not found at $globalConfig"
}

$target = if ($args.Count -gt 0) { $args[0] } else { "preview" }

$vercelArgs = @("--global-config", $globalConfig, "deploy", ".", "-y")

if ($target -eq "production") {
  $vercelArgs += "--prod"
} elseif ($target -ne "preview") {
  Write-Error "Unknown deploy target: $target"
}

Write-Host "Using Vercel global config:" $globalConfig
Write-Host "Deploy target:" $target

& vercel @vercelArgs
