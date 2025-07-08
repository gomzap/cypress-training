describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./cypress-training/src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
  const longText = Cypress._.repeat('0123456789', 10)
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  //it.only executa apenas esse teste
  it('não permite enviar o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('walmyrtalkingabouttesting,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Gabriel')
      .should('have.value', 'Gabriel')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Moura')
      .should('have.value', 'Moura')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('walmyr@talkingabouttesting.com')
      .should('have.value', 'walmyr@talkingabouttesting.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('11999999999') 
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário com telefone obrigatório mas não preenchido', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

//  it('envia o formulário com sucesso usando um comando customizado', () => {
//    cy.fillMandatoryFieldsAndSubmit()

 //   cy.get('.success').should('be.visible')
//  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    // const data = {
    //  firstName: 'Gabriel',
    //  lastName: 'Oliveira',
    //  email: 'walmyr@talkingabouttesting.com',
    //  text: 'Teste'
   // }

    cy.fillMandatoryFieldsAndSubmit()//data)

    cy.get('.success').should('be.visible')
  })
})

