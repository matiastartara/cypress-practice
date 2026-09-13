# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install                                        # install dependencies
npx cypress open --e2e --browser=chrome            # interactive runner (required for Cypress Tap)
npx cypress run --browser chrome                   # headless run, all specs
npx cypress run --spec cypress/e2e/login.cy.js      # headless run, a single spec
docker-compose up --build                          # run the full suite in Docker (headless Chrome)
```

There is no build step, linter, or unit test runner configured — this repo only contains Cypress e2e specs.

### Running a single test via Cypress Tap

When a `cypress open` session is already running, drive it instead of shelling out to `cypress run`:

```bash
npx cypress tap run cypress/e2e/login.cy.js
npx cypress tap status --json     # poll until startedAt changes and status is passed/failed
npx cypress tap reporter          # list test ids; add --test-id <id> for full detail on a failure
```

Full command reference and the fresh-verdict polling rule live in the `cypress-tap` skill
(`.agents/skills/cypress-tap/SKILL.md`, symlinked from `.claude/skills/cypress-tap`) — read it
before scripting `tap` calls. Tap only works with `cypress open` on Electron/Chrome/Chromium/Edge;
it cannot drive headless `cypress run` or Firefox/WebKit.

## Architecture

All specs run against the public OrangeHRM demo instance (`baseUrl` in `cypress.config.js`) —
there is no local app server to start. Login credentials for that instance live in
`cypress/fixtures/valid_login_credentials.json` and `invalid_login_credentials.json`.

**Page Object Model**: every page interaction goes through a class in `cypress/pages/`, imported
into the matching spec in `cypress/e2e/`. Page classes only wrap selectors and interactions
(`cy.get(...).click()`, `.type()`, etc.) and return Cypress chainables — assertions themselves stay
in the spec files, not in the page objects. `HomePage.clickMenuOption(name)` is the generic entry
point for left-nav navigation (Admin, Recruitment, PIM, ...); most specs start with it after login.

**Login**: `cy.login(username, password)` is a custom command defined in
`cypress/support/commands.js`, loaded globally via `cypress/support/e2e.js`. Use it instead of
duplicating the username/password/submit steps in a spec.

**Network sync before assertions**: OrangeHRM's grids (Admin > User Management, the dashboard,
etc.) fetch data asynchronously after a navigation or filter action, and the Vue app can still be
mid-re-render when a plain `cy.get()` reads the table right after a click — the read can catch a
stale or half-updated row set, or throw a "no longer attached to the DOM" error when the row
Cypress selected gets replaced mid-assertion. The established fix (see `userManagement.cy.js`,
`addCandidate.cy.js`, `login.cy.js`) is: `cy.intercept()` the relevant API call, trigger the action,
then `cy.wait('@alias')` before reading the DOM. Register the intercept immediately before the
action that fires the request you actually want to wait on — registering it earlier can alias an
unrelated request that fires first (e.g. a dropdown's own metadata fetch), so `cy.wait` resolves
too early and the race reappears.

**AI-assisted authoring**: new Page Objects and specs are written with the help of `cypress tap`
against the live app (see the Commands section) rather than guessed from screenshots — a temporary
probe spec navigates to the target state, `tap dom`/`tap aria` reveal the real selectors, then the
page object and spec are written and re-run through `tap` to confirm a pass before being kept.
