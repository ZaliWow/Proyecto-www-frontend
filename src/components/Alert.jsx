import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
export function Alerta({}) {
  
    return (
      
        <Alert variant="dark">
          <Alert.Heading>No estás logueado</Alert.Heading>
          <p>
            No estás logueado, para poder ofrecerte tu lista personalizada por favor logueate.
          </p>
          
          <hr />
          <p className="mb-0">
           Si no cuentas con una cuenta, por favor registrate Aqui
          </p>
          <br />
          <Button variant="outline-danger" >Entrar</Button>{" "}
          <Button variant="outline-danger">Registrarme</Button>
   
        </Alert>
       
      );
    
}