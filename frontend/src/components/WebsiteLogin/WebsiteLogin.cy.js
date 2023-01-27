import React from 'react'
import WebsiteLogin from './WebsiteLogin'

describe('<WebsiteLogin />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WebsiteLogin />)
  })
})