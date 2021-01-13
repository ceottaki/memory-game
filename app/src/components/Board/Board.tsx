import React, { useEffect, useState } from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap'

import styles from './Board.module.scss'

import Card from '../Card/Card'
import { ICard } from '../../common-types/ICard'
import RunningTime from './RunningTime'
import { Utils } from '../../services/utils'

interface IBoardProps {
  height: number
  width: number
}

interface IBoardState {
  started: boolean
  startTime?: Date
  cards: ICard[]
}

export const Board: React.FC<IBoardProps> = ({ height, width }) => {
  const defaultState: IBoardState = {
    started: false,
    startTime: undefined,
    cards: []
  }

  const [{ started, startTime, cards }, setState] = useState(defaultState)

  useEffect(() => {
    if (started) {
      // Generate cards
      const totalCards = height * width
      const totalTypeCards = Math.floor(totalCards / 2)
      const newCards: ICard[] = []
      for (let i = 0; i < totalCards; i++) {
        let newMatchValue: number | undefined
        while (
          !newMatchValue ||
          newCards.filter((c) => c.matchValue === newMatchValue).length === 2
        ) {
          newMatchValue = Utils.randint(1, totalTypeCards)
        }

        newCards.push({ matchValue: newMatchValue, isOpen: false })
      }

      setState((s) => ({ ...s, cards: newCards }))
    } else if (startTime) {
      // Display score
    }
  }, [started])

  const toggleGameState = () => {
    setState((s) => ({
      ...s,
      started: !s.started,
      startTime: s.started ? s.startTime : new Date()
    }))
  }

  const openCard = (cardIndex: number) => {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setState((s) => {
        const numCardsOpened = s.cards.filter((c) => c.isOpen).length
        // If trying to close the current card when it's the only one open...
        if (s.cards[cardIndex].isOpen && numCardsOpened === 1) {
          // ...don't do anything.
          return s
        }

        // Closes all cards if more than one is already opened.
        const newCards: ICard[] = [...s.cards].map((card) =>
          numCardsOpened > 1 ? { ...card, isOpen: false } : card
        )

        // Flips the card in question.
        newCards[cardIndex].isOpen = !newCards[cardIndex].isOpen
        return { ...s, cards: newCards }
      })
    }
  }

  const rowsArray = Array.from(Array(height), (x, index) => index)
  const colsArray = Array.from(Array(width), (x, index) => index)

  return (
    <Container>
      <Row className='pb-3'>
        <Col>
          <Button variant={started ? 'secondary' : 'primary'} onClick={toggleGameState}>
            {started ? 'End' : 'Start'}
          </Button>
        </Col>
        <Col>{started && startTime ? <RunningTime startTime={startTime} /> : null}</Col>
      </Row>

      {cards && cards.length
        ? rowsArray.map((r) => (
            <Row key={r}>
              {colsArray.map((c) => (
                <Col key={c} className='pb-3'>
                  <Card
                    card={cards[r * (height + 1) + c]}
                    onClick={openCard(r * (height + 1) + c)}
                  />
                </Col>
              ))}
            </Row>
          ))
        : null}
    </Container>
  )
}

export default Board
