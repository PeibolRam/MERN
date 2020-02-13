const express = require("express");
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const Post = require('../../models/Post')

const DIR = '../../public/uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

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

router.post("/add", upload.single('profileImg'), (req, res) => {
    const url = req.protocol + '://' + req.get('host')
    console.log(req.body)
    const newPost = new Post({
        username: req.body.username,
        content: req.body.content,
        date: newDate(),
        filePost: url + '/public/' + req.body.filename
    })
    newPost.save()
        .then(post => res.json(post))
        .catch(err => console.log(err));   
}
)

router.get('/all', (req, res) => {
    Post.find({}, (err, users) => { 
        if(err) return res.status(400).send(err)
        res.status(200).send(users)
    })
})

module.exports = router;
