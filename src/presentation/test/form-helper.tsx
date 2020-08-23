import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const status = screen.getByTestId(`${fieldName}-status`)
  expect(status.title).toBe(validationError || 'Ok!')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const emailInput = screen.getByTestId(fieldName)
  fireEvent.input(emailInput, { target: { value: value } })
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}
