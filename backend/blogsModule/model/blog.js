
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogModelSchema = new Schema({
    author:String,
    title: String,
    content: String,
    upvote: String,
    downvote: String,
    profileImg: String,
}, {
    timestamps: true
});
// Compile model from schema
const blogModel = mongoose.model('blog', blogModelSchema);
module.exports = blogModel;