var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwtmanager = require("../jwt/jwtmanager");

router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email.includes("@miu.edu")) {
        req.db.collection("CSR").findOne().then((doc) => {
            const arrayUser = doc.users.filter((user) => {
                return user.email === email;
            });
            const user = arrayUser[0];
            if (!user) {
                return res.status(401).json({ status: "user not found" });
            }
            if (bcrypt.compareSync(password, user.password)) {
                let object = {};
                object.first_name = user.first_name;
                object.last_name = user.last_name;
                object.email = user.email;
                object.currentcourse = user.currentcourse;
                let token = jwtmanager.generate(object);
                return res.json({ status: "success", token: token });
            } else {
                return res.status(402).json({ status: "incorrect password" });
            }
        });
    } else {
        return res.status(403).json({ status: "incorrect email" });
    }
});

router.post("/signup/", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    if (email.includes("@miu.edu")) {
        req.db.collection("CSR").findOne().then((doc) => {
            const user = doc.users.filter((user) => {
                return user.email === email;
            });
            if (user.length === 0) {
                doc.users.push({ ...req.body, password: bcrypt.hashSync(req.body.password) })
            } else {
                return res.status(401).json({ status: "already_added" });
            }
            req.db.collection('CSR').replaceOne({}, doc).then(result => {
                return res.status(200).json({ status: 'success' })
            }).catch(err => {
                return res.status(402).json({ status: 'error' })
            })
        });
    } else {
        return res.status(403).json({ status: 'incorrect email' })
    }
});

module.exports = router;
