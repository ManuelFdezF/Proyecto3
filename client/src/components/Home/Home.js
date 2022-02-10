import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import './Home.css'
import imgBooking from './images/imgBooking.jpg'
import imgExercices from './images/imgExercices.jpeg'
import imgWods from './images/imgWods.jpeg'
import imgProfile from './images/imgProfile1.jpg'
import imgAddUser from './images/imgAddUser1.png'
import { useEffect } from 'react'
import imgUserList from './images/imgUserList1.png'
import imgAddClass from './images/imgAddClass1.png'
import imgAddTimeTable from './images/imgAddTimeTable1.png'
import imgAddWod from './images/imgAddWod1.png'
import imgDeleteWod from './images/imgDeleteWod1.png'
const Home = () =>{
    
    const role = localStorage.getItem('role')
    // console.log("role", role)
    const token = localStorage.getItem('firsLogin')
    
    const navigate = useNavigate()
    useEffect(()=>{
        if (!token) navigate('/')
    },[])
    

    const homeUser = () =>{

        return(
            <div>
                <NavBar />
                <h2 className="subtitle">Bienvenido a CrossFitApp</h2>
                <div className="container">
                    <div className="containerCircle">
                        <div className="circle" >
                        <img className="img_Circle img_difu" src={imgBooking} alt=""></img>
                            <Link className="menu_copy text_border" to="/listclasses">Reservar Clase</Link>
                        </div>
                        <div className="circle">
                        <img className="img_Circle img_difu" src={imgExercices} alt=""></img>
                            <Link className="menu_copy text_border" to="/exercices">Ejercicios y Marcas</Link>
                        </div>
                        
                    </div>
                    <div className="containerCircle containerCircle2">
                    <div className="circle">
                        <img className="img_Circle img_difu" src={imgWods} alt=""></img>
                            <Link className="menu_copy text_border" to="/wods">Wods</Link>
                        </div>
                        <div className="circle" >
                            <img className="img_Circle img_difu" src={imgProfile} alt=""></img>
                            <Link className="menu_copy text_border" to="/profile">Perfil</Link>
                        </div>
                    </div>
                </div>
                
            </div>
            )
    }

    const homeAdmin = () =>{
        return(
        <div>
            <NavBar />
                <h2 className="subtitle">Gestiona tu Box</h2>
                <div className="container">
                    <div className="containerCircle">
                        <Link className="circle" to="/register">
                            <img className="img_Circle img_difu img_Circle_adm" src={imgAddUser} alt=""></img>
                            {/* <Link className="menu_copyAdm text_border" to="/register">Registrar Usuario</Link> */}
                        </Link>
                        <Link className="circle" to="/usersList">
                            <img className="img_Circle img_difu img_Circle_adm" src={imgUserList} alt=""></img>
                            {/* <Link className="menu_copyAdm text_border" to="/usersList">Listado y Baja Usuario</Link> */}
                        </Link>
                        
                    </div>
                    <div className="containerCircle containerCircle2">
                        <Link className="circle" to="/classesAdd">
                            <img className="img_Circle img_difu img_Circle_adm" src={imgAddClass} alt=""></img>
                            {/* <Link className="menu_copyAdm" to="/classesAdd">Crear Clase</Link> */}
                        </Link>
                        <Link className="circle" to="/classeslist">
                        <img className="img_Circle img_difu img_Circle_adm" src={imgAddTimeTable} alt=""></img>
                            {/* <Link className="menu_copyAdm" to="/classeslist">Horarios y Eliminar Clase </Link> */}
                        </Link>
                    </div>
                
                <div className="containerCircle containerCircle2">
                    <Link className="circle" to="/createWod">
                        <img className="img_Circle img_difu img_Circle_adm" src={imgAddWod} alt=""></img>
                        {/* <Link className="menu_copyAdm" to="/createWod">Crear WODs</Link> */}
                    </Link>
                    <Link className="circle" to="/deleteWod">
                    <img className="img_Circle img_difu img_Circle_adm" src={imgDeleteWod} alt=""></img>
                        {/* <Link className="menu_copyAdm" to="/deleteWod">Eliminar WODs</Link> */}
                    </Link> 
                </div> 
                </div>  
        </div>
            )
    }
    return(
        <div>
            {
                role == 0 ? homeUser() : homeAdmin()
            }
        </div>
    )
}

export default Home