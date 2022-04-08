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
function search(req, res) {
    //destructure payload
    const { filters } = req.body;
    const query = decodeURIComponent(req.body.query);

    /*make a base query and base value, 
    * if filters are present,
    * concat queries that'll wrap around the filter the filters else use the base query
   * if filter are present, populate the substitutes with the appropriate value
   */
    let baseQuery = "SELECT * FROM files WHERE MATCH(course_title, course_code) AGAINST(? IN NATURAL LANGUAGE MODE) ";
    const substitutes = [query]
    const thisYear = new Date().getFullYear() // for parsing filter by date uploaded


    //if file type is specified in the filters, the possible values are note and questions
    if (filters.type) {
        substitutes.push(filters.type);
        baseQuery += " AND type= ? "
    }




    /*filter the result based on the fact that first semester only contain odd course code,
    * and that second semester can only contain even number of courses
    * thus, selecting  2 characters from the right side of the course code
    * eg ele 315, will mean "15" will be selected, if the selected code is odd,
    * the course is most likely from first semester
    * the <> operator in mysql means not equal to
   */
    //first semester, convert the filter from string to integer
    switch (Number(filters.semester)) {
        case 1:
            baseQuery += "  AND RIGHT(course_code,2) %2 <>0 ";
            break;
        case 2:
            baseQuery += "  AND RIGHT(course_code,2) %2 =0 ";
            break;
        default:
            baseQuery += "  AND RIGHT(course_code,2) %2 >=0 ";
            break;
    }

    /*filter based on level,
    * escape five characters (as in case of ele 311) from the start
    * or six characters form the right (as in the case of PPCP 512).
    * The result will be selecting "3" (in ele 311 ) where 5 characters are escaped 
    * also, "5" will be selected (in PPCP 512) in which 6 characters are escaped
    * the selected number correspond to the level, compare level and generated appropriate query
    */
    switch (Number(filters.level)) {
        //100 level
        case 1:
            baseQuery += " AND (MID(course_code,5,1) =1 OR MID(course_code,6,1) =1) "
            break;
        //200 level
        case 2:
            baseQuery += " AND (MID(course_code,5,1) =2 OR MID(course_code,6,1) =2 ) "
            break;
        //300 level
        case 3:
            baseQuery += "  AND  (MID(course_code,5,1) =3 OR MID(course_code,6,1) =3 ) "
            break;
        //400 level
        case 4:
            baseQuery += "  AND  (MID(course_code,5,1) =4 OR MID(course_code,6,1) = 4 )  "
            break;
        //500 level
        case 5:
            baseQuery += "  AND  (MID(course_code,5,1) =5 OR MID(course_code,6,1) = 5 ) "
            break;
        //600 level
        case 6:
            baseQuery += "  AND  (MID(course_code,5,1) =6 OR MID(course_code,6,1) =6 ) "
            break;

        default:
            baseQuery += "  AND  (MID(course_code,5,1) >0 OR MID(course_code,6,1) >0 )"
            break;
    }

    /* FILTER YEAR, 
    * the year is saved as 2021-11-14 03:30:31
   * count for characters from the year uploaded 
   * deducted the current year from the year up loaded
   * if the result is zero, i.e the file is uploaded same year, the keyword "recent is matched"
   * else, if greater than or equal to one older is matched
   */
    switch (filters.age) {
        case "recent":
            baseQuery += ` AND  ${thisYear} - LEFT(date_uploaded,4) = 0 `
            break;
        case "older":
            baseQuery += ` AND  ${thisYear} - LEFT(date_uploaded,4) >= 1 `
            break;
        default:
            baseQuery += ` AND  ${thisYear} - LEFT(date_uploaded,4) >= 0 `
            break;
    }

    //pass the generated query and substitute to database engine 
    database
        .promise()
        .query(baseQuery, [...substitutes])
        .then(([rows, fields]) => {
            if (rows.length) {
                return res.send({ message: rows })
            }
            /*if  no match is found or error, send back the query to the user, we don't take shit here, once the user get his shit the browser will saturate it with more info to build the error result
            typically "no match found for <your shit 😌>*", <query> rather 😂😂😂*/
            else {
                return res.send({ error: `no match found for <strong>&ldquo;${query}&rdquo;</strong> <br/> try a more general keyword and less search filter` })
            }
        })
        //if error 
        .catch((error) => {
            return res.send({ error: `no match found for <strong>&ldquo;${query}&rdquo;</strong> <br/> try a more general keyword and less search filter` })
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
    const { fileSearchResult: relatedResult } = req.session

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
