const express = require('express');
const uuid = require('uuid')
const collabRouter = express.Router();

collabRouter.use(express.json());

const collection = new Map();

collabRouter.post('/createRoom', (req, res) => {

    console.log(req.body);
    // create a collabId
    const collabId = uuid.v4();

    const entry = {
        users: [req.body.name],
        activeUsers: []
    }

    collection.set(collabId, entry );

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

    const hasId = collection.has(collabId);
    if(hasId == true) {
        
        // get the old entry
        const oldUsers = collection.get(collabId).users;
        const newUsers = [...oldUsers, req.body.name];
        // set the new entry

        const entry = {
            users: newUsers,
            activeUsers: [...(collection.get(collabId).activeUsers)]
        }

        collection.set(collabId, entry);
        console.log(collection);

        res.status(200).json({
            sucess:'Joined Space',
            collabId
        });
    }
    else {
        res.status(404).json({
            error:'This collabID does not exist'
        })
    }

});

collabRouter.post('/activeHook', (req, res) => {

    // fetch the collection
    const oldActiveUsers = collection.get(req.body.collabId).activeUsers;
    
    // check for reduntant active username
    const userExist = oldActiveUsers.includes(req.body.activeUser);
    console.log(userExist);
    
    if(userExist == true) {
        console.log('user already exist skipping');
    }
    else {

        const newActiveUsers = [...oldActiveUsers, req.body.activeUser];

        const entry = {
            activeUsers: newActiveUsers,
            users: [...(collection.get(req.body.collabId).users)]
        };

        collection.set(req.body.collabId, entry);
        console.log(collection);
        
        res.status(200).json({
            message: 'Success'
        });
    }
    
});

collabRouter.post('/leftHook', (req, res) => {

    // fetch the collection
    const collabId = req.body.collabId;
    const userLeft = req.body.userLeft;

    console.log(req.body);

    const oldActiveUsers = collection.get(collabId).activeUsers;
    const newActiveUsers = oldActiveUsers.filter((elem) => elem != userLeft);

    const entry = {
        activeUsers: newActiveUsers,
        users: collection.get(collabId).users,
    };

    // set the new key-value
    collection.set(collabId, entry);
    console.log(collection);

    res.json({
        sucess:'success'
    });

});

collabRouter.get('/getActiveUsers', (req, res) => {

    const collabId = req.query.id;
    
    const activeUsers = collection.get(collabId).activeUsers;
    
    res.json(activeUsers);
})

module.exports = collabRouter;