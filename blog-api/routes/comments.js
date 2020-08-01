const getAllCommentsById = (req, res, store) => {
    let postId = req.params.postId;
    res.status(200).send(store.posts[postId].comments);
}

const postComment = (req, res, store) => {
    let postId = req.params.postId;
    let comment = req.body;
    store.posts[postId].comments.push(comment);
    res.status(201).send({commentId: comment.id})
}

const updateComment = (req, res, store) => {
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    store.posts[postId].comments[commentId] = req.body;
    res.status(204).send();
}

const deleteComment = (req, res, store) => {
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    store.posts[postId].comments.splice(commentId, 1);
    res.status(204).send();
}

module.exports = {
    getAllCommentsById,
    postComment,
    updateComment,
    deleteComment
}