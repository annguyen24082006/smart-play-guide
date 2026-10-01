#!/bin/bash
cd "$(dirname "$0")"
echo "=== Smart Play Guide: tạo file để đẩy lên Netlify ==="
npm install && npm run build || { echo "Có lỗi, hãy chụp màn hình gửi lại."; exit 1; }
rm -f netlify-upload.zip
(cd dist && zip -qr ../netlify-upload.zip .)
echo "XONG! Kéo file netlify-upload.zip vào Netlify (app.netlify.com/drop)."
