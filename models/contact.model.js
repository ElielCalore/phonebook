/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const ContactSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: Number,
    required: true,
    minLength: 8,
    match:
      /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm,
  },
});
const ContactModel = model('Contact', ContactSchema);

module.exports = ContactModel;
