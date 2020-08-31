import React from 'react'
import { render, screen } from '@testing-library/react'

import SurveyResult from './SurveyResult'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

describe('SurveyResult component', () => {
  test('Should render with valid initial valid', () => {
    render(
      <ApiContext.Provider value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
      >
        <SurveyResult />
      </ApiContext.Provider>
    )
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
