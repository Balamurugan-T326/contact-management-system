const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

router.route('/')
  .post(createContact)
  .get(getAllContacts);

router.route('/:id')
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
