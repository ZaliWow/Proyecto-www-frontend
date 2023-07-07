import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState,useRef } from 'react';
import { LoguinControl } from './LoguinControl';
import "../Styles/Navbar.css"


export function NavbarOne({setShow, setModalShow,Logued, setLogued}) {
  const handleShow = () => setShow(true);
  //Overlay props
  const target = useRef(null);
  // Validacion de loguin (falta conexion bdd)
  const navigate = useNavigate()
  const handleVisualLoguin=()=>{
    setModalShow(true)
    navigate("/loguin")
  }

const handleLogout =() =>{
  setLogued(false)
  navigate("/")
   
}

  if(Logued===false) return(
     <div className='Navbar'>
    <Navbar bg="danger" variant="dark" >
    <Container>
      <Navbar.Brand onClick={()=> navigate("/")}>UnivalletiFy</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto">
      <Button variant="danger" onClick={handleShow}>
      Options
      </Button>
      <Button variant="danger" 
      onClick={()=> navigate("/registro/usuario")}>Registrate</Button>
     
      </Nav>
      <Form className="d-flex">
       
      <Button variant="outline-light" onClick={handleVisualLoguin}>Entrar</Button>
      </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  )
 
   if(Logued===true) return(
      
        
        <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=> navigate("/")}>UnivalletiFy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
          <Button variant="danger" onClick={handleShow}>
          Options
          </Button>
          </Nav>
          <Form className="d-flex">
           
          <Button variant="outline-light" onClick={handleLogout}>Cerrar sesión</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     

     
    )
}