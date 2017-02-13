var Sequelize = require('sequelize');
var sequelize = require('../db/dbconnection.js');

exports.getAll = function (callback) {
    var Query = 'select CookerSchedule.ID as CookerSchID,Users.ID as CookerID \
                ,CookerSchedule.DayName,Users.FullName,CookNames.Name as CookeName,CookNames.TypeName as CookTypeName from CookerSchedule \
                join Users on Users.ID = CookerSchedule.CookerID \
                join CookNames on CookNames.ID =CookerSchedule.CookNamesID \
                order by CookerSchedule.CookerID'
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getCookerSchedule = function (CookerID, callback) {
    var Query = 'select CookerSchedule.ID as CookerSchID,Users.ID as CookerID \
                ,CookerSchedule.DayName,Users.FullName,CookNames.Name as CookeName,CookNames.TypeName as CookTypeName from CookerSchedule \
                join Users on Users.ID = CookerSchedule.CookerID \
                join CookNames on CookNames.ID =CookerSchedule.CookNamesID \
                where CookerSchedule.CookerID = "CookerID \
                order by CookerSchedule.CookerID'
    sequelize.query(Query, { replacements: { CookerID: CookerID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}



exports.addSchedule = function (ScheduleObj, callback) {
    var Query = 'insert into CookerSchedule (DayName, CookNamesID, CookerID, ImgUrl) \
                  values (:DayName, :CookNamesID, :CookerID, :ImgUrl)'
    sequelize.query(Query, { replacements: { DayName: ScheduleObj.DayName, CookNamesID: ScheduleObj.CookNamesID, CookerID: ScheduleObj.CookerID, ImgUrl: ScheduleObj.ImgUrl }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}




