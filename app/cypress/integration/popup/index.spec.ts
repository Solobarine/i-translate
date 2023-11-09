beforeEach(() => {
  cy.visit("chrome-extension://ifpaniondjgkknjhpnjdbpbihgimgadb")
})

it("should display title", () => {
  cy.get("h2").should("have.text", "i-Translate")

  cy.get("#home_link").should("have.text", "Home")
  cy.get("#new_link").should("have.text", "New")
  cy.get("#update_link").should("have.text", "Update")
  cy.get("#delete_link").should("have.text", "Delete")
})
