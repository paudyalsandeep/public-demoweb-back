const mongoose = require("mongoose");

mongoose
	.connect("mongodb://127.0.0.1:27017/drdesktop", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(
		db => {
			console.log("Successfully connected to MongoDb server");
		},
		err => console.log(err)
	);
