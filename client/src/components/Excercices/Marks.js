import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";

const Marks = () => {
    const { exerciceID } = useParams();
    const token = localStorage.getItem("firsLogin")
    const [markList, setMarkList] = useState(null);
    const [nameExercice, setNameExercice] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    // const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    

    useEffect(() => {
        let mounted = true
        axios.get(`http://localhost:5000/api/marksUserList/${exerciceID}`, {headers:{"Authorization": token}}).then((response)=>{
            if (mounted){
                setMarkList(response.data.marks);
                setSuccessMessage(response.data.message)
                setNameExercice(response.data.exercices)
            }
            // console.log(markList)
            // console.log(nameExercice)
        })
                  
        return () =>{
            mounted = false
        }
    }, )
    // Alert para eliminar marca ------------------

    const showAlert = (markssID) =>{
        localStorage.setItem('IDMarks', markssID)
        swal({
            text: "¿Estás seguro que quieres eliminar la resultado?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta  =>{
            
            let IDMarkss = localStorage.getItem("IDMarks")
            if(respuesta){
                axios.delete(`http://localhost:5000/api/deleteUserMark/${IDMarkss}`, {headers:{"Authorization": token}})
                swal({text: "El resultado se ha eliminado correctamente", icon: "success", timer: "2000"})
                localStorage.removeItem("IDMarks")
                
            }else{
                localStorage.removeItem("IDMarks")
                
            }     
            })
    }
    // Alert para eliminar ejercicio completo
    const showAlert1 = (IDExercice) =>{
        // console.log(IDExercice)
        localStorage.setItem('exercice', IDExercice)
        swal({
            text: "¿Estás seguro que quieres eliminar el ejercicio?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta  =>{
            let IDEXERCICE = localStorage.getItem("exercice")
            if(respuesta){
                axios.delete(`http://localhost:5000/api/deleteExercice/${IDEXERCICE}`, {headers:{"Authorization": token}})
                swal({text: "El Ejercicio se ha eliminado correctamente", icon: "success", timer: "2000"})
                localStorage.removeItem("exercice")
                navigate("/exercices")
            }else{
                localStorage.removeItem("exercice")
            }     
            })
    }



    const loading = () =>{
        return <div>
            <Loader />
        </div>
    }

    const screen = () =>{

    return (
        <div>
            <NavBar />
            <h2 className="subtitle">Progresión de ejercicio</h2>
            <h4 className="nameExerciceMarks">{nameExercice.nameExercice}</h4>
            <table className="table marks_table table-striped">
            <thead className="header_marks">
                <tr>
                <th>Fecha</th>
                <th>Reps</th>
                <th>Peso</th>
                <th>Comentario</th>
                </tr>
            </thead>
            <tbody>
                {
                    markList.map((marksExer)=>{
                        let correctDate = ""
                        let date1= new Date(marksExer.date)
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
                            
                            <tr key={marksExer._id} className="rowMark">
                                <td>{correctDate}</td>
                                <td>{marksExer.reps}</td>
                                <td>{marksExer.weight}</td>
                                <td>{marksExer.comment}</td>
                                <td><div onClick={()=>{showAlert(marksExer._id)}}>❌</div></td>
                            </tr>

                        )
                    })
                }
            </tbody>
            </table>
                <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
            <Link className="container_addExercice" to={`marksAdd/${exerciceID}`}>
            <i className="fas fa-plus-circle buttonPlus"></i>
            </Link>
            <Outlet />
                <br /><button className="button_delete_user" onClick={()=>{showAlert1(exerciceID)}}>Eliminar ejercicio</button>
            <Link to="/exercices">
                <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                </div>
            </Link>
        </div>
    )
    }

    return(
        <div>
            {
                nameExercice ? screen() : loading()
            }
        </div>
    )

}
export default Marks;




