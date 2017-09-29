var express = require('express');
var bodyParser = require('body-parser');
var handlers = require('./handlers.js')
var port = 8000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


app.post('/api/users/signin', handlers.signin);
app.post('/api/users/signup', handlers.signup);

app.post('/api/orders', handlers.addOrder);

app.get('/api/orders/:username', handlers.getCookerOrders);

app.get('/api/users/:username', handlers.getCookerProfile);
app.get('/api/cookingNames', handlers.getCookingNames);
app.get('/api/todayCookings', handlers.getTodayCookings);
app.get('/api/topCookers', handlers.getTopCookers);
app.get('/api/userProfile/:username', handlers.getUserProfile);
app.get('/api/userOrders/:username', handlers.getUserOrders);

app.post('/api/Approve',handlers.AcceptOrder);
app.post('/api/cancelOrder',handlers.CancelOrder);
app.post('/api/DeleteOrder',handlers.DeleteOrder);
app.get('/api/getAllCookerscookers',handlers.GetAllCookers);
app.post('/api/AddSpecial',handlers.SpecialOrder) ;

app.listen(process.env.PORT || port);
console.log('work on port '+ port )