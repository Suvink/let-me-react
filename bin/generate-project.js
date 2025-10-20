#!/usr/bin/env node

/**
 * @file generate-project.js
 * @description CLI tool for generating React projects with Vite.
 * @version 2.0.0
 * @license Apache-2.0
 *
 * Copyright 2025 Suvin Kodituwakku
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { Command } = require("commander");
const chalk = require("chalk");
const chalkAnimation = require("chalk-animation");
const figlet = require("figlet");
const ora = require("ora");
const fs = require("fs-extra");
const path = require("path");
const { execSync, spawn } = require("child_process");
const os = require("os");

const REPO_URL = "https://github.com/Suvink/let-me-react.git";
const TEMP_DIR = path.join(os.tmpdir(), "lmr-temp-" + Date.now());
const REQUIRED_NODE_MAJOR = 20;
const REQUIRED_NODE_MINOR = 19;

class LMRGenerator {
    constructor() {
        this.program = new Command();
        this.setupCommands();
    }

    setupCommands() {
        this.program
            .name("lmr")
            .description("Let Me React - Because you’ve got better things to do than setting up!")
            .version("2.0.0")
            .argument("<project-name>", "Name of the React project to create")
            .argument("[language]", "Programming language (javascript|typescript)", "javascript")
            .option("--yarn", "Use yarn as package manager")
            .option("--npm", "Use npm as package manager")
            .action((projectName, language, options) => {
                this.generate(projectName, language, options);
            });
    }

    async showAnimatedTitle() {
        return new Promise((resolve) => {
            const title = figlet.textSync("Let Me React", {
                font: "Big",
                horizontalLayout: "default",
                verticalLayout: "default",
            });

            console.log("\n");
            const rainbow = chalkAnimation.rainbow(title);

            setTimeout(() => {
                rainbow.stop();
                console.log(chalk.magenta.bold("\n                      Made with ❤️ by Suvink\n"));

                const karaoke = chalkAnimation.karaoke("        You’ve got better things to do than setting up!");
                setTimeout(() => {
                    karaoke.stop();
                    console.log("\n");
                    resolve();
                }, 4000);
            }, 2000);
        });
    }

    checkNodeVersion() {
        const nodeVersion = process.version.slice(1);
        const [major, minor] = nodeVersion.split(".").map(Number);

        console.log(chalk.blue("ℹ️  ") + `Checking Node.js version: v${nodeVersion}`);

        if (major < REQUIRED_NODE_MAJOR || (major === REQUIRED_NODE_MAJOR && minor < REQUIRED_NODE_MINOR)) {
            console.log(chalk.red("❌ Error: ") + `Node.js version v${nodeVersion} is not supported`);
            console.log(
                chalk.red(`Vite requires Node.js version ${REQUIRED_NODE_MAJOR}.${REQUIRED_NODE_MINOR}+ or 22.12+`)
            );
            console.log(chalk.blue("ℹ️  ") + "Please upgrade your Node.js version:");
            console.log(`  • Visit: ${chalk.cyan("https://nodejs.org")}`);
            console.log(`  • Or use nvm: ${chalk.cyan("nvm install node")}`);
            console.log(`  • Or use brew: ${chalk.cyan("brew install node")}`);
            process.exit(1);
        }

        console.log(chalk.green("✅ ") + `Node.js version v${nodeVersion} is compatible\n`);
    }

    validateArguments(projectName, language, packageManager) {
        // Validate project name
        if (!projectName || projectName.trim() === "") {
            console.log(chalk.red("❌ Error: ") + "Project name is required");
            this.program.help();
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
            console.log(
                chalk.red("❌ Error: ") + "Project name can only contain letters, numbers, hyphens, and underscores"
            );
            process.exit(1);
        }

        if (fs.existsSync(projectName)) {
            console.log(chalk.red("❌ Error: ") + `Directory '${projectName}' already exists in the current path`);
            console.log(chalk.blue("ℹ️  ") + "Please choose a different project name or remove the existing directory");
            process.exit(1);
        }

        // Validate language
        if (!["javascript", "typescript"].includes(language)) {
            console.log(
                chalk.red("❌ Error: ") + `Invalid language '${language}'. Supported languages: javascript, typescript`
            );
            process.exit(1);
        }

        // Check package manager availability
        if (packageManager === "yarn") {
            try {
                execSync("yarn --version", { stdio: "ignore" });
            } catch (error) {
                console.log(chalk.red("❌ Error: ") + "Yarn is not installed");
                console.log(chalk.blue("ℹ️  ") + "To install yarn: npm install -g yarn");
                process.exit(1);
            }
        }
    }

    async cloneRepository() {
        const spinner = ora({
            text: "Cloning repository templates...",
            spinner: "aesthetic",
        }).start();

        try {
            execSync(`git clone ${REPO_URL} ${TEMP_DIR}`, { stdio: "ignore" });
            spinner.succeed("Repository templates downloaded");
            console.log("");
        } catch (error) {
            spinner.fail("Failed to clone repository");
            console.log(chalk.red("❌ Error: ") + "Could not download project templates");
            process.exit(1);
        }
    }

    async createViteApp(projectName, language) {
        const template = language === "typescript" ? "react-ts" : "react";

        console.log(chalk.blue("ℹ️  ") + "Scaffolding project, so පොඩ්ඩක් ඉඳපන්...");

        const spinner = ora({
            text: "Creating Vite React project...",
            spinner: "aesthetic",
        }).start();

        try {
            // Use child_process spawn for better control
            const child = spawn("npx", ["create-vite@latest", projectName, "--template", template], {
                stdio: ["pipe", "pipe", "pipe"],
            });

            // Auto-respond to prompts
            child.stdin.write("y\n"); // Ok to proceed
            child.stdin.write("n\n"); // Use rolldown-vite (No)
            child.stdin.write("n\n"); // Install with npm and start now (No)
            child.stdin.end();

            await new Promise((resolve, reject) => {
                child.on("close", (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error(`Vite creation failed with code ${code}`));
                    }
                });
            });

            if (!fs.existsSync(projectName)) {
                throw new Error("Project directory was not created");
            }

            spinner.succeed("Project scaffolded successfully");
            console.log("");
        } catch (error) {
            spinner.fail("Failed to create Vite project");
            console.log(chalk.red("❌ Error: ") + error.message);
            process.exit(1);
        }
    }

    async installDependencies(projectName, packageManager) {
        process.chdir(projectName);

        // Install base packages
        const baseSpinner = ora({
            text: `Installing base packages with ${packageManager}...`,
            spinner: "aesthetic",
        }).start();

        try {
            if (packageManager === "yarn") {
                if (fs.existsSync("package-lock.json")) {
                    fs.removeSync("package-lock.json");
                }

                await new Promise((resolve, reject) => {
                    const child = spawn("yarn", ["install"], {
                        stdio: "pipe",
                        shell: true,
                    });

                    child.on("close", (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`yarn install failed with code ${code}`));
                        }
                    });

                    child.on("error", reject);
                });
            } else {
                await new Promise((resolve, reject) => {
                    const child = spawn("npm", ["install"], {
                        stdio: "pipe",
                        shell: true,
                    });

                    child.on("close", (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`npm install failed with code ${code}`));
                        }
                    });

                    child.on("error", reject);
                });
            }

            baseSpinner.succeed("Base packages installed");
            console.log("");
        } catch (error) {
            baseSpinner.fail("Failed to install base packages");
            console.log(chalk.red("❌ Error: ") + error.message);
            process.exit(1);
        }

        // Install additional dependencies
        const depsSpinner = ora({
            text: "Installing additional dependencies...",
            spinner: "aesthetic",
        }).start();

        const deps = [
            "bulma",
            "react-router",
            "@fortawesome/react-fontawesome@latest",
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/free-regular-svg-icons",
            "@fortawesome/free-brands-svg-icons",
            "axios",
            "notistack",
            "sweetalert2",
            "animate.css",
            "aos",
        ];

        try {
            if (packageManager === "yarn") {
                await new Promise((resolve, reject) => {
                    const child = spawn("yarn", ["add", ...deps], {
                        stdio: "pipe",
                        shell: true,
                    });

                    child.on("close", (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`yarn add failed with code ${code}`));
                        }
                    });

                    child.on("error", reject);
                });
            } else {
                await new Promise((resolve, reject) => {
                    const child = spawn("npm", ["install", ...deps], {
                        stdio: "pipe",
                        shell: true,
                    });

                    child.on("close", (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`npm install failed with code ${code}`));
                        }
                    });

                    child.on("error", reject);
                });
            }

            depsSpinner.succeed("All dependencies installed successfully");
            console.log("");
        } catch (error) {
            depsSpinner.fail("Failed to install additional dependencies");
            console.log(chalk.red("❌ Error: ") + error.message);
            process.exit(1);
        }
    }

    async setupProjectStructure(language) {
        const spinner = ora({
            text: "Setting up project structure...",
            spinner: "aesthetic",
        }).start();

        try {
            // Create directories
            const dirs = [
                "src/components/NavBar",
                "src/screens",
                "src/screens/HomePage",
                "src/screens/AboutPage",
                "src/screens/LoginPage",
            ];

            dirs.forEach((dir) => {
                fs.ensureDirSync(dir);
            });

            spinner.succeed("Project structure created");
            console.log("");
        } catch (error) {
            spinner.fail("Failed to create project structure");
            process.exit(1);
        }
    }

    async createComponents(language) {
        const spinner = ora({
            text: "Creating components and navbar...",
            spinner: "aesthetic",
        }).start();

        try {
            const ext = language === "typescript" ? "tsx" : "jsx";
            const templatesDir = path.join(TEMP_DIR, "templates");

            // Create screen components
            const screens = ["HomePage", "AboutPage", "LoginPage"];
            const screenTemplate = fs.readFileSync(path.join(templatesDir, "screens", `ScreenTemplate.${ext}`), "utf8");

            screens.forEach((screen) => {
                const screenDir = `src/screens/${screen}`;
                const content = screenTemplate.replace(/{{ \.SCREEN_NAME }}/g, screen);

                fs.writeFileSync(path.join(screenDir, `index.${ext}`), content);
                fs.writeFileSync(path.join(screenDir, "style.css"), "");
            });

            // Create navbar component
            const navbarTemplate = fs.readFileSync(path.join(templatesDir, "navbar", `NavBarTemplate.${ext}`), "utf8");

            fs.writeFileSync(`src/components/NavBar/index.${ext}`, navbarTemplate);
            fs.writeFileSync("src/components/NavBar/style.css", "");

            spinner.succeed("Components and navbar created successfully");
            console.log("");
        } catch (error) {
            spinner.fail("Failed to create components");
            console.log(chalk.red("❌ Error: ") + error.message);
            process.exit(1);
        }
    }

    async updateProjectFiles(language) {
        const spinner = ora({
            text: "Updating project files...",
            spinner: "aesthetic",
        }).start();

        try {
            const ext = language === "typescript" ? "tsx" : "jsx";
            const templatesDir = path.join(TEMP_DIR, "templates");

            // Remove App.css
            if (fs.existsSync("src/App.css")) {
                fs.removeSync("src/App.css");
            }

            // Update App component to add routing
            const appTemplate = path.join(templatesDir, "app", `AppTemplate.${ext}`);
            if (fs.existsSync(appTemplate)) {
                fs.copySync(appTemplate, `src/App.${ext}`);
            }

            // Update index.css
            const indexCss = path.join(templatesDir, "main", "index.css");
            if (fs.existsSync(indexCss)) {
                fs.copySync(indexCss, "src/index.css");
            }

            // Update main file to add NavBar and Notistack
            const mainTemplate = path.join(templatesDir, "main", "main.jsx");
            if (fs.existsSync(mainTemplate)) {
                fs.copySync(mainTemplate, `src/main.${ext}`);
            }

            // Update index.html to set light theme in Bulma
            if (fs.existsSync("index.html")) {
                let content = fs.readFileSync("index.html", "utf8");
                content = content.replace('<html lang="en">', '<html lang="en" data-theme="light">');
                fs.writeFileSync("index.html", content);
            }

            spinner.succeed("Project files updated successfully");
            console.log("");
        } catch (error) {
            spinner.fail("Failed to update project files");
            process.exit(1);
        }
    }

    async initializeGitRepository() {
        const spinner = ora({
            text: "Initializing git repository...",
            spinner: "aesthetic",
        }).start();

        try {
            execSync("git --version", { stdio: "ignore" });
            execSync("git init", { stdio: "ignore" });
            execSync("git add .", { stdio: "ignore" });
            execSync('git commit -m "Initial commit"', { stdio: "ignore" });

            spinner.succeed("Git repository initialized with initial commit");
            console.log("");
        } catch (error) {
            spinner.fail("Failed to initialize git repository");
            console.log(chalk.yellow("⚠️  Warning: ") + "Git is not available or failed to initialize");
            console.log(chalk.blue("ℹ️  ") + "You can manually run 'git init' in your project directory");
            console.log("");
        }
    }

    cleanup() {
        // Remove temporary directory
        if (fs.existsSync(TEMP_DIR)) {
            fs.removeSync(TEMP_DIR);
        }
    }

    async showCompletion(projectName, packageManager) {
        console.log("\n");
        console.log(chalk.green("╔════════════════════════════════════════════════════════════════╗"));
        console.log(chalk.green("║                                                                ║"));
        console.log(chalk.green("║                        🎉 SUCCESS! 🎉                           ║"));
        console.log(chalk.green("║                                                                ║"));
        console.log(chalk.green("║              Your React project is ready to go!                ║"));
        console.log(chalk.green("║                                                                ║"));
        console.log(chalk.green("╚════════════════════════════════════════════════════════════════╝"));
        console.log("\n");

        console.log(chalk.blue("ℹ️  ") + "Next steps:");
        console.log(`  ${chalk.cyan("1.")} cd ${projectName}`);
        if (packageManager === "yarn") {
            console.log(`  ${chalk.cyan("2.")} yarn dev`);
        } else {
            console.log(`  ${chalk.cyan("2.")} npm run dev`);
        }
        console.log("\n");

        const celebration = chalkAnimation.pulse(chalk.green("✅ Happy coding! 🚀"));
        setTimeout(() => {
            celebration.stop();
            console.log("");
        }, 2000);
    }

    async generate(projectName, language, options) {
        try {
            // Determine package manager
            const packageManager = options.yarn ? "yarn" : options.npm ? "npm" : "npm";

            // Show animated title
            await this.showAnimatedTitle();

            // Check Node.js version
            this.checkNodeVersion();

            // Validate arguments
            this.validateArguments(projectName, language, packageManager);

            console.log(chalk.blue("ℹ️  ") + `Creating React project: ${projectName}`);
            console.log(chalk.blue("ℹ️  ") + `Language: ${language}`);
            console.log(chalk.blue("ℹ️  ") + `Package Manager: ${packageManager}`);
            console.log("");

            // Clone git repository with templates
            await this.cloneRepository();

            // Create Vite app
            await this.createViteApp(projectName, language);

            // Install dependencies
            await this.installDependencies(projectName, packageManager);

            // Setup project structure
            await this.setupProjectStructure(language);

            // Create components
            await this.createComponents(language);

            // Update project files
            await this.updateProjectFiles(language);

            // Initialize git repository
            await this.initializeGitRepository();

            // Return to original directory
            process.chdir("..");

            // Show completion
            await this.showCompletion(projectName, packageManager);
        } catch (error) {
            console.log(chalk.red("❌ Error: ") + error.message);
            process.exit(1);
        } finally {
            // Always cleanup
            this.cleanup();
        }
    }

    run() {
        this.program.parse();
    }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
    console.log(chalk.red("❌ Unhandled error: ") + error.message);
    process.exit(1);
});

// Handle script interruption
process.on("SIGINT", () => {
    console.log(chalk.red("\n❌ Script interrupted by user"));
    // Cleanup if needed
    if (fs.existsSync(TEMP_DIR)) {
        fs.removeSync(TEMP_DIR);
    }
    process.exit(130);
});

// Run the CLI
const lmr = new LMRGenerator();
lmr.run();
