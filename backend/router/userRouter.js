const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// : denotes url parameter
router.get('/getbyemail/:email', (req, res) => {
    console.log(req.params.email);
    res.send('response from user getbyemail');
});
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/getbyid/:id', (req, res) => {
    res.send('response from user getbyid');
});
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                //login sucess - generate token
                const { _id, name, email } = result;
                const Payload = { _id, name, email };
                jwt.sign(
                    Payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '2d' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);

                        } else {
                            res.status(200).json({ token });
                        }
                    }
                )

            } else {
                //login failed - send error message
                res.status(401).json({ message: 'Invalid username or password' });
            }

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})


// getall
// getbyid
// update
// delete

module.exports = router;