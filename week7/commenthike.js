//let hikeName = document.

let commentList = [];



function add() {
    const input = document.getElementById("commentBody").value;
    console.log(input);
}
    /*if (input !== "") {
        const commentObject = {
            name: hikeName,
            date: new Date(),
            content: comment,
            id: Date.now()
        }
        commentList.push(commentObject);
        storage(commentList);
        document.getElementById("commentBody").value= "";
     }
};

function storage(commentList) {
    console.log(commentList);
}*/
export { add };
