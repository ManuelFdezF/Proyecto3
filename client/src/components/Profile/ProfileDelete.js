import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavBar from "../NavBar/NavBar"



const ProfileDelete = () =>{

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("firsLogin")
    const navigate = useNavigate()
    useEffect(()=>{
        if (!token) navigate('/')
    },[])

    const deleteProfile = async e =>{
        e.preventDefault()

        try {
            

            const response = await axios.delete("http://localhost:5000/api/deleteUser", {headers: {"Authorization": token}})
            setSuccessMessage(response.data.message)
            // setTimeout(()=>{
            //     navigate('/')
            // }, 3000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }

    }


    return(
        <div>
            <NavBar />
            <h2 className="subtitle">¿Eliminar tu cuenta de usuario?</h2>
            <h5>Si eliminas tu cuenta no podrás volver a acceder a la aplicación.</h5>
            <h4>¿Estás seguro?</h4>
            <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
            <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
            <button className="button_delete_user" onClick={deleteProfile}>Eliminar cuenta</button>
            <Link to="/profileData"><button className="button_submit">Cancelar</button></Link>

        </div>
    )
}

export default ProfileDelete