import ListGroup from 'react-bootstrap/ListGroup';
import { Form } from 'react-router-dom';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { NavbarOne } from './NavbarOne';
import { LoguinControl } from './LoguinControl';



export function Home({setModalShow, setLogued, Logued, userLogued}) {

  


const navigate = useNavigate() 
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleNavigate= async (e)=>{
    navigate("/lista/favoritos")
    setShow(false)
    
    
  }
  const handleLogout =( )=>{
    setLogued(false)
    navigate("/")
    setShow(false)
  }
  const handlePerfil = ()=>{
    navigate("/perfil/usuario")
    setShow(false)
  }
  const handleRegister =()=>{
    navigate("/registro/usuario")
    setShow(false)
  }
  const handleCrearCancion=()=>{
    navigate("/crear/cancion")
    setShow(false)
  }

 if(Logued===true) return (
    <>
    <NavbarOne setShow={setShow} setModalShow={setModalShow} setLogued={setLogued} Logued ={Logued}></NavbarOne>
    
      
      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Opciones de usuario</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
      <ListGroup.Item action onClick={handleNavigate} variant='ligth'>Ir a mi lista de favoritos</ListGroup.Item>
      
      <ListGroup.Item action onClick={handlePerfil} variant='ligth'>Ver  mi perfil</ListGroup.Item>  
      <ListGroup.Item action onClick={handleCrearCancion} variant='ligth'> Subir cancion </ListGroup.Item>
    </ListGroup>
    
    
        </Offcanvas.Body>
        <Button  variant='danger' onClick={handleLogout}>Cerrar sesión</Button>
      </Offcanvas>

      
    </>
  );
    
  if (Logued=== false)return(
    <>
    <NavbarOne setShow={setShow} setModalShow={setModalShow} setLogued={setLogued} Logued ={Logued}></NavbarOne>
      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Opciones de usuario</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
      <ListGroup.Item action onClick={handleNavigate} variant='danger'>Ir a mi lista de favoritos</ListGroup.Item>
      
      <ListGroup.Item action onClick={handlePerfil} variant='danger'>Ver  mi perfil</ListGroup.Item>  
    </ListGroup>
    
    
        </Offcanvas.Body>
        <Button  variant='danger' onClick={handleRegister}>Registrarme</Button>
      </Offcanvas>

      
    </>
  );
}