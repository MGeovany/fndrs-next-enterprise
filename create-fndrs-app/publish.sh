#!/bin/bash

# Publish script for create-fndrs-app

set -e

echo "🚀 Publishing create-fndrs-app to npm..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the create-fndrs-app directory."
    exit 1
fi

# Check if npm is logged in
if ! npm whoami &> /dev/null; then
    echo "❌ Error: You must be logged in to npm. Run 'npm login' first."
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: Git working directory is not clean. Commit your changes first."
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
node test.js

# Build and publish
echo "📦 Publishing to npm..."
npm publish

echo "✅ Successfully published create-fndrs-app to npm!"
echo "📦 Package: https://www.npmjs.com/package/create-fndrs-app"
echo ""
echo "🎉 Users can now run:"
echo "  npm create fndrs-app@latest my-app" 
