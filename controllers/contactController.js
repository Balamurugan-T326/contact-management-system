const Contact = require('../models/Contact');

// Helper function to find contact by contactId or MongoDB _id
const findContactById = async (idParam) => {
  let contact = await Contact.findOne({ contactId: idParam });
  if (!contact && idParam.match(/^[0-9a-fA-F]{24}$/)) {
    contact = await Contact.findById(idParam);
  }
  return contact;
};

// @desc    Add new contact
// @route   POST /contacts
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const { contactId, name, phone, email } = req.body;

    // Check if contactId already exists
    const existingContactId = await Contact.findOne({ contactId });
    if (existingContactId) {
      return res.status(400).json({
        success: false,
        message: `Contact with contactId '${contactId}' already exists.`,
      });
    }

    // Check if email already exists
    const existingEmail = await Contact.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: `Contact with email '${email}' already exists.`,
      });
    }

    const contact = new Contact({ contactId, name, phone, email });
    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: savedContact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Duplicate field value entered for '${field}'`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Fetch all contacts
// @route   GET /contacts
// @access  Public
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Fetch a contact by ID (contactId or _id)
// @route   GET /contacts/:id
// @access  Public
exports.getContactById = async (req, res) => {
  try {
    const contact = await findContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with ID '${req.params.id}'`,
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Update contact details
// @route   PUT /contacts/:id
// @access  Public
exports.updateContact = async (req, res) => {
  try {
    const contact = await findContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with ID '${req.params.id}'`,
      });
    }

    const { name, phone, email, contactId } = req.body;

    if (name !== undefined) contact.name = name;
    if (phone !== undefined) contact.phone = phone;
    if (email !== undefined) contact.email = email;
    if (contactId !== undefined) contact.contactId = contactId;

    const updatedContact = await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Duplicate field value entered for '${field}'`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete contact
// @route   DELETE /contacts/:id
// @access  Public
exports.deleteContact = async (req, res) => {
  try {
    const contact = await findContactById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with ID '${req.params.id}'`,
      });
    }

    await Contact.deleteOne({ _id: contact._id });

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
