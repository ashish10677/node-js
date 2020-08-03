const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/edxcoursedb', { useNewUrlParser: true, useUnifiedTopology: true });
const Comment = mongoose.model('Comment', { text: String });

const Post = mongoose.model('Post', {
    name: String,
    url: String,
    text: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})


let ca = [{ text: 'Its a fantastic post man' },
{ text: 'Nice Work!' },
{ text: 'I love it!' }].map((comment) => {
    const c = new Comment(comment);
    c.save();
    return c._id;
});


let post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: ca
})

post.save().then(() => {
    return Post.findOne({ name: /Top 10 ES6/i }).populate('comments').exec();
}).then((post) => {
    console.log(post);
}).catch(err => {
    console.log(err);
}).finally(() => {
    mongoose.disconnect();
})
