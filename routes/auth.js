const express = require("express");
const User = require('../models/User')

const router = express.Router()

// Create a User using POST-"/api/auth" Does not require auth 

router.get('/', (req, res) => {
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.send('hello')

})

module.exports = router