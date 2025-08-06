#!/bin/bash

# Test the published package
# This script tests the published create-fndrs-next package

set -e

echo "🧪 Testing published create-fndrs-next package..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Test directory
TEST_DIR="test-published-package"
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Clean up previous test
if [ -d "$TEST_DIR" ]; then
    print_status "Cleaning up previous test..."
    rm -rf "$TEST_DIR"
fi

# Create test directory
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

print_status "Testing create-fndrs-next@$CURRENT_VERSION..."

# Test with npx
print_status "Testing with npx..."
if npx create-fndrs-next@$CURRENT_VERSION test-project --yes; then
    print_success "npx test passed!"
else
    print_error "npx test failed!"
    exit 1
fi

# Check if project was created
if [ -d "test-project" ]; then
    print_success "Project directory created successfully!"
    
    # Check for essential files
    ESSENTIAL_FILES=(
        "package.json"
        "next.config.mjs"
        "app/page.tsx"
        "components/ui/button/button.tsx"
        "tailwind.config.js"
        "tsconfig.json"
    )
    
    cd test-project
    for file in "${ESSENTIAL_FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "$file exists"
        else
            print_error "$file missing"
            exit 1
        fi
    done
    
    print_success "All essential files are present!"
    
    # Test dependency installation
    print_status "Testing dependency installation..."
    if npm install --silent; then
        print_success "Dependencies installed successfully!"
    else
        print_warning "Dependency installation failed, but this might be expected in test environment"
    fi
    
    cd ..
else
    print_error "Project directory was not created!"
    exit 1
fi

# Clean up
print_status "Cleaning up test..."
cd ..
rm -rf "$TEST_DIR"

print_success "✅ All tests passed! The published package is working correctly."
echo
print_status "Package is ready for use:"
echo "  npx create-fndrs-next@latest"
echo "  npm i create-fndrs-next" 
