// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '批量删除'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/batchDel',
    idColIndex: 2,
    doAdd () {
    },
    doEdit () {
    },
    doAfter () {
      cy.log({ message: '测试批量删除' })
      cy.get('.has-gutter > tr > .el-table_1_column_1 > .cell > .el-checkbox > .el-checkbox__input > .el-checkbox__inner').click()
      cy.get('.prefix > .el-button > .el-icon-delete').click()
      cy.get('.el-message-box__btns').contains('确定').click()
      cy.checkId({ idColIndex: 2 }, '21')
    }
  })
})
