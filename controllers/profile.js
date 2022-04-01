//load in dependencies
const { update } = require("lodash");
const { database } = require("../config/config.database");

//user profile information to send when they are logged in
function profile_information(req, res, next) {
    /*get user object from decodeJWT middleware,
    * the fields returned are
    * {firstname, lastname, email}
    * get all required fields and then send them back to user
    */
    const { email: user_email } = req.user
    console.log(user_email);
    database.promise()
        .query("SELECT * FROM user_information WHERE LOWER(email) = ?", [user_email])
        .then(([rows, fields]) => {
            //get user information and send
            const { firstname, lastname, user_id, email, phone, profile_picture_url, username } = rows[0];
            const user = {
                firstname, lastname, user_id, email, phone, profile_picture_url, username
            }
            return res.send({ user })

        })
}

function update_profile_information(req, res) {

    /*get user object from decodeJWT middleware,
   * the fields returned are
   * {firstname, user_id, email}
   * use the user_id to query the database
   */
    const { user_id } = req.user;


    /* get fields to be updated from update user_info middleware
    * update the user profile information and 
    * send them back to user
    */
    const payload = req.body;
    const fields = Object.keys(payload);
    console.log(fields);
    // return res.send({ fields })
    let query = "UPDATE user_information SET "
    for (const field in payload) {
        query += ` \`${field}\` = '${req.body[field]}', `
    }
    query = query.slice(0, -2); //remove trailing space and comma
    console.log(query);

    database
        .promise()
        //UPDATE user_information SET  `firstname` = 'jane',  `lastname` = 'doe,  `phone` = '081000 000 000',  `'
        .query(query + " WHERE (`user_id` = ?)", [user_id])
        .then(([rows, fields]) => {
            res.send(rows[0])
        })

    res.send({ message: "updated!", error: false })
}


module.exports = { profile_information, update_profile_information }