var jwt = require('jwt-simple');
var Orders = require('./models/Orders.js');
var Users = require('./models/Users.js')
var CookerSchedule = require('./models/CookerSchedule.js')
var CookNames = require('./models/CookNames.js');
var Comments = require('./models/Comments.js')

module.exports = {
	signin: function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		Users.getUserByUsername(username, function(user){

			if(user.length>0){
				if(password === user[0].Password){
					delete user[0]['Password'];
					var token = jwt.encode(user[0], 'secret');
					res.json(Object.assign(user[0], {token: token}));
				}
				else{
					console.log('Wrong username Or password')
					res.status(500).json('Wrong username Or password')
				}
			}
		})
	},
	signup: function(req, res){
		//check
		var user = req.body;
		var days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
		var cookerID;
		Users.getUserByUsername(user.username, function(found){
			if(found.length>0){
				new Error("this user already exist!!")
				console.log("this user already exist!!")
			}
			else{

				console.log('hhhhhhhhhhhhhhhh')
				Users.addUser(user, function(newUser){
					console.log('hhhhhhhhhhhhhhhhhhh', newUser)
					//inserting the cooker schedule 
					for (var i = 0; i < days.length; i++) {
						var obj = {}
						obj.day = days[i];
						obj.cookerID = newUser;
						obj.price = user.schedule[i].price;
						obj.cookID = user.schedule[i].cookID;
						CookerSchedule.addSchedule(obj);
					}

					//make surrrrrre of then
					var token = jwt.encode(newUser, 'secret');
					res.json({token: token});
				})
			}
		})
	},

	getCookerProfile: function(req, res){
		var username = req.params.username;
		var profile = {};
		Users.getUserProfileInfo(username, function(user){
			Object.assign(profile,user[0]);
			CookerSchedule.getCookerSchedule(username, function(schedule){
				if(schedule){
					Object.assign(profile,{schedule:schedule});
				}
				CookerSchedule.getCookerTodayCook(username, function(cook){
					if(cook.length>0){
						Object.assign(profile,{todayCook:cook[0]});
					}
					else{
						Object.assign(profile,{todayCook:''});
					}
					Comments.getAllCookerComments(username, function(comments){
						console.log(comments)
						if(comments){
							Object.assign(profile,{comments:comments});
						}
						res.json(profile)
					})
				})
			})	
		})
	},

	getCookerOrders: function(req, res){
		var username = req.params.username;
		Orders.getOrdersByUserName(username, function(orders){
			res.json(orders);
		})
	},

	addOrder: function(req, res){
		var order = req.body;
		Orders.addOrder(order, function(order){
			res.json('Order Added'); 
		})
	},

	getCookingNames: function(req, res){
		CookNames.getAll(function(cooks){
			res.json(cooks)
		})
	}, 

	getTodayCookings: function(req, res){
		CookerSchedule.getAllCookByDayNameOrderdByPrice(function(result){
			res.json(result)
		})
	}

}