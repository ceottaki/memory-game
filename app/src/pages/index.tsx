import { NextPage } from 'next'

import Board from '../components/Board/Board'
import MainLayout from '../components/MainLayout/MainLayout'

const Home: NextPage = () => (
  <MainLayout>
    <Board height={6} width={6} />
  </MainLayout>
)

export default Home
