const database = require("../config/config.database");

function pageCount(req, res) {
    database
        .promise()
        .query("SELECT * FROM analytics")
        .then(([rows, field]) => {
            res.send(rows)
        })
}