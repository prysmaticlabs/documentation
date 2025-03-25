const fs = require('fs');
const path = require('path');

// Paths
const sourceFile = path.join(__dirname, '../build/prysm/docs/404.html');
const targetFile = path.join(__dirname, '../build/404.html');

// Ensure target directory exists
const targetDir = path.dirname(targetFile);
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy the file
try {
    fs.copyFileSync(sourceFile, targetFile);
    console.log('Successfully copied 404.html to build root');
} catch (err) {
    console.error('Error copying 404.html:', err);
    process.exit(1);
}
