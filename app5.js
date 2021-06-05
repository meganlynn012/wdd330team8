import Hikes from './hikes.js';
//import Comments from './commenthike.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
  myHikes.showHikeList();
});

import { storeComment,getComments } from './commenthike.js';
document.querySelector(".commentSubmission").addEventListener("submit", (event) => {
  event.preventDefault();
  const commentBody = document.getElementById("commentBody").value;
  const hikeName = document.getElementById("hikeName").value;
  storeComment(commentBody,hikeName);
})

function showCommentsList()
{
    const comments = getComments();
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = "";
    for (const i in comments)
    {
      const comment = comments[i];
      let commentListItem = "<li><div>";
      commentListItem += "<h3>" + comment.hikeName + "</h3>";
      commentListItem += comment.date + "<br>";
      commentListItem += comment.content;
      commentListItem += "</div></li>"
      commentList.innerHTML += commentListItem;
    }
}

showCommentsList();