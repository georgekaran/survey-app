import React from 'react'
import { render, screen } from '@testing-library/react'

import Calendar from '@/presentation/components/calendar/Calendar'

const makeSut = (date: Date = new Date()): void => {
  render(<Calendar date={date} />)
}

describe('Calendar Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2020-07-29T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('29')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2019-03-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
