import { SearchMusic } from './SearchMusic';
import {Music} from "./Music"
import "../Styles/Music.css"
export function OpenWeb({userLogued, logued}) {
if(logued===false)return(
    <h1>Logueate para poder compartir tu música o disfrutar la música de otro miles de usuarios que tambien usan UnivalleTify</h1>
)
    if(logued===true)return(
        <div >
        <SearchMusic></SearchMusic>
        <div className='music2'>
        <Music userLogued={userLogued}></Music>
        </div>
        </div>)
    
}