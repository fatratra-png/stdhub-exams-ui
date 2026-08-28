describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('connecte un ADMIN et redirige vers /admin', () => {
        cy.intercept('POST', '**/api/auth/login', {
            statusCode: 200,
            body: {
                token: 'fake-jwt-admin',
                user: { id: 'ADM00001', email: 'admin@mail.hei.school', role: 'ADMIN' },
            },
        }).as('loginRequest');

        cy.get('#email').type('admin@mail.hei.school');
        cy.get('#password').type('password123');
        cy.get('button[type=submit]').click();

        cy.wait('@loginRequest');
        cy.url().should('include', '/admin');
    });

    it('connecte un STUDENT et redirige vers /student', () => {
        cy.intercept('POST', '**/api/auth/login', {
            statusCode: 200,
            body: {
                token: 'fake-jwt-student',
                user: { id: 'STD26001', email: 'alice@mail.hei.school', role: 'STUDENT' },
            },
        }).as('loginRequest');

        cy.get('#email').type('alice@mail.hei.school');
        cy.get('#password').type('password123');
        cy.get('button[type=submit]').click();

        cy.wait('@loginRequest');
        cy.url().should('include', '/student');
    });

    it('affiche une erreur sur identifiants invalides (401)', () => {
        cy.intercept('POST', '**/api/auth/login', {
            statusCode: 401,
            body: { message: 'Email ou mot de passe incorrect' },
        }).as('loginRequest');

        cy.get('#email').type('alice@mail.hei.school');
        cy.get('#password').type('wrongpassword');
        cy.get('button[type=submit]').click();

        cy.wait('@loginRequest');
        cy.contains('Email ou mot de passe incorrect').should('be.visible');
    });

    it('désactive le bouton pendant la requête', () => {
        cy.intercept('POST', '**/api/auth/login', (req) => {
            req.reply({
                delay: 300,
                statusCode: 200,
                body: { token: 'x', user: { id: 'STD26001', email: 'alice@mail.hei.school', role: 'STUDENT' } },
            });
        }).as('loginRequest');

        cy.get('#email').type('alice@mail.hei.school');
        cy.get('#password').type('password123');
        cy.get('button[type=submit]').click();
        cy.get('button[type=submit]').should('be.disabled').and('contain', 'Connexion en cours...');
    });

    it('bascule la visibilité du mot de passe', () => {
        cy.get('#password').type('secret').should('have.attr', 'type', 'password');
        cy.get('button[aria-label="Afficher le mot de passe"]').click();
        cy.get('#password').should('have.attr', 'type', 'text');
        cy.get('button[aria-label="Masquer le mot de passe"]').click();
        cy.get('#password').should('have.attr', 'type', 'password');
    });
});