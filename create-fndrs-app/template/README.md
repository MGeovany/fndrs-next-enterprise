# Fndrs Next Enterprise Template

Easily scaffold a new project like FNDRS enterprise projects with enterprise-grade features.

## 🚀 Getting Started

### 1. Scaffold a New Project

You can use our CLI to create a new project in seconds:

```sh
# Using npx (recommended)
npx create-fndrs-next@latest

# Or specify a project name
npx create-fndrs-next@latest my-app

# Skip prompts and auto-install dependencies
npx create-fndrs-next@latest my-app --yes

# Using npm
npm i create-fndrs-next
create-fndrs-next my-app

# Using pnpm
pnpm create fndrs-next@latest

# Using yarn
yarn create fndrs-next@latest
```

**Features:**

- ✅ Interactive project setup
- ✅ Node.js version validation (requires >=20.0.0)
- ✅ Multiple package manager support (npm, pnpm, yarn)
- ✅ Clean, colored console interface
- ✅ Comprehensive error handling
- ✅ Automatic dependency installation
- ✅ Non-interactive mode with `--yes` flag

### 2. Start Developing

```sh
cd <your-project-name>
npm run dev
# or
pnpm dev
# or
yarn dev
```

## 🔧 Requirements

- **Node.js**: >=20.0.0
- **Package Manager**: npm, pnpm, or yarn

## 🛠️ Troubleshooting

### Node.js Version Error

If you see an error about Node.js version:

```bash
# Check your version
node --version

# Upgrade Node.js from: https://nodejs.org/
```

### Installation Issues

If dependency installation fails:

```bash
# Try installing manually
cd your-project-name
npm install
```

### Permission Errors

```bash
# On macOS/Linux, try:
sudo npx create-fndrs-next@latest
```

---

## 🛠️ Development (Contributing to the Template)

If you want to improve the template or the CLI:

1. Clone this repository.
2. Make your changes.
3. To test the CLI locally:
   - Run `pnpm install` in the root and in `create-fndrs-app/`.
   - Link the CLI locally:
     ```sh
     cd create-fndrs-app
     pnpm link --global
     ```
   - Now you can run `create-fndrs-app` anywhere on your system.

### Publishing to npm

To publish a new version:

1. Update the version in `package.json`
2. Run `npm publish` (make sure you're logged in to npm)
3. The package will be available as `create-fndrs-next`

---

## License

MIT
