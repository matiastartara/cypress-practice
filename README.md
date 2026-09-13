# 🧪 Cypress Practice Project

This is a practice project designed to automate End-to-End (E2E) testing using **Cypress** and the **Page Object Model (POM)** design pattern. It automates key user flows on the **OrangeHRM** demo website.

---

## 🛠️ Tech Stack

*   **Node.js** (Execution environment)
*   **Cypress v15.21+** (E2E testing framework)
*   **Cypress Tap** (free, built into Cypress — lets an AI agent drive an open Cypress session)
*   **Docker & Docker Compose** (Containers for portable execution)
*   **GitHub Actions** (Continuous Integration - CI)

---

## 📂 Project Structure

The project architecture follows the **Page Object Model (POM)** pattern to keep selectors and page interactions clean and separated from the actual test logic:

```text
cypress-practice/
├── .agents/skills/cypress-tap/   # Cypress Tap AI skill (shared, versioned instructions)
├── .claude/skills/cypress-tap    # Symlink so Claude Code picks up the skill above
├── .github/
│   └── workflows/
│       └── cypress.yml         # Continuous Integration (CI) pipeline
├── cypress/
│   ├── e2e/                     # Test specification files (.cy.js)
│   │   ├── addCandidate.cy.js
│   │   ├── login.cy.js
│   │   └── userManagement.cy.js
│   ├── fixtures/                # Static test data (JSON)
│   │   ├── valid_login_credentials.json
│   │   └── invalid_login_credentials.json
│   ├── pages/                   # Page Object classes (Selectors & methods)
│   │   ├── AddCandidatePage.js
│   │   ├── HomePage.js
│   │   ├── RecruitmentPage.js
│   │   └── UserManagementPage.js
│   └── support/                 # Custom commands and global configurations
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js            # Cypress configuration file
├── Dockerfile                   # Docker image definition for the runner
├── docker-compose.yml           # Docker Compose orchestration
├── skills-lock.json             # Lockfile for installed AI skills
├── package.json                 # Project scripts and dependencies
├── CLAUDE.md                    # Guidance for AI coding agents working in this repo
└── README.md                    # Project documentation
```

---

## 🚀 Prerequisites

Before you get started, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [Docker](https://www.docker.com/) (Optional, for containerized execution)
*   [Git](https://git-scm.com/)

---

## 💻 Commands & Local Run

### 1. Clone & Install Dependencies
Clone the repository and install the required npm packages on your local machine:
```bash
git clone https://github.com/matiastartara/cypress-practice.git
cd cypress-practice
npm install
```

### 2. Run Tests in Headless Mode (Command Line)
Execute all test specifications in the background (headless) using the default browser (Electron) or Google Chrome:
```bash
# Run tests with the default browser (Electron)
npx cypress run

# Run tests specifically using Google Chrome
npx cypress run --browser chrome
```

### 3. Open the Interactive Test Runner (Cypress App)
Launch the Cypress GUI to visually debug and run tests step-by-step:
```bash
npx cypress open
```

### 4. Available Specs

| Spec | Covers |
|---|---|
| `login.cy.js` | Valid and invalid login |
| `addCandidate.cy.js` | Recruitment → add a new candidate |
| `userManagement.cy.js` | Admin → User Management, filter system users by role and verify the results |

---

## 🤖 AI-Assisted Authoring with Cypress Tap

[Cypress Tap](https://docs.cypress.io/app/tooling/cypress-tap) is a free CLI extension that ships with Cypress itself (**v15.21.0+**, no Cypress Cloud account required). It gives an AI coding agent (e.g. Claude Code) real-time, read-only access to an already-running `cypress open` session — the agent can run a spec, inspect the live DOM and accessibility tree, and read command logs/failures. This lets the agent write accurate Page Objects and specs against the *real* app instead of guessing selectors.

### Install

Nothing to install beyond Cypress itself, as long as the version requirement is met:
```bash
npx cypress --version   # must be 15.21.0 or higher
```

Optionally add the official skill so any agent that supports skills knows the correct `cypress tap` workflow:
```bash
npx skills add https://github.com/cypress-io/ai-toolkit --skill cypress-tap
```
This installs into `.agents/skills/cypress-tap` (symlinked from `.claude/skills/cypress-tap` for Claude Code) and is meant to be committed — it's plain documentation, not machine-specific config.

### Create Pages and Tests from a Prompt

1. In one terminal, open Cypress and leave it running:
   ```bash
   npx cypress open --e2e --browser=chrome
   ```
2. In your AI agent, describe the flow in plain language, e.g.:
   > "Create a test that goes to Admin, filters System Users by role Admin, and verifies every returned row has that role. Use the Page Object Model."
3. The agent drives the live session via `npx cypress tap <command>` to discover real selectors before writing any code:
   ```bash
   npx cypress tap run cypress/e2e/_probe.cy.js   # navigate to the target state
   npx cypress tap dom --selector 'form'          # inspect real markup
   npx cypress tap aria                           # inspect roles/accessible names
   ```
4. It then creates/updates a Page Object in `cypress/pages/` and a spec in `cypress/e2e/`, and re-runs the spec through `tap` to confirm it actually passes against the live app before handing it back to you.

`cypress tap` only works with `cypress open` (Electron/Chrome/Chromium/Edge) — it does not work with headless `cypress run` or Firefox/WebKit.

---

## 🐳 Docker Execution

Run your tests in isolated environments without needing Node.js or Cypress installed on your machine.

### Build and Run with Docker Compose
This command builds the image and runs the test suite inside a headless Google Chrome browser within the container:
```bash
# Build the image and execute tests
docker-compose up --build

# Clean up containers after execution
docker-compose down
```

---

## 🤖 Continuous Integration (CI) with GitHub Actions

The project includes a pre-configured CI pipeline at [.github/workflows/cypress.yml](.github/workflows/cypress.yml).

Every time you `push` or open a `pull request` targeting the `main` or `master` branches, the test suite runs automatically on a fresh Ubuntu virtual machine, ensuring new code doesn't break existing functionality.

---

## 🏆 Applied Best Practices

1.  **Page Object Model (POM):** Improved code maintainability and reusability by separating selectors and user flows from test assertions.
2.  **Environment Isolation:** Handled environment URLs using `CYPRESS_baseUrl` to avoid hardcoding URLs within spec files.
3.  **Dockerization:** Ensures 100% environment consistency between local development and CI servers.
4.  **Optimized Docker Build:** The `Dockerfile` leverages layer caching by copying and installing `package.json` dependencies before copying source code.
5.  **AI-Assisted, Verified Authoring:** New specs and Page Objects are written with the help of an AI agent using [Cypress Tap](#-ai-assisted-authoring-with-cypress-tap) to inspect the real app and confirm passing runs, instead of guessing selectors.