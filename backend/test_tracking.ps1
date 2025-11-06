# Test Tracking API using PowerShell
$baseUrl = "http://localhost:5000/api/tracking"
$blockchainId = "TID-TEST-$(Get-Random -Maximum 99999)"
$phoneNumber = "+1234567890"

Write-Host "🧪 Testing Tracking APIs...`n" -ForegroundColor Cyan

try {
    # Test 1: Link blockchain ID to phone number
    Write-Host "1️⃣ Testing ID Linking..." -ForegroundColor Yellow
    $linkBody = @{
        blockchainId = $blockchainId
        phoneNumber = $phoneNumber
        touristInfo = @{
            name = "John Doe"
            email = "john@example.com"
            nationality = "US"
        }
        initialLocation = @{
            latitude = 28.6139
            longitude = 77.2090
        }
    } | ConvertTo-Json

    $linkResponse = Invoke-RestMethod -Uri "$baseUrl/link" -Method Post -Body $linkBody -ContentType "application/json"
    Write-Host "✅ Link Response:" $linkResponse.message -ForegroundColor Green
    Write-Host "   Blockchain ID:" $linkResponse.tracking.blockchainId "`n"

    # Test 2: Update location
    Write-Host "2️⃣ Testing Location Update..." -ForegroundColor Yellow
    $locationBody = @{
        blockchainId = $blockchainId
        latitude = 28.6142
        longitude = 77.2095
        accuracy = 10.5
        speed = 1.2
    } | ConvertTo-Json

    $locationResponse = Invoke-RestMethod -Uri "$baseUrl/location" -Method Post -Body $locationBody -ContentType "application/json"
    Write-Host "✅ Location Update:" $locationResponse.message -ForegroundColor Green
    Write-Host "   Timestamp:" $locationResponse.timestamp "`n"

    # Test 3: Get all tourists
    Write-Host "3️⃣ Testing Get Active Tourists..." -ForegroundColor Yellow
    $touristsResponse = Invoke-RestMethod -Uri "$baseUrl/tourists"
    Write-Host "✅ Active Tourists:" $touristsResponse.count -ForegroundColor Green
    $touristsResponse.tourists | ForEach-Object {
        Write-Host "   - $($_.blockchainId) - $($_.phoneNumber)"
    }
    Write-Host ""

    # Test 4: Get tourist details
    Write-Host "4️⃣ Testing Get Tourist Details..." -ForegroundColor Yellow
    $detailsResponse = Invoke-RestMethod -Uri "$baseUrl/tourist/$blockchainId"
    Write-Host "✅ Tourist Details:" -ForegroundColor Green
    Write-Host "   Status:" $detailsResponse.status
    Write-Host "   Location:" $detailsResponse.location.latitude "," $detailsResponse.location.longitude
    Write-Host "   Last Updated:" ([DateTime]$detailsResponse.lastUpdated).ToString("g") "`n"

    # Test 5: Get location history
    Write-Host "5️⃣ Testing Location History..." -ForegroundColor Yellow
    $historyResponse = Invoke-RestMethod -Uri "$baseUrl/history/${blockchainId}?limit=10"
    Write-Host "✅ Location History:" $historyResponse.count "records" -ForegroundColor Green
    $historyResponse.history | Select-Object -First 3 | ForEach-Object {
        Write-Host "   - $($_.latitude), $($_.longitude) - $([DateTime]$_.recordedAt)"
    }
    Write-Host ""

    # Test 6: Return ID card
    Write-Host "6️⃣ Testing Card Return..." -ForegroundColor Yellow
    $returnBody = @{
        blockchainId = $blockchainId
    } | ConvertTo-Json

    $returnResponse = Invoke-RestMethod -Uri "$baseUrl/return" -Method Post -Body $returnBody -ContentType "application/json"
    Write-Host "✅ Card Return:" $returnResponse.message -ForegroundColor Green
    Write-Host "   Status:" $returnResponse.status
    Write-Host "   Returned At:" $returnResponse.returnedAt "`n"

    Write-Host "🎉 All tracking API tests passed!`n" -ForegroundColor Green

} catch {
    Write-Host "❌ Test failed:" $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response:" $responseBody
    }
}
