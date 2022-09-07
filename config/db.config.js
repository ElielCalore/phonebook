/* eslint-disable no-console */
const mongoose = require('mongoose');

async function connect() {
  try {
    const dbConnect = await mongoose.connect(
      'mongodb://localhost:27017/db-phonebook'
    );
    console.log('Connected to DB:', dbConnect.connection.name);
  } catch (error) {
    console.error('Db connection error', error);
  }
}

module.exports = connect;
