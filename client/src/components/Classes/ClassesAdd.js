import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

const ClassesAdd = ()=>{
    const token = localStorage.getItem("firsLogin")
    const [info, setInfo] = useState({
        date: "",
        wodDay: ""
    })
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
    
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
    const onChangeInput = (e)=>{
        const {name, value} = e.target
        setInfo({...info, [name]: value})
    }
    // console.log(info)

    const createClass = async e =>{
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/createClass", {...info}, {headers: {"Authorization": token}})
            setSuccessMessage(response.data.message)
            setInfo({
                date: "",
                wodDay: ""
                })
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
       

    }

    return(
        <div>
            <NavBar />
            <form onSubmit={createClass} className="classes_form">
                <h2 className="subtitle">Crear Clase</h2>
            <div className="form-floating mb-3 container_inputReg">
                <input type="date" name="date" value={info.date} onChange={onChangeInput} className="form-control input_design" id="floatingDateC" placeholder="Fecha" />
                <label htmlFor="floatingDateC" className="color_input">Fecha</label>
            </div>
                
            <div className="form-floating mb-3 container_inputReg container_input_wod">
                <textarea type="text" name="wodDay" value={info.wodDay} onChange={onChangeInput} className=" input_design input_wod" id="floatingWod" placeholder="Wod del día" />
                <label htmlFor="floatingWod" className="color_input"></label>
            </div>
                <button className="button_submit">Aceptar</button>
            </form>
            <div style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
            <div style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>

        <Link to="/home">
            <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
            </div>
        </Link>
        </div>
    )
}

export default ClassesAdd