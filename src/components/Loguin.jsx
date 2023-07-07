import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useRef } from 'react';
import  axios  from 'axios';
import { Crear_cancion } from './Crear_cancion';

export  function Loguin({...props}) {
  // para mantener los datos del usuario que se loguea
  

  //hook para guardar datos de usuario
  const [correoUsuario, setCorreoUsuario]= useState('')
  const [contraUsuario, setContraUsuario]= useState('')

  //hook de navegacion
    const navigate = useNavigate()

  //funciones para asignar valores ingresados por usuario a las hooks
  const handlecorreo =(e)=>{
    setCorreoUsuario(e.target.value)
  }
  const handlecontra =(e)=>{
    setContraUsuario(e.target.value)
  }
  // funcion flecha para mostrar el modal del loguin  y loguearse
    const handleModalShow=async(e)=>{
        try {
          const res = await axios.get('http://localhost:3000/user')
          for(let i=0; res.data.length > i; i++){
            if(res.data[i].correo_usuario===correoUsuario && res.data[i].contra_usuario===contraUsuario)
         {
        console.log(res.data)
        navigate("/")
        props.onHide()
        props.onLogued()
        props.setUserLogued(res.data[i].id_usuario)
       
        console.log("estoy logueado")
         }else{
          console.log("mi brother esa cuenta no existe")
         }
          }
        } catch (error) {
          console.log("mi brother hubo un error")
        }
        
      }
  //funcion flecha para redireccionar al registro
    const handleRedirectRegister=(e)=>{
        navigate("/registro/usuario")
    }



    return(
      <div>
        <Modal
        {...props}
        backdrop="static"
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Entrar a Univalletify
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control 
        name="correo_usuario"
        type="email" 
        placeholder="Ingresa tu usuario"
        onChange={handlecorreo}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
        name="contra_usuario"
        type="password" 
        placeholder="Ingresa tu contraseña"
        onChange={handlecontra} />
      </Form.Group>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger"onClick={handleModalShow}>Entrar</Button>
          <Button variant ="outline-danger"onClick={handleRedirectRegister}>Registrarse</Button>
        </Modal.Footer>
      </Modal>
      
      </div>
    )
}