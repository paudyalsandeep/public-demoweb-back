const express = require("express");
const mongoose = require("mongoose");
const Notification = require("../models/notification");
const router = new express.Router();
const bodyParser = require("body-parser");
var app = express();

router.get("/notifications", function(req, res) {
	Notification.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.post("/upload_notification", function(req, res) {
	console.log(req.body);
	var data = new Notification(req.body);
	data.save();
});

router.delete("/deletenotification/:id", function(req, res) {
	Notification.findByIdAndDelete(req.params.id, req.body, function(
		err,
		register
	) {
		if (err) return next(err);
		res.json(register);
	});
});

router.get("/notification/:id", function(req, res) {
	Notification.findById(req.params.id)
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;
