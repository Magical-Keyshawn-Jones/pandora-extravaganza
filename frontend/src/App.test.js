import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { tabStorage, accessToken } from './Storage/Redux';

/*
  *Jest is primarily used for testing units of code.
  -Functions, classes, etc
  @getAll-returns an error if nothing is found
  @findAll-returns an empty array if nothing is found
  @queryAll-returns an empty array if nothing is found, but has a configuration parameter
  *Unit testing framework
  
  *Cypres is primarily used for testing complete web applications.
  *Cypress simulates user interactions.
    -clicking, filling out forms, navigating between pages
  *Powerful built-in commands and assertions
  *End-to-End testing framework
*/


// Defining what's in our storage
const storage = configureStore({
  reducer: {
    tabStorage: tabStorage.reducer,
    accessToken: accessToken.reducer,
  }
})

// Needed to perform axios test
jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: 'example data' }))
  }
})

describe('Login', ()=>{
  test('Username and Password is consistent when clicking register then login', ()=>{
    render(
      <Provider store={storage}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    )
    const username = screen.getByPlaceholderText('Username')
    const password = screen.getByPlaceholderText('Password')
    const login = screen.getAllByText('Login')
    const register = screen.getByText('Register')
    fireEvent.change(username, { target: { value: 'Testing' }})
    fireEvent.change(password, { target: { value: 'Password'}})
    fireEvent.click(register)
    fireEvent.click(login[1])
    expect(username.value).toEqual('Testing')
    expect(password.value).toEqual('Password')
  })
}) 
