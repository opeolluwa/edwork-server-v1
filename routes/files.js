const express = require('express')
const router = express.Router()
const cors = require('cors')
const { search, add, getRelatedSearchResult } = require('../controllers/files')
const { validate_search_query, validate_search_add_files } = require('../middleware')
const { decodeJWT, validateAuthToken } = require('../middleware/profile')
router.use(cors())
router.post('/search',/*  validate_search_query, */  validateAuthToken, decodeJWT, search)
router.post('/add', validateAuthToken, decodeJWT, validate_search_add_files, add)
router.get("/search/results/:id", validateAuthToken, decodeJWT, getRelatedSearchResult)
module.exports = router
