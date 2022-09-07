/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { request, response } = require('express');
const ContactModel = require('../models/contact.model');

// eslint-disable-next-line no-shadow
router.post('/create-contact', async (request, response) => {
  try {
    const newContact = await ContactModel.create(request.body);
    return response.status(201).json(newContact);
  } catch (error) {
    return response.status(500).json(error.response.data.error);
  }
});

router.get('/read-contact', async (request, response) => {
  try {
    const contacts = await ContactModel.find();
    return response.status(201).json(contacts);
  } catch (error) {
    return response.status(500).json(error.response.data.error);
  }
});

router.get('/read-details-contact/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const contactDetails = await ContactModel.findOne({ _id: id });
    return response.status(201).json(contactDetails);
  } catch (error) {
    return response.status(500).json(error.response.data.error);
  }
});

router.get('/info-contact', async (request, response) => {
  try {
    const sizeContact = (await ContactModel.find()).length;
    return response
      .status(201)
      .json(`Phonebook has info for ${sizeContact} people `);
  } catch (error) {
    return response.status(500).json(error.response.data.error);
  }
});

router.delete('/delete-contact/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const deletedContact = await ContactModel.findOneAndDelete({ _id: id });
    return response.status(201).json(deletedContact);
  } catch (error) {
    return response.status(500).json(error.response.data.error);
  }
});

router.put('/update-contact/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const updateContact = await ContactModel.findOneAndUpdate(
      { _id: id },
      { ...request.body },
      { new: true }
    );
    return response.status(201).json(updateContact);
  } catch (error) {
    return response.status(500).json(error.response.data.error);
  }
});

module.exports = router;
