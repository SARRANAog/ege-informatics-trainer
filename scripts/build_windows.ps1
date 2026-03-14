Write-Host "===> Building frontend"
Push-Location frontend
npm install
npm run build
Pop-Location

Write-Host "===> Installing Python dependencies"
python -m pip install -r requirements.txt
python -m pip install pyinstaller

Write-Host "===> Building desktop app"
pyinstaller desktop\packaging\app.spec
