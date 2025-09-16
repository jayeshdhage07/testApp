import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  // ---------------- E2E Testing ----------------
  e2e: {
    baseUrl: "http://localhost:4200/home", // include /home if your app starts there
    specPattern: "cypress/e2e/**/*.cy.{js,ts}", // pick all .cy files in e2e
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // log events
      on("before:run", () => console.log("Starting Cypress E2E tests..."));

      // custom log task
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // modify browser launch args for Chromium
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push("--disable-features=SameSiteByDefaultCookies");
        }
        return launchOptions;
      });

      // code coverage
      codeCoverageTask(on, config);
      return config;
    },
  },

  // viewport for all tests
  viewportWidth: 1280,
  viewportHeight: 800,

  // ---------------- Component Testing ----------------
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,ts}", // pick all .cy files in component folder
    supportFile: "cypress/support/component.ts", // separate support file for components
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config); // optional coverage for component tests
      return config;
    },
  },
});
