import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import Header from './Header'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <Router history={history}>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }} >
        <Header />
      </ApiContext.Provider>
    </Router>
  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null on logout click', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))

    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
  })
})
