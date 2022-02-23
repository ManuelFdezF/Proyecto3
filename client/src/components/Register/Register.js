import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import './Register.css'
import NavBar from "../NavBar/NavBar"


const Register = () => {

    const token = localStorage.getItem("firsLogin")
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    useEffect(()=>{
        if (!token){
            navigate('/')
        } else{
            if (role != 1){
                navigate('/home')
            }
        }
    })

    const [info, setInfo] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        imagen: {"public_id": "", "url": "https://res.cloudinary.com/dzenpc7wi/image/upload/v1642780148/crossfitAPP/auxt7ab5smg7879zbq4f.webp"}
    })

const [errorMessage, setErrorMessage] = useState(null)
const [successMessage, setSuccessMessage] = useState(null)



const onChangeInput = (e) =>{
    const {name, value} = e.target
    setInfo({...info, [name]: value})
    
}
// console.log(info)




const registerSubmit = async e => {
    e.preventDefault()
            
    try {
        
        const response = await axios.post("/api/register", {...info}, {headers:{"Authorization": token}})
        setSuccessMessage(response.data.message)
       
        setInfo({
            name: "",
            surname: "",
            email: "",
            password: "",
            imagen: {"public_id": "", "url": "https://res.cloudinary.com/dzenpc7wi/image/upload/v1642780148/crossfitAPP/auxt7ab5smg7879zbq4f.webp"}
            })


    } catch (error) {
        setErrorMessage(error.response.data.message)
        // console.log(error.response)
    }

}
    return(
    <div>
        <NavBar />
        <form onSubmit={registerSubmit}> 
        <h2 className="subtitle">Registrar un usuario</h2>
        <div className="containerRegister">
            <div className="form-floating mb-3 container_inputReg">
                <input type="text" name="name" value={info.name} onChange={onChangeInput} className="form-control input_design" id="floatingName" placeholder="Nombre" />
                <label htmlFor="floatingName" className="color_input">Nombre</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="text" name="surname" value={info.surname} onChange={onChangeInput} className="form-control input_design" id="floatingSurname" placeholder="Apellido" />
                <label htmlFor="floatingSurname" className="color_input">Apellido</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="email" name="email" value={info.email} onChange={onChangeInput} className="form-control input_design" id="floatingEmail" placeholder="email@example.com" />
                <label htmlFor="floatingEmail" className="color_input">Email</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="password" name="password" value={info.password} onChange={onChangeInput} className="form-control input_design" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword" className="color_input">Contraseña</label>
            </div>
        </div>
        <div style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
        <div style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
        <button type="submit" className="button_submit">Registrar</button>
        
        </form>
        <Link to="/home">
                <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                </div>
            </Link>
    </div>
    )
}

export default Register