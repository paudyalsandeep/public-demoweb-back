const mongoose = require("mongoose");
const notification = mongoose.Schema({
	postedDate: Date,
	endDate: Date,
	title: String,
	description: String
});

module.exports = mongoose.model("notification", notification);
