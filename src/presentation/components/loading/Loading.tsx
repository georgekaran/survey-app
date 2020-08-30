import React from 'react'
import Styles from './Loading.scss'
import Spinner from '@/presentation/components/spinner/Spinner'

const Loading: React.FC = () => {
  return (
    <div className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Loading...</span>
        <Spinner />
      </div>
    </div>
  )
}

export default Loading
