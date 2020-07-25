var express = require("express");
var nodemailer = require ("nodemailer");
const details = require("./details.json");
const cors = require("cors");
const bodyParser = require("body-parser");
var app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.post("/send-email",(req, res) =>{
	let user = req.body;
	var transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		post: 587,
		secure: false,
		auth:{
			user: details.email,
			pass: details.password
		}
	});
	var mailOptions={
		from: "Remitente",
		to: user.email,
		subject: "Recuperación de contraseña",
		html: `<h1>Hola</h1><br>
    		   <h4>Gracias por usar EcoWorld, su nueva contraseña es: <strong>${user.password}</strong></h4>`
	}
	transporter.sendMail(mailOptions,(error,info)=>{
		if (error){
			res.status(500).send(error.message);
		}
		else{
			console.log("Enviado");
			res.status(200).jsonp(req.body);
		}
	});
});

app.listen(3000,()=>{
	console.log("Servidor en -> http://localhost:3000");
});