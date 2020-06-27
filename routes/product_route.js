const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");

router.post("/addproducts", (req, res, next) => {
	Product.create({
		name: req.body.name,
		price: req.body.price,
		image: req.body.image,
		description: req.body.description
	})
		.then(product => {
			res.json({ status: "Product Added!" });
		})
		.catch(next);
});

router.get("/getproduct", (req, res, next) => {
	Product.find()
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

router.delete("/deleteproduct/:id", function(req, res, next) {
	Product.findByIdAndDelete(req.params.id).then(response => {
		console.log("Product deleted of " + req.params.id);
	});
});

module.exports = router;
