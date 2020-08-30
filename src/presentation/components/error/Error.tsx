import React from 'react'
import Styles from './Error.scss'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload-btn" onClick={reload}>Reload</button>
    </div>
  )
}

export default Error
