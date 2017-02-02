const mongoose = require('mongoose');

/*const instructionSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, index: true },
  description: { type: String, index: true },
  steps: [
    {
      _id: false,
      picture: String,
      description: { type: String, index: true }
    }
  ]
});*/

const instructionSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: String,
  description: String,
  steps: [
    {
      _id: false,
      picture: String,
      description: String
    }
  ]
});

instructionSchema.index(
  {
    'title': 'text',
    'description': 'text',
    'steps.description': 'text'
  },
  {
    weights: {
      'title': 10,
      'description': 5,
      'steps.description': 1
    },
    name: 'textIndex'
  }
);

const Instruction = mongoose.model('Instruction', instructionSchema);

module.exports = {
  Instruction: Instruction,
  instructionSchema: instructionSchema
}
