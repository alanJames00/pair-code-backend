const express = require('express');
const uuid = require('uuid')
const collabRouter = express.Router();

collabRouter.use(express.json());

const collection = [];

collabRouter.post('/createRoom', (req, res) => {

    console.log(req.body);
    // create a collabId
    const collabId = uuid.v4();

    collection.push({
        collabId,
        users: [req.body.name],
    });

    console.log(collection);

    res.json({
        message: 'room created',
        collabId: collabId
    });
});

collabRouter.post('/joinRoom', (req, res) => {

    const userName = req.body.name;
    // check collabId is in the db
    const collabId = req.body.collabId;

    const validIndex = collection.findIndex((e) => e.collabId == collabId);
    if(validIndex != -1) {
        
        // push the new user to the collection
        const newEntry = {
            collabId: collection[validIndex].collabId,
            users: [...collection[validIndex].users, userName]
        }
        console.log(newEntry);
        
    }
    else {
        res.status(404).json({
            error:'This collabID does not exist'
        })
    }

});


module.exports = collabRouter;