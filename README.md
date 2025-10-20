![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![npm version](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![npm version](https://img.shields.io/github/followers/suvink.svg?style=social&label=Follow&maxAge=2592000)

<p align="center">
  <img src="./img/lmr-logo-white.png" alt="Logo" width="300">

  <h3 align="center">Let Me React v2.0.0</h3>

  <p align="center">
    A Simple ReactJS Boilerplate :)
    <br />
    <a href="https://github.com/Suvink/let-me-react">View Repo</a>
    ·
    <a href="https://github.com/Suvink/let-me-react/issues">Report Bug</a>
    ·
    <a href="https://github.com/Suvink/let-me-react/issues">Request Feature</a>
  </p>
</p>

## About

Write your React App easily with Let Me React! This modern boilerplate comes with Vite for lightning-fast development, along with useful packages like `react-router-dom`, `Axios`, `SweetAlert2`, and more pre-configured so that you can dive into writing your code without having to worry about setting up the project.

## What's New in v2.0.0

- 🚀 **Vite Integration**: Lightning-fast development with Vite instead of Create React App
- 📝 **TypeScript Support**: Choose between JavaScript or TypeScript for your project
- 📦 **Package Manager Choice**: Support for both npm and yarn
- 🎨 **Enhanced UI**: Beautiful animated CLI experience
- ⚡ **Faster Build Times**: Leveraging Vite's superior performance

## Prerequisites

This project requires NodeJS (version 20.19 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine, try running the following command.

```sh
$ npm -v && node -v
10.2.4
v20.19.0
```

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

```sh
npm install -g let-me-react
```

After installation, you can use the following command to initialize your project:

```sh
let-me-react myproject
```

Alternatively, you can use `npx` to directly use `let-me-react` without installing globally:

```sh
npx let-me-react myproject
```

### Command Syntax

```sh
let-me-react <project-name> [language] [options]
```

**Arguments:**
- `<project-name>` (required): Name of the React project to create
- `[language]` (optional): Programming language - `javascript` or `typescript` (defaults to `javascript`)

**Options:**
- `--yarn`: Use yarn as package manager
- `--npm`: Use npm as package manager (default)

### Examples

Create a JavaScript project with npm:
```sh
let-me-react my-app javascript --npm
```

Create a TypeScript project with yarn:
```sh
let-me-react my-app typescript --yarn
```

Simple JavaScript project (using defaults):
```sh
let-me-react my-app
```

Alternatively, you can use `npx` to directly use `let-me-react` without installing globally:

```sh
npx let-me-react myproject
```

## Usage
After initializing your project, you can use the following scripts.

### Serving the app

```sh
npm run dev
```
Runs the app in development mode with Vite. Open http://localhost:5173 to view it in the browser. The page will hot reload as you make edits with lightning-fast HMR (Hot Module Replacement).

### Running the tests

```sh
npm test
```
Launches the test runner. See the Vite testing documentation for more information.

### Building a distribution version

```sh
npm run build
```

Builds the app for production using Vite's optimized build process. Files are saved to the `dist` folder. The build is minified and optimized for the best performance.

### Preview the production build

```sh
npm run preview
```

Serves the production build locally for testing before deployment.

## Pre-Configured Plugins & Libraries

- 🎨 **[Bulma CSS](http://bulma.io/)**: A modern CSS framework based on Flexbox with beautiful components
- 🍭 **[SweetAlert2](https://sweetalert2.github.io/)**: Beautiful, responsive, customizable popup boxes
- 🌐 **[Axios](https://axios-http.com/docs/intro)**: Promise-based HTTP client for making API requests
- 📢 **[Notistack](https://www.iamhosseindhv.com/notistack)**: Highly customizable notification snackbars
- 🧭 **[React Router](https://reactrouter.com/)**: Declarative routing for React applications
- 🎭 **[FontAwesome](https://fontawesome.com/)**: Vector icons and social logos (all icon sets included)
- 🎬 **[Animate.css](https://animate.style/)**: Cross-browser CSS animations
- 📜 **[AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)**: Smooth scroll animations

## Project Structure

Your generated project will have the following structure:

```
my-app/
├── public/
├── src/
│   ├── components/
│   │   └── NavBar/
│   │       ├── index.jsx (or .tsx)
│   │       └── style.css
│   ├── screens/
│   │   ├── HomePage/
│   │   ├── AboutPage/
│   │   └── LoginPage/
│   ├── App.jsx (or .tsx)
│   ├── main.jsx (or .tsx)
│   └── index.css
├── package.json
└── vite.config.js
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Donations
<a href="https://www.buymeacoffee.com/suvink" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 30px !important;width: 108px !important;" height="30"></a>

## License
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) © Suvin Kodituwakku

## Contact

Suvin Nimnaka - [@tikirimaarie](https://twitter.com/tikirimaarie) - hello@suvin.me
Project Link: [https://github.com/Suvink/let-me-react](https://github.com/Suvink/let-me-react)

