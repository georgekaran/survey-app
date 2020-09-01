import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import SurveyResult from './SurveyResult'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel, LoadSurveyResultSpy, mockSurveyResultModel } from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.surveyResult = surveyResult
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult component', () => {
  test('Should render with valid initial valid', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should present SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), { date: new Date('2020-07-29T00:00:00') })
    makeSut(surveyResult)
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('day')).toHaveTextContent('29')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
    expect(screen.getByTestId('answers').childElementCount).toBe(2)

    const imagesWrap = screen.queryAllByTestId('answer-wrap')
    expect(imagesWrap[0]).toHaveClass('active')
    expect(imagesWrap[1]).not.toHaveClass('active')

    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images.length).toBe(1)

    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)

    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })
})
