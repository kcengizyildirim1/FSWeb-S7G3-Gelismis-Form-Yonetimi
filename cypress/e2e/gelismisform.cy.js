describe("Project testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("find a first name element", () => {
    cy.get("[data-cy=first_name]").should("have.value", "");
  });
  it("find a last name element", () => {
    cy.get("[data-cy=last_name]").should("have.value", "");
  });
  it("find a password element", () => {
    cy.get("[data-cy=password]").should("have.value", "");
  });
  it("Check the agreement", () => {
    cy.get("[data-cy=agreement]").should("not.be.checked");
  });

  it("should submit form and display result", () => {
    cy.get("[data-cy=first_name]").type("C");
    cy.get("[data-cy=fname-error]").contains(
      "İsminiz en az 2 karakter içermelidir."
    );
  });
});
