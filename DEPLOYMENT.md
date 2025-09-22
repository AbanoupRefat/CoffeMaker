# CoffeMaker Deployment Guide

## Fixing 404 Errors on Page Refresh

When deploying a React application with client-side routing (using React Router), you may encounter 404 errors when refreshing pages other than the home page. This happens because the server is looking for a file that doesn't exist at that path.

This guide provides solutions for different hosting environments.

## Deployment Instructions

### 1. Build the Application with Routing Configuration

Use our custom build script that automatically adds the necessary configuration files:

```bash
npm run build:deploy
```

This script will:
- Build your React application
- Create configuration files for various hosting platforms
- Ensure proper routing for client-side navigation

### 2. Deploy to Your Hosting Provider

Depending on your hosting provider, the build process has already created the necessary configuration files:

#### Netlify
- A `_redirects` file has been created in the `dist` folder
- This file tells Netlify to redirect all routes to index.html

#### Apache Server
- A `.htaccess` file has been created in the `dist` folder
- This file configures URL rewriting for client-side routing

#### IIS (Windows Server)
- A `web.config` file has been created in the `dist` folder
- This file configures URL rewriting for IIS

#### GitHub Pages or other static hosts
- A `404.html` file has been created that handles redirects
- The `index.html` file includes a script to handle the redirect logic

### 3. Verify Deployment

After deploying, test your application by:
1. Navigating to different routes
2. Refreshing the page on various routes
3. Directly accessing routes via URL

## Manual Configuration (if needed)

If you need to manually configure your hosting environment:

### Netlify
Create a `_redirects` file with:
```
/* /index.html 200
```

### Apache
Create a `.htaccess` file with:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

### IIS
Create a `web.config` file with:
```xml
<?xml version="1.0" encoding="UTF-8"?>
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
</configuration>
```

## Troubleshooting

If you still encounter 404 errors:

1. Verify that your hosting provider supports URL rewriting
2. Check that the configuration files are properly deployed
3. Ensure your `base` path in `vite.config.js` is set to `/`
4. Contact your hosting provider for specific configuration requirements