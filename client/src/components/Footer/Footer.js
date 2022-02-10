import './Footer.css'

const Footer = () =>{

    return(
        <div className="footer_container">
            <div className="footer">
                <div className="footer_name">&#169; CrossFitApp</div>
            </div>
            <div className="footer_icons">
                <a href="https://www.instagram.com/crossfit/?hl=es" target="_blanket"><i className="fab fa-instagram red_social"></i></a>
                <a href="https://es-es.facebook.com/crossfit/" target="_blanket"><i className="fab fa-facebook red_social"></i></a>
                <a href="mailto:crossfitletscoder@gmail.com?Subject=Información%20o%20problemas%20con%20la%20APP"><i className="far fa-envelope red_social"></i></a>
            </div>
        </div>
    )
}

export default Footer