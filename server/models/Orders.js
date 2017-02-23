var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    sequelize.query("select * from Orders", { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getOrdersByUserName = function (UserName, callback) {
	console.log('1111!!!111!!!!!!111',UserName)
	var Query = 'select Cooker.ID as CookerID,CLient.ID as ClientID \
				 ,Cooker.FullName as CookerFullName\
				 ,CLient.FullName as CLientFullName \
				 ,CookNames.Name, CookNames.ID as cookNameID \
				 ,Orders.DeliveryDate \
				 ,Orders.DeliverTime \
				 ,Orders.approved\
				 ,Orders.ID as OrderID\
				 ,Orders.Quantity \
				 from Orders \
				 join Users as Cooker on Cooker.ID = Orders.CookerID \
				 join CookNames on CookNames.ID = Orders.CookNamesID \
				 join Users as CLient on CLient.ID = Orders.UserID \
				 where Cooker.UserName = :UserName AND approved != "no" \
				 order by DeliveryDate Desc'
    sequelize.query(Query, { replacements: { UserName: UserName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


///User

// select Users.ID as UsersID,Cooker.ID as CookerID 
// 				 ,Users.FullName as UsersFullName
// 				 ,Cooker.FullName as CookerFullName 
// 				 ,CookNames.Name, CookNames.ID as cookNameID 
// 				 ,Orders.DeliveryDate 
// 				 ,Orders.DeliverTime ,
// 					Orders.approved
// 				 ,Orders.Quantity 
// 				 from Orders 
// 				 join Users  on Users.ID = Orders.UserID 
// 				 join CookNames on CookNames.ID = Orders.CookNamesID
// 				 join Users as Cooker on Cooker.ID = Orders.CookerID 
// 				 where Users.UserName = ''

exports.getUserOrdersByUserName = function (UserName, callback) {

	var Query = ' select Users.ID as UsersID,Cooker.ID as CookerID \
				 ,Users.FullName as UsersFullName\
				 ,Cooker.FullName as CookerFullName \
				 ,CookNames.Name, CookNames.ID as cookNameID \
				 ,Orders.DeliveryDate \
				 ,Orders.DeliverTime \
				 ,Orders.approved\
				 ,Orders.ID as OrderID\
				 ,Orders.Quantity \
				 from Orders \
				 join Users  on Users.ID = Orders.UserID \
				 join CookNames on CookNames.ID = Orders.CookNamesID \
				 join Users as Cooker on Cooker.ID = Orders.CookerID \
				 where Users.UserName = :UserName \
				 order by DeliveryDate Desc '
    sequelize.query(Query, { replacements: { UserName: UserName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}



///

exports.getOrderByID = function (ID, callback) {
    sequelize.query("select * from Orders where ID = :ID", { replacements: { ID: ID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addOrder = function (orderObj, callback) {
	console.log('addddddd ordeeeer',orderObj)
	var Query = 'insert into Orders (CookerID,UserID,DeliveryDate,DeliverTime,CookNamesID,Quantity) \
                 values (:CookerID,:UserID,:DeliveryDate,:DeliverTime, :CookNamesID, :Quantity)';
	sequelize.query(Query, { replacements: { CookerID: orderObj.cookerID, UserID: orderObj.userID, DeliveryDate: orderObj.deliveryDate, DeliverTime: orderObj.deliveryTime,CookNamesID:orderObj.CookNamesID ,Quantity: orderObj.quantity }, type: Sequelize.QueryTypes.INSERT })
		.then(callback)
}


exports.AcceptOrder= function (ID, callback) {
	console.log( '=============--------',ID)
	var Query = 'UPDATE Orders SET approved = "yes" where ID = :ID';
	sequelize.query(Query, { replacements: {ID : ID}, type: Sequelize.QueryTypes.BULKUPDATE })
		.then(callback)
}


exports.CancelOrder= function (ID, callback) {
		console.log('in cancel Order !!!!',ID)
	var Query = 'update Orders SET approved = "no" where ID = :ID';
	sequelize.query(Query, { replacements: {ID : ID}, type: Sequelize.QueryTypes.UPDATE })
		.then(callback)
}

exports.DeleteOrder= function (ID, callback) {
	console.log("deletttttttttttttttt",ID)
	var Query = 'DELETE from Orders where ID = :ID';
	sequelize.query(Query, { replacements: {ID : ID}, type: Sequelize.QueryTypes.DELETE })
		.then(callback)
}



exports.SpecialOrder = function (orderObj2, callback) {

	// var Query = 'insert into Orders (CookerID,UserID,DeliveryDate,DeliverTime,CookNamesID,Quantity) \
 //                 values (:CookerID,:UserID,:DeliveryDate,:DeliverTime, :CookNamesID, :Quantity)';
	// sequelize.query(Query, { replacements: { CookerID: orderObj.cookerID, UserID: orderObj.userID, DeliveryDate: orderObj.deliveryDate, DeliverTime: orderObj.deliveryTime,CookNamesID:orderObj.CookNamesID ,Quantity: orderObj.quantity }, type: Sequelize.QueryTypes.INSERT })
	// 	.then(callback)
	console.log('in mooooozzzzzz',orderObj2)
	var Query = 'insert into Orders (CookerID,UserID,DeliveryDate,DeliverTime,CookNamesID,Quantity,special,DisheName) \
                 values (:CookerID,:UserID,:DeliveryDate,:DeliverTime, :CookNamesID, :Quantity, :special, :DisheName)';
	sequelize.query(Query, { replacements: { CookerID: orderObj2.CookerID, UserID: orderObj2.UserId, DeliveryDate: orderObj2.DeliveryDate, DeliverTime: orderObj2.DeliveryTime,CookNamesID:"noname" ,Quantity: orderObj2.Quantity,special :orderObj2.special,DisheName : orderObj2.DisheName}, type: Sequelize.QueryTypes.INSERT })
		.then(callback)
}

