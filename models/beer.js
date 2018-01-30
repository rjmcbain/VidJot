const mongoose = require('mongoose');

let beerSchema = new mongoose.Schema({
	name: {type:String, required:true},
	abv: Number,
	style: String,
	brewery: String
});

let Listbeer = mongoose.model("Beer", beerSchema);

module.exports = Listbeer;