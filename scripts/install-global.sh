#!/bin/bash

# Install CLI globally for testing
# This script installs the CLI globally for testing purposes

set -e

echo "🔧 Installing create-fndrs-next CLI globally for testing..."

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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Uninstall previous version if exists
print_status "Uninstalling previous version..."
npm uninstall -g create-fndrs-next 2>/dev/null || true

# Install globally
print_status "Installing CLI globally..."
npm install -g .

if [ $? -eq 0 ]; then
    print_success "CLI installed successfully!"
    
    # Test the CLI
    print_status "Testing CLI..."
    if command -v create-fndrs-next &> /dev/null; then
        print_success "CLI is available globally!"
        
        # Show usage
        echo
        print_status "You can now use:"
        echo "  create-fndrs-next my-project"
        echo "  create-fndrs-next my-project --yes"
        echo
        print_status "Or test with npx:"
        echo "  npx create-fndrs-next@latest my-project"
        
    else
        print_error "CLI not found in PATH"
        exit 1
    fi
else
    print_error "Failed to install CLI globally"
    exit 1
fi

# Test with a sample project
read -p "Would you like to test the CLI with a sample project? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Creating test project..."
    create-fndrs-next test-project --yes
    
    if [ -d "test-project" ]; then
        print_success "Test project created successfully!"
        print_status "Cleaning up test project..."
        rm -rf test-project
        print_success "Test completed!"
    else
        print_error "Test project creation failed"
    fi
fi 
