import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import NavBar from "../NavBar/NavBar"


const ExerciceDelete = () =>{
    const {IDexercice} = useParams()
    const token = localStorage.getItem("firsLogin")
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const deleteSubmit = async e =>{
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:5000/api/deleteExercice/${IDexercice}`, {headers:{"Authorization": token}})

            setSuccessMessage(response.data.message)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }

    }


    return(
        <div>
            <NavBar />
            <h2 className="subtitle">¡Eliminar Ejercicio!</h2>
            <h4>¿Desea eliminar el ejercicio?</h4>
            <div className="container_button">
                <button className="button_submit" onClick={deleteSubmit}>Aceptar</button>
                <Link to="/exercices"><button className="button_submit">Cancelar</button></Link>
            </div>
            <div style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
            <div style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>

            <Link to="/exercices">
                <div className="container_back_button">
                {/* <box-icon name='left-arrow-circle' size='lg' color='grey' className="back_button"></box-icon> */}
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                </div>
            </Link>
        </div>
    )
}

export default ExerciceDelete