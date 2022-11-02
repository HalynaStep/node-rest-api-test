const express = require('express')

const router = express.Router()

const { listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
} = require('../../models/contacts')

const { validationPost } = require("../../middlewares/validationPost")
const { validationPut } = require('../../middlewares/validationPut')

router.get('/', listContacts);

router.get('/:contactId', getContactById)

router.post('/', validationPost, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validationPut, updateContact)

module.exports = router
