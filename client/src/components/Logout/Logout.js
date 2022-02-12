import './Logout.css'
import {Link, useNavigate} from 'react-router-dom'
import NavBarLogin from '../NavBar/NavBarLogin'
import { useEffect } from 'react'


const Logout = () =>{
    
    localStorage.removeItem("firsLogin")
    localStorage.removeItem("role")
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        }, 3000)
        
    },[])
    
    return (
        <div>
            <NavBarLogin />
            <div className="container_logout">
                <h2 className="subtitle">¡¡Esperamos verte pronto!!</h2>
            </div>
            
            <div>
                <Link to="/" ><button className="button_submit">Ir al login</button></Link>
            </div>
        </div>
    )
}

export default Logout