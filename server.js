// Mongoose - Package imports
const mongoose = require('mongoose');
// Mongoose - Files
const Instruction = require('./server/models/instruction').Instruction;

// Express - Package imports
const express = require('express');
const multer = require('multer');
const path = require('path');
// Express - File imports
//const api = require('./server/routes/api');

// Mongoose setup
const dbUrl = 'mongodb://tacticnoodle:test123@ds137540.mlab.com:37540/mymongo';
mongoose.connect(dbUrl);

// Optional initialisations of the database
var db = mongoose.connection;
db.once('open', function() {});

//Multer setup
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'dist/uploads/')
  },
  filename: (req, file, cb) => {
    var fileMimeType = file.mimetype;
    var pos = fileMimeType.search('/');
    var fileEnding = fileMimeType.slice(fileMimeType.length - pos + 1);

    cb(null, Date.now() + '_' + file.originalname)
  }
})

var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' });

// Express setup
const app = express();
const port = process.env.PORT || 1234;

// Open public folder
app.use(express.static(path.join(__dirname, 'dist')));

// ----------------------------------------
// -------------- ROUTES ------------------
// ----------------------------------------

// POST - create 1 instruction
app.post('/api/instructions', upload.array('step_picture', 99), (req, res, next) => {

  // Create instruction-JSON from multiform-request
  var instructionJSON = {};
  instructionJSON.title = req.body.instructionTitle;
  instructionJSON.description = req.body.instructionDescription;
  instructionJSON.steps = [];
  if (typeof req.body.step_description === 'string') {
    instructionJSON.steps[0] = {};
    instructionJSON.steps[0].description = req.body.step_description;
    instructionJSON.steps[0].picture = req.files[0].path.slice(5);
  } else {
    for (var index in req.files) {
      instructionJSON.steps[index] = {};
      instructionJSON.steps[index].description = req.body.step_description[index];
      instructionJSON.steps[index].picture = req.files[index].path.slice(5);
    }
  }

  var instruction = new Instruction(instructionJSON);

  instruction.save((error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });

});

// GET - retrieve all instructions
app.get('/api/instructions', (req, res) => {
  Instruction.find((error, instructions) => {
    if (error) return console.error(error);

    res.json(instructions);
  });
});

// GET - retrieve instruction according to query
app.get('/api/instructions/query/:query', (req, res) => {
  searchString = req.params.query;
  Instruction.find(
    { $text: { $search: searchString } },
    { score: { $meta: 'textScore' } }
  )
  .sort({ score : { $meta : 'textScore' } })
  .exec((error, instructions) => {
      if (error) return console.error(error);

      res.json(instructions);
  });
});

// GET - retrieve 1 instruction by id
app.get('/api/instructions/:id', (req, res) => {
  Instruction.findById(req.params.id, (error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});

// PUT - update 1 instruction by id
/*
app.put('/api/instructions/:id', jsonParser, (req, res) => {
  Instruction.findByIdAndUpdate(req.params.id, req.body, (error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});
*/

// DELETE - delete an instruction by id
app.delete('/api/instructions/:id', (req, res) => {
  Instruction.findByIdAndRemove(req.params.id, (error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});

// Let Angular do the site-routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Activate server
app.listen(port, () => {
  console.log('Example app listening on port: ' + port);
});
