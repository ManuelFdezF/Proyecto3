const nodemailer = require("nodemailer");   

const userMail = process.env.USER_MAIL
const pass = process.env.PASS_MAIL

const transport = nodemailer.createTransport({    // Con esto creo la conexión SMTP y le paso las credenciales del correo remitente
  service: "Gmail",
  auth: {
    user: userMail,
    pass: pass,
  },
});


// Aquí creo el correo de bienvenida que llamaré la función una vez creado el usuario

module.exports.sendWelcomeEmail = (email, password, name) => {
  console.log("Check");
  transport.sendMail({
    from: userMail,
    to: email,
    subject: "¡Bienvenido a CrossfitAPP!",
    html: `<h1>¡Datos de acceso a la aplicación!</h1>
        <h2>¡¡Hola ${name}!! </h2>
        <p>Tus datos de acceso son los siguientes:</p>
        <p><b>Usuario:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Te recomendamos que cambies tu contraseña cuando accedas por primera vez.</p>
        </div>`,
  }).catch(err => console.log(err));
};
