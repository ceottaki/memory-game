import Image from 'next/image'
import React from 'react'

export const Avatar: React.FC = () => {
  return (
    <div>
      <Image
        src='https://via.placeholder.com/120'
        height={120}
        width={120}
        alt='Avatar'
        loading='lazy'
      />
    </div>
  )
}

export default Avatar
