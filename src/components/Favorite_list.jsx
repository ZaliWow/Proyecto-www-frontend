import "../Styles/Favorite_list.css"
import { Alerta } from "./Alert"
import { Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"

export function Favorite_list({Logued, onHide,show,onLogued, userLogued}) {
    
    const [mostrarDom, setMostrarDom]= useState(false)
    const[controladors, setControladors]= useState(false)
    const [listaFavs, setListaFavs] =  useState([])
    const[listaurlFavs, setListaurlFavs] = useState([])
    
    const handleFavs = async (e)=> {
        try {
        const result = await axios.get(`http://localhost:3000/favs/ids/${userLogued}`) 
     //  console.log(result.data)
       for(let i=0; result.data.length > i ; i++){
        //luego añadir en la posicion i de la lista favoritos la posicion i.id_cancion o url cancion del result
        setListaFavs(listaFavs =>[...listaFavs, result.data[i].id_cancion])
        }
         setControladors(true)
     // console.log(listaFavs)
     // console.log(result.data.length)
        } catch (error) {
           console.log(error) 
        }
       try {
         if(controladors=== true){
            handleUrlFavs()
         }
       } catch (error) {
         
       }
        
    }
   const handleUrlFavs = async (e)=> {
   // console.log(listaFavs.length)
    try {
         for (let i = 0; i < listaFavs.length; i++) {
            const result = await axios.get(`http://localhost:3000/music/url/${listaFavs[i]}`)
            const  url_encode = await encodeURIComponent(result.data[0].url_cancion)
           setListaurlFavs(listaurlFavs=>[...listaurlFavs, url_encode])
        }
        
      //  for(let i=0 ; i<= listaurlFavs.length; i++){
      //      setList_url(list_url=>[... list_url, listaurlFavs.url_cancion])
      //  }
        
    } catch (error) {
        
    }
   handleConfirmar()
   
   
   }
    const handleConfirmar = (e)=> {
     setMostrarDom(true)
   }
    
    if(Logued === false)return(
        <Alerta onHide={onHide} show={show} onLogued={onLogued}></Alerta>
    )
    if (Logued===true && mostrarDom=== false )return(
    
<div className="favorite_list">
   <h1>¡Solo un doble click mas!</h1>
<Button variant="danger" onClick={handleFavs}>Preparar mi lista</Button>
<br />

</div>
     )
if(Logued===true && mostrarDom=== true )return(
    
   <div className="favorite_list">
      {listaurlFavs.map((element, index )=>(
   <audio
     controls
     key={index}
      >
   <source src={decodeURIComponent(element)} type="audio/mp3"/>
      </audio>
      ))}
   
   
   
   </div>
   )

   }