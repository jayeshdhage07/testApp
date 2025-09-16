import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on) {
      // 1. log events
      on("before:run", () => console.log("Starting Cypress tests..."));

      // 2. add a custom task
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // 3. modify browser launch args
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push(
            "--disable-features=SameSiteByDefaultCookies"
          );
        }
        return launchOptions;
      });
    },
  },

  viewportWidth: 1280,
  viewportHeight: 800,

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
