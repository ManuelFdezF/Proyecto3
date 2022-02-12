import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import NavBar from "../NavBar/NavBar"

const DeleteUser = () =>{
    const { userID } = useParams()
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const token = localStorage.getItem("firsLogin")

    const deleteSubmit = async e =>{
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/api/deleteUsers/${userID}`, {headers:{"Authorization": token}})
            setSuccessMessage(response.data.message)
            console.log(response.data.message)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }



    return(
        <div>
            <NavBar />
            <h2 className="subtitle">Eliminar Usuario</h2>
            <h4>¿Estás seguro que quieres eliminar el usuario?</h4>
            <div className="container_button">
                <button className="button_submit" onClick={deleteSubmit}>Aceptar</button>
                <Link to="/usersList"><button className="button_submit">Cancelar</button></Link>
            </div>

            <div style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
            <div style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
            <Link to="/usersList">
            <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
            </div>
        </Link>
        </div>
    )
}

export default DeleteUser