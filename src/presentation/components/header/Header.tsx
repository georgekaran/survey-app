import React, { memo } from 'react'
import Styles from './Header.scss'

import Logo from '@/presentation/components/logo/Logo'

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>George</span>
          <a href="#">Logout</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
