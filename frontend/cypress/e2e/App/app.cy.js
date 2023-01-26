/// <reference types="cypress" />

describe('Website', ()=>{
    beforeEach(()=>{
        cy.viewport(1669, 937)
        cy.visit('http://localhost:3000')
        cy.wait(2000)
    })

    it('"Sign or Register" message is visible', ()=>{
        cy.contains('Sign or Register to enjoy your stay').should('be.visible')
    })

    it('404 Page not found', ()=>{
        cy.visit('http://localhost:3000/failure')
        cy.contains('Error:404 Page not found')
    })
})

describe('Login', () => {
    beforeEach(()=>{
        cy.viewport(1669, 937)
        cy.visit('http://localhost:3000')
        cy.wait(2000)
    })

    it('Username should be Visible', ()=>{
        cy.get('.LoginBox').children().eq(0).type('Visible').should('be.visible')
    })

    it('Password should be visible',()=>{
        cy.get('.LoginBox').children().eq(1).type('Visible').should('be.visible')
    })

    it('Required fields if Empty', ()=>{
        cy.get('.LoginButtons').children().eq(0).click()
        cy.contains('Please fill out the required fields')
    })

    it('Username required',()=>{
        cy.get('.LoginBox').children().eq(1).type('Password')
        cy.get('.LoginButtons').children().eq(0).click()
        cy.contains('Please fill out the required fields')
    })

    it ('Password required', ()=>{
        cy.get('.LoginBox').children().eq(0).type('Username')
        cy.get('.LoginButtons').children().eq(0).click()
        cy.contains('Please fill out the required fields')
    })

    it('Username or Password is incorrect', ()=>{
        cy.get('.LoginBox').children().eq(0).type('Username Failed')
        cy.get('.LoginBox').children().eq(1).type('Password Failed')
        cy.get('.LoginButtons').children().eq(0).click()
        cy.contains('Username or Password is Incorrect')
    })

    it('Successfully logged In', ()=>{
        cy.get('.LoginBox').children().eq(0).type('Correct')
        cy.get('.LoginBox').children().eq(1).type('Password')
        cy.get('.LoginButtons').children().eq(0).click()
        cy.url().should('include', 'home')
    })
}) 