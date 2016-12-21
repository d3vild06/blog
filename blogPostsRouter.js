const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Post} = require('./models');

// get all blog posts
router.get('/', (req, res) => {
    Post.find({}).limit(10).exec().then(posts => {
        res.status(200).json({
            posts: posts.map(post => post.cleanAPIRes())
        });
    }).catch(err => {
        console.console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    });
});

// create new posts
router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    const requiredItems = ['title', 'author', 'content'];
    for (let i = 0; i < requiredItems.length; i += 1) {
        let item = requiredItems[i];
        if (!(item in req.body)) {
            console.error("Your post does not contain the required items.");
            return res.status(400).end();
        }
    }
    // check for empty values (normally this validation would be done on the client side)
    if (!req.body.title || !req.body.content || !req.body.author) {
        console.log('All fields must be filled in!');
        return res.status(400).end();
    }
    let post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(200).json(post);
});

// delete a single post
router.delete('/:id', (req, res) => {
    let postId = req.params.id;
    console.log(`deleting post with id: ${postId}`);
    BlogPosts.delete(postId);
    res.status(204).end();
});

// update a single post
router.put('/:id', jsonParser, (req, res) => {
    let requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i = 0; i < requiredFields.length; i += 1) {
        let field = requiredFields[i];
        if (!(field in req.body)) {
            console.log("Bad request. You are missing required fields");
            return res.status(400).end();
        }
    }
    if (req.body.id !== req.params.id) {
        console.log(`PostId: ${req.body.id} in body req does not match id: ${req.params.id} passed in the path`);
        let message = 'Nice try! The post id passed in the request does not match the id passed in the URL'
        return res.status(400).send(message);
    }
    let updatedPost = BlogPosts.update(req.body);
    res.status(200).json(updatedPost);
});

module.exports = router;
