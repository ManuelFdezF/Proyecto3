const express = require("express");
const Exercices = require("../models/Exercices")
const ExercicesRouter = express.Router()
const Users = require("../models/Users")
const Mark = require("../models/Marks")
const checkToken = require("../middleware/auth") // y pasar "checkToken" por parámetro en cada función
const mongoose = require("mongoose")

// Ruta para crear ejercicio con token de usuario


function ExistExercice (exercicess){
    let exercicesFound = false
    exercicess.map((exerciceSearch)=>{   // No utilizo "some" porque me puede devolver varios ejercicios por usuario
        if (exerciceSearch.nameExercice == nameExercice){
            return exercicesFound = true
        }
    })

    if (exercicesFound == true){
        return res.status(400).json({
            success:false,
            message: `El ejercicio ya existe para el usuario ${user.name}` 
        })
    }else{
        return false
    }
}

async function  createExercice(){
    const newExercice = new Exercices({ 
        nameExercice,
        user
    })
    
    await newExercice.save()
}


ExercicesRouter.post("/createExercice", checkToken, async (req, res) =>{
    try {
        const {nameExercice} = req.body
        // const {userID} = req.user
        const user = await Users.findById(req.user.id)  
        // console.log(user)   // Busca en el modelo de usuario si encuentra la ID pasada por token
        if (!user) return res.status(500).json({           // Si no encuentra la id de usuario es que no está logueado
            success: false,
            message: `El usuario no está logueado`
        })
        
        if (!nameExercice){
            return res.status(400).json({
                success: false,
                message: "No puede dejar el campo el blanco"
            })
        }

        // Compruebo si el ejercicio existe para el usuario logueado

       
        const exercicess = await Exercices.find({user: req.user.id})
        
        let existExercice = ExistExercice(exercicess)
        if (!existExercice){
            createExercice()
        }
        
        
       //respuesta de end point
        
        return res.status(200).json({
            success:true, 
            newExercice,
            message: `${nameExercice} se ha creado como nuevo ejercicio`
        })
    

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})







// Ruta para eliminar un ejercicio por ID pero estando logueado

const deleteAsociateMarks = (id) =>{
     //Elimino las marcas que están asociadas al ejercicio
     Mark.find({exercices: id}).then(foundMarks =>{
        foundMarks.map((arrMark)=>{
            Mark.findByIdAndDelete(arrMark._id, function(err, arrMark){
                if (err){
                    console.log(error)
                }else{
                    console.log("Eliminada marca", arrMark)
                }
            })
        })
    })
}

ExercicesRouter.delete("/deleteExercice/:id", checkToken, async (req, res) =>{
    try {
        const {id} = req.params

        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        const exerciceToDelete = await Exercices.findByIdAndDelete(id)
        if (exerciceToDelete){
            deleteAsociateMarks(id)
        }

        

        return res.status(200).json({
            success: true,
            message: "Ejercicio eliminado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


// Ruta mara modificar un ejercicio por ID pasando ID de usuario por token

ExercicesRouter.put("/updateExercice/:id", checkToken, async (req, res) =>{
    try {
        const {id} = req.params
        const {nameExercice} = req.body

        const user = await Users.findById(req.user.id)     // Busca en el modelo de usuario si encuentra la ID pasada por token
        if (!user) return res.status(500).json({           // Si no encuentra la id de usuario es que no está logueado
            success: false,
            message: `El usuario no está logueado`
        })

     
        
        if (!nameExercice){
            return res.status(400).json({
                success: false, 
                message: "No puede dejar el ejercicio en blanco"
            })
        }

        await Exercices.findByIdAndUpdate(id, {nameExercice})
        res.status(200).json({
            success: true,
            message: `El ejercicio se ha modificado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})

// Las siguientes dos rutas las uno en el FRONT

// Listar ejercicios de un usuario logueado

ExercicesRouter.get("/exercicesUser", checkToken, async (req, res) => {

    const user = await Users.findById(req.user.id)
    if (!user) return res.status(400).json({
        success: false, 
        message: "Usuario no logueado"
    })

    Users.findById(req.user.id).populate("name")
        .then(user1 => {
            Exercices.find({user: req.user.id}) //.populate("marcas")
                .then(exercices => {
                    return res.json({
                        success: true,
                        user1,
                        exercices
                    })
                })
        })
})


// Listar ejercicios por ID y que aparezcan sus marcas

ExercicesRouter.get("/marksUserList/:id", checkToken, async (req, res) => {
    const exerciceID = req.params.id

    const user = await Users.findById(req.user.id)
    if (!user) return res.status(400).json({
        success: false, 
        message: "Usuario no logueado"
    })

    Exercices.findById(exerciceID) //.populate("name")
        .then(exercices => {
            Mark.find({ exercices: exerciceID }) //.populate("exercices")
                .then(marks => {
                    return res.json({
                        success: true,
                        exercices,
                        marks
                    })
                })
        })
})


module.exports = ExercicesRouter



