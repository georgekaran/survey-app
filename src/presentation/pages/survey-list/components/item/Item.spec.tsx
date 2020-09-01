import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components/icon/Icon'
import { SurveyModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey: SurveyModel = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )
  return {
    history
  }
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2020-07-29T00:00:00')
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('29')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = false
    survey.date = new Date('2019-03-03T00:00:00')
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })

  test('Should go to SurveyResult on button click', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
