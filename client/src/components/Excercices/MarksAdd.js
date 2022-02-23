import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom";


const MarksAdd = () => {
    const { exerciceAddMarkID } = useParams();
   

    const[info, setInfo] = useState({
        date: "",
        reps: "",
        weight: "",
        comment: "", 
        exerciceID: exerciceAddMarkID // id del ejercicio cuando la reciba
        // user: "" // lo identifico en la llamada
    })

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const token = localStorage.getItem("firsLogin")

    const onChangeInput = (e) =>{
        const {name , value} = e.target
        setInfo({...info, [name]: value})
    }
    
    const addScore = async e =>{
        e.preventDefault()
        try {
           
            const response = await axios.post("/api/createMark", {...info}, {headers:{"Authorization": token}})
            setSuccessMessage(response.data.message)
            // navigate(`/marks/${exerciceAddMarkID}`)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }


    return (

        <div>
            <h3 className="subtitle">Añade una marca nueva</h3>
            <form onSubmit={addScore} className="addScore_form">
            <div className="container_mod">
            <div className="form-floating mb-3 container_inputReg">
                <input type="date" name="date" value={info.date} onChange={onChangeInput} className="form-control" id="floatingDateM" placeholder="Fecha" />
                <label htmlFor="floatingDateM">Fecha</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="number" name="reps" value={info.reps} onChange={onChangeInput} className="form-control" id="floatingRepsM" placeholder="Repeticiones" />
                <label htmlFor="floatingRepsM">Repeticiones</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="number" name="weight" value={info.weight} onChange={onChangeInput} className="form-control" id="floatingWeightM" placeholder="Peso" />
                <label htmlFor="floatingWeightM">Peso</label>
            </div>
            <div className="form-floating mb-3 container_inputReg">
                <input type="text" name="comment" value={info.comment} onChange={onChangeInput} className="form-control" id="floatingWeightM" placeholder="Comentario" />
                <label htmlFor="floatingWeightM">Comentario</label>
            </div>
                <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
                <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
            </div> 
                <button className="button_submit" type="submit">Aceptar</button>
                <Link to={`/marks/${exerciceAddMarkID}`}><button className="button_submit">Cancelar</button></Link>
            </form>


        </div>
    )
}

export default MarksAdd