import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { initializeApp } from 'firebase/app';
import { getStorage,ref ,uploadBytes, getDownloadURL} from "firebase/storage";
import { useState } from "react";
import 'firebase/storage';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Crear_cancion({userLogued}) {

const navigate = useNavigate()
//-------------------------HOOKS Y CONTROLADORES DE FIREBASE Y SU STORAGE------------------------
    //hook para guardar el input
    const [urlSong, seturlSong]=useState()
    const[inputMP3, setInputMPR3]= useState()
    const[idSong, setIdSong]=useState()
// funcion para dar id a las canciones
const handleIdSong=(e) => {
  const usuariologueado = userLogued.correo_usuario
    // Obtiene la fecha actual
  const fechaActual = new Date();
  // Obtiene los componentes de la fecha (día, mes y año)
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo tanto, se suma 1
  const año = fechaActual.getFullYear();

  // Obtiene los componentes de la hora (hora, minutos y segundos)
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();
 
  // Crea un string con la fecha y hora actual
  const fechaHoraString = `Song-Create:${dia}:${mes}:${año} ${hora}:${minutos}:${segundos}`;

  // Realiza cualquier otra acción necesaria con el string de fecha y hora actual
  
  setIdSong(fechaHoraString)
 
}

    // configuracion de permisos para la storage
    // nota: esta configuracion es predeterminada de la libreria de firebase en su storage web
         
// dar datos de configuracion a fb
const firebaseConfig = {
    storageBucket: 'gs://proyecto-9a64e.appspot.com'
  };
  // inicializar firebase con la configuracion
  const app = initializeApp(firebaseConfig);
 
  // creo referencias 
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service




//guardar el input en el hook
  const handleFileChange = (event) => {
    event.preventDefault()
    setInputMPR3(event.target.files[0])
    handleIdSong()
  };
 
 const handleupload = async (event) =>{
    event.preventDefault()
    try {
        const storageRef = ref(storage, idSong)
        await  uploadBytes(storageRef,inputMP3)
        const url = await  getDownloadURL(storageRef)
        seturlSong(url) 
        console.log(url)
        handleIdURL()
    } catch (error) {
        console.error('Error al subir el archivo', error)
        alert('Error interno por favor intente mas tarde')
    }

     
  }
 
//-------------------------------------CONEXION CON EL BACKEND Y GUARDADO DE LOS INPUTS EN LA BASE DE DATOS -------------------------------
//hook para guardar todos los datos de la cancion
const [nombreSong,setNombreSong]=useState()
const [artista,setArtista]=useState()
const [atributosCancion, setAtributosCancion]=useState({
    id_cancion:"",
    nombre_cancion:"",
    url_cancion:"",
    artista_cancion:""
})
//hook para guardar datos de la relacion de favoritos
const [atribustosFavs, setAtributosFavs]= useState({
  id_usuario:"",
  id_cancion:"",
  id_favorito:""
})
//funcion para asignar el id y el url
const handleIdURL= async (e) =>{
  const idF = crypto.randomUUID()
    setAtributosCancion({
        id_cancion: idSong,
        nombre_cancion:nombreSong,
        url_cancion:urlSong,
        artista_cancion:artista        
    })
    setAtributosFavs({
      id_usuario:userLogued,
      id_cancion:idSong,
      id_favorito:idF
    })
  console.log(atribustosFavs)
 
}
// funcion para asignar el nombre 
const handleName= (event) =>{
    setNombreSong(event.target.value) 
}
//funcion para asignar el artista
const handleArtista=(e) =>{
   setArtista(e.target.value)
}
// funcion flecha controlador para destructurar todos los datos de la cancion
const handlePrueba= (event) =>{
   handleIdURL()
  console.log(atributosCancion)
  console.log(userLogued)
}

//funcion flecha controladora para subir la info a la bdd
const handleSubmit=async (e)=>{
  e.preventDefault()
  try { 
  
  const res= await fetch('http://localhost:3000/music', {
  method:'POST',
  body:JSON.stringify(atributosCancion),
  headers:{"Content-Type":"application/json"} })
  handleAddFavs()
  } catch (error) {
      
    }
    
}

// para añadir a favoritos despues de crear
const handleAddFavs = async(e)=>{
 // e.preventDefault()
  try {
    const result = await fetch('http://localhost:3000/favs',{
  method:'POST',
  body:JSON.stringify(atribustosFavs),
  headers:{"Content-Type":"application/json"}})
  navigate('/')
  } catch (error) {
    
  }
}

return(
        <div>
        <Form onSubmit={handleSubmit}>
     

      <Form.Group className="mb-3" >
        <Form.Label>Nombre de la cancion</Form.Label>
        <Form.Control 
        name="nombre_cancion"
        type="text"
        placeholder="Ingresa correo del estudiante"
        onChange={handleName}
        />
        
        <Form.Text className="text-muted">
          Los correos electronicos son unicos para cada estudiante.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Artista</Form.Label>
        <Form.Control 
        name="artista_cancion"
        type="text" 
        placeholder="Ingresa correo del estudiante"
        onChange={handleArtista}
        />
        
        <Form.Text className="text-muted">
          Ingrese el nombre del artista
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Elige tu mp3</Form.Label>
        <Form.Control 
        name="url_cancion"
        type="file" 
        placeholder="Asigna una contraseña al estudiante" 
        onChange={handleFileChange}
       
        />
      </Form.Group>
     
      <Button 
      variant="dark"
      
      onClick={handleupload}>
        Preparar Cancion
      </Button>
      <Button onClick={handleIdURL}>Confirmar</Button>
      <Button 
      variant="dark"
      type="submit" >
        Subir cancion
      </Button>
      
      
        </Form>
        </div> 
    )    
}