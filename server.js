
// WS Server Setup
const io = require('socket.io')(4001, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {

    console.log(`New connection`);
});



// HTTP Server Setup
const express = require('express');
const app = express();
const PORT = 4000;
const userRouter = require('./api/user_routes');
const collabRouter = require('./api/collab_routes');

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