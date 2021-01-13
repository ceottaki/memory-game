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
  pairsFlipped: number
  cards: ICard[]
  acceptingInput: boolean
}

export const Board: React.FC<IBoardProps> = ({ height, width }) => {
  const defaultState: IBoardState = {
    started: false,
    startTime: undefined,
    pairsFlipped: 0,
    cards: [],
    acceptingInput: false
  }

  const [{ started, startTime, pairsFlipped, cards, acceptingInput }, setState] = useState(
    defaultState
  )

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

        newCards.push({ matchValue: newMatchValue, isOpen: true, isMatched: false })
      }

      setState((s) => ({ ...s, cards: newCards, acceptingInput: false }))
      setTimeout(() => {
        setState((s) => {
          const closedCards = [...s.cards].map((card) => ({ ...card, isOpen: false }))
          return { ...s, cards: closedCards, acceptingInput: true }
        })
      }, 2500)
    } else if (startTime) {
      // Display score
      setState((s) => ({ ...s, acceptingInput: false }))
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
      if (!acceptingInput) {
        return
      }

      setState((s) => {
        const numCardsOpened = s.cards.filter((c) => c.isOpen).length
        let newPairsFlipped = s.pairsFlipped

        // If there's only one card opened...
        if (numCardsOpened === 1) {
          if (s.cards[cardIndex].isOpen) {
            // ...and trying to close the current card, don't do anything.
            return s
          }

          newPairsFlipped++

          if (
            s.cards[cardIndex].matchValue === (s.cards.find((c) => c.isOpen) as ICard).matchValue
          ) {
            // ...and the card about to be opened matches the card already opened, matches them.
            const matchedNewCards: ICard[] = [...s.cards].map((card) => ({
              ...card,
              isOpen: false,
              isMatched: card.isMatched || card.matchValue === s.cards[cardIndex].matchValue
            }))

            return { ...s, cards: matchedNewCards, pairsFlipped: newPairsFlipped }
          }
        }

        // Closes all cards if more than one is already opened.
        const newCards: ICard[] = [...s.cards].map((card) =>
          numCardsOpened > 1 ? { ...card, isOpen: false } : card
        )

        // Flips the card in question.
        newCards[cardIndex].isOpen = !newCards[cardIndex].isOpen
        return { ...s, cards: newCards, pairsFlipped: newPairsFlipped }
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
        <Col>Pairs flipped: {pairsFlipped}.</Col>
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
