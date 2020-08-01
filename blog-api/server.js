const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const posts = require('./routes/posts');
const comments = require('./routes/comments');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

const store = {};
store.posts = [];

app.get('/posts', (req, res) => {posts.getAllPosts(req, res, store)});

app.post('/posts', (req, res) => {posts.addNewPost(req, res, store)});

app.put('/posts/:postId', (req, res) => {posts.updatePost(req, res, store)});

app.delete('/posts/:postId', (req, res) => {posts.deletePost(req, res, store)});

app.get('/posts/:postId/comments', (req, res) => {comments.getAllCommentsById(req, res, store)});

app.post('/posts/:postId/comments', (req, res) => {comments.postComment(req, res, store)});

app.put('/posts/:postId/comments/:commentId', (req, res) => {comments.updateComment(req, res, store)});

app.delete('/posts/:postId/comments/:commentId', (req, res) => {comments.deleteComment(req, res, store)});

app.listen(3000);