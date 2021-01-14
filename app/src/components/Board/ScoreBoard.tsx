import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import RunningTime from './RunningTime'

interface IScoreBoardProps {
  className?: string
  started: boolean
  onToggleGameState: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  pairsFlipped: number
  startTime?: Date
}

const ScoreBoard: React.FC<IScoreBoardProps> = ({
  className,
  started,
  onToggleGameState,
  pairsFlipped,
  startTime
}) => {
  return (
    <Row className={`pb-1 pb-md-3 ${className || ''}`}>
      <Col>
        <Button variant={started ? 'secondary' : 'primary'} onClick={onToggleGameState}>
          {started ? 'End' : 'Start'}
        </Button>
      </Col>
      <Col>{started ? `Pairs flipped: ${pairsFlipped}` : null}</Col>
      <Col>{started && startTime ? <RunningTime startTime={startTime} /> : null}</Col>
    </Row>
  )
}

export default ScoreBoard
