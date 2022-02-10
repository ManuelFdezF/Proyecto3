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
    // const [successMessage, setSuccessMessage] = useState(null)
    // const [errorMessage, setErrorMessage] = useState(null)
    // const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        // setLoader(true)
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
                // setErrorMessage(error.response.data.message)
                // swal({text: error.response.data.message, icon: "error", timer: "2000"})
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
                 {/* <th>Email</th> */}
                 </tr>
             </thead>
             {/* {
                 loader && <Loader />
             } */}
             <tbody>
             {
                 users.map((Users)=>{
                     return(
                         <tr key={Users._id}>
                             <td>{Users.name}</td>
                             <td>{Users.surname}</td>
                             {/* <td><Link className="button_user_delete" to={`/deleteUsers/${Users._id}`}> ❌ </Link></td> */}
                             <td><div onClick={()=>{showAlert(Users._id)}}>❌</div></td>
                         </tr>
                     )
                 })
             }
             </tbody>
         </table>
        
         
         <Link to="/home">
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
                users ? screen() : loading()
            }
        </div>
    )
}

export default UsersList