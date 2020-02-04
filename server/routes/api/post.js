const express = require("express");
const router = express.Router();
const Post = require('../../models/Post')

const newDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    
    let todayY = dd + '/' + mm + '/' + yyyy;
    return todayY
}

router.post("/add", (req, res) => {
    const newPost = new Post({
        username: req.body.username,
        content: req.body.content,
        date: newDate()
    })
    newPost.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
})


router.get('/all', (req, res) => {
    Post.find({}, (err, users) => { 
        if(err) return res.status(400).send(err)
        res.status(200).send(users)
    })
})



module.exports = router;
