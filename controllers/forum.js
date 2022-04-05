const { database } = require("../config/config.database")


/*
* on the client application,
* use async to get the data in this controller,
* not all at once tho
* more will ve fetched using intersession observer and mysql pagination mechanism
*/
function liveFeed(req, res) {
    database
        .promise()
        .query("SELECT * FROM forum_feed ORDER BY date DESC;")
        .then(([rows, fields]) => {
            return res.send({ posts: rows })
        })

}
/* comment controller 
* allow user to comment on a post
*/
function comment(req, res) {

}
/* post controller 
* allow user to post a data on edwork, 
* get the special character and parse it as html entities
*/
function post() {

}

//post views counter, adder and remover on click event
function watch(req, res) {

}

//post likes counter, adder and remover on click event
function like(req, res) {

}

function deletePost(req, res) {

}

//get post and comments
function postsAndComments(req, res) {
    //get post id from client application
    const { postId } = req.params;
    console.log(req.params);
    database
        .promise()
        .query("SELECT * FROM forum_feed WHERE( id = ?);", [postId])
        .then(([rows, fields]) => {
            return res.send({ post: rows })
        })
}
module.exports = {
    liveFeed,
    postsAndComments,
    like,
    post,
    watch,
    comment,
}