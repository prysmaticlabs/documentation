const fs = require('fs');
const path = require('path');

// Source paths (using clean URLs format)
const sourcePath1 = path.join(__dirname, '../build/prysm/docs/404');
const sourcePath2 = path.join(__dirname, '../build/prysm/docs/404/index');

// Target paths in build root
const targetPath1 = path.join(__dirname, '../build/404');
const targetPath2 = path.join(__dirname, '../build/404/index');

// Ensure target directory exists
const targetDir = path.join(__dirname, '../build/404');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy the files
try {
    // Copy both versions to root
    fs.copyFileSync(sourcePath1, targetPath1);
    fs.copyFileSync(sourcePath2, targetPath2);
    console.log('Successfully copied 404 files to build root');
} catch (err) {
    console.error('Error copying 404 files:', err);
    process.exit(1);
}
