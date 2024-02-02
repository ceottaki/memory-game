import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Modal, Row, Table } from 'react-bootstrap'

import styles from './ScoreBoard.module.scss'
import { Utils } from '../../services/utils'

interface IScoreBoardProps {
  showModal: boolean
  started: boolean
  onToggleGameState: () => void
  pairsFlipped: number
  startTime?: Date
  highScores: {
    pairsFlipped: number
    runningTime: Date
    timestamp: Date
  }[]
  winningCondition?: {
    lastPairsFlipped: number
    lastRunningTime: Date
  }
}

const ScoreBoard: React.FC<IScoreBoardProps> = ({
  showModal,
  started,
  onToggleGameState,
  pairsFlipped,
  startTime,
  highScores,
  winningCondition
}) => {
  const { basePath } = useRouter()

  return (
    <Modal show={showModal} onHide={onToggleGameState} size='lg' backdrop='static' keyboard={false}>
      <Modal.Body className='text-center'>
        {winningCondition ? (
          <>
            <h1 className='pb-3'>You Won!</h1>
            <h2>
              Pairs flipped: {winningCondition.lastPairsFlipped}.<br />
              Elapsed time: {Utils.formatElapsedTime(winningCondition.lastRunningTime)}.
            </h2>
          </>
        ) : (
          <h1 className='pb-3'>
            Welcome to
            <br />
            Memory Game!
          </h1>
        )}
        <Button variant={started ? 'secondary' : 'primary'} onClick={onToggleGameState}>
          {started ? 'End' : 'Start'}
        </Button>
        <div className='pt-3'>
          <Table size='sm' striped={true}>
            <thead>
              <tr>
                <th colSpan={4}>High Scores</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Elapsed Time</th>
                <th>Pairs Flipped</th>
                <th>Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(10), (x, index) => index).map((i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {highScores[i] ? Utils.formatElapsedTime(highScores[i].runningTime) : null}
                  </td>
                  <td>{highScores[i] ? highScores[i].pairsFlipped : null}</td>
                  <td>{highScores[i] ? highScores[i].timestamp.toLocaleString() : null}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className={styles.footer}>
          Built with <img src={`${basePath}/images/love.svg`} width='24' height='24' />
          <br />
          &copy; {new Date().getUTCFullYear()}{' '}
          <a target='_blank' href='https://github.com/ceottaki' rel='noreferrer'>
            Felipe Ceotto
          </a>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ScoreBoard
