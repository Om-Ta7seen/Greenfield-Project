var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    sequelize.query("select * from Orders", { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getOrderByID = function (ID, callback) {
    sequelize.query("select * from Orders where ID = :ID", { replacements: { ID: ID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.addOrder = function (orderObj, callback) {
    var Query = 'insert into Orders (CookerID,UserID,DeliveryDate,DeliverTime) \
                 values (:CookerID,:UserID,:DeliveryDate,:DeliverTime)';
    sequelize.query(Query, { replacements: { CookerID: orderObj.CookerID, UserID: CookerID.UserID, DeliveryDate: orderObj.DeliveryDate, DeliverTime: orderObj.DeliverTime }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}




