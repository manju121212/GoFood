const express = require('express')

const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../Models/User');
const bcrypt = require("bcryptjs");
const secret = "manjunath";
router.post("/createuser", [
    body('email').isEmail(),
    body('password').isLength({
        min: 6
    })], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        }
        catch (error) {
            console.log({ success: false });
        }
    })

router.post("/login", body('email').isEmail(),
    [body('password').isLength({
        min: 6
    })], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        let email = req.body.email;
     
        try {
            let userdata = await User.findOne({ email });

            if (!userdata) {
                return res.status(400).json({
                    success: false,
                    errors: "try logging with correct credentials"
                })
            }
            const pass = await bcrypt.compare(req.body.password, userdata.password);
            if (!pass) {
                return res.status(400).json({
                    success: false,
                    errors: "try logging with correct credentials"
                })
            }
            const data = {
                user: {
                    id: userdata.id
                }
            }
            const authtoken = jwt.sign(data, secret);
            res.json({ success: true,authtoken:authtoken });
        }
        catch (error) {
            console.log({ success: false });
        }



    })

module.exports = router;