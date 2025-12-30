# How to Add This Project to GitHub

## Step 1: Initialize Git Repository
```bash
git init
```

## Step 2: Add All Files (except .env - it's in .gitignore)
```bash
git add .
```

## Step 3: Make Your First Commit
```bash
git commit -m "Initial commit: Weather app with currency and news features"
```

## Step 4: Create a New Repository on GitHub
1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it (e.g., "weather-app")
5. **DO NOT** check "Initialize with README" (you already have files)
6. Click "Create repository"

## Step 5: Connect Your Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 6: Push Your Code
```bash
git branch -M main
git push -u origin main
```

## Important Notes:
- ✅ The `.env` file is already in `.gitignore` - it will NOT be uploaded
- ✅ `node_modules/` is also ignored (too large)
- ⚠️ Make sure you have your API keys in `.env` locally, but they won't be on GitHub
- 📝 You may want to create a `.env.example` file with placeholder values for others to see what environment variables are needed

## Optional: Create .env.example file
Create a file named `.env.example` with:
```
OPENWEATHER_API_KEY=your_openweather_api_key_here
EXCHANGERATE_API_KEY=your_exchangerate_api_key_here
NEWS_API_KEY=your_news_api_key_here
```

This helps others know what environment variables they need without exposing your actual keys.

