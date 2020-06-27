const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Register = require("../models/registration");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", (req, res, next) => {
	let password = req.body.password;
	bcrypt.hash(password, 10, function(err, hash) {
		if (err) {
			throw new Error("Could not hash");
		}
		Register.create({
			fname: req.body.fname,
			lname: req.body.lname,
			address: req.body.address,
			phone: req.body.phone,
			email: req.body.email,
			password: hash,
			security: req.body.security
		})
			.then(register => {
				let token = jwt.sign({ _id: register._id }, process.env.SECRET);
				res.json({ status: "Signup Success", token: token });
			})
			.catch(next);
	});
});

router.post("/login_user", (req, res, next) => {
	Register.findOne({ email: req.body.email })
		.then(register => {
			if (register == null) {
				let err = new Error("User not found!");
				err.status = 401;
				return next(err);
			} else {
				bcrypt
					.compare(req.body.password, register.password)
					.then(isMatch => {
						if (!isMatch) {
							let err = new Error("Password does not match!");
							err.status = 401;
							return next(err);
						}
						let token = jwt.sign({ _id: register._id }, process.env.SECRET);
						console.log(token);
						res.json({ status: "Login success!", token: token });
					})
					.catch(next);
			}
		})
		.catch(next);
});

router.get("/me", auth.verifyUser, (req, res, next) => {
	let password = req.Register.password;
	bcrypt.hash(password, 10);
	res.json({
		_id: req.Register._id,
		fname: req.Register.fname,
		lname: req.Register.lname,
		email: req.Register.email,
		address: req.Register.address,
		phone: req.Register.phone,
		password: req.Register.password
	});
});

router.get("/users", function(req, res) {
	Register.find()
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

router.get("/users/:id", function(req, res) {
	Register.findById(req.params.id)
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

router.get("/login", async function(req, res) {
	try {
		const register = await Register.checkCrediantialsDb(
			req.body.username,
			req.body.password
		);
		const token = await register.generateAuthToken();
		res.send({ register, token });
	} catch (e) {
		res.status(400).send();
	}
});

module.exports = router;
