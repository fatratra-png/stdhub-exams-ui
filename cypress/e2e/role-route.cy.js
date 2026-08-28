describe('Contrôle d\'accès par rôle', () => {
    it('redirige un utilisateur non connecté vers /login', () => {
        cy.visit('/admin');
        cy.url().should('include', '/login');
    });

    it('redirige un STUDENT hors de /admin', () => {
        cy.visit('/login');
        cy.loginAs('STUDENT');
        cy.visit('/admin');
        cy.url().should('include', '/login');
    });

    it('redirige un ADMIN hors de /student', () => {
        cy.visit('/login');
        cy.loginAs('ADMIN');
        cy.visit('/student');
        cy.url().should('include', '/login');
    });

    it('laisse un ADMIN accéder à /admin', () => {
        cy.visit('/login');
        cy.loginAs('ADMIN');
        cy.visit('/admin');
        cy.url().should('include', '/admin');
        cy.url().should('not.include', '/login');
    });

    it('laisse un STUDENT accéder à /student', () => {
        cy.visit('/login');
        cy.loginAs('STUDENT');
        cy.visit('/student');
        cy.url().should('include', '/student');
        cy.url().should('not.include', '/login');
    });
});