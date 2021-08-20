var express = require("express");
var router = express.Router();

router.get("/courses", (req, res) => {
    req.db.collection("CSR").findOne().then(result => {
        const sortedCourses = result.courses.sort(function (a, b) {
            return new Date(b.offeringDate) - new Date(a.offeringDate);
        });
        const mappedCourses = sortedCourses.map(course => {
            return {...course, offeringDate: new Date(course.offeringDate)}
        })

        return res.json({ status: "success", courses: mappedCourses });
    }).catch((error) => {
        return res.json({ status: "Could not retrieve courses" });
    });
});

router.get("/getposts", (req, res) => {
    req.db.collection("CSR").findOne().then((result) => {
        const sortedPosts = result.posts.sort(function (a, b) {
            return b.date - a.date;
        });
        return res.json({ status: "success", posts: sortedPosts });
    })
        .catch((error) => {
            return res.json({ status: "Could not retrieve posts" });
        });
});

router.post("/addpost", (req, res) => {
    req.db
        .collection("CSR")
        .updateOne({}, { $push: { posts: req.body.post } })
        .then((result) => {
            req.db
                .collection("CSR")
                .find()
                .then((result) => {
                    const sortedPosts = result.posts.sort(function (a, b) {
                        return b.date - a.date;
                    });
                    return res.json({ status: "success", posts: sortedPosts });
                })
                .catch((error) => {
                    return res.json({ status: "Could not retrieve posts" });
                });
        });
});

router.put('/editpost', (req, res) => {
    req.db.collection('CSR').findOne().then(result => {
        const updateIndex = result.posts.findIndex(post => {
            return post.date === req.body.post.date;
        });
        const postToUpdate = result.posts.filter(post => {
            return post.date === req.body.post.date;
        })
        postToUpdate[0].postText = req.body.postText;
        const updatedDocument = result.posts.splice(updateIndex, 1, postToUpdate)
        return updatedDocument;
    }).then(result => {
        req.db.collection('SRC').replaceOne({}, result).then(result => {
            return res.json({ status: 'success' });
        }).catch(err => {
            return res.json({ status: 'fail' })
        })
    })
})

router.put('/deletepost', (req, res) => {
    req.db.collection('CSR').findOne().then(result => {
        const deleteIndex = result.posts.findIndex(post => {
            return post.date === req.body.post.date;
        });
        const updatedDocument = result.posts.splice(deleteIndex, 1)
        return updatedDocument;
    }).then(result => {
        req.db.collection('SRC').replaceOne({}, result).then(result => {
            return res.json({ status: 'success' });
        }).catch(err => {
            return res.json({ status: 'fail' })
        })
    })
})

router.post("/fetchswitchReq", (req, res) => {
    req.db
        .collection("CSR")
        .findOne()
        .then((result) => {
            const filteredSwitchReq = result.switchRequests.filter(
                (switchReq) => {
                    return switchReq.email === req.body.email;
                }
            );
            return res.json({ status: "success", data: filteredSwitchReq });
        })
        .catch((error) => {
            res.json({ status: "error" });
        });
});

router.post("/addswitchReq", (req, res) => {
    req.db
        .collection("CSR")
        .updateOne({}, { $push: { switchRequests: req.body } })
        .then((result) => {
            req.db
                .collection("CSR")
                .find()
                .then((result) => {
                    return res.json({ status: "success", switchRequests: result.switchRequests });
                })
                .catch((error) => {
                    return res.json({ status: "Could not retrieve" });
                });
        });
});

module.exports = router;
