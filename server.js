const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const app = express();

const {BlogPosts} = require('./models');
const BlogPostsRouter = require('./blogPostsRouter');


app.use('/blog-posts', BlogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`app listen on ${process.env.PORT} || 8080`);
});
