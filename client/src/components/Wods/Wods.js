import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './Wods.css'
import NavBar from "../NavBar/NavBar"

const Wods = () =>{


    const [wodss, setWodss] = useState([])
    const token = localStorage.getItem('firsLogin')
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token) navigate('/')
        axios.get("/api/wodsList", {headers:{"Authorization": token}} ).then((response) =>{
            // console.log(response)
            setWodss(response.data.wods)
        })
    }, [])

    

    return (
        <div>
            <NavBar />
            <h2 className="subtitle">WODs</h2>
            <h5>Consulta los "Famous WODs"</h5>
            {
                wodss.map((WODS)=>{
                    let description1 = WODS.description.split('\n')
                    // console.log(description1)


                    return(
                    <div key={WODS._id} className="container_wods">
                        <p className="wod_name">{WODS.name}</p>
                        
                        <p className="wod_time">{WODS.time}</p>
                        <p className="wod_type"> {WODS.type}</p>
                        <div className="container_description">
                            {
                                description1.map((desc, i)=>{
                                    return(
                                        <div key={i + desc}>
                                            <p className="wod_description">{desc}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
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

export default Wods