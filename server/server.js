const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const post = require('./routes/api/post')
// const User = require('./models/User')
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

require('dotenv').config({ path: './env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('Conectate a mongo primero');
		return err;
	}
	console.log('Conectado a MongoDB');
});

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/post", post);


// app.get('/users', (req, res) => {
// 	User.find({}, (err, users) => { 
// 		if(err) return res.status(400).send(err)
// 		res.status(200).send(users)
// 	})
// })


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port} !`));
