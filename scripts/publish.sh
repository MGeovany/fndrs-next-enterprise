#!/bin/bash

# FNDRS Next.js Enterprise - Publish Script
# This script publishes the package to npm

set -e

echo "🚀 Publishing FNDRS Next.js Enterprise to npm..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if we're logged into npm
print_status "Checking npm authentication..."
if ! npm whoami &> /dev/null; then
    print_error "Not logged into npm. Please run 'npm login' first."
    exit 1
fi

print_success "Logged into npm as $(npm whoami)"

# Check if there are uncommitted changes
print_status "Checking for uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "There are uncommitted changes. Consider committing them first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Publishing cancelled."
        exit 1
    fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_status "Current version: $CURRENT_VERSION"

# Check if version already exists on npm
print_status "Checking if version already exists on npm..."
if npm view create-fndrs-next@$CURRENT_VERSION version &> /dev/null; then
    print_error "Version $CURRENT_VERSION already exists on npm."
    print_status "Please update the version in package.json before publishing."
    exit 1
fi

print_success "Version $CURRENT_VERSION is available for publishing"

# Test the CLI locally
print_status "Testing CLI locally..."
if ! node create-fndrs-app/test.js &> /dev/null; then
    print_warning "CLI test failed, but continuing..."
fi

# Build the package (if needed)
print_status "Preparing package for publication..."

# Check if all required files exist
REQUIRED_FILES=(
    "create-fndrs-app/index.js"
    "create-fndrs-app/config.js"
    "create-fndrs-app/package.json"
    "app/page.tsx"
    "components/ui/button/button.tsx"
    "next.config.mjs"
    "tailwind.config.js"
    "tsconfig.json"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Required file missing: $file"
        exit 1
    fi
done

print_success "All required files are present"

# Show what will be published
print_status "Files that will be published:"
npm pack --dry-run | grep -E "^(npm notice|create-fndrs-next)"

# Confirm before publishing
echo
read -p "Ready to publish version $CURRENT_VERSION to npm? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Publishing cancelled."
    exit 1
fi

# Publish to npm
print_status "Publishing to npm..."
if npm publish; then
    print_success "Successfully published create-fndrs-next@$CURRENT_VERSION to npm!"
    echo
    print_status "Package is now available at:"
    echo "  https://www.npmjs.com/package/create-fndrs-next"
    echo
    print_status "Users can now create projects with:"
    echo "  npx create-fndrs-next@latest"
    echo "  npm i create-fndrs-next"
    echo
    print_status "Next steps:"
    echo "  1. Create a GitHub release for v$CURRENT_VERSION"
    echo "  2. Update documentation if needed"
    echo "  3. Test the published package: npx create-fndrs-next@latest test-project"
else
    print_error "Failed to publish to npm."
    exit 1
fi 
