import './index.css';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { storagePlaceholder } from './Storage/Redux';

/* 
  The location inside the html file we can to render out app.
  Example: we a rending inside a div element with the id of "root"
  <div id="root">
    *App rendered here*
  </div>
*/
const container = document.getElementById('root')
const root = createRoot(container)

// Defining what's in our storage
const storage = configureStore({
  reducer: {
    reduxPlaceholder: storagePlaceholder.reducer,
  }
})

root.render(
  <Provider store={storage}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

// export { storage };