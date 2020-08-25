import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { ApiContext } from '@/presentation/contexts'
import { AccessDeniedError } from '@/domain/errors'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(null)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}
