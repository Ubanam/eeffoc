//Setting Schema Info
var mongoose = require('mongoose');
var CoffeeListSchema = new mongoose.Schema({
	id:String,
	name:String
});

mongoose.model('CoffeeList',CoffeeListSchema);