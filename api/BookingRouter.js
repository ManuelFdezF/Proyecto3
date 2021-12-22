const express = require("express");
const Booking = require("../models/Booking")
const BookingRouter = express.Router()
const Classes = require("../models/Classes")
const TimeTable = require("../models/TimeTable")
const Users = require("../models/Users")
const checkToken = require("../middleware/auth")



// crear nueva reserva enviando id de usuario por token

BookingRouter.post("/newBooking", checkToken, async (req,res) => {
    
    const {classID, timeTableID} = req.body
    try {
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        if (!classID || !timeTableID){
            res.status(400).json({
                success: false,
                message: "No puede dejar campos en blanco"
            })
        }
    
        newBooking = new Booking({
            user: req.user.id,
            class: classID,
            timeTable: timeTableID
        })
        await newBooking.save()
        res.status(200).json({
            success: true,
            newBooking,
            message: `Se ha reservado tu clase correctamente ${user.name}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})

// Ruta para eliminar una reserva por ID

BookingRouter.delete("/deleteBooking/:id", checkToken, async (req, res) =>{
    try {
        const {id} = req.params
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        await Booking.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Se ha eliminado su reserva"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


// Ruta para listar una clase por ID y que se muestren los horarios y usuarios apuntados

BookingRouter.get("/bookingList/:id", checkToken, async (req, res) => {
    const dateID = req.params.id

    try {
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no logueado"
        })

        Classes.findById(dateID) //.populate("name")
        .then(date => {
            TimeTable.find({ date: dateID }).populate("user")
                .then(horario => {
                    Booking.find({class: dateID }).populate("user","name")
                    .then(usuarios => {
                    return res.json({
                        success: true,
                        date,
                        horario,
                        usuarios
                    })
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




module.exports = BookingRouter