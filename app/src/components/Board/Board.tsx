import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Button, Col } from 'react-bootstrap'

import styles from './Board.module.scss'
import RunningTime from './RunningTime'
import ScoreBoard from './ScoreBoard'
import { ICard } from '../../common-types/ICard'
import { Utils } from '../../services/utils'
import Card from '../Card/Card'

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
  highScores: {
    pairsFlipped: number
    runningTime: Date
    timestamp: Date
  }[]
}

export const Board: React.FC<IBoardProps> = ({ height, width }) => {
  const generateCards = useCallback(
    (allClosed: boolean = false) => {
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

        newCards.push({ matchValue: newMatchValue, isOpen: !allClosed, isMatched: false })
      }

      return newCards
    },
    [height, width]
  )

  const defaultState: IBoardState = {
    started: false,
    pairsFlipped: 0,
    cards: Array.from(Array(width * height), (x, index) => ({
      matchValue: Math.floor(index / 2) + 1,
      isOpen: false,
      isMatched: false
    })),
    acceptingInput: false,
    won: false,
    highScores: []
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
      lastRunningTime,
      highScores
    },
    setState
  ] = useState(defaultState)

  useEffect(() => {
    const localHighScores = (JSON.parse(localStorage.getItem('highScores') || '[]') || []) as {
      pairsFlipped: number
      runningTime: Date
      timestamp: Date
    }[]

    setState((s) => ({
      ...s,
      highScores: localHighScores.map((h) => ({
        ...h,
        runningTime: new Date(h.runningTime),
        timestamp: new Date(h.timestamp)
      }))
    }))
  }, [])

  useEffect(() => {
    if (started) {
      // Generate cards
      const newCards: ICard[] = generateCards()

      setState((s) => ({ ...s, cards: newCards, acceptingInput: false, pairsFlipped: 0 }))
      setTimeout(() => {
        setState((s) => {
          const closedCards = [...s.cards].map((card) => ({ ...card, isOpen: false }))
          return { ...s, cards: closedCards, acceptingInput: true }
        })
      }, 2500)

      // if (topBoardRef && topBoardRef.current) {
      //   topBoardRef.current.scrollIntoView(true)
      // }
    } else if (startTime) {
      // Display score
      setState((s) => ({ ...s, acceptingInput: false }))
    }
  }, [generateCards, startTime, started])

  useEffect(() => {
    if (won) {
      const newHighScores = [
        ...highScores,
        {
          pairsFlipped,
          runningTime: new Date(Number(new Date()) - Number(startTime)),
          timestamp: new Date()
        }
      ]

      newHighScores.sort((a, b) => Number(a.runningTime) - Number(b.runningTime))

      setState((s) => ({
        ...s,
        started: false,
        lastPairsFlipped: s.pairsFlipped,
        lastRunningTime: new Date(Number(new Date()) - Number(s.startTime)),
        highScores: newHighScores.slice(0, 10)
      }))
    }
  }, [highScores, pairsFlipped, startTime, won])

  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores))
  }, [highScores])

  const toggleGameState = useCallback(() => {
    setState((s) => ({
      ...s,
      started: !s.started,
      startTime: s.started ? s.startTime : new Date(),
      won: false
    }))
  }, [])

  const openCard = (cardIndex: number) => {
    return () => {
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
  const topBoardRef = useRef<HTMLDivElement>(null)

  return (
    <div className='container'>
      <ScoreBoard
        showModal={!started || (won && !!lastRunningTime)}
        started={started}
        onToggleGameState={toggleGameState}
        highScores={highScores}
        winningCondition={
          won
            ? {
                lastPairsFlipped: lastPairsFlipped || 0,
                lastRunningTime: lastRunningTime || new Date(0)
              }
            : undefined
        }
      />

      {cards && cards.length ? (
        <div ref={topBoardRef} className={styles.cardsContainer}>
          {rowsArray.map((r) => (
            <div key={r} className={styles.cardRow} style={{ height: `${100 / height}%` }}>
              {colsArray.map((c) => (
                <div key={c} className={styles.cardCol} style={{ width: `${100 / width}%` }}>
                  <Card card={cards[r * width + c]} onClick={openCard(r * width + c)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {started ? (
        <div className={styles.currentScore}>
          <Col>Pairs: {pairsFlipped}</Col>
          <Col className='d-flex justify-content-center'>
            {startTime ? <RunningTime startTime={startTime} /> : null}
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant='secondary' onClick={toggleGameState} size='sm'>
              End
            </Button>
          </Col>
        </div>
      ) : null}
    </div>
  )
}

export default Board
