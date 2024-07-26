echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r  dist/* root@188.166.208.107:/var/www/html/
echo "Done!"