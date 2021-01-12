import React from 'react'

import styles from './Card.module.scss'

import { ICard } from '../../common-types/ICard'

interface ICardProps {
  card: ICard
}

export const Card: React.FC<ICardProps> = ({ card }) => {
  return <div>{card.matchValue}</div>
}

export default Card
