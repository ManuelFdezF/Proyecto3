
import { Link} from "react-router-dom"
// import imgLogo from './images/imgLogoCrossfit.png'
import './Navbar.css'
import imgLogo2 from './images/imgLogo1.png'

const NavBar = () =>{

    const role = localStorage.getItem('role')
  

    const navBarAdmin = ()=>{
      return(
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark  colorNav">
        <div className="container-fluid">
        <Link className="navbar-brand mx-auto" to="/home"><img className="logoApp" src={imgLogo2} alt=""></img></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav" >
          <Link className="nav-link" to="/listclasses">Reservar Clase</Link>
          <Link className="nav-link" to="/exercices">Ejercicios</Link>
          <Link className="nav-link" to="/wods" >WODs</Link>
          <Link className="nav-link" to="/profile">Perfil</Link>
          <Link className="nav-link" to="/register">Registrar Usuario</Link>
          <Link className="nav-link" to="/classesAdd">Crear Clase</Link>
          <Link className="nav-link" to="/classeslist">Crear Horario</Link>
          <Link className="nav-link" to="/createWod">Crear Wod</Link>
          <Link className="nav-link" to="/logout"><i className="fas fa-sign-out-alt"></i></Link>
        </div>
        </div>
      </div>
    </nav>
    </div>
  )
    }
   
    const navBarUser = ()=>{
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
              <Link className="nav-link" to="/listclasses">Reservar Clase</Link>
              <Link className="nav-link" to="/exercices">Ejercicios</Link>
              <Link className="nav-link" to="/wods">WODs</Link>
              <Link className="nav-link" to="/profile">Perfil</Link>
              <Link className="nav-link" to="/logout"><i className="fas fa-sign-out-alt"></i></Link>
            </div>
            </div>
          </div>
        </nav>
        </div>
    )

    }

    return(
      <div>
        
        {
          role == 0 ? navBarUser() : navBarAdmin()
        }
      </div>
    )

    

}

export default NavBar