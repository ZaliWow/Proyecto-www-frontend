import "../Styles/Music.css"
import { useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"

export function Music({userLogued}) {
//hook para tener guardada toda la musica sus url
 const [listaMusica, setListaMusica] = useState([])
//hook para tener guardada toda la musica sus nombres
const [listaUrlMusica, setListaUrlMusica] = useState([])
//hook para tener guardados todos los ides de las canciones
const [listaIdMusica, setListaIdMusica] = useState([])
//hook para guardar la relacion dependiendo la lista
const [listaFavs, setListaFavs] = useState([])


const handleFoundMusic = async (e) =>{
    const res = await axios.get('http://localhost:3000/music')
    for(let i=0; res.data.length > i ; i++){
        const idF = crypto.randomUUID()
        setListaMusica(listaMusica =>[...listaMusica, res.data[i].url_cancion])
        setListaUrlMusica(listaUrlMusica=>[...listaUrlMusica, res.data[i].nombre_cancion])
        setListaIdMusica(listaIdMusica =>[...listaIdMusica, res.data[i].id_cancion])    
        setListaFavs(listaFavs=>[...listaFavs, { id_usuario:userLogued ,id_cancion:res.data[i].id_cancion, id_favorito:idF}])
   
    }
   console.log(listaFavs)     
}
const handleFavs =(i) => async (e) =>{
 const result = await fetch('http://localhost:3000/favs',{
 method:'POST',
body:JSON.stringify(listaFavs[i]),
headers:{"Content-Type":"application/json"}})
 console.log(listaFavs[i])
}


return(
        <>
        
        <div className="decoration_letters">
        <h1 onClick={handleFoundMusic}>Nueva música</h1>
        <h3>Recomendaciones</h3>
        </div>
        <br />
        <div className="music">
        <br />
        {listaMusica.map((elemento, index)=>(
        <div className="recomendacion">
            <audio
        controls
         key={index} 
        >
         <source src={elemento} type="audio/mp3"/>
         </audio>
         <h6>{listaUrlMusica[index]}</h6>
        
         <Button className="but" 
         variant="outline-danger" 
         onClick={handleFavs(index)}>Fav</Button>
        </div>
        ))}
        
       
        </div>
        </>
    )
    
}