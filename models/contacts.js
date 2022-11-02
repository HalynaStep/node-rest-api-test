// const fs = require('fs/promises')
let contacts = require('./contacts.json')
const { v4: uuidv4 } = require('uuid');

const listContacts = (req, res) => {
  res.status(200).json({contacts});
}

const getContactById = (req, res) => {
  const { contactId } = req.params
  const [ contact ]= contacts.filter(contact => contact.id === contactId)

    if (!contact) {
      return res.status(404).json({
        message: "Not found"})
    }
    res.status(200).json({contact})
}

const removeContact = (req, res) => {
  const { contactId } = req.params
  const contactIndx = contacts.findIndex(
    ({ id }) => id === contactId
  )
  if (contactIndx === -1) {
    return res.status(404).json({ message: "Not found" })
  
  }
  deletedContact = contacts.splice(contactIndx, 1);
  res.status(200).json({ message: "contact deleted"});
}

const addContact = (req, res) => {
    const {
      name, 
      email,
      phone
    } = req.body;

    contacts.push({
        id: uuidv4(),
        name, 
        email,
        phone
    })

    res.status(201).json({contacts});
    
}

const updateContact = (req, res) => {
  const { contactId } = req.params
   const {
      name, 
      email,
      phone
  } = req.body;

  const contactIndx = contacts.findIndex(
    ({ id }) => id === contactId
  )
  if (contactIndx === -1) {
    return res.status(404).json({ message: "Not found" })
  }
  
 if (name) {
    contacts[contactIndx].name = name;
  }
  if (email) {
    contacts[contactIndx].email = email;
  }
  if (phone) {
    contacts[contactIndx].phone = phone;
  }

  const updatedContact = contacts[contactIndx]
  res.status(200).json(contacts[contactIndx])
}
    
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
