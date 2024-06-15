const express = require("express")
const router = express.Router()
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken); // if you want all the routes to where this token has to be validated. if you want some of the routes, use it as a parameter
// router.route('/').get(getContacts);
// router.route('/').post(createContact);

router.route('/').get(getContacts).post(createContact);

// router.route('/:id').get(getContact);

// router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router

// going to create a controller to contain logic for request response and connect to database.