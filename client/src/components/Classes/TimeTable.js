import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import swal from "sweetalert"
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar"

const TimeTable = () =>{
    const {classesID} = useParams()
    const token = localStorage.getItem("firsLogin")
    const [timeTables, setTimeTables] = useState(null)
    const [currentDate, setCurrentDate] = useState(null)
    // const [successMessage, setSuccessMessage] = useState(null)
    // const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    useEffect (()=>{
        // const getTimeTable = async ()=>{
            let mounted = true
            axios.get(`http://localhost:5000/api/classesList/${classesID}`, {headers:{"Authorization": token}}).then((response)=>{
                if (mounted){
                    setTimeTables(response.data.timeTable)
                    setCurrentDate(response.data.date)
                }
            })
        // }  
        // getTimeTable()
        return () =>{
            mounted = false
        }
    },)
    // Alerta para eliminar el horario ----------
    const showAlert = (IDTime) =>{
        // console.log(IDTime)
        localStorage.setItem('time', IDTime)
        swal({
            text: "¿Estás seguro que quieres eliminar el horario?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(async (respuesta)  =>{
            let timeID = localStorage.getItem("time")
            try {
                if(respuesta){
                   const response = await axios.delete(`http://localhost:5000/api/deleteTime/${timeID}`, {headers:{"Authorization": token}})
                //    setSuccessMessage(response.data.message)
                    swal({text: response.data.message, icon: "success", timer: "2000"})
                    localStorage.removeItem("time")
                }else{
                    localStorage.removeItem("time")
                }     
                
            } catch (error) {
                // setErrorMessage(error.response.data.message)
            }
            })
    }
    // Alerta para eliminar la clase y los horarios
    const showAlert1 = (IDClass) =>{
        // console.log(IDClass)
        localStorage.setItem('class', IDClass)
        swal({
            // title: "Eliminar Usuario",
            text: "¿Estás seguro que quieres eliminar la clase?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(async (respuesta)  =>{
            let IDclass = localStorage.getItem("class")
            try {
                if(respuesta){
                    const response = await axios.delete(`http://localhost:5000/api/deleteClass/${IDclass}`, {headers:{"Authorization": token}})
                    // setSuccessMessage(response.data.message)
                    swal({text: response.data.message, icon: "success", timer: "2000"})
                    localStorage.removeItem("class")
                    navigate('/classeslist')
                } else{
                    localStorage.removeItem("class")
                }  
                
            } catch (error) {
                // setErrorMessage(error.response.data.message)
            }
            })
    }


    const loading = ()=>{
        return (
        <div>
            <Loader />
        </div>
        )
    }

    const screen = () =>{
        let correctDate = ""
                let date1= new Date(currentDate.date)
                let year = date1.getFullYear();
                let month = date1.getMonth() + 1;
                let dt = date1.getDate();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                correctDate = dt + "/" + month + "/" + year
    return(
    <div>
        <NavBar />
        <h2 className="subtitle">Listado de horarios</h2>
        {
            <h4 className="nameExerciceMarks">{correctDate}</h4>
        }
            <table className="table mx-auto table-striped"> 
            <thead>
                <tr>
                <th>Hora</th>
                <th>Nº de Personas</th>
                </tr>
            </thead>
            <tbody>
        {
            timeTables.map((timetable)=>{
                return(
                <tr key={timetable._id}>
                    
                        <td>{timetable.time}</td>
                        <td>{timetable.nPeople}</td>
                        <td onClick={()=>{showAlert(timetable._id)}}>❌</td>
                </tr>
                )
            })
        }
            </tbody>
            </table>
            <Link className="container_addTimeTable" to={`timetablesAdd/${classesID}`}>
            {/* <box-icon name='plus-circle' size='lg' color='grey'></box-icon> */}
            <i className="fas fa-plus-circle buttonPlus"></i>
            </Link>
            <Outlet />
            <br /><button className="button_delete_user" onClick={()=>{showAlert1(classesID)}}>Eliminar Clase</button>
            <Link to="/classeslist">
            <div className="container_back_button">
                {/* <box-icon name='left-arrow-circle' size='lg' color='grey' className="back_button"></box-icon> */}
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
            </div>
        </Link>
    </div>
    )
}
return(
    <div>
        {
            currentDate ? screen() : loading()
        }
    </div>
)
}

export default TimeTable