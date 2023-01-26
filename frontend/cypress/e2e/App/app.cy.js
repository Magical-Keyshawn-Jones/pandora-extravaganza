/// <reference types="cypress" />

describe('App', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    it('Register works', ()=>{
        cy.get('button').contains('Register').click()
    })
})