require("dotenv").config(); //para llamar al .env .. cuando lo subamos a github no pueden ver nuestra url
const express = require("express") // requerimos express
const mongoose = require("mongoose"); //requerimos mongoose
const UserRouter = require("./api/UserRouter");
const ExercicesRouter = require("./api/ExercicesRouter");
const MarksRouter = require("./api/MarksRouter")
const WodsRouter = require("./api/WodsRouter")
const ClassesRouter = require("./api/ClassesRouter")
const TimetableRouter = require("./api/TimeTableRouter")
const BookingRouter = require("./api/BookingRouter")
const fileUpload = require("express-fileupload")
const cors = require("cors")


const app = express()
app.use(express.json()); //estos dos comandos para que lea json y funcione desdes postman
app.use(express.urlencoded({extended: true})); //leer datos desde postman desde urlencoded
app.use(cors()) // para poder coger datos del backend
app.use(fileUpload({useTempFiles: true})) //Para poder subir archivos desde postman


app.use("/api", UserRouter) //enlazamos con las rutas de UserRouter que es donde están las rutas creadas
app.use("/api", ExercicesRouter) 
app.use("/api", MarksRouter)
app.use("/api", WodsRouter)
app.use("/api", ClassesRouter)
app.use("/api", TimetableRouter)
app.use("/api", BookingRouter)

const URI = process.env.MONGODB_URL //llamamos a la ruta del mongo db atlas puesta en el .env
mongoose.connect(URI, { // conectamos la Base de datos
}).then(() =>{
    console.log("BBDD is now connected!")
}).catch(err =>{
    console.log(err)
})

// condicion para heroku para saber donde buscar los archivos
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// app.listen(5000, () => console.log("Server is running on port 5000"))
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('El servidor esta corriendo en el puerto', PORT)
})