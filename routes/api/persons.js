const express = require("express");
const uuid = require('uuid');
const router = express.Router();
const persons = require("../../Person");

// API to get Person array
router.get("/", (req, res) => {
    res.json(persons);
  });
  
// Get person with id
router.get('/:id', (req, res) => {
      // res.send(`<h1>person with id api response</h1>`);
      // res.send(req.params.id);
      // res.send(persons.filter(person => person.id == req.params.id));
      const pID = parseInt(req.params.id);
      const found = persons.some(person => person.id === pID);
      if (found){
          res.json(persons.filter(person => person.id === pID));
      } else {
          res.status(404).json({ message: `Person with id ${pID} not found`});
      }  
});

// Create Person
router.post('/', (req, res) => {
    // res.send(req.body);
    const newPerson = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!req.body.name || !req.body.email){
        res.status(400).json({ message: "Please include Name & Email"});
    } else {
        persons.push(newPerson);
        res.json(persons);
        // res.redirect('/'); // ReDirect to same page
    }
})

// Update Person if he/she exist
router.put('/:id', (req, res) => {
    const pID = parseInt(req.params.id);
    const found = persons.some(person => person.id === pID);
    if (found){
        // res.json(persons.filter(person => person.id === pID));
        const updatePerson = req.body;
        const index = persons.findIndex( person => person.id === pID);
        persons[index].name = updatePerson.name? updatePerson.name : persons[index].name;
        persons[index].email = updatePerson.email? updatePerson.email : persons[index].email;
        res.json({ message: "Update Successful", person: persons[index]});
    } else {
        res.status(404).json({ message: `Person with id ${pID} not found`});
    }  
});

// Delete person with id
router.delete('/:id', (req, res) => {
    const pID = parseInt(req.params.id);
    const found = persons.some(person => person.id === pID);
    if (found){
        const index = persons.findIndex( person => person.id === pID);
        persons.splice(index, 1);
        res.json({ message: `Person with id ${pID} is removed from system`, persons: persons });
    } else {
        res.status(404).json({ message: `Person with id ${pID} not found`});
    }  
});

module.exports = router;