# Deployment Guide for React App to GitHub Pages

## Prerequisites
- Node.js and npm installed
- Git installed and configured
- GitHub account

## 1. Initial Setup

### 1.1 Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 1.2 Update package.json
Add these scripts and homepage field:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/REPOSITORY_NAME",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 2. Secure Deployment Methods

### 2.1 Using Environment Variables (Recommended)
1. Create a `.env` file (add to .gitignore):
   ```
   REACT_APP_GH_TOKEN=your_github_token_here
   ```

2. Update package.json:
   ```json
   "deploy": "cross-env GH_TOKEN=$REACT_APP_GH_TOKEN gh-pages -d build"
   ```

### 2.2 Using GitHub Actions (Most Secure)
1. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: dist
             token: ${{ secrets.GITHUB_TOKEN }}
             branch: gh-pages
   ```

## 3. Manual Deployment (For Quick Testing)

### 3.1 Build the App
```bash
npm run build
```

### 3.2 Deploy
```bash
npx gh-pages -d dist -r https://YOUR_TOKEN@github.com/username/repo.git -b gh-pages
```

## 4. Security Best Practices

1. **Never commit tokens** to version control
2. **Use environment variables** for sensitive data
3. **Revoke exposed tokens** immediately
4. **Use GitHub Secrets** for CI/CD workflows
5. **Limit token permissions** to only what's necessary

## 5. Troubleshooting

### Deployment Fails with Authentication Error
1. Verify token has correct permissions (repo, workflow)
2. Check token expiration
3. Ensure repository URL is correct

### Changes Not Showing Up
1. Clear browser cache
2. Wait a few minutes for GitHub Pages to update
3. Check GitHub repository settings → Pages for build status

## 6. Updating Your Site
1. Make your changes
2. Commit and push to main branch
3. Run: `npm run deploy`

---

**Important**: Always keep your tokens secure and never share them publicly.
