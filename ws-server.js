
// WS Server Setup
const io = require('socket.io')(4001, {
    cors: {
        origin: '*'
    },
    pingTimeout: 30000000,
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
        try {

            fetch('http://localhost:4000/collab/activeHook', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ activeUser: message.user, collabId: message.collabId})
            });
        }
        catch(e) {
            console.log('crashed 32');
            console.log(e);
        }
        
        socket.on('send-code-change', codeChange => {

            socket.broadcast.to(message.collabId).emit('receive-code-change', codeChange);
            console.log(`${codeChange.user} wrote: ${codeChange.code}`);

            // broadcast the code changes
        })

        socket.on('send-left-room', userLeft => {
            console.log(`${userLeft} left the room`);

            socket.broadcast.to(message.collabId).emit('receive-left-room', userLeft);

            // fetch to update in db
        })
    })
});
