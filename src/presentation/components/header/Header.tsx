import React, { memo, useContext } from 'react'
import Styles from './Header.scss'

import Logo from '@/presentation/components/logo/Logo'
import { ApiContext } from '@/presentation/contexts'
import { useHistory } from 'react-router-dom'

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault()
    setCurrentAccount(null)
    history.push('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a
            data-testid="logout"
            href="#"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
