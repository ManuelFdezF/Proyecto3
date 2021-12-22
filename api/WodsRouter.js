const express = require("express");
const Wods = require("../models/Wods")
const WodsRouter = express.Router()
const checkToken = require("../middleware/auth")
const authAdmin = require ("../middleware/authAdmin")
const Users = require("../models/Users")




// Ruta para crear un WOD

WodsRouter.post("/createWod", checkToken, authAdmin, async (req, res) =>{
try {
    const{type, name, time, description} = req.body

    const user = await Users.findById(req.user.id)     
        if (!user) return res.status(500).json({          
            success: false,
            message: `El usuario no está logueado`
        })

    const wods = await Wods.findOne({name})  // busca si el wod existe. Si existe da error, si no, lo crea
    if(wods) return res.status(400).json({
        success:false,
        message:"El ejercicio introducido ya existe"
    })

    if (!type || !name || !time || !description){
        return res.status(400).json({
            success: false, 
            message: "Tiene que rellenar todos los campos del formulario"
        })
    }

    if (type != "For Time" && type != "AMRAP" && type != "EMOM"){
        return res.status(400).json({
            success: false,
            message: "Los tipos de Wods puenden ser 'For Time' , 'AMRAP' o ' EMOM"
        })
    }

    const newWod = new Wods({
        type,
        name,
        time,
        description
    })
    await newWod.save()
    return res.status(200).json({
        success:true,
        newWod,
        message:`${name}, se ha creado como nuevo wod de tipo ${type}`
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    }) 
}
})

// Listar todos los WODS

WodsRouter.get("/wodsList", checkToken, async (req, res) =>{
    try {
        const user = await Users.findById(req.user.id)     
        if (!user) return res.status(500).json({          
            success: false,
            message: `El usuario no está logueado`
        })

        let wods = await Wods.find({})
        return res.status(200).json({
            success: true,
            wods
        })
            
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        }) 
    }
})


//Modificar un wod por ID

WodsRouter.put("/updateWod/:id", checkToken, authAdmin, async (req, res) =>{
    try {
        const {id} = req.params
        const {type, name, time, description} = req.body

        const user = await Users.findById(req.user.id)     
        if (!user) return res.status(500).json({          
            success: false,
            message: `El usuario no está logueado`
        })

        const wod = await Wods.findOne({name})  // Antes de actualizar el perfil compruebo si el wod existe en la BBDD
        if(wod) return res.status(400).json({
            success:false,
            message: `El wod '${name}' ya está creado.` 
        })
        
        if (!type && !name && !time && !description){
            return res.status(400).json({
                success: false, 
                message: "No puede dejar todos los campos en blanco en blanco"
            })
        }

        if (type != "For Time" && type != "AMRAP" && type != "EMOM"){
            return res.status(400).json({
                success: false,
                message: "Los tipos de Wods puenden ser 'For Time' , 'AMRAP' o 'EMOM'"
            })
        }

        await Wods.findByIdAndUpdate(id, {type, name, time, description})
        res.status(200).json({
            success: true,
            message: `El wod se ha modificado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})

// Eliminar un wod por ID

WodsRouter.delete("/deleteWod/:id", checkToken, authAdmin, async (req, res) =>{
    try {
        const {id} = req.params
        
        const user = await Users.findById(req.user.id)     
        if (!user) return res.status(500).json({          
            success: false,
            message: `El usuario no está logueado`
        })

        await Wods.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "El wod se ha eliminado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })  
    }
})


module.exports = WodsRouter