
function storeComment(commentBody, hikeName) {
    const comment = {
        content: commentBody,
        hikeName: hikeName,
        date: new Date()
    };
    console.log(comment);
    // Add input to local storage.
}
export { storeComment };
