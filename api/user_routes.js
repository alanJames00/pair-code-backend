const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signup', async (req, res) => {

    console.log(req.body);
});

userRouter.post('/signin', async (req, res) => {


});

userRouter.get('/validateToken', async (req, res) => {


});

module.exports = userRouter;