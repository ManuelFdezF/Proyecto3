import { Link } from "react-router-dom"
// import imgLogo from './images/imgLogoCrossfit.png'
import imgLogo2 from './images/imgLogo1.png'

const NavBarLogin = () =>{

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark colorNav">
         <div className="container-fluid">
         <Link className="navbar-brand mx-auto" to="/home"><img className="logoApp" src={imgLogo2} alt=""></img></Link>
         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
         <div className="navbar-nav">
           {/* <Link className="nav-link active" aria-current="page" to="/home">Home</Link> */}
           <Link className="nav-link" to="/login">Login</Link>
          
         </div>
         </div>
       </div>
     </nav>
        </div>
    )
}

export default NavBarLogin