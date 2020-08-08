import React, { memo } from 'react'
import Styles from './LoginHeader.scss'

import Logo from '@/presentation/components/logo/Logo'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>Survey App</h1>
    </header>
  )
}

export default memo(LoginHeader)
