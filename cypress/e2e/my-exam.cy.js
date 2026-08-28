describe('Mes examens (étudiant)', () => {
    const exams = [
        { id: 3, courseId: 1, courseName: 'Programmation 2', title: 'Examen final PROG2', description: 'QCM chapitres 1 à 6', startDate: '2026-09-01T08:00:00Z', endDate: '2026-12-01T10:00:00Z' },
        { id: 4, courseId: 2, courseName: 'Réseaux 1', title: 'Contrôle réseaux', description: '', startDate: '2026-09-01T08:00:00Z', endDate: '2026-09-01T10:00:00Z' },
    ];

    const results = [
        { examId: 4, examTitle: 'Contrôle réseaux', courseName: 'Réseaux 1', score: 14, maxScore: 20, submittedAt: '2026-09-01T09:00:00Z' },
    ];

    beforeEach(() => {
        cy.visit('/login');
        cy.loginAs('STUDENT');
        cy.intercept('GET', '**/api/my/exams', exams).as('getMyExams');
        cy.intercept('GET', '**/api/my/results', results).as('getMyResults');
        cy.visit('/student');
        cy.wait(['@getMyExams', '@getMyResults']);
    });

    it('affiche les examens disponibles avec leur cours', () => {
        cy.contains('Programmation 2').should('be.visible');
        cy.contains('Examen final PROG2').should('be.visible');
        cy.contains('Réseaux 1').should('be.visible');
        cy.contains('Contrôle réseaux').should('be.visible');
    });

    it('marque comme "Déjà passé" un examen présent dans l\'historique', () => {
        cy.contains('.card', 'Contrôle réseaux').within(() => {
            cy.contains('button', 'Déjà passé').should('be.disabled');
        });
    });

    it('empêche de relancer un examen déjà passé', () => {
        cy.contains('.card', 'Contrôle réseaux').within(() => {
            cy.contains('button', 'Déjà passé').click({ force: true });
        });
        cy.url().should('include', '/student');
        cy.url().should('not.include', '/exams/4');
    });

    it("navigue vers la page de passage au clic sur \"Passer l'examen\"", () => {
        cy.contains('.card', 'Examen final PROG2').within(() => {
            cy.contains('button', "Passer l'examen").click();
        });
        cy.url().should('include', '/student/exams/3');
    });

    it("affiche un message si aucun examen n'est disponible", () => {
        cy.intercept('GET', '**/api/my/exams', []).as('getEmptyExams');
        cy.intercept('GET', '**/api/my/results', []).as('getEmptyResults');
        cy.visit('/student');
        cy.wait(['@getEmptyExams', '@getEmptyResults']);
        cy.contains('Aucun examen disponible.').should('be.visible');
    });

    it('affiche une erreur si le chargement échoue', () => {
        cy.intercept('GET', '**/api/my/exams', { statusCode: 500, body: { message: 'Erreur serveur' } }).as('getExamsError');
        cy.visit('/student');
        cy.wait('@getExamsError');
        cy.contains('Erreur serveur').should('be.visible');
    });
});