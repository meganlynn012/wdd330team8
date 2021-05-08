const links = [
    
    '<a href="week1.html">Week 1</a>',
    '<a href="week2.html">Week 2</a>',
    '<a href="week3.html">Week 3</a>'
  
];

//select the element using querySelector
let list = document.querySelector('ol');

//specify how many list items to create
let numContents = links.length;
//console.log(numContents);

//create the loop that will add an li element for each item in the array and display the list
for (i = 0; i < numContents; i++) {
  let li = document.createElement('li');

  //specify what should appear in each li element on the page
  li.innerHTML = links[i];

  //place it in the ol element
  list.appendChild(li);    
}
