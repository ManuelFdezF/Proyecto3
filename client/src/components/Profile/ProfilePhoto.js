import axios from 'axios'
import { useEffect, useState } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import swal from 'sweetalert'


const ProfilePhoto = () =>{

    
    const navigate = useNavigate()
    const token = localStorage.getItem("firsLogin")
    const [imagen, setImagen] = useState(null)
    // const [userData, setUserData] = useState([]) 
    const [publicId, setPublicId] = useState(null)

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(()=>{
      if (!token) navigate('/')
        axios.get("http://localhost:5000/api/profile", {headers:{"Authorization": token}}).then((response) =>{
            // setUserData(response.data.user)
            setImagen(response.data.user.imagen.url)
            setPublicId(response.data.user.imagen.public_id)
            // setImagess(response.data.user.imagen.public_id)
        })
    }, )
    
    // ------------------------------- Función de eliminar imagen ------------------------------
    
    const showAlert =  () =>{
      
      swal({
          text: "¿Estás seguro que quieres eliminar la foto?",
          icon: "warning",
          buttons: ["No", "Si"]
      }).then(async (respuesta)  =>{
          
          if(respuesta){
            try {
              const response = await axios.post("http://localhost:5000/api/destroyPhoto", {"public_id": publicId}, {headers:{"Authorization": token}})
  
              await axios.put("http://localhost:5000/api/updateProfile", {
                "imagen" : {
                      "public_id": "",
                      "url": "https://res.cloudinary.com/dzenpc7wi/image/upload/v1642780148/crossfitAPP/auxt7ab5smg7879zbq4f.webp"
                }
            }, {headers:{"Authorization": token}} )
  
              setSuccessMessage(response.data.msg)
              swal({text: "La foto se ha eliminado correctamente", icon: "success", timer: "2000"})
              // console.log(response)
          } catch (err) {
              setErrorMessage(err.response.data.msg)
          }
                 
          }
          })
  }

    // ------------------------------- Función para cargar imagen de perfil --------------------

    

    const handleUpload = async (e) => {
        
        
        try {
           
          const file = e.target.files[0];
    
          if (!file) return alert("No se ha subido ningún archivo");
          if (file.size > 1024 * 1024 * 2) return alert("Archivo demasiado grande");
          if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("Formato de archivo no soportado");
    
          let formData = new FormData();
          formData.append("file", file);
    
        //   setLoading(true);
          const res = await axios.post(`http://localhost:5000/api/upload`, formData, 
            {
              headers: {
                "content-type": "multipart/form-data",
                "Authorization": token,
              },
            }
          )
         
          // Para añadir la imagen al usuario

          const responsePhoto = await axios.put("http://localhost:5000/api/updateProfile", {
              "imagen" : {
                    "public_id": res.data.public_id,
                    "url": res.data.url
              }
          }, {headers:{"Authorization": token}} )

          // console.log(responsePhoto.data.message)

          setSuccessMessage(responsePhoto.data.msg)
        //   //   console.log(res.data.post);
        } catch (err) {
          alert(err.message);
          setErrorMessage(err.responsePhoto.data.msg)
        }
        
      }


    return(
        <div>
          <NavBar />
            <div className="container">
                <h2 className="subtitle">Perfil - Cambiar Foto</h2>
                <div className="container_photo">
                    <img className="profile_photo" alt="" src={imagen}></img>
                </div>
                <div className="container_buttons">
                <label>
                <input className="upload_imagen" type="file" name="file" onChange={handleUpload}></input></label>
                </div>
                <div className="message_login" style={{display: successMessage ? "block": "none"}}>{successMessage}</div>
                <div className="message_login" style={{display: errorMessage ? "block": "none"}}>{errorMessage}</div>
                <button className="button_delete_photo"  onClick={showAlert}>Eliminar foto</button>
            </div>

            <Link to="/profile">
                <div className="container_back_button">
                <i className="far fa-arrow-alt-circle-left buttonBack"></i>
                </div>
            </Link>
        </div>
    )
}

export default ProfilePhoto