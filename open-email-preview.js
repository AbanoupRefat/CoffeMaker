// This script opens the email preview HTML file in the default browser

import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the absolute path to the email preview HTML file
const emailPreviewPath = path.join(__dirname, 'email-preview.html');

// Check if the file exists
if (!fs.existsSync(emailPreviewPath)) {
  console.error('Error: email-preview.html file not found!');
  process.exit(1);
}

// Determine the command to open the file based on the operating system
let command;
switch (os.platform()) {
  case 'win32':
    command = `start "" "${emailPreviewPath}"`;
    break;
  case 'darwin':
    command = `open "${emailPreviewPath}"`;
    break;
  case 'linux':
    command = `xdg-open "${emailPreviewPath}"`;
    break;
  default:
    console.error('Unsupported operating system');
    process.exit(1);
}

// Execute the command to open the file in the default browser
console.log('Opening email preview in your default browser...');
exec(command, (error) => {
  if (error) {
    console.error(`Error opening email preview: ${error.message}`);
    process.exit(1);
  }
  console.log('Email preview opened successfully!');
});