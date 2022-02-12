const express = require("express");
const Classes = require("../models/Classes")
const ClassesRouter = express.Router()
const TimeTable = require("../models/TimeTable")
const checkToken = require("../middleware/auth")
const Users = require("../models/Users")
const authAdmin = require("../middleware/authAdmin")

// Ruta para crear una clase por usuario logueado

ClassesRouter.post("/createClass", checkToken, authAdmin, async (req, res) =>{
    const {date, wodDay} = req.body
    try {
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        const date1 = await Classes.findOne({date})    // Compruebo si ya existe una clase con esa fecha
        if (date1) return res.status(400).json({
            success: false,
            message: `Ya existe una clase con la fecha ${date}`
        })

        if (!date || !wodDay){
            return res.status(400).json({
                success: false,
                message: "La fecha y el WOD es obligatorio"
            })
        }
    
        const newClass = new Classes({
            date,
            wodDay
        })
        await newClass.save()
        res.status(200).json({
            success: true,
            message: `Se ha creado la clase del día ${date} correctamente`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
    
})



// Ruta para modificar una Clase estando logueado

ClassesRouter.put("/updateClass/:id", checkToken, authAdmin, async (req, res) =>{
    try {
        const {id} = req.params
        const {date, wodDay} = req.body

        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })
        
        const clas = await Classes.findOne({date})  // Compruebo si la fecha existe
        if(clas) return res.status(400).json({
            success:false,
            message: `La clase del '${date}' ya está creado.` 
        })

       

        await Classes.findByIdAndUpdate(id, {date, wodDay})
        res.status(200).json({
            success: true,
            message: `La clase se ha modificado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


// Eliminar una clase por ID

ClassesRouter.delete("/deleteClass/:id", checkToken, authAdmin, async (req, res) =>{
    try {
        const {id} = req.params
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        await Classes.findByIdAndDelete(id)
        TimeTable.find({date: id}).then(foundTimeTable =>{
            foundTimeTable.map((arrTime)=>{
                TimeTable.findByIdAndDelete(arrTime._id, function(err, arrTime){
                    if (err){
                        console.log(err)
                    }else{
                        console.log("Horario eliminado")
                    }
                })
            })
        })

        return res.status(200).json({
            success: true,
            message: "La clase se ha eliminado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})

// Listar Clase por día y que aparezcan los diferentes horarios ------- Hago el listado desde BookingRouter
ClassesRouter.get("/classesList/:id", checkToken, async (req, res) => {
    try {
        const dateID = req.params.id
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        Classes.findById(dateID) //.populate("date")
        .then(date => {
            TimeTable.find({ date: dateID }) //.populate("date")
                .then(timeTable => {
                    return res.json({
                        success: true,
                        date,
                        timeTable
                    })
                })
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})  
    
// Listar todas las clases

ClassesRouter.get("/getClasses", checkToken, async (req, res) =>{
    try {
        const user = await Users.findById(req.user.id)     
        if (!user) return res.status(500).json({          
            success: false,
            message: `El usuario no está logueado`
        })

        let classes = await Classes.find({})
        return res.status(200).json({
            success: true,
            classes
        })
            
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})
    

module.exports = ClassesRouter
