import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const status = screen.getByTestId(`${fieldName}-status`)
  expect(status.title).toBe(validationError || 'Ok!')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const emailInput = screen.getByTestId(fieldName)
  fireEvent.input(emailInput, { target: { value: value } })
}
