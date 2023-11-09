beforeEach(() => {
  cy.visit("chrome-extension://ifpaniondjgkknjhpnjdbpbihgimgadb/popup.html")
})

describe("Home Spec", () => {
  it("should display title", () => {
    cy.get("h2").should("have.text", "i-Translate")

    cy.get("#home_link").should("have.text", "Home")
    cy.get("#new_link").should("have.text", "New")
    cy.get("#update_link").should("have.text", "Update")
    cy.get("#delete_link").should("have.text", "Delete")
  })
})

describe("New Spec", () => {
  it("should create a Translation", () => {
    cy.get("#new_link").click()
    cy.get("h3").should("have.text", "Add Translation")
    cy.get("#queryLanguage").select("English")
    cy.get("#queryWord").type("Field")
    cy.get("#translationLanguage").select("Spanish")
    cy.get("#translationWord").type("Campo")
    cy.get("#add_new").click()
    cy.get("#success_message").should("contain.text", "campo")
    cy.get("#error_message").should("be.undefined")
  })
})

describe("Update Spec", () => {
  it("should update a translation", () => {
    cy.get("#update_link").click()
    cy.get("h3").should("have.text", "Update Translation")
    cy.get("#queryLanguage").select("English")
    cy.get("#queryWord").type("Field")
    cy.get("#translationLanguage").select("German")
    cy.get("#translationWord").type("Campo")
    cy.get("#update_button").click()
    cy.get("#success_message").should("contain.text", "Successfully")
    cy.get("#error_message").should("be.undefined")
  })
})

describe("Delete Spec", () => {
  it("should delete a translation", () => {
    cy.get("#update_link").click()
    cy.get("h3").should("have.text", "Delete Translation")
    cy.get("#queryLanguage").select("English")
    cy.get("#queryWord").type("Field")
    cy.get("#delete_button").click()
    cy.get("#success_message").should("contain.text", "Successfully")
    cy.get("#error_message").should("be.undefined")
  })
})
