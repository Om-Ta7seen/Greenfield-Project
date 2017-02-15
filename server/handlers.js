var jwt = require('jwt-simple');
var Orders = require('./models/Orders.js');
var Users = require('./models/Users.js')


module.exports = {
	signin: function(req, res){
		//check
		var username = req.body.UserName;
		var password = req.body.Password;

		Users.findOne({ where: {UserName: username, Password: password} }, function(err, found){
			if(err){
				res.status(500).send(err);
			}
			else{
				var token = jwt.encode(found, 'secret');
				res.json({token: token});
			}
		})
	},
	signup: function(req, res){
		//check
		var user = req.body;

		Users.getUserByUsername(user.username, function(found){
			if(found){
				console.log("this user already exist!!")
			}
			else{
				Users.addUser(user, function(err, found){
					if(err){
						res.status(500).send(err);
					}
					else{
						var token = jwt.encode(found, 'secret');
						res.json({token: token});
					}
				})
			}
		})
	},

	getAllOrders: function(req, res){
		Orders.getAll(function(err, orders){
			if(err){
				res.status(500).send(err);
			}
			else{
				res.json(orders);
			}
		})
	},

	addOrder: function(req, res){
		//check
		var order = req.body;
		Orders.addOrder(order, function(err, order){
			if(err){
				res.status(500).send(err);
			}
			else{
				res.json(order); 
			}
		})
	}

}