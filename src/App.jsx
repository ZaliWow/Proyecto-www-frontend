import { useState } from 'react'
import { Button } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Favorite_list } from './components/Favorite_list';
import { OpenWeb } from './components/OpenWeb';
import { Loguin } from './components/Loguin';
import { useNavigate } from 'react-router-dom';
import {LoguinControl} from './components/LoguinControl'
import { Register } from './components/Register';
import { Perfil } from './components/Perfil';
import { Crear_cancion } from './components/Crear_cancion';



function App() {
  
  const [modalShow, setModalShow] = useState(false);
  const [logued, setLogued] = useState(false);
  const [userLogued, setUserLogued] = useState("")
  
  return (
    <>
      <BrowserRouter>
      <Home 
      userLogued={userLogued}
      setModalShow={setModalShow} 
      setLogued ={setLogued}
      Logued={logued}
      ></Home>
      <Routes>
        <Route
        path="/crear/cancion"
        element={<Crear_cancion userLogued={userLogued}></Crear_cancion>}
        ></Route>
        <Route
        path='/Loguin'
        element={
        <Loguin 
        setUserLogued={setUserLogued}
        onLogued={() => setLogued(true)}
        show={modalShow}
        onHide={() => setModalShow(false)}>
        </Loguin>}></Route>
         <Route
         path='/'
         element={<OpenWeb userLogued={userLogued} logued={logued}></OpenWeb>}></Route>
        <Route
        path='/Lista/Favoritos'
        element={<Favorite_list 
          Logued={logued}
          userLogued={userLogued}
        ></Favorite_list>}>
        </Route>
        <Route
        path='/registro/usuario'
        element={<Register Logued={logued} />}>
        </Route>
        <Route
        path='/perfil/usuario'
        element={<Perfil Logued={logued} />}></Route>
      </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
