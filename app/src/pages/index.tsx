import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

import Board from '../components/Board/Board'
import MainLayout from '../components/MainLayout/MainLayout'
import withWindowSize, { IWindowSizeProps } from '../components/Utilities/withWindowsSize'

interface IHomeState {
  boardHeight: number
  boardWidth: number
}

const Home: NextPage<IWindowSizeProps> = ({ windowSize }) => {
  const defaultState: IHomeState = { boardHeight: 4, boardWidth: 5 }
  const [{ boardHeight, boardWidth }, setState] = useState(defaultState)

  useEffect(() => {
    const isScreenTaller =
      windowSize && windowSize.height && windowSize.width && windowSize.height > windowSize.width

    setState((s) => ({
      ...s,
      boardHeight: isScreenTaller ? 5 : 4,
      boardWidth: isScreenTaller ? 4 : 5
    }))
  }, [windowSize, windowSize.height, windowSize.width])

  return (
    <MainLayout metaTitle='Play Memory Game!' siteTitle='Memory Game'>
      <Board height={boardHeight} width={boardWidth} />
    </MainLayout>
  )
}

export default withWindowSize(Home)
