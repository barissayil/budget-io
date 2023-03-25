import "./commands";
import "./constants";

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("ResizeObserver loop limit exceeded")) return false;
});
