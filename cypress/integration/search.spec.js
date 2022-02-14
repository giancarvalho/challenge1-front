describe("Product search", () => {
  it("should show a grid of products", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input")
      .type("camisa")
      .then(() => {
        cy.wait(400);
        cy.get("li").should("be.visible");
      });
  });

  it("should show a warning message", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input")
      .type("xxx")
      .then(() => {
        cy.wait(1500)
      
        cy.window().then((win) => {
          cy.get(".input-container").then(($el) => {
        
            const after = win.getComputedStyle($el[0], "::after")
            const afterOpacity = after.getPropertyValue("opacity");
          
            expect(afterOpacity).to.equal('1');
          });
        });
        
        
      }
        );



  });
});
