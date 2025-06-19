const fs = require('fs');
const path = require('path');

function copyRecursive(src, dest) {
    // Create destination directory
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    // Read source directory
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Source and target paths
const source404Dir = path.join(__dirname, '../build/prysm/docs/404');
const target404Dir = path.join(__dirname, '../build/404');

try {
    // Copy the entire 404 directory structure
    copyRecursive(source404Dir, target404Dir);
    console.log('Successfully copied 404 directory to build root');
} catch (err) {
    console.error('Error copying 404 directory:', err);
    process.exit(1);
}
