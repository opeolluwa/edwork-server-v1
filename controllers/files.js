const database = require("../config/config.database")
const uuid = require("./../utils/uuid")
//TODO: Add jwt verification for addmin to add files to dayabase and password reconfirm
//REFACTOR : check if file already exist
const _ = require('lodash');


//TODO :: add path for admin
function add(req, res, next) {
    //destrucure request body
    const { course_title, course_code, file_url, file_type } = req.body
    database
        .promise()
        .query("INSERT INTO files (file_id, course_code, course_title, file_url, file_type) VALUES (?,?,?,?,?)", [uuid, course_code, course_title, file_url, file_type])
        .then(([rows, fields]) => {
            return res.send({ message: `${course_title}` + " successfully added" })
        })
        .catch(error => console.log(error))
    // .then(() => database.end());
}


//search funtionality
function search(req, res, next) {
    //destructure payload
    const { query, filters } = req.body;


    console.log(query)
    database
        .promise()
        .query("SELECT * FROM files WHERE LOWER(course_code) LIKE ?  OR LOWER(course_title) LIKE ?", [`%${query.trim()}%`, `%${query.trim()}%`])
        .then(([rows, fields]) => {

            // match found
            if (rows.length) {
                return res.send({ message: rows })
            }
            // no match found
            else {
                return res.send({ error: `no match found for "${query}"` })
            }
        })
        //if error 
        .catch((error) => {
            return res.send({ error: _.capitalize(`no match found for "${_.upperCase(query)}"`) })
        })
}


module.exports = { search, add }
