# pandora-extravaganza

Imagine being in a place with so much to do that was so convenient you wouldn't want to leave. Thats the website I'm designing.

So far the user starts off with a simple login page. What does my login do?

-The user uses fake credentials to sign or register

-The form checks it's an email and a good password

-The form is sent to my API where it hashes the password and stores all the user info in my SQLite3 database. 

-My API returns a token to keep the user loggedin until they choose to logout. which will then kick them out of everything
