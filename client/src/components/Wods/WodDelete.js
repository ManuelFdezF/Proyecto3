import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import './Wods.css'
import NavBar from "../NavBar/NavBar"
import swal from 'sweetalert'

const WodDelete = () =>{

    const [wodss, setWodss] = useState([])
    const token = localStorage.getItem('firsLogin')
    const role = localStorage.getItem('role')
    // console.log(token)
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        let mounted = true
        if (!token){
            navigate('/')
        } else{
            if (role != 1){
                navigate('/home')
            }
        }

        axios.get("http://localhost:5000/api/wodsList", {headers:{"Authorization": token}} ).then((response) =>{
            // console.log(response)
            if (mounted){
                setWodss(response.data.wods)
            }
        })
        return () => mounted = false
    }, )

    const showAlert = (IDWod) =>{
        // console.log(IDWod)
        localStorage.setItem('wod', IDWod)
        swal({
            text: "¿Estás seguro que quieres eliminar el WOD?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta  =>{
            let wodd = localStorage.getItem("wod")
            if(respuesta){
                axios.delete(`http://localhost:5000/api/deleteWod/${wodd}`, {headers:{"Authorization": token}})
                swal({text: "El Wod se ha eliminado correctamente", icon: "success", timer: "2000"})
                localStorage.removeItem("wod")
            }else{
                localStorage.removeItem("wod")
            }     
            })
    }

    // const deleteWod = async (idWod) =>{
    //     try {
    //         const responsee = await axios.delete(`http://localhost:5000/api/deleteWod/${idWod}`, {headers:{"Authorization": token}})
    //         // console.log("response del delete",responsee)
    //         setSuccessMessage(responsee.data.message)
    //     } catch (error) {
    //         setErrorMessage(error.responsee.data.message)
    //     }
    // }

    return(
        <div>
            <NavBar />
            <h2 className="subtitle">Eliminar WODs</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="copy_Input">WODs</th>
                            {/* <th>Eliminar</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wodss.map((WODS)=>{
                                return(
                                <tr key={WODS._id} >
                                    <td>{WODS.name}</td>
                                    {/* <div onClick={()=>{deleteWod(WODS._id)}}>❌</div> */}
                                    <td onClick={()=>{showAlert(WODS._id)}}>❌</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                        {/* <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
                        <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div> */}
                        <Link to="/home">
                            <div className="container_back_button">
                            {/* <box-icon name='left-arrow-circle' size='lg' color='grey' className="back_button"></box-icon> */}
                            <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                            </div>
                        </Link>
                    
                
        </div>
    )
}

export default WodDelete