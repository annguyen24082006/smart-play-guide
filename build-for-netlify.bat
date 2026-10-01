@echo off
chcp 65001 >nul
echo === Smart Play Guide: tao file de day len Netlify ===
call npm install || goto :err
call npm run build || goto :err
if exist netlify-upload.zip del netlify-upload.zip
powershell -NoProfile -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'netlify-upload.zip' -Force" || goto :err
echo.
echo XONG! Keo file netlify-upload.zip vao Netlify (app.netlify.com/drop).
pause
exit /b 0
:err
echo Co loi xay ra. Hay chup man hinh gui lai cho tro ly.
pause
exit /b 1
