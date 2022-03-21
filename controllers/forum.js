const { database } = require("../config/config.database")


function liveFeed(req, res) {
    database
        .promise()
        .query("SELECT * FROM forum_feed ORDER BY date DESC;")
        .then(([rows, fields]) => {
            return res.send({ posts: rows })
        })

}

function comment(req, res) {

}

function post() {

}

function watch(req, res) {

}

function like(req, res) {

}

function deletePost(req, res) {

}
module.exports = {
    liveFeed,
    like,
    post,
    watch,
    comment,
}