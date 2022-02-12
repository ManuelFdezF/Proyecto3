import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './Register.css'
import NavBar from "../NavBar/NavBar"
import swal from "sweetalert"
import Loader from "../Loader/Loader"
const UsersList = () =>{

    const [users, setUsers] = useState([])
    const token = localStorage.getItem('firsLogin')
    const role = localStorage.getItem('role')

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
        axios.get("http://localhost:5000/api/usersList", {headers:{"Authorization": token}}).then((response) =>{
            // console.log(response)
            if (mounted){
                setUsers(response.data.users)
            }
        })
        return () => mounted = false
    },)
    
    // console.log(loader)
    const showAlert = (IDUser) =>{
        // console.log(IDUser)
        localStorage.setItem('usr', IDUser)
        swal({
            title: "Eliminar Usuario",
            text: "¿Estás seguro que quieres eliminar el Usuario?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(async (respuesta)  =>{
            try {
                let IDUSER = localStorage.getItem("usr")
                if(respuesta){
                   const response = await axios.delete(`http://localhost:5000/api/deleteUsers/${IDUSER}`, {headers:{"Authorization": token}})
                //    setSuccessMessage(response.data.message)
                    swal({text: response.data.message, icon: "success", timer: "2000"})
                    localStorage.removeItem("usr")
                } else{
                    localStorage.removeItem("usr")
                }  
                
            } catch (error) {
                
            }
            })
    }
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
             
             <h2 className="subtitle">Listado de Usuarios</h2>
             <table className="table table-striped">
             <thead>
                 <tr>
                 <th className="copy_Input">Nombre</th>
                 <th className="copy_Input">Apellido</th>

                 </tr>
             </thead>
             
             <tbody>
             {
                 users.map((Users)=>{
                     return(
                         <tr key={Users._id}>
                             <td>{Users.name}</td>
                             <td>{Users.surname}</td>
                             <td><div onClick={()=>{showAlert(Users._id)}}>❌</div></td>
                         </tr>
                     )
                 })
             }
             </tbody>
         </table>
        
         
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
                users ? screen() : loading()
            }
        </div>
    )
}

export default UsersList