


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