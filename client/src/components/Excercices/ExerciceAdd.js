import axios from "axios"
import { useState } from "react"
import './Exercices.css'
import { Link } from "react-router-dom"
// import { useForm } from 'react-hook-form'
const ExerciceAdd = () =>{
        const [info, setInfo] = useState({
            nameExercice: "" 
        })
        // const navigate = useNavigate()
        const [errorMessage, setErrorMessage] = useState(null)
        const [successMessage, setSuccessMessage] = useState(null)

        // const {addSubmit} = useForm()

        const onChangeInput = (e) =>{
            const {name, value} = e.target
            setInfo({...info, [name]: value})
            
        }
        // console.log(info)
        const addSubmit = async e =>{
            e.preventDefault()
            const token = localStorage.getItem("firsLogin")

            try {
                const response = await axios.post("http://localhost:5000/api/createExercice", {...info} , {headers:{"Authorization": token}}) 
                setSuccessMessage(response.data.message)
                // setTimeout(()=>{
                //     navigate('/exercices')
                // },2000)
                // e.target.reset()
                setInfo({ nameExercice: "" })
            } catch (error) {
                setErrorMessage(error.response.data.message)
            }

        }

        
        
    

    return(

        <div>
            <form onSubmit={addSubmit}>
            <div className="form-floating mb-3 container_inputReg">
                <input type="text" name="nameExercice" value={info.nameExercice} onChange={onChangeInput} className="form-control input_design" id="floatingName" placeholder="Nombre" />
                <label htmlFor="floatingName" className="color_input">Nuevo Ejercicio</label>
            </div>
                {/* <input name="nameExercice" placeholder="Nuevo Ejercicio" className="input_addEx" onChange={onChangeInput}></input><br /> */}
                <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
                <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
                <button type="submit" className="button_submit">Aceptar</button>
                <Link to="/exercices"><button className="button_submit">Cancelar</button></Link>
            </form>
        </div>
    )
}

export default ExerciceAdd