const { database } = require("../config/config.database")
const uuid = require("./../utils/uuid")
const _ = require('lodash');


//TODO :: add path for admin
//TODO: Add jwt verification for admin to add files to database and password reconfirm
//REFACTOR : check if file already exist
function add(req, res, next) {
    //destructure request body
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


//search functionality
//TODO: mount filters
function search(req, res, next) {
    //destructure payload
    const { query, filters } = req.body;
    database
        .promise()
        .query("SELECT * FROM files WHERE LOWER(course_code) LIKE ?  OR LOWER(course_title) LIKE ?", [`%${query.trim()}%`, `%${query.trim()}%`])
        .then(([rows, fields]) => {

            /* match found, add it to session for use in other files controller
            * essentially the getRelatedSearchResult and result from related query
           */
            if (rows.length) {
                req.session.fileSearchResult = rows;
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


//use session to track related content and pagination
/* once a mach is found, an item is clicked and rendered,
* resend a request to this end point, 
* get the same set again and then remove the currently selected,
* resend the related to the user
*/
function getRelatedSearchResult(req, res) {
    //get the id of the selected file
    const { id: selectedId } = req.params;
    database
        .promise()
        .query("SELECT * FROM files WHERE( id = ?);", [selectedId])
        .then(([rows, fields]) => {
            console.log(rows);
            return res.send(rows)

        })
    
    
    //use natural language to get related files

    // res.send({ related: fileSearchResult })
}

module.exports = { search, add, getRelatedSearchResult }
