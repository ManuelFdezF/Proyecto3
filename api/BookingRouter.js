const express = require("express");
const Booking = require("../models/Booking")
const BookingRouter = express.Router()
const Classes = require("../models/Classes")
const TimeTable = require("../models/TimeTable")
const Users = require("../models/Users")
const checkToken = require("../middleware/auth")

//TODO (Miguel): Aplicar más coherencia en los niveles de abstracción.


// crear nueva reserva enviando id de usuario por token




    /*
    TODO (Miguel): Este variable found me confunde un poco. 
    Parece que la intención es verificar si el usuario que hace la llamada ya 
    está apuntado a la clase. El método map de un array nos permite trasformar cada elemento del array,
    para saber si existe en un array un elemento determinado podemos usar el método 'some' y el código quedaría más
    legible. El código entre las líneas 53-71 se puede cambiar por algo asi:

     if (currentTimeTable.numTotPeople.some(u => { u.equals(user._id)}){
         return res.json({
                success: false,
                message: "Ya estás apuntado en la clase"
            })
        };
    */
    // let found = false

    // currentTimeTable.numTotPeople.map((findUser) => {
    //     if (findUser.equals(user._id)) {
    //         return found = true
    //     }
    // })
    function UserCanBook(currentTimeTable, user) {
         return  !currentTimeTable.attendees.some(a => a.equals(user._id));
    }
    // if (found == true) {
    //     return false;
    // } else {
    //     return true;
    // }


function HasCapacityInClass(currentTimeTable) {
    if (currentTimeTable.attendees.length >= currentTimeTable.capacity ) {
        return false;
    }
    return true;
}

async function AddBooking () {
    newBooking = new Booking({
        user: req.user.id,
        class: classID,
        timeTable: timeTableID
    })
    await newBooking.save();
    await TimeTable.findByIdAndUpdate(timeTableID, {
        $push: {
            numTotPeople: user._id
        }
    })
}

BookingRouter.post("/newBooking", checkToken, async (req, res) => {
    /*
        TODO (Miguel): /newBooking podría ser más un aproach de RPC (Remote Call Procedure) 
        en el caso de protocolo REST el endpoint normalmente se define con un sustantivo 
        que es el nombre del recurso sobre el que vamos a actuar, en este caso booking, y la 
        operación que quieres hacer al define el verbo HTTP, en este caso POST para crear un
        nuevo booking.
        En definitiva, sería más correcto definir este endpoint asi:
        BookingRouter.post("/booking", checkToken, async (req,res) => ...
    */

    const {classID, timeTableID} = req.body

    try {
// Clausulas de guarda
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no encontrado"
        })
        if (!classID || !timeTableID) {
            res.status(400).json({
                success: false,
                message: "No puede dejar campos en blanco"
            })
        }


// Logica de dominio (negocio)

        const currentTimeTable = await TimeTable.findById(timeTableID) //devuelvo el horario

        let userCanBook = UserCanBook(currentTimeTable, user);
        let hasCapacityInClass = HasCapacityInClass(currentTimeTable);
        if (userCanBook && hasCapacityInClass) {
            AddBooking();
        }
        

// Respuesta del endpoing

        return res.json({
            success: true,
            newBooking,
            message: "Se ha reservado tu clase correctamente"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
})


// -----------------------------------------------------------------



// Ruta para eliminar una reserva por ID

function FindBookingAndDelete(bookingForDelete, id){
   const foundIdBooking = await Booking.findByIdAndDelete(id)
    // Elimino el usuario del array de personas apuntadas en clase
    await TimeTable.findByIdAndUpdate(bookingForDelete.timeTable, {
            $pull: {
                attendees: user._id
            }
        })
        if (foundIdBooking) return true
}


BookingRouter.delete("/deleteBooking/:id", checkToken, async (req, res) => {
    try {
        //Clausulas de guarda
        const {id} = req.params
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({
            success: false,
            message: "Usuario no encontrado"
        })


        //Lógica de dominio
        const bookingForDelete = await Booking.findById(id)

        let findBookingAndDelete = FindBookingAndDelete(bookingForDelete, id)
        if (findBookingAndDelete){
            return res.status(200).json({
                success: true,
                message: "Se ha eliminado su reserva"
            })
        }

    } catch (error) {
        return res.json({
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
                TimeTable.find({
                        date: dateID}).populate("user")
                    .then(timetable => {
                        Booking.find({
                                class: dateID}).populate("user")
                            .then(bookings => {
                                return res.json({
                                    success: true,
                                    date,
                                    timetable,
                                    bookings,
                                    user: user._id
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