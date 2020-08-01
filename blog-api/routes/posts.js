const getAllPosts = (req, res, store) => {
    res.status(200).send(store.posts);
}

const addNewPost = (req, res, store) => {
    let id = store.posts.length;
    let post = req.body;
    if(!post.comments) {
        post.comments = [];
    }
    store.posts.push(post);
    res.status(201).send({ id })
}

const updatePost = (req, res, store) => {
    let id = req.params.postId;
    let post = req.body;
    store.posts[id].name = post.name;
    store.posts[id].url = post.url
    res.status(204).send();
}

const deletePost = (req, res, store) => {
    let id = req.params.postId;
    store.posts.splice(id, 1);
    res.status(204).send();
}

module.exports = {
    getAllPosts,
    addNewPost,
    updatePost,
    deletePost
}