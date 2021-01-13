import React from 'react'

import styles from './Card.module.scss'

import { ICard } from '../../common-types/ICard'

interface ICardProps {
  card: ICard
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface ICardState {
  opened: boolean
}

export const Card: React.FC<ICardProps> = ({ card, onClick }) => {
  return (
    <button
      type='button'
      className={`${styles.perspectiveContainer} btn btn-link`}
      onClick={onClick}
    >
      <div className={`${styles.cardWithBorder} ${card.isOpen ? styles.openedCard : ''}`}>
        <div className={styles.cardBack} />
        <div className={`${styles.cardFront} d-flex align-items-center justify-content-center`}>
          {card.matchValue}
        </div>
      </div>
    </button>
  )
}

export default Card
