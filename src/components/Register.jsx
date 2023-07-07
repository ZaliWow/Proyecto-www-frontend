import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import {useNavigate} from "react-router-dom"


export function Register({Logued}) {

    // hook de navegacion
    const navigate =useNavigate()

    //creamos un hook para guardar el input del usuario al registrarse

    const [inputUser, setInputUser]= useState({
        correo_usuario:"",
        contra_usuario:"",
        id_usuario:""
    })

    // seteamos los valores ingresados por el usuario al hook usestate
    const handleChange = (e)=>{
        setInputUser({...inputUser, [e.target.name]: e.target.value})
    }

    //para setear todos los valores a la base de datos con ayuda de nuestro backend
    const  handleSubmit= async (e)=>{
        e.preventDefault()
        const res = await fetch('http://localhost:3000/user',{
        method:'POST',
        body:JSON.stringify(inputUser),
        headers:{"Content-Type":"application/json"}
        })
        navigate('/')
    }

    if(Logued===true)return(
        <h1>
            Ya estás logueado, tienes una cuenta; ¿Qué haces aquí?
        </h1>
    )
    if (Logued===false)return(
      <div>
        <Form onSubmit={handleSubmit}>
     

      <Form.Group className="mb-3" >
        <Form.Label>Correo Electronico</Form.Label>
        <Form.Control 
        name="correo_usuario"
        type="email" 
        placeholder="Ingresa correo del estudiante"
        onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Los correos electronicos son unicos para cada estudiante.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
        name="contra_usuario"
        type="password" 
        placeholder="Asigna una contraseña al estudiante" 
        onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Identificación</Form.Label>
        <Form.Control 
        name="id_usuario"
        type="text" 
        placeholder="Ingresa la identificacion del estudiante" 
        onChange={handleChange}
        />
   
      </Form.Group>
      <Button 
      variant="dark"
      type="submit" >
        Registrar
      </Button>
        </Form>
        </div> 
    )
    
}