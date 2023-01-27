/// <reference types="cypress" />

describe('Website', ()=>{
    beforeEach(()=>{
        cy.viewport(1669, 937)
        cy.visit('http://localhost:3000')
        cy.wait(2000)
    })

    it('"Sign or Register" message and Login is visible', ()=>{
        cy.contains('Sign or Register to enjoy your stay').should('be.visible')
        cy.contains('Login')
    })
    
    it('After logging in "Sign or Register" message disappears',()=>{
        cy.get('[name="username"]').type('Correct')
        cy.get('[name="password"]').type('Password')
        cy.get('.LoginButtons').children().eq(0).click()
        
        cy.should('not.contain', 'Sign or Register to enjoy your stay')
    })

    it('404 Page not found', ()=>{
        cy.visit('http://localhost:3000/failure')
        cy.contains('Error:404 Page not found')
    })

    it('Successfully logout', ()=>{
        // Username of "Correct" & Password of "Password" need to already be in the database
        cy.get('.LoginBox').children().eq(0).type('Correct')
        cy.get('.LoginBox').children().eq(1).type('Password')
        cy.get('.LoginButtons').children().eq(0).click()
        cy.wait(2000)
        cy.get('[name="Account Settings"]').click()
        cy.get('[name="Logout"]').click()
        cy.contains('Sign or Register to enjoy your stay')
        cy.contains('Login')
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
        // Username of "Correct" & Password of "Password" need to already be in the database
        cy.get('.LoginBox').children().eq(0).type('Correct')
        cy.get('.LoginBox').children().eq(1).type('Password')
        cy.get('.LoginButtons').children().eq(0).click()
        cy.url().should('include', 'home')
    })

    it('Username and Password are consistent after clicking register then login', ()=>{
        const username = cy.get('[name="username"]')
        const password = cy.get('[name="password"]')
        username.type('Testing')
        password.type('Password')
        cy.get('.LoginButtons').children().eq(1).click()
        cy.get('.LoginButtons').children().eq(0).click()
        username.invoke('val').should('eq', 'Testing')
        password.invoke('val').should('eq', 'Password')
    })
}) 

describe('Register', ()=>{
    beforeEach(()=>{
        cy.viewport(1669, 937)
        cy.visit('http://localhost:3000')
    })

    it('Login Info carries over into register form', ()=>{
        const username = cy.get('[name="username"]')
        const password = cy.get('[name="password"]')
        username.type('Testing')
        password.type('Password')
        cy.get('.LoginButtons').children().eq(1).click()
        username.invoke('val').should('eq', 'Testing')
        password.invoke('val').should('eq', 'Password')
    })

    it('Form fields has correct values', ()=>{
        cy.get('.LoginButtons').children().eq(1).click()
        // Form Values
        const username = cy.get('[name="username"]')
        const password = cy.get('[name="password"]')
        const email = cy.get('[name="email"]')
        const firstName = cy.get('[name="first_name"]')
        const lastName = cy.get('[name="last_name"]')
        const gender = cy.get('[name="gender"]')
        
        username.type('Username')
        password.type('Password')
        email.type('Email@gmail.com')
        firstName.type('Kriegster')
        lastName.type('Johnson')
        gender.type('Male')

        username.invoke('val').should('eq', 'Username')
        password.invoke('val').should('eq', 'Password')
        email.invoke('val').should('eq', 'Email@gmail.com')
        firstName.invoke('val').should('eq', 'Kriegster')
        lastName.invoke('val').should('eq', 'Johnson')
        gender.invoke('val').should('eq', 'Male')
    })

    it('Username already in database error', ()=>{
        // Username of "Correct" & Password of "Password" need to already be in the database
        cy.get('[name="username"]').type('Correct')
        cy.get('[name="password"]').type('Password')
        const register = cy.get('.LoginButtons').children().eq(1)
        register.click()
        register.click()
        cy.contains("A user with username of 'Correct' already exist")
    })

    it('Submit with no username = Error',()=>{
        const register = cy.get('.LoginButtons').children().eq(1)
        register.click()

        // Password field
        cy.get('[name="password"]').type('Password')
        register.click()
        cy.contains('Please fill out the required fields')
    })

    it('Submit with no password = Error',()=>{
        const register = cy.get('.LoginButtons').children().eq(1)
        register.click()

        // Username field
        cy.get('[name="username"]').type('Username')
        register.click()
        cy.contains('Please fill out the required fields')
    })

    it('Error if no required fields are filled out',()=>{
        const register = cy.get('.LoginButtons').children().eq(1)
        register.click()
        register.click()
        cy.contains('Please fill out the required fields')
    })

    it('Successfully registered',()=>{
        // Deleting the user this test creates
        cy.request({
            method: 'DELETE',
            url: 'http://127.0.0.1:8000/users/delete',
            body: { username: 'TestingUsername'},
            failOnStatusCode: false
        }).then((response) => {
            // Username
            cy.get('[name="username"]').type('TestingUsername')
            // Password
            cy.get('[name="password"]').type('Password')
            const register = cy.get('.LoginButtons').children().eq(1)
            register.click()
            register.click()
            cy.url().should('include', 'home')
        })
    })
})