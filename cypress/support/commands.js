const AUTH_FIXTURES = {
    ADMIN: { id: 'ADM00001', email: 'admin@mail.hei.school', role: 'ADMIN' },
    STUDENT: { id: 'STD26001', email: 'alice@mail.hei.school', role: 'STUDENT' },
};
Cypress.Commands.add('loginAs', (role) => {
    cy.window().then((win) => {
        win.localStorage.setItem('token', `fake-jwt-${role.toLowerCase()}`);
        win.localStorage.setItem('user', JSON.stringify(AUTH_FIXTURES[role]));
    });
});