import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, } from "react-router-dom"
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar"



const ClassList = () =>{
    const token = localStorage.getItem("firsLogin")
    const [classes, setClasses] = useState(null)
    // const [loader, setLoader] = useState(false)
    
    const navigate = useNavigate()

    useEffect(()=>{
        // setLoader(true)
        if (!token) navigate('/')
        axios.get("http://localhost:5000/api/getClasses", {headers:{"Authorization": token}}).then((response)=>{
            // console.log(response)
            setClasses(response.data.classes)
            
        })
        // setLoader(false)
    },[])

    const loading = ()=>{
        // return "loading"
        return(
            <div>
            {
                <Loader />
            }
            </div>
        )
    }
    // let spinner = document.querySelector('.spinner')
    // const hideSpinner = () =>{
    //     spinner.style.display = 'none'
    // }

    

    const screen =() =>{

    return(
        <div>
            <NavBar />
            {/* {
                loader && <Loader />
            } */}
            <h2 className="subtitle">Listado de Clases</h2>
            {
                classes.map((CLASSES)=>{
                    let correctDate = ""
                    let date1= new Date(CLASSES.date)
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
                        
                        <Link key={CLASSES._id} className="container_classes" to={`/booking/${CLASSES._id}`}>
                            <button className="classes_list">{correctDate}</button>
                        </Link>
                       
                    )
                })
                
            }
            
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
                classes ? screen() : loading()
            }
        </div>
    )
}

export default ClassList