const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema({
	name: {
		type: String
	},
	price: {
		type: String
	},
	image: {
		type: String
	},
	description: {
		type: String
	}
});

module.exports = mongoose.model("products", productSchema);
