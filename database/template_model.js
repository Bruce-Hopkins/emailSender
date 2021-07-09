var mongoose = require('mongoose');

// Define the schema
var Schema = mongoose.Schema;

/**
 * Variable
 */
var TemplateSchema = new Schema(
  {
    title: {type: String  },
    summary: {type: String},
    dateOfCreation: {type: Date},
    scheduledDate: {type: Date},
    array: {type: Array},
  },
);

module.exports = mongoose.model('Templates', TemplateSchema); // *Variable
