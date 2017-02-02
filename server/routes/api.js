// Express - Package imports
const express = require('express');
const router = express.Router();


// Mongoose - imports
const mongoose = require('mongoose');
const Instruction = require('../models/instruction').Instruction;





/*
const bodyParser = require('body-parser');
// Parser for POST-bodies
const jsonParser = bodyParser.json()
// POST - create 1 instruction
router.post('/instructions', jsonParser, (req, res) => {
  var instruction = new Instruction(req.body);

  console.log(req.files);

  instruction.save((error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});

// GET - retrieve all instructions
router.get('/instructions', (req, res) => {
  Instruction.find((error, instructions) => {
    if (error) return console.error(error);

    res.json(instructions);
  });
});

// GET - retrieve instruction according to query
router.get('/instructions/query/:query', (req, res) => {
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
router.get('/instructions/:id', (req, res) => {
  Instruction.findById(req.params.id, (error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});

// PUT - update 1 instruction by id
router.put('/instructions/:id', jsonParser, (req, res) => {
  Instruction.findByIdAndUpdate(req.params.id, req.body, (error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});

// DELETE - delete an instruction by id
router.delete('/instructions/:id', (req, res) => {
  Instruction.findByIdAndRemove(req.params.id, (error, instruction) => {
    if (error) return console.error(error);

    res.json(instruction);
  });
});*/

module.exports = router;
