var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    sequelize.query("select * from Orders", { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getOrdersByUserName = function (UserName, callback) {
	var Query = 'select Cooker.ID as CookerID,CLient.ID as ClientID \
				 ,Cooker.FullName as CookerFullName\
				 ,CLient.FullName as CLientFullName \
				 ,CookNames.Name, CookNames.ID as cookNameID \
				 ,Orders.DeliveryDate \
				 ,Orders.DeliverTime \
				 ,Orders.approved\
				 ,Orders.Quantity \
				 from Orders \
				 join Users as Cooker on Cooker.ID = Orders.CookerID \
				 join CookNames on CookNames.ID = Orders.CookNamesID \
				 join Users as CLient on CLient.ID = Orders.UserID \
				 where Cooker.UserName = :UserName '
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
	var Query = 'Users.ID as UsersID,Cooker.ID as CookerID \
				 ,Users.FullName as UsersFullName\
				 ,Cooker.FullName as CookerFullName \
				 ,CookNames.Name, CookNames.ID as cookNameID \
				 ,Orders.DeliveryDate \
				 ,Orders.DeliverTime \
				 ,Orders.approved\
				 ,Orders.Quantity \
				 from Orders \
				 join Users  on Users.ID = Orders.UserID \
				 join CookNames on CookNames.ID = Orders.CookNamesID \
				 join Users as Cooker on Cooker.ID = Orders.CookerID \
				 where Cooker.UserName = :UserName '
    sequelize.query(Query, { replacements: { UserName: UserName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}



///

exports.getOrderByID = function (ID, callback) {
    sequelize.query("select * from Orders where ID = :ID", { replacements: { ID: ID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addOrder = function (orderObj, callback) {
	var Query = 'insert into Orders (CookerID,UserID,DeliveryDate,DeliverTime,CookNamesID,Quantity) \
                 values (:CookerID,:UserID,:DeliveryDate,:DeliverTime, :CookNamesID, :Quantity)';
	sequelize.query(Query, { replacements: { CookerID: orderObj.cookerID, UserID: orderObj.userID, DeliveryDate: orderObj.deliveryDate, DeliverTime: orderObj.deliveryTime,CookNamesID:orderObj.CookNamesID ,Quantity: orderObj.quantity }, type: Sequelize.QueryTypes.INSERT })
		.then(callback)
}