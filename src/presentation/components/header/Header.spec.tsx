import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Header from './Header'
import { ApiContext } from '@/presentation/contexts'

describe('Header Component', () => {
  test('Should call setCurrentAccount with null on logout click', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
      <Router history={history}>
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }} >
          <Header />
        </ApiContext.Provider>
      </Router>
    )
    fireEvent.click(screen.getByTestId('logout'))

    expect(history.location.pathname).toBe('/login')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
  })
})
