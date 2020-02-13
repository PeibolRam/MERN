const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const post = require('./routes/api/post');

const app = express();

require('dotenv').config({ path: './.env' });

const port = process.env.PORT;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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
app.use('/public', express.static('public'));

app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port} !`));