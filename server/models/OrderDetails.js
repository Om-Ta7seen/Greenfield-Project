var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    sequelize.query("select * from OrderDetails", { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getOrderDetailsByOrderID = function (OrdersID, callback) {
    var Query = 'select Orders.ID as OrderID, NormalUser.FullName as UserFullName \
                ,Cooker.FullName as CookerFullName,CookNames.Name as CookName , CookNames.TypeName as CookTypeName from Orders \
                join OrderDetails on OrderDetails.OrdersID = Orders.ID \
                join CookNames on CookNames.ID = OrderDetails.CookNameID \
                join Users as Cooker on Cooker.ID = Orders.CookerID \
                join Users as NormalUser on NormalUser.ID = Orders.UserID \
                where Orders.ID = :OrdersID'
    sequelize.query(Query, { replacements: { OrdersID: OrdersID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addOrderDetails = function (OrderDetailsObj, callback) {
    sequelize.query("insert into OrderDetails (OrdersID, CookNameID) values (:OrdersID, :CookNameID)", { replacements: { OrdersID: OrderDetailsObj.OrdersID, CookNameID: OrderDetailsObj.CookNameID }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}




