const mongoose = require('mongoose');
import {Databaseurl} from '../environments/environment'

async function connect() {
  try {
    await mongoose.connect(`${Databaseurl}?retryWrites=true&w=majority`, {
    
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; 
  }
}

module.exports = { connect };