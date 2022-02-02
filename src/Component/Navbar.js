import React from 'react';
import {Nav, Navbar,Container } from 'react-bootstrap';

//logo
import cryptologos from '../images/cryptologos.png'

const Navbars = () => {
  return <>
   <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand className='' href="#home"><img className='nav-logo' src={cryptologos} alt="" /></Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
         <Nav.Link href="#home">Coins</Nav.Link>
         <Nav.Link href="#link">NFT Games</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar></>;
};

export default Navbars;
