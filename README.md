# 🧪 Cypress Practice Project

This is a practice project designed to automate End-to-End (E2E) testing using **Cypress** and the **Page Object Model (POM)** design pattern. It automates key user flows on the **OrangeHRM** demo website.

---

## 🛠️ Tech Stack

*   **Node.js** (Execution environment)
*   **Cypress v15.18.1** (E2E testing framework)
*   **Docker & Docker Compose** (Containers for portable execution)
*   **GitHub Actions** (Continuous Integration - CI)

---

## 📂 Project Structure

The project architecture follows the **Page Object Model (POM)** pattern to keep selectors and page interactions clean and separated from the actual test logic:

```text
cypress-practice/
├── .github/
│   └── workflows/
│       └── cypress.yml         # Continuous Integration (CI) pipeline
├── cypress/
│   ├── e2e/                     # Test specification files (.cy.js)
│   │   ├── addCandidate.cy.js
│   │   └── login.cy.js
│   ├── fixtures/                # Static test data (JSON)
│   │   └── example.json
│   ├── pages/                   # Page Object classes (Selectors & methods)
│   │   ├── AddCandidatePage.js
│   │   ├── HomePage.js
│   │   └── RecruitmentPage.js
│   └── support/                 # Custom commands and global configurations
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js            # Cypress configuration file
├── Dockerfile                   # Docker image definition for the runner
├── docker-compose.yml           # Docker Compose orchestration
├── package.json                 # Project scripts and dependencies
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

The project includes a pre-configured CI pipeline at [.github/workflows/cypress.yml](file:///Users/matiastartara/Documents/VisualCodeWorkspace/cypress-practice/.github/workflows/cypress.yml).

Every time you `push` or open a `pull request` targeting the `main` or `master` branches, the test suite runs automatically on a fresh Ubuntu virtual machine, ensuring new code doesn't break existing functionality.

---

## 🏆 Applied Best Practices

1.  **Page Object Model (POM):** Improved code maintainability and reusability by separating selectors and user flows from test assertions.
2.  **Environment Isolation:** Handled environment URLs using `CYPRESS_baseUrl` to avoid hardcoding URLs within spec files.
3.  **Dockerization:** Ensures 100% environment consistency between local development and CI servers.
4.  **Optimized Docker Build:** The `Dockerfile` leverages layer caching by copying and installing `package.json` dependencies before copying source code.