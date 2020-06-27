const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const uploadroute = require("./routes/upload_route");
const registerRoute = require("./routes/register_route");
const productRoute = require("./routes/product_route");
const notificationRoute = require("./routes/notification_route");

var app = express();
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(
	bodyparser.urlencoded({
		extended: false
	})
);

require("./db/drdesktop");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRoute);
app.use("/upload", uploadroute);
app.use("/product", productRoute);
app.use("/notification", notificationRoute);

app.use(auth.verifyUser);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.statusCode = 500;
	res.json({ status: err.message });
});

app.listen(4000);
