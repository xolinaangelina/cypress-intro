describe('Header and Footer elements', () => {

  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });
  });

  // ── HEADER ──────────────────────────────────────────────
  describe('Header buttons and links', () => {

    it('should find the Home link', () => {
      cy.contains('Home').should('be.visible');
    });

    it('should find the About link', () => {
      cy.contains('About').should('be.visible');
    });

    it('should find the Contacts link', () => {
      cy.contains('Contacts').should('be.visible');
    });

    it('should find the Guest log in button', () => {
      cy.contains('button', 'Guest log in').should('be.visible');
    });

    it('should find the Sign In button', () => {
      cy.contains('button', 'Sign In').should('be.visible');
    });

  });

  // ── FOOTER ──────────────────────────────────────────────
  describe('Footer links and buttons', () => {

    it('should find Facebook link in footer', () => {
      cy.get('a.socials_link[href*="facebook"]').should('exist');
    });

    it('should find Telegram link in footer', () => {
      cy.get('a.socials_link[href*="t.me"]').should('exist');
    });

    it('should find YouTube link in footer', () => {
      cy.get('a.socials_link[href*="youtube"]').should('exist');
    });

    it('should find Instagram link in footer', () => {
      cy.get('a.socials_link[href*="instagram"]').should('exist');
    });

    it('should find LinkedIn link in footer', () => {
      cy.get('a.socials_link[href*="linkedin"]').should('exist');
    });

    it('should find ithillel.ua link in footer', () => {
      cy.get('a.contacts_link').first().should('be.visible');
    });

    it('should find support email link in footer', () => {
      cy.get('a.contacts_link').last().should('be.visible');
    });

  });

});