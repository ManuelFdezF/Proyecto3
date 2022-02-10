const jwt = require("jsonwebtoken")

const checkToken = (req, res, next) =>{  // checkToken se importa en cada ruta que queramos hacer privada
    try {
        const token = req.header("Authorization")
        
        if (!token) return res.status(400).json({   //Si no hay token
            success: false,
            message: "Invalid authetification"
        })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{  //Si el token es erróneo
            if (err) return res.status(400).json({
                success: false,
                message: "Invalid authetification(2)"
        })
        req.user = user
        // console.log(user)
        next()
        
    })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = checkToken