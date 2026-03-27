const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

// Increment version number
const versionRegex = /\?v=(\d+\.\d+\.\d+)/g;
content = content.replace(versionRegex, (match, version) => {
    const parts = version.split('.');
    parts[2] = parseInt(parts[2]) + 1;
    const newVersion = parts.join('.');
    console.log(`Updating version: ${version} -> ${newVersion}`);
    return `?v=${newVersion}`;
});

fs.writeFileSync(indexPath, content, 'utf-8');
console.log("Successfully updated version numbers in index.html");
