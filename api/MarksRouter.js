const express = require("express");
const Mark = require("../models/Marks")
const MarksRouter = express.Router()
const Users = require("../models/Users")
const checkToken = require("../middleware/auth");
const { findById } = require("../models/Users");


// Ruta para crear una marca nueva

MarksRouter.post("/createMark", checkToken, async (req,res) =>{

    try {
        const { date, reps, weight, comment, exerciceID} = req.body

        const user = await Users.findById(req.user.id)     
        if (!user) return res.status(500).json({
            success: false,
            message: `El usuario no está logueado`
        })

        if (!date || !reps || !weight || !exerciceID){
            return res.status(400).json({
                success: false,
                message: "Los campos 'Nombre', 'fecha', 'Repeticiones' y 'Peso' son obligatorios"
            })
        }
        if (reps  <= 0 || weight <=0){
            return res.status(400).json({
                success: false,
                message: "Las repeticiones y el peso no pueden ser negativos"
            })
        }

        // const newMark = new Mark({
        let mark = new Mark({
            date,
            reps,
            weight,
            comment, 
            exercices: exerciceID,
            user
        })
        // await newMark.save()
        let newMark = await mark.save()
        res.status(200).json({
            success: true,
            mark: newMark,
            message: `Se han añadido nuevas marcas al ejercicio`
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }

})




// Eliminar una marca por ID

MarksRouter.delete("/deleteUserMark/:id", checkToken, async (req, res) =>{
    try {
        const {id} = req.params
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(500).json({
            success: false,
            message: `El usuario no está logueado`
        })
        
        await Mark.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Marca eliminada correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


module.exports = MarksRouter

//Listar las marcas con su ejercicio de un usuario por ID.... era una prueba. No sentido

// MarksRouter.get("/marksUser/:id", (req, res) => {
//     const userId = req.params.id

//     User.findById(userId).populate("name")
//         .then(user => {
//             Mark.find({ user: userId }).populate("exercices")
//                 .then(marks => {
//                     return res.json({
//                         success: true,
//                         user,
//                         marks
//                     });
//                 });
//         });
// });



// Ruta para listar todas las marcas y tienen relacionado el ejercicio

// MarksRouter.get("/marksList", async (req, res) =>{
//     try {
//         let marks = await Mark.find({})
//         return res.status(200).json({
//             success: true,
//             marks
//         })
            
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         }) 
//     }
// })


// Ruta para modificar las marcas de un ejercicio y usuario por ID (NO UTILIZADA)

// MarksRouter.put("/updateMark/:id", async (req,res) =>{
//     const {date, reps, weight, comment, exercicesID, userID} = req.body
//     const {id} = req.params

//     try {
//         await Mark.findByIdAndUpdate(id, {date, reps, weight, comment, exercises: exercicesID, user: userID})
//         res.status(200).json({
//             success: true,
//             message: `Se ha modificado correctamente la marca`
//     })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         }) 
//     }

// })