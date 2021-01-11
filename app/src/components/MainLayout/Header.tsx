import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import styles from './Header.module.scss'

interface IHeaderProps {
  siteLogo: string
}

export const Header: React.FC<IHeaderProps> = ({ siteLogo }) => {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>
          <img data-src={siteLogo} loading='lazy' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
