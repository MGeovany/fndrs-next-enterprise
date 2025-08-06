# How to Use create-fndrs-app

## For Users

### Quick Start

```bash
npm create fndrs-app@latest my-app
```

This will:

1. Ask for your project name (if not provided)
2. Let you choose your package manager (npm, pnpm, yarn)
3. Let you select which features to include
4. Create a new Next.js project with all the selected features
5. Install dependencies (optional)

### Available Options

You can also run with flags:

```bash
# Create with default options (non-interactive)
npm create fndrs-app@latest my-app --yes

# Create with specific name
npm create fndrs-app@latest my-awesome-app
```

### Features You Can Select

- ✅ **TypeScript** - Type safety and better DX
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **ESLint** - Code linting
- ✅ **Prettier** - Code formatting
- ✅ **Jest** - Unit testing
- ✅ **Playwright** - E2E testing
- ✅ **Storybook** - Component development

## For Developers

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/geovanydev/fndrs-next-enterprise.git
   cd fndrs-next-enterprise/create-fndrs-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Test the CLI locally:**

   ```bash
   node test.js
   ```

4. **Test with prompts:**
   ```bash
   node index.js my-test-app
   ```

### Publishing

1. **Update version in package.json**
2. **Run tests:**
   ```bash
   node test.js
   ```
3. **Publish to npm:**
   ```bash
   ./publish.sh
   ```

### Structure

```
create-fndrs-app/
├── index.js          # Main CLI script
├── config.js         # Configuration
├── test.js          # Test script
├── publish.sh       # Publish script
├── package.json     # Package configuration
├── README.md        # Package documentation
├── .npmignore       # Files to exclude from npm
└── USAGE.md         # This file
```

### How It Works

1. **User runs:** `npm create fndrs-app@latest my-app`
2. **npm downloads** the package and runs `index.js`
3. **CLI prompts** user for configuration
4. **CLI copies** template files from parent directory
5. **CLI customizes** files based on user choices
6. **CLI installs** dependencies (optional)
7. **User gets** a ready-to-use Next.js project

### Template Files

The CLI copies these files from the parent directory:

- `app/` - Next.js App Router
- `components/` - Reusable components
- `lib/` - Utility functions
- `styles/` - Global styles
- `public/` - Static assets
- `constants/` - App constants
- Configuration files (next.config.mjs, tailwind.config.js, etc.)

### Customization

The CLI customizes the following:

- **package.json** - Updates name and removes CLI-specific fields
- **README.md** - Replaces project name references
- **Removes** development files (.git, node_modules, etc.)

### Error Handling

The CLI handles:

- ✅ Node.js version validation
- ✅ Package manager availability
- ✅ Directory existence checks
- ✅ File copy errors
- ✅ Dependency installation failures
- ✅ User cancellation (Ctrl+C)

### Testing

Run the test script to verify everything works:

```bash
node test.js
```

This will:

1. Create a test project
2. Verify all essential files exist
3. Check package.json customization
4. Report success/failure
