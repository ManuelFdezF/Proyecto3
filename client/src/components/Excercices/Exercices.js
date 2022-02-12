import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import './Exercices.css'
import NavBar from "../NavBar/NavBar"
import Loader from "../Loader/Loader"


const Exercices = () =>{

    const [exercicess, setExercicess] = useState([])
    const token = localStorage.getItem('firsLogin')
    const navigate = useNavigate()
    useEffect(()=>{
        if (!token) navigate('/')
        let mounted = true
        axios.get("http://localhost:5000/api/exercicesUser", {headers:{"Authorization": token}} ).then((response) =>{
            // console.log(response)
            if (mounted){
                setExercicess(response.data.exercices)
                // console.log(exercicess)
            }
        })
        return () =>{
            mounted = false
        }
    }, )
    
    
    const loading = () =>{
        return( 
        <div>
            <Loader />
        </div>
        )
    }

    const screen = () =>{
    return(
        <div>
            <NavBar />
            <h2 className="subtitle">Listado de ejercicios</h2>
            
            {
            exercicess.map((EXERCICES)=>{
                    return(
                        <div key={EXERCICES._id} className="container_exercices1">
                        <Link className="container_exercices" to={`/marks/${EXERCICES._id}`}>
                        <button className="exercices_list">{EXERCICES.nameExercice}</button></Link>
                        </div>
                        
                    )
                })
            }
            <Link className="container_addExercice" to="addExercice">
            <i className="fas fa-plus-circle buttonPlus"></i>
            </Link>
            <Outlet />
            <br />
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
                    exercicess ? screen() : loading()
                }
            </div>
        )
}

export default Exercices