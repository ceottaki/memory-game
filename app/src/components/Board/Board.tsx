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
  won: boolean
  lastPairsFlipped?: number
  lastRunningTime?: Date
}

export const Board: React.FC<IBoardProps> = ({ height, width }) => {
  const defaultState: IBoardState = {
    started: false,
    pairsFlipped: 0,
    cards: [],
    acceptingInput: false,
    won: false
  }

  const [
    {
      started,
      startTime,
      pairsFlipped,
      cards,
      acceptingInput,
      won,
      lastPairsFlipped,
      lastRunningTime
    },
    setState
  ] = useState(defaultState)

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

      setState((s) => ({ ...s, cards: newCards, acceptingInput: false, pairsFlipped: 0 }))
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

  useEffect(() => {
    if (won) {
      setState((s) => ({
        ...s,
        started: false,
        lastPairsFlipped: s.pairsFlipped,
        lastRunningTime: new Date(Number(new Date()) - Number(s.startTime))
      }))
    }
  }, [won])

  const toggleGameState = () => {
    setState((s) => ({
      ...s,
      started: !s.started,
      startTime: s.started ? s.startTime : new Date(),
      won: false
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

            return {
              ...s,
              cards: matchedNewCards,
              pairsFlipped: newPairsFlipped,
              won: s.won || !matchedNewCards.find((c) => !c.isMatched)
            }
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
        <Col>{started ? `Pairs flipped: ${pairsFlipped}.` : null}</Col>
        <Col>{started && startTime ? <RunningTime startTime={startTime} /> : null}</Col>
      </Row>

      {won && lastRunningTime ? (
        <Row>
          <Col>YOU WON!</Col>
          <Col>Pairs flipped: {lastPairsFlipped}.</Col>
          <Col>
            Elapsed time: {lastRunningTime.getUTCHours()}h {lastRunningTime.getUTCMinutes()}m{' '}
            {lastRunningTime.getUTCSeconds()}s.
          </Col>
        </Row>
      ) : null}

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
