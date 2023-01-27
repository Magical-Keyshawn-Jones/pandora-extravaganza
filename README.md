# Pandora-Extravaganza #Full-Stack Developer
Imagine being in a place with so much to do and super convenient you wouldn't want to leave. I'm creating it.

*Website*-https://pandora-extravaganza.vercel.app/
*linkedIn*-https://www.linkedin.com/in/keyshawn-jones-a399a122a

User Story so far

-User sees login/register
-User notice they need to login
-User clicks register and registers with fake credentials
-User is welcomed into the homepage
-User is given tons of options of what they can do. Like a mall

So far the user starts off with a simple login page. What does my login do?

-The user uses fake credentials to sign or register

-The form checks it's an email and a good password

-The form is sent to my API where it hashes the password and stores all the user info in my SQLite3 database. 

-My API returns a token to keep the user logged-in until they choose to logout. which will then kick them out of everything

Tests

-Cypress/Jest

  @I will try out more testingFrameworks in the future
