import Hikes from './hikes.js';
//import Comments from './commenthike.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
  myHikes.showHikeList();
});

import { storeComment } from './commenthike.js';
document.querySelector(".commentSubmission").addEventListener("submit", (event) => {
  event.preventDefault();
  const commentBody = document.getElementById("commentBody").value;
  const hikeName = document.getElementById("hikeName").value;
  storeComment(commentBody,hikeName);
})
