import { Alerta } from "./Alert"

export function Perfil({Logued}) {
    if(Logued===false)return(
        <Alerta></Alerta>
    )
    return(
        <h1>Perfil de usuario</h1>
    )
    
}