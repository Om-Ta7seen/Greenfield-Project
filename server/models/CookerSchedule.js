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


exports.getCookerTodayCook = function (UserID, callback) {
    var Query = 'select Users.ID,Users.FullName,CookNames.Name,CookerSchedule.Price from CookerSchedule \
                 join Users on Users.ID = CookerSchedule.CookerID \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
                 where CookerSchedule.DayName = (select case strftime("%w", date("now")) when "7" then "Saturday" when "0" then "Sunday" when "1" then "Monday" when "2" then "Tuesday" when "5" then "Wednesday" when "6" then "Thursday" when "7" then "Friday"  end) \
                 and Users.ID = :UserID'
    sequelize.query(Query, { replacements: { UserID: UserID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getCookerSchedule = function (CookerID, callback) {
    var Query = 'select CookerSchedule.ID as CookerSchID,Users.ID as CookerID \
                ,CookerSchedule.DayName,Users.FullName,CookNames.Name as CookeName,CookNames.TypeName as CookTypeName from CookerSchedule \
                join Users on Users.ID = CookerSchedule.CookerID \
                join CookNames on CookNames.ID =CookerSchedule.CookNamesID \
                where CookerSchedule.CookerID = :CookerID \
                order by CookerSchedule.CookerID'
    sequelize.query(Query, { replacements: { CookerID: CookerID }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getAllCookByDayNameOrderdByPrice = function (DayName, callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
             from CookerSchedule \
             join Users on Users.ID = CookerSchedule.CookerID \
             join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
             where CookerSchedule.DayName = :DayName \
             order by CookerSchedule.Price desc '
    sequelize.query(Query, { replacements: { DayName: DayName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getAllCookByDayNameOrderdByPrice = function (callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
             from CookerSchedule \
             join Users on Users.ID = CookerSchedule.CookerID \
             join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
             where CookerSchedule.DayName = (select case strftime("%w", date("now")) when "7" then "Saturday" when "0" then "Sunday" when "1" then "Monday" when "2" then "Tuesday" when "5" then "Wednesday" when "6" then "Thursday" when "7" then "Friday"  end) \
             order by CookerSchedule.Price desc '
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}

exports.getAllCookByDayNameOrderByOrders = function (DayName, callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
                 ,count(Orders.ID) as OrderNums \
                 from CookerSchedule \
                 join Users on Users.ID = CookerSchedule.CookerID \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
                 left join Orders on Orders.CookerID = Users.ID \
                 where CookerSchedule.DayName = :DayName \
                 group by Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
                 order by count(Orders.ID) desc'
    sequelize.query(Query, { replacements: { DayName: DayName }, type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}


exports.getAllCookByDayNameOrderByOrders = function (callback) {
    var Query = 'select Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
                 ,count(Orders.ID) as OrderNums \
                 from CookerSchedule \
                 join Users on Users.ID = CookerSchedule.CookerID \
                 join CookNames on CookNames.ID = CookerSchedule.CookNamesID \
                 left join Orders on Orders.CookerID = Users.ID \
                 where CookerSchedule.DayName = (select case strftime("%w", date("now")) when "7" then "Saturday" when "0" then "Sunday" when "1" then "Monday" when "2" then "Tuesday" when "5" then "Wednesday" when "6" then "Thursday" when "7" then "Friday"  end) \
                 group by Users.ID,Users.FullName,CookerSchedule.DayName,CookNames.Name,CookerSchedule.Price \
                 order by count(Orders.ID) desc'
    sequelize.query(Query, { type: Sequelize.QueryTypes.SELECT })
        .then(callback)
}




exports.addSchedule = function (ScheduleObj, callback) {
    var Query = 'insert into CookerSchedule (DayName, CookNamesID, CookerID, ImgUrl) \
                  values (:DayName, :CookNamesID, :CookerID, :ImgUrl)'
    sequelize.query(Query, { replacements: { DayName: ScheduleObj.DayName, CookNamesID: ScheduleObj.CookNamesID, CookerID: ScheduleObj.CookerID, ImgUrl: ScheduleObj.ImgUrl }, type: Sequelize.QueryTypes.INSERT })
        .then(callback)
}




