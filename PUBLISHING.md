# Publishing Guide

This guide explains how to publish the `create-fndrs-next` package to npm.

## Prerequisites

1. **npm Account**: Make sure you have an npm account and are logged in
2. **Node.js**: Version 20.0.0 or higher
3. **Git**: For version control

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

### 2. Update Version

Update the version in `package.json`:

```json
{
  "version": "1.1.0"
}
```

### 3. Test Locally

Test the CLI before publishing:

```bash
# Test the CLI
node create-fndrs-app/test.js

# Test the demo
node create-fndrs-app/demo.js
```

### 4. Publish to npm

Use the automated publish script:

```bash
./scripts/publish.sh
```

Or publish manually:

```bash
npm publish
```

### 5. Verify Publication

Test the published package:

```bash
./scripts/test-published.sh
```

## Package Structure

The published package includes:

```
create-fndrs-next/
├── create-fndrs-app/
│   ├── index.js          # Main CLI script
│   ├── config.js         # Configuration
│   └── package.json      # CLI dependencies
├── app/                  # Next.js app directory
├── components/           # UI components
├── lib/                  # Utility functions
├── styles/               # Global styles
├── public/               # Static assets
├── next.config.mjs       # Next.js config
├── tailwind.config.js    # Tailwind config
├── tsconfig.json         # TypeScript config
└── package.json          # Template dependencies
```

## Usage After Publishing

Users can create projects with:

```bash
# Using npx (recommended)
npx create-fndrs-next@latest

# With project name
npx create-fndrs-next@latest my-app

# Using npm
npm i create-fndrs-next
create-fndrs-next my-app

# Using pnpm
pnpm create fndrs-next@latest
```

## Version Management

### Semantic Versioning

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Update Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit changes
4. Run publish script
5. Create GitHub release

## Troubleshooting

### Version Already Exists

If you get an error about version already existing:

```bash
# Check current version on npm
npm view create-fndrs-next version

# Update version in package.json
# Then publish again
```

### Authentication Issues

```bash
# Re-login to npm
npm logout
npm login
```

### Package Size Issues

Check what files are being included:

```bash
npm pack --dry-run
```

## Best Practices

1. **Always test locally** before publishing
2. **Use semantic versioning** for releases
3. **Update documentation** with new features
4. **Test the published package** after release
5. **Create GitHub releases** for major versions

## Package.json Configuration

Key fields for the npm package:

```json
{
  "name": "create-fndrs-next",
  "version": "1.1.0",
  "private": false,
  "bin": {
    "create-fndrs-next": "./create-fndrs-app/index.js"
  },
  "files": [
    "create-fndrs-app/index.js",
    "create-fndrs-app/config.js",
    "app/",
    "components/",
    "lib/",
    "styles/",
    "public/",
    "*.config.*",
    "*.json"
  ],
  "engines": {
    "node": ">=20.0.0"
  }
}
```

## Support

For issues with publishing:

1. Check npm status: https://status.npmjs.org/
2. Verify package.json configuration
3. Test with `npm pack --dry-run`
4. Check file permissions and .npmignore
