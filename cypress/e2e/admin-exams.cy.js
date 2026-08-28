describe('Gestion des examens (admin)', () => {
    const courses = [
        { id: 1, code: 'PROG2', name: 'Programmation Orientée Objet et API' },
        { id: 2, code: 'RESEAU1', name: 'Réseaux 1' },
    ];

    const exams = [
        {
            id: 3, courseId: 1, title: 'Examen final PROG2', description: 'QCM chapitres 1 à 6',
            startDate: '2026-11-06T08:00:00Z', endDate: '2026-11-08T10:00:00Z',
            questionCount: 2, attemptCount: 0,
        },
        {
            id: 4, courseId: 2, title: 'Contrôle réseaux', description: '',
            startDate: '2026-09-01T08:00:00Z', endDate: '2026-09-01T10:00:00Z',
            questionCount: 5, attemptCount: 3,
        },
    ];

    beforeEach(() => {
        cy.visit('/login');
        cy.loginAs('ADMIN');
        cy.intercept('GET', '**/api/courses', courses).as('getCourses');
        cy.intercept('GET', '**/api/exams', exams).as('getExams');
        cy.visit('/admin/exams');
        cy.wait(['@getCourses', '@getExams']);
    });

    it('affiche la liste des examens', () => {
        cy.contains('Examen final PROG2').should('be.visible');
        cy.contains('Contrôle réseaux').should('be.visible');
    });

    it('filtre les examens par cours', () => {
        cy.intercept('GET', '**/api/exams?courseId=2', [exams[1]]).as('getFiltered');
        cy.get('select').first().select('RESEAU1');
        cy.wait('@getFiltered');
        cy.contains('Contrôle réseaux').should('be.visible');
        cy.contains('Examen final PROG2').should('not.exist');
    });

    it('ouvre et ferme le formulaire de création', () => {
        cy.contains('NOUVEL EXAMEN').should('not.exist');
        cy.contains('+ Créer un examen').click();
        cy.contains('NOUVEL EXAMEN').should('be.visible');
        cy.contains('button', 'ANNULER').click();
        cy.contains('NOUVEL EXAMEN').should('not.exist');
    });

    it('crée un nouvel examen', () => {
        const created = { id: 5, courseId: 1, title: 'Nouveau QCM', description: '', startDate: '2026-12-01T08:00:00Z', endDate: '2026-12-01T10:00:00Z', questionCount: 0, attemptCount: 0 };
        cy.intercept('POST', '**/api/exams', { statusCode: 201, body: created }).as('createExam');
        cy.intercept('GET', '**/api/exams', [...exams, created]).as('getExamsAfterCreate');

        cy.contains('+ Créer un examen').click();
        cy.contains('label', 'COURS RATTACHÉ').next('select').select('PROG2');
        cy.contains('label', "TITRE DE L'EXAMEN").next('input').type('Nouveau QCM');
        cy.contains('label', 'DATE DE DÉBUT').next('input').type('2026-12-01T08:00');
        cy.contains('label', 'DATE DE FIN').next('input').type('2026-12-01T10:00');
        cy.contains('button', 'CRÉER').click();

        cy.wait('@createExam');
        cy.wait('@getExamsAfterCreate');
        cy.contains('Nouveau QCM').should('be.visible');
    });

    it('affiche une erreur si la date de fin précède la date de début', () => {
        cy.contains('+ Créer un examen').click();
        cy.contains('label', 'COURS RATTACHÉ').next('select').select('PROG2');
        cy.contains('label', "TITRE DE L'EXAMEN").next('input').type('QCM invalide');
        cy.contains('label', 'DATE DE DÉBUT').next('input').type('2026-12-01T10:00');
        cy.contains('label', 'DATE DE FIN').next('input').type('2026-12-01T08:00');
        cy.contains('button', 'CRÉER').click();
        cy.contains('La date de fin doit être postérieure à la date de début.').should('be.visible');
    });

    it('modifie un examen existant', () => {
        const updated = { ...exams[0], title: 'Examen final PROG2 (modifié)' };
        cy.intercept('PUT', '**/api/exams/3', { statusCode: 200, body: updated }).as('updateExam');
        cy.intercept('GET', '**/api/exams', [updated, exams[1]]).as('getExamsAfterUpdate');

        cy.contains('.card', 'Examen final PROG2').within(() => {
            cy.contains('button', 'Modifier').click();
        });
        cy.contains('label', "TITRE DE L'EXAMEN").next('input').clear().type('Examen final PROG2 (modifié)');
        cy.contains('button', 'METTRE À JOUR').click();

        cy.wait('@updateExam');
        cy.wait('@getExamsAfterUpdate');
        cy.contains('Examen final PROG2 (modifié)').should('be.visible');
    });

    it("empêche la suppression d'un examen verrouillé (tentatives > 0)", () => {
        cy.contains('.card', 'Contrôle réseaux').within(() => {
            cy.contains('button', 'Supprimer').click();
        });
        cy.contains('Impossible de supprimer').should('be.visible');
    });

    it('navigue vers le détail des questions', () => {
        cy.intercept('GET', '**/api/exams/3', { ...exams[0], questions: [] }).as('getExamDetail');
        cy.intercept('GET', '**/api/exams/3/questions', []).as('getQuestions');

        cy.contains('.card', 'Examen final PROG2').within(() => {
            cy.contains('button', 'Détails').click();
        });
        cy.url().should('include', '/admin/exams/3/questions');
    });
});