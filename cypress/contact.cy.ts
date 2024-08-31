import { ContactComponent } from "../src/app/contact/contact.component"

describe('ContactComponent', () => {
  it('mounts', () => {
    cy.mount(ContactComponent)
  })
})
