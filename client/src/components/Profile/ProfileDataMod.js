import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import './Profile.css'

const ProfileDataMod = () =>{

    const[info, setInfo] = useState({
        name: "",
        surname: "",
        password: ""
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    

    const onChangeInput = (e) =>{
        const {name , value} = e.target
        setInfo({...info, [name]: value})
    }
    

    const modSubmit = async e =>{

        e.preventDefault()
        try {
            const token = localStorage.getItem("firsLogin")
           
            const response = await axios.put("http://localhost:5000/api/updateProfile", {...info}, {headers:{"Authorization": token}} )
            // console.log (response)
            setSuccessMessage(response.data.message)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }

    }

    return(
        <div>
            <h5 className="subtitle_modprofile">Introduce los datos a modificar</h5>
            <form onSubmit={modSubmit}>
                <div className="container_mod">
                <div className="form-floating mb-3 container_inputReg">
                <input type="text" name="name" value={info.name} onChange={onChangeInput} className="form-control input_design" id="floatingName" placeholder="Nombre" />
                <label htmlFor="floatingName" className="color_input">Nombre</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="text" name="surname" value={info.surname} onChange={onChangeInput} className="form-control input_design" id="floatingSurname" placeholder="Apellido" />
                <label htmlFor="floatingSurname" className="color_input">Apellido</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="password" name="password" value={info.password} onChange={onChangeInput} className="form-control input_design" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword" className="color_input">Contraseña</label>
            </div>
                <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
                <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
                </div> 
                <div className="container_input_addTmtb">
                <button className="button_submit" type="submit">Aceptar</button>
                <Link to="/profileData"><button className="button_submit">Cancelar</button></Link>
                </div>
            </form>
        </div>
    )
}

export default ProfileDataMod