describe('home', () => {
    it('loads successfully', () => {
        cy.visit('https://resume.rainey-cloud.com');
        cy.contains('Justin'); // Adjust this based on your homepage content
    });
});
