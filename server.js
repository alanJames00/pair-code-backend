
// WS Server Setup
const io = require('socket.io')(4001, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {

    console.log(`New connection`);
    
    // handle room-join
    socket.on('join-room', message => {
        console.log(`${socket.id} joined collab ${message.collabId} with username ${message.user}`);
        socket.join(message.collabId);
        // broadcast new user joining
        socket.broadcast.to(message.collabId).emit('user-joined', message.user);
        
        // make a fetch request to update in the db
        fetch('http://localhost:4000/collab/activeHook', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ activeUser: message.user, collabId: message.collabId})
        });
        
    })
});



// HTTP Server Setup
const express = require('express');
const app = express();
const PORT = 4000;
const userRouter = require('./api/user_routes');
const collabRouter = require('./api/collab_routes');
const cors = require('cors');

app.use(cors());

app.use('/users', userRouter);
app.use('/collab', collabRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Helllo',
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})