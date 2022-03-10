const {database} = require("../config/config.database");

//get notification from database and feed off to client 
function get_notification(req, res) {
    database
        .promise()
        .query("SELECT * FROM notifications ORDER BY date DESC")
        .then(([rows, fields]) => {
            //TODO: remove id from response
            return res.send({ notification: rows })
        })
}


module.exports = { get_notification }