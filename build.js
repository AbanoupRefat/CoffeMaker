import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Run the build command
console.log('Building the React application...');
execSync('npm run build', { stdio: 'inherit' });

// Define the paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

// Create the _redirects file for Netlify
console.log('Creating _redirects file for Netlify...');
fs.writeFileSync(path.join(distPath, '_redirects'), '/* /index.html 200');

// Create the .htaccess file for Apache
console.log('Creating .htaccess file for Apache...');
fs.writeFileSync(
  path.join(distPath, '.htaccess'),
  `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>`
);

// Create the web.config file for IIS
console.log('Creating web.config file for IIS...');
fs.writeFileSync(
  path.join(distPath, 'web.config'),
  `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>`
);

// Create the 404.html file for GitHub Pages
console.log('Creating 404.html file for GitHub Pages...');
fs.writeFileSync(
  path.join(distPath, '404.html'),
  `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CoffeMaker</title>
  <script>
    // Single Page Apps for GitHub Pages
    var pathSegmentsToKeep = 0;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
</body>
</html>`
);

console.log('Build process completed successfully!');
console.log('The application is ready to be deployed with proper routing configuration.');