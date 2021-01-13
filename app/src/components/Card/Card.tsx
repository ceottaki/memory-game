import React from 'react'
import Image from 'next/image'

import styles from './Card.module.scss'

import { ICard } from '../../common-types/ICard'

interface ICardProps {
  card: ICard
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Card: React.FC<ICardProps> = ({ card, onClick }) => {
  return (
    <button
      type='button'
      className={`${styles.perspectiveContainer} btn btn-link`}
      onClick={onClick}
    >
      <div
        className={`${styles.cardWithBorder} ${
          card.isOpen || card.isMatched ? styles.openedCard : ''
        }`}
      >
        <div className={styles.cardBack} />
        <div className={`${styles.cardFront} d-flex align-items-center justify-content-center`}>
          <Image layout='fill' src={`/images/cards/${card.matchValue}.png`} alt='Card' />
        </div>
      </div>
    </button>
  )
}

export default Card
