import { Link, useNavigate } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import imgChangePhoto from './images/imgPhoto.jpeg'
import imgModProf from './images/imgModProf.jpeg'
import { useEffect } from "react"
const Profile = () =>{
    
    const token = localStorage.getItem('firsLogin')
    const navigate = useNavigate()
    useEffect(()=>{
        if (!token) navigate('/')
    },[])

    return(
        <div>
            <NavBar />
            <h2 className="subtitle">Perfil</h2>
            <div className="container">
                <div className="containerCircle">
                    <Link className="circle" to="/profileData">
                    <img className="img_Circle" src={imgModProf} alt=""></img>
                    </Link>
                    
                </div>
                <div className="containerCircle containerCircle2">
                    <Link className="circle" to="/profilePhoto">
                    <img className="img_Circle" src={imgChangePhoto} alt=""></img>
                        <p className="menu_copy">Cambiar Foto</p>
                    </Link>
                </div>
            </div>
            <div className="goBack">
            <Link to="/home">
                <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                </div>
            </Link></div>
        </div>
    )
}

export default Profile