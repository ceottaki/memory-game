import React from 'react'

import styles from './Footer.module.scss'

interface IFooterProps {
  siteLogo: string
}

export const Footer: React.FC<IFooterProps> = ({ siteLogo }) => {
  return (
    <div className={styles.footer}>
      <img data-src={siteLogo} loading='lazy' />
      Footer Here
    </div>
  )
}

export default Footer
