import React from 'react'

import styles from './Avatar.module.scss'

export const Avatar: React.FC = () => {
  return (
    <div>
      <img data-src='https://via.placeholder.com/120' alt='Avatar' loading='lazy' />
    </div>
  )
}

export default Avatar
