import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarLogin from '../NavBar/NavBarLogin'

import './Login.css'


const Login = () =>{
    

    const [info, setInfo] = useState({
        email: "",
        password: ""
    })  
    

const navigate = useNavigate()
        
const [errorMessage , setErrorMessage] = useState(null)
const [successMessage, setSuccessMessage] = useState(null)

const onChangeInput = (e) =>{
    const {name , value} = e.target
    setInfo({...info, [name]: value})
}
// console.log(info)

const loginSubmit = async e =>{

    e.preventDefault()
    try {
        const response = await axios.post ("/api/login", {...info})
        localStorage.setItem("firsLogin", response.data.accessToken)
        localStorage.setItem("role", response.data.role)
        
        setSuccessMessage(response.data.message)
        navigate('/home')
        
        
    } catch (error) {
        setErrorMessage(error.response.data.message)
    }
}

    return(
        <div> 
            <NavBarLogin />
            <form onSubmit={loginSubmit}>
            <h2 className="subtitle">¡¡Bienvenido!!</h2>
            <h4 className="subtitle_copy">¡Introduce tus datos de acceso!</h4>
            <div className="form-floating mb-3 container_inputReg">
                <input type="email" name="email" value={info.email} onChange={onChangeInput} className="form-control input_design" id="floatingEmail" placeholder="email@example.com" />
                <label htmlFor="floatingEmail" className="color_input">Email</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="password" name="password" value={info.password} onChange={onChangeInput} className="form-control input_design" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword" className="color_input">Contraseña</label>
            </div>
            <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
            <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
            <button className="button_submit" type="submit">Enviar</button>
            </form>
        </div>
    )

}
export default Login