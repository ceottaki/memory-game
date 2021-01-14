import React from 'react'
import { NextPage } from 'next'

import Board from '../components/Board/Board'
import MainLayout from '../components/MainLayout/MainLayout'

const Home: NextPage = () => {
  return (
    <MainLayout metaTitle='Play Memory Game!' siteTitle='Memory Game'>
      <Board height={4} width={5} />
    </MainLayout>
  )
}

export default Home
