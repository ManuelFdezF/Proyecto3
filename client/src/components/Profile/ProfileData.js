import axios from "axios"
import {  useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import './Profile.css'
import NavBar from "../NavBar/NavBar"
import swal from "sweetalert"
import Loader from "../Loader/Loader"

const ProfileData = () =>{

    // const [successMessage, setSuccessMessage] = useState(null)
    // const [errorMessage, setErrorMessage] = useState(null)

    const [userData, setUserData] = useState([]) 
    const token = localStorage.getItem('firsLogin')
    const [imagen, setImagen] = useState("https://st3.depositphotos.com/19428878/36349/v/600/depositphotos_363499050-stock-illustration-default-avatar-profile-vector-user.jpg")
        
    const navigate = useNavigate()
    
        
    
    useEffect(()=>{
        // if (!token) navigate('/')
        let mounted = true
        axios.get("/api/profile", {headers:{"Authorization": token}}).then((response) =>{
            if (mounted){
                setUserData(response.data.user) 
                setImagen(response.data.user.imagen.url)
            }
        })
        return () =>{
            mounted = false
        }
    }, )

    const showAlert = () =>{
        
        swal({
            title: "¿Eliminar cuenta?",
            text: "¿Estás seguro que quieres eliminar tu cuenta? No podrás recuperarla",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta  =>{
            if(respuesta){
                axios.delete("/api/deleteUser", {headers: {"Authorization": token}})
                swal({text: "Tu cuenta se ha eliminado correctamente", icon: "success", timer: "2000"})
                localStorage.removeItem("firsLogin")
                navigate('/')
            }   
            })
    }

    const cargando = () =>{
        return (
            <Loader />
        )
    }
        

        
    const screen = () =>{

    return(
        <div >
            <NavBar />
            <h2 className="subtitle">Perfil - General</h2>
            <div className="container_ima_profile">
                <img alt="" className="profile_photo" src={imagen}></img>
            </div>
            <form className="container container_profile">
                <div className="containerInput containerInputName">
                    <p className="copy_Input copy_Input_nombre">Nombre</p>
                    <p>{userData.name}</p>
                </div>
                <div className="containerInput">
                    <p className="copy_Input">Apellido</p>
                    <p>{userData.surname}</p>
                </div>
                <div className="containerInput containerInputEmail">
                    <p className="copy_Input">Email</p>
                    <p>{userData.email}</p>
                </div>
            </form>
            <div className="container_input_addTmtb"> 
            <Link to="profileModify">
                <button className="button_submit">Modificar</button>
                </Link>
             <button className="button_delete_user" onClick={()=>{showAlert()}}>Eliminar Perfil</button>
             </div>
            <Outlet />
            
            <Link to="/profile">
                <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                </div>
            </Link>
            

        </div>
        )
    
    }

return (
    <div>
        {
            imagen ? screen() : cargando() 
        }
    </div>
    )
}

export default ProfileData