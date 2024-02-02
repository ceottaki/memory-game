import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  const { basePath } = useRouter()

  return (
    <div className={styles.footer}>
      Built with <Image src={`${basePath}/images/love.svg`} alt='love' width={24} height={24} />
      <br />
      &copy; {new Date().getUTCFullYear()}{' '}
      <a target='_blank' href='https://github.com/ceottaki' rel='noreferrer'>
        Felipe Ceotto
      </a>
    </div>
  )
}

export default Footer
