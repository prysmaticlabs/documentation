const fs = require('fs');
const path = require('path');

// Paths
const sourceFile = path.join(__dirname, '../build/prysm/docs/404.html');
const targetDir = path.join(__dirname, '../build/prysm/docs/404');
const targetFile = path.join(targetDir, 'index.html');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy the file
try {
    fs.copyFileSync(sourceFile, targetFile);
    console.log('Successfully copied 404.html to /prysm/docs/404/index.html');
} catch (err) {
    console.error('Error copying 404.html:', err);
    process.exit(1);
}
