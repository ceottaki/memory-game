import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Memory Game</Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Header
