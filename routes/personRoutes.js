const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body //Assigning the request body contains the person data
        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new Person to the database
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
})

//Get method to get the Person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Fetche');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
})

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const person = await Person.find({ work: workType });
            console.log("response fetched")
            res.status(200).json(person);
        } else {
            res.status(404).json({ error: 'Invalid Work type' })
        }
    } catch (err) {
        res.status(500).json("Internal Server Error")
    }
})

//Update Person record
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('Data Updated');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

// Delete person record
router.delete('/:id',async(req,res)=>{
    try{
const personId = req.params.id;
const deletePerson = await Person.findByIdAndDelete(personId);
if(!deletePerson){
    return res.status(404).json({error:'Person not found'});
}
console.log('Data Delete');
res.status(200).json({message:'Person deleted successfully'});
    }catch(error){
res.status(500).json('Internal server error');
    }
})

module.exports = router;