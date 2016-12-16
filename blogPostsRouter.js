const express = require('express');
const app = express();
const {BlogPosts} = require('./models');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// create sample blog posts
BlogPosts.create('Getting Started with JavaScript - Part I', 'In this tutorial we will learn about JS variables!', 'Will Broadway');
BlogPosts.create('Getting Started with JavaScript - Part II', 'In this tutorial we will learn about JS functions!', 'Will Broadway');
BlogPosts.create('Getting Started with JavaScript - Part III', 'In this tutorial we will learn about JS data types!', 'Roberto Q');

// get all blog posts
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
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

module.exports = router;
