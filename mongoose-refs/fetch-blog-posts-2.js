const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/edxcoursedb', { useNewUrlParser: true, useUnifiedTopology: true });

const Post = mongoose.model('Post', {
    name: String,
    url: String,
    text: String
});

const Comment = mongoose.model('Comment', {
    text: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

let post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.'
});

post.save().then(() => {
    let i = 0;
    [{ text: 'Cruel…..var { house, mouse} = No type optimization at all' },
    { text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.' },
    { text: '(p1,p2)=>{ … } ,i understand this ,thank you !' }
    ].forEach((comment, index, list) => {
        comment.post = post._id;
        let c = new Comment(comment);
        c.save().then(() => {
            i++;
            if(i === list.length) {
                queryCommentWithPost();
            }
        }).catch((err) => {
            console(err);
        })
    })
}).catch((err) => {
    console.log(err);
})

const queryCommentWithPost = () => {
    Comment
    .findOne({ text: /Cruel/i})
    .populate('post')
    .exec()
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        mongoose.disconnect();
    })
}