import axios from "axios"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import './Classes.css'


const TimeTableAdd = () =>{

    const {classesID2} = useParams()
    const token = localStorage.getItem("firsLogin")
    // console.log(token)
    const [info, setInfo] = useState({
        time: "",
        nPeople: "",
        date: classesID2
    })
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const onChangeInput = (e) =>{
        const {name, value} = e.target
        setInfo({...info, [name]: value})
    }
    // console.log(info)

    const addTimeSubmit = async e  =>{
        e.preventDefault()
        try {
            
            const response = await axios.post(`http://localhost:5000/api/createTime/${classesID2}`, {...info}, {headers:{"Authorization": token}})
            setSuccessMessage(response.data.message)
            setInfo({
                time: "",
                nPeople: "",
                date: classesID2
            })
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    
    }

    return(
        <div>
            
            <h6 >Añade un nuevo horario</h6>
            <form onSubmit={addTimeSubmit} className="formNewTimetable">
                <div className="container_input_addTmtb">
                    <input name="time" className="input_time input_design" onChange={onChangeInput} value={info.time} placeholder="Hora"></input>
                    <input name="nPeople" className="input_time input_design" onChange={onChangeInput} value={info.nPeople} placeholder="Nº de Personas"></input>
                </div>
                <div style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
                <div style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
                <div className="container_buttonT">
                    <button type="submit" className="button_submit">Añadir</button>
                    <Link to={`/timetables/${classesID2}`}><button className="button_submit">Cancelar</button></Link>
                </div>
            </form>

        </div>
    )
}

export default TimeTableAdd