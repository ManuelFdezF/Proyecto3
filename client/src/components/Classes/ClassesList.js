import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar"


const ClassesList = () =>{
    const token = localStorage.getItem("firsLogin")
    const [classes, setClasses] = useState(null)
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    

    useEffect(()=>{
        if (!token){
            navigate('/')
        } else{
            if (role == 0){
                navigate('/home')
            }
        }
        axios.get("http://localhost:5000/api/getClasses", {headers:{"Authorization": token}}).then((response)=>{
            // console.log(response)
            setClasses(response.data.classes)
            
        })
    },[])

    

    const loading = ()=>{
        return(
        <div>
            <Loader />
        </div>
        )
    }

    const screen =() =>{

    return(
        <div>
            <NavBar />
            <h2 className="subtitle">Listado de Clases</h2>
            <h6 className="subtitle_copy">Entra en la clase para crear el horario</h6>
            {
                classes.map((Classes)=>{
                    let correctDate = ""
                    let date1= new Date(Classes.date)
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
                        <div key={Classes._id} className="container_exercices1">
                            <Link  className="container_classes" to={`/timetables/${Classes._id}`}>
                            <button className="exercices_list">{correctDate}</button></Link> 
                        </div>
                        
                    )
                })
            }
            <Link to="/home">
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
                classes ? screen() : loading()
            }
        </div>
    )
}

export default ClassesList