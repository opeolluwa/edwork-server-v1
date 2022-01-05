const email_validator = require("email-validator");
const validUrl = require('valid-url');
const _ = require('lodash');
const jwt = require("../utils/jwt");


module.exports = {

    //handle search :: quering database
    validate_search_query: (req, res, next) => {
        const { query } = req.body;

        if (!query || query.length <= 3) {
            res.status(400).send({ message: _.capitalize("please provide a keyword of minimum character length = 5") })
        }
        next();
    },

    //handle adding files to database
    validate_search_add_files: (req, res, next) => {
        //destrucure request body
        const { course_title, course_code, file_url, file_type } = req.body

        //!course_title
        if (!course_title || (course_title.length <= 5)) {
            res.status(400).send({ message: _.capitalize("please add more detail to course title") })
        }

        //!course_code
        if (!course_code || (course_code.length <= 3)) {
            res.status(400).send({ message: _.capitalize("please provide a valid course code") })
        }
        //!file_url or url not valid,
        const validUrl = require('valid-url');
        if ((!file_url) || (!validUrl.isUri(file_url))) {
            res.status(400).send({ message: _.capitalize('file link doesn\'t Look valid') })
        }
        //!file_type
        if (!file_type || (course_title.length <= 4)) {
            res.status(400).send({ message: _.capitalize("please provide file type, options are note and questions") })
        }
        next()
    },

    
    
}