const mongoose = require('mongoose');

// define blog schema
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: {type: String, required: true},
    lastName: {type: String, require: true}
  },
  created: Date
});

postSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

postSchema.methods.cleanAPIRes = function() {
  return  {
    title: this.title,
    content: this.content,
    author: this.fullName,
    created: this.created
  };
}

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};
