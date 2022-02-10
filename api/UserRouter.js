const express = require("express");
const User = require("../models/Users")
const Exercice = require("../models/Exercices")
const Marks = require("../models/Marks")
const Booking = require("../models/Booking")
const TimeTable = require("../models/TimeTable")
const UserRouter = express.Router()
const cloudinary = require("cloudinary");
const fs = require("fs");
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10)   // se declara salt para la encriptación de contraseña. 10 es el número de vueltas para hashearse
const jwt = require("jsonwebtoken");
const checkToken = require("../middleware/auth");
const nodemailer = require("../middleware/nodeMailer")
const authAdmin = require("../middleware/authAdmin");
const { triggerAsyncId } = require("async_hooks");


//Configuración del cloudinary para la subida de imagenes
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });


// Ruta para crear un usuario

UserRouter.post("/register", checkToken, authAdmin, async (req, res)=>{
    try {
        const{name, surname, email, password, imagen} = req.body
        
        
        const user2 = await User.findById(req.user.id)     // Busca en el modelo de usuario si encuentra la ID pasada por token
            if (!user2) return res.status(500).json({           // Si no encuentra la id de usuario es que no está logueado
                success: false,
                message: `El usuario no está logueado`
            })


        const user = await User.findOne({email})  // busca si el email existe. Si existe no lo crea
        if(user) return res.status(400).json({
            success:false,
            message:"El email introcucido ya existe"
        })

        
        if (!name || !surname || !email || !password){
            return res.status(400).json({
                success: false, 
                message: "Tiene que rellenar todos los campos del formulario"
            })
        }

        if (password.length < 6){
             return res.status(400).json({
                 success: false,
                 message: "La contraseña no puede tener menos de 6 caracteres."
             })
        }

        // Encriptamos la contraseña. se le pasa la pass y salt que es el numero de vueltas
        let passwordHash = bcrypt.hashSync(password, salt)  

        
        //LLAMO LA FUNCIÓN DE CORREO ELECTRONICO 

        nodemailer.sendWelcomeEmail(
            email,
            password,
            name,
        )  

        const newUser = new User({
            name,
            surname,
            email,
            password: passwordHash,  // Aquí le pasamos la pass hasheada ya que el valor ha cambiado
            // imagen:  {"public_id": "", "url": "https://res.cloudinary.com/dzenpc7wi/image/upload/v1642780148/crossfitAPP/auxt7ab5smg7879zbq4f.webp"}
            imagen
        })
        await newUser.save()

        // const accessToken =  createAccessToken({id:newUser._id}) // crea un token por cada usuario. Al final solo lo creo en el login

        return res.status(200).json({
            success:true,
            // accessToken,
            newUser,
            message:`Se ha creado el usuario de ${name} correctamente.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})



//Ruta para hacer LOGIN , post que reconozca el usuario

UserRouter.post("/login", async (req, res)=>{
    try {
        const{email, password} = req.body
        
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Tiene que rellenar usuario y contraseña."
            })
        }

        const user = await User.findOne({email})  // busca si el email existe. 
        if(!user) return res.status(400).json({ // si no encuentra usuario.. usuario no registrado
            success:false,
            message:"El email introducido no está registrado!"
        })
        const role = user.role
        
        const passwordOk = await bcrypt.compare(password, user.password)
        if (!passwordOk) return res.status(400).json({
            success: false,
            message: "¡Contraseña incorrecta!"
        })
       
        const accessToken =  createAccessToken({id:user._id})  // Se crea El token de usuario

        return res.status(200).json({
            success:true,
            accessToken,
            role,
            message:`Usuario logueado correctamente`
           
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})


// Ruta privada para ver perfil de usuario enviando token

UserRouter.get("/profile", checkToken, async (req,res) =>{
    
        try {
            
            const user = await User.findById(req.user.id)     // Busca en el modelo de usuario si encuentra la ID pasada por token
            if (!user) return res.status(500).json({           // Si no encuentra la id de usuario es que no está logueado
                success: false,
                message: `El usuario no está logueado`
            })
            if (user) return res.status(200).json({
                success: true,
                user
            })


        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })  
        }
})


// Ruta para modificar perfil enviando ID de usuario por token

UserRouter.put("/updateProfile", checkToken, async (req, res) =>{
    
    try {
        const {name, surname,  password, imagen} = req.body // la imagen la paso por row y la uno en el front
       

        const user = await User.findById(req.user.id)     // Busca en el modelo de usuario si encuentra la ID pasada por token
        if (!user) return res.status(500).json({           // Si no encuentra la id de usuario es que no está logueado
            success: false,
            message: `El usuario no está logueado`
        })


        // const emailE = await User.findOne({email})  // Antes de actualizar el perfil compruebo si el email existe en la BBDD
        // if(emailE) return res.status(400).json({
        //     success:false,
        //     message:"El email introcucido ya está registrado, elija otro."
        // })
        
        if (!name && !surname && !password && !imagen){  // Si están todos los campos en blanco salta el error
            return res.status(400).json({
                success: false, 
                message: "No puede dejar todos los campos en blanco"
            })
        }
        let nameModify
        if (name){
            if (name.length > 0){
            nameModify = name 
            }
        }   

        // name ? nameModify = name : name = undefined
        let surnameModify
        if (surname){     
            if(surname.length >0) surnameModify = surname
        }
        
    

        let passwordHash
        if (password){                  //Compruebo si el usuario introduce una contraseña
            if (password.length < 6){
                return res.status(400).json({
                    success: false,
                    message: "La contraseña no puede tener menos de 6 caracteres."
                })
           }
            passwordHash = bcrypt.hashSync(password, salt)  // Con esto encriptamos la contraseña. se le pasa la pass y salt que es el numero de vueltas
            // console.log(passwordHash)
    }



        await User.findByIdAndUpdate(req.user.id, {name: nameModify, surname: surnameModify, password: passwordHash, imagen})
        res.status(200).json({
            success: true,
            message: `Tu perfil se ha actualizado correctamente`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})




// Ruta para subir una imagen


UserRouter.post('/upload', checkToken, async(req, res) =>{
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        
        if(!req.files || Object.keys(req.files).length === 0)
         return res.status(400).json({msg: 'No hay imagen para subir'})
     
     const file = req.files.file;
     console.log(file)
     if(file.size > 1024*1024) {
         removeTmp(file.tempFilePath)
         return res.status(400).json({msg: "Imagen demasiado grande!"})
     }

     if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
         removeTmp(file.tempFilePath)
         return res.status(400).json({msg: "El formato de la imagen no es admitido!"})
     }

     cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "crossfitAPP"}, async(err, result)=>{
        if(err) throw err;

        removeTmp(file.tempFilePath)

        res.json({public_id: result.public_id, url: result.secure_url})
    })
        


    } catch (err) {
        
    }
})

// Ruta para Eliminar imagen

UserRouter.post("/destroyPhoto", checkToken, async(req, res) =>{
    try {
        const {public_id} = req.body
    if (!public_id) return res.status(400).json({msg: "No ha seleccionado ninguna foto"})

    cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
        if (err) throw err
        res.json({msg: "Imagen eliminada"})
    })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

// Ruta para eliminar usuario por token

UserRouter.delete("/deleteUser", checkToken, async (req, res) =>{
    try {
       
    await User.findByIdAndDelete(req.user.id)
    
    // Eliminar los ejercicios, marcas  asociadas al usuario

    Exercice.find({user: req.user.id}).then(foundExercices =>{
        foundExercices.map((arrExercices)=>{
            console.log("arrExercices",arrExercices)
            Exercice.findByIdAndDelete(arrExercices._id, function(err, arrExercices){
                if (err){
                    console.log(error)
                }else{
                    console.log("Ejercicio eliminado correctamente")
                    Marks.find({user: req.user.id}).then(foundMarks=>{
                        foundMarks.map((arrMarks)=>{
                            console.log("arrMarks",arrMarks)
                            Marks.findByIdAndDelete(arrMarks._id, function(err, arrMark){
                                if (err){
                                    console.log(err)
                                }else{
                                    console.log("Marca eliminada correctamente")
                                }
                            })
                        })
                    })
                }
            })
        })
    })
    // ELimino reservas asociadas al usuario
    let timeTabless = []
    Booking.find({user: req.user.id}).then(foundBooking =>{
        foundBooking.map((arrBooking)=>{
            console.log("arrBooking",arrBooking)
            timeTabless.push(arrBooking.timeTable)
            console.log("arrBooking.timeTable",arrBooking.timeTable)
            //     TimeTable.findByIdAndUpdate(arrBooking.timeTable, { 
            //     $pull: {numTotPeople: req.user.id }
            // })

                Booking.findByIdAndDelete(arrBooking._id, function(err, arrBooking){
                    if (err){
                        console.log(err)
                    }else{
                        console.log("Reservas eliminadas correctamente")
                        timeTabless.map((timeID)=>{
                            console.log("timeID",timeID)
                            TimeTable.findByIdAndUpdate(timeID, { 
                            $pull: {numTotPeople: req.user.id }
                        })
                    })
                    }
                })
        })
    })
    // console.log("timeTabless",timeTabless)
    // console.log("req.user.id",req.user.id)
    // timeTabless.map((foundUsers)=>{
    //         TimeTable.findByIdAndUpdate(foundUsers, { 
    //         $pull: {numTotPeople: req.user.id }
    //     })
    // })
    // TimeTable.findByIdAndUpdate(arrBooking.timeTable, { 
    //     $pull: {numTotPeople: req.user.id }
    // })

    res.status(200).json({
        success: true,
        message: "Usuario borrado correctamente."
    })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})

//Ruta para eliminar Usuario por ID
UserRouter.delete("/deleteUsers/:id", checkToken, authAdmin, async (req, res) =>{
    try {
        const {id} = req.params
        const user = await User.findById(req.user.id)
        if (!user) return res.status(500).json({
            success: false,
            message: `El usuario no está logueado`
        })
        
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


//Ruta para listar Usuarios

UserRouter.get("/usersList", checkToken, authAdmin, async (req,res) =>{

    try {
        const user = await User.findById(req.user.id)     
        if (!user) return res.status(500).json({          
            success: false,
            message: `El usuario no está logueado`
        })

        let users = await User.find({})
        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"7d"})
}


const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = UserRouter



//Ruta para ver perfil de un usuario por ID

// UserRouter.get("/profile/:id", async (req,res) =>{
//     const {id} = req.params
//     try {
//         let user = await User.findById(id)
//         res.status(200).json({
//             success: true,
//             user
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })  
//     }
// })

// Ruta para modificar el perfil de un usuario por ID

// UserRouter.put("/updateProfile1/:id", async (req, res) =>{
//     try {
//         const {id} = req.params
//         const {name, surname, email, password} = req.body

//         const user = await User.findOne({email})  // Antes de actualizar el perfil compruebo si el email existe en la BBDD
//         if(user) return res.status(400).json({
//             success:false,
//             message:"El email introcucido ya está registrado, elija otro."
//         })
        
        // if (!name || !surname || !email || !password){
        //     return res.status(400).json({
        //         success: false, 
        //         message: "No puede dejar ningún campo en blanco"
        //     })
        // }

//         if (password.length < 6){
//              return res.status(400).json({
//                  success: false,
//                  message: "La contraseña no puede tener menos de 6 caracteres."
//              })
//         }

//         await User.findByIdAndUpdate(id, {name, surname, email, password})
//         res.status(200).json({
//             success: true,
//             message: `${name}, tu perfil se ha actualizado correctamente`
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })  
//     }
// })

// Ruta para eliminar un usuario por ID pasada por params

// UserRouter.delete("/deleteUser/:id", async (req, res) =>{
//     try {
//         const {id} = req.params
//     await User.findByIdAndDelete(id)
//     res.status(200).json({
//         success: true,
//         message: "Usuario borrado correctamente"
//     })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })  
//     }
// })
