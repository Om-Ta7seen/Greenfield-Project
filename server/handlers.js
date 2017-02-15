var jwt = require('jwt-simple');
var Orders = require('./models/Orders.js');
var Users = require('./models/Users.js')
var CookerSchedule = require('./models/CookerSchedule.js')

module.exports = {
	signin: function(req, res){
		var username = req.body.UserName;
		var password = req.body.Password;

		Users.getUserByUsername(username, function(err, user){
			if(err){
				res.status(500).send(err);
			}
			else{
				if(password === user.Password){
					var token = jwt.encode(user, 'secret');
					res.json({token: token});
				}
				else{
					console.log('Wrong username Or password')
				}
			}
		})

	},
	signup: function(req, res){
		//check
		var user = req.body;

		Users.getUserByUsername(user.UserName, function(user){
			if(user){
				console.log("this user already exist!!")
			}
			else{
				Users.addUser(user, function(err, newUser){
					if(err){
						res.status(500).send(err);
					}
					else{
						var token = jwt.encode(newUser, 'secret');
						res.json({token: token});
					}
				})
			}
		})
	},

	getUserProfile: function(req, res){
		//chekkk
		var username = req.params.username;
		var profile;
		Users.getUserByUsername(username, function(err, user){
			if(err){
				res.status(500).send(err);
			}
			else{
				Object.assign(profile,user);
			}
		})
		//wait saeeddd
		//CookerSchedule.getCookerSchedule()

	}

	// getAllOrders: function(req, res){
	// 	Orders.getAll(function(err, orders){
	// 		if(err){
	// 			res.status(500).send(err);
	// 		}
	// 		else{
	// 			res.json(orders);
	// 		}
	// 	})
	// },

	addOrder: function(req, res){
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