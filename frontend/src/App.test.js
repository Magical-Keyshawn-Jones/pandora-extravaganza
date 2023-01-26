import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { tabStorage, accessToken } from './Storage/Redux';

/*
  *Jest is primarily used for testing units of code.
  -Functions, classes, etc
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

describe('App', () => {
  it('App renders correctly', async () => {
    render(
      <Provider store={storage}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    )
  })
})