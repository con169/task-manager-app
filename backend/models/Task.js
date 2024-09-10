const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Task model
module.exports = mongoose.model('Task', TaskSchema);
