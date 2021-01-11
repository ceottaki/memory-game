import { NextPage } from 'next'

import MainLayout from '../components/MainLayout/MainLayout'
import Avatar from '../components/Account/Avatar'

const Home: NextPage = () => (
  <MainLayout>
    <h3 className='text-center'>Hello, world.</h3>
    <Avatar />
  </MainLayout>
)

export default Home
