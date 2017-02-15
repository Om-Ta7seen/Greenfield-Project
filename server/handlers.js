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
		var days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
		var cookerID;
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
						cookerID = newUser.ID;
						//insertin the cooker schedule 
						for (var i = 0; i < days.length; i++) {
							var obj = {}
							obj.DayName = days[i];
							obj.CookerID = cookerID;
							obj.Price = req.schedule[i].Price;
							obj.CookNamesID = req.schedule[i].CookNamesID;
							CookerSchedule.addSchedule(obj);
						}

						//make surrrrrre of then
						var token = jwt.encode(newUser, 'secret');
						res.json({token: token});
					}
				});

	
			}
		})
	},

	getCookerProfile: function(req, res){
		//chekkk
		var username = req.params.username;
		var profile;
		Users.getUserProfileInfo(username, function(err, user){
			if(err){
				res.status(500).send(err);
			}
			else{
				Object.assign(profile,user);
			}
		})
		
		CookerSchedule.getCookerSchedule(username, function(schedule){
			if(schedule){
				Object.assign(profile,schedule);
			}
		})

		CookerSchedule.getCookerTodayCook(username, function(cook){
			if(cook){
				Object.assign(profile,cook);
				res.json(profile)
			}
		})

	},

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