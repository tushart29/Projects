// whenever we create api methods, we need to give labels for the APIs
// whenever we use mongo db, we get a promise, we need to use async. When we use async, we need to use try and catch 

const expressAsyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");


//@desc get all contacts
//@route GET /api/contacts
//@access private 

const getContacts = expressAsyncHandler(async (req, res) => { // no need to do try and catch since expressasynchandler will handle this
    // when exeception occurs, it will pasls to error handler

    const contacts = await Contact.find({ user_id: req.user.id });
    // res.status(200).json({ message: "Get all contacts" })
    res.status(200).json(contacts)

});

//@desc Create New contacts
//@route POST /api/contacts
//@access private 

const createContact = expressAsyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandotory");
        // if you want to change the error to not be html, you need to create a custom middlewhee , where its going to transform into json 
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    })
    res.status(201).json(contact)
}); // when we create a new contact, we give response of 201, which means resource created


//@desc get individual contact
//@route GET /api/contacts/:id
//@access private 

// does nto work if id is wrong
// const getContact = expressAsyncHandler(async (req, res) => {
//     const contact = await Contact.findById(req.params.id)
//     console.log(contact)
//     if (!contact) {
//         res.status(404);
//         throw new Error("Contact not found");
//     }
//     res.status(200).json(contact)
// });
const getContact = expressAsyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }

        res.status(200).json(contact);
    } catch (error) {
        // Instead of throwing a new Error here, you can handle it in one place
        res.status(404);
        throw new Error("Contact not Found");
    }
});


//@desc update individual contact
//@route PUT /api/contacts/:id
//@access private 

const updateContact = expressAsyncHandler(async (req, res) => {
    try {
        // Find the contact by ID
        const contact = await Contact.findById(req.params.id);

        // If the contact doesn't exist, throw an error
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        if (contact.user_id.toString() != user.req.id) {
            res.status(403);
            throw new Error("User does not have permission to update other users contact");

        }

        // Update the contact
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );

        // Respond with the updated contact
        res.status(200).json(updatedContact);
    } catch (error) {
        // Handle errors
        res.status(404);
        throw new Error("Contact not found");
    }
});


//@desc delete individual contact
//@route DELETE /api/contacts/:id
//@access private 

const deleteContact = expressAsyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        if (contact.user_id.toString() != user.req.id) {
            res.status(401);
            throw new Error("User does not have permission to update other users contact");

        }

        const result = await Contact.deleteOne({ _id: req.params.id }); // Use deleteOne() with _id

        res.status(200).json({ message: "Contact deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(404);
        throw new Error("Contact not Found");
    }
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }