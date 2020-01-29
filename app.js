import { items } from './data.js';
//slice so it will be a copy and not a mutation
const itemsData = items.slice();

//item es el array id es el valor 
export function findById(items, id) {

    let foundItem;
    items.forEach(product => {
        //if this product match the id then return the product
        if (product.id === id){
            foundItem = product;
        }
    });
    return foundItem;
}
//here lets keep track of how many times a user has voted. up to 25 clicks
//keeping track of votes 

let totalVotes;
let voteDetails;

const initializeState = () => {
    totalVotes = 0;
    voteDetails = [];
};

initializeState();

//display three random NON-duplicated products
const displayThreeProducts = () => {
    //getting random products from data
    const product1 = getRandomProduct(itemsData);
    let product2 = getRandomProduct (itemsData);
    let product3 = getRandomProduct(itemsData);
    //making sure products are unique
    //if product1 is equal to product2 OR product2 is equal to product3... 
    while (product1.id === product2.id
        || product2.id === product3.id
        || product1.id === product3.id
    ) {
            //get random product from data. 
        product2 = getRandomProduct(itemsData);
        product3 = getRandomProduct(itemsData);
    }
    //provide these three products on the screen like radio buttons
    const radio1 = document.getElementById('product1');
    const image1 = document.getElementById('product1-img');
    const radio2 = document.getElementById('product2');
    const image2 = document.getElementById('product2-img');
    const radio3 = document.getElementById('product3');
    const image3 = document.getElementById('product3-img');
    const radio1Span = document.getElementById('product1-span');
    const radio2Span = document.getElementById('product2-span');
    const radio3Span = document.getElementById('product3-span');
    //is taking the value of radio and sayiung that equals product id. 
    //same with the photos
    radio1.value = product1.id;
    radio2.value = product2.id;
    radio3.value = product3.id;

    //radio span text content is going to show the name of the product
    radio1Span.textContent = product1.name;
    radio2Span.textContent = product2.name;
    radio3Span.textContent = product3.name;

    image1.src = product1.image;
    image2.src = product2.image;
    image3.src = product3.image;
};
//variable returns the element that matches the html element
const form = document.querySelector('form');

// EVENT LISTENER
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);

    const selectedProductId = formData.get('product');

    totalVotes++;

    //whichever one they voted on, see if they have clicked on it before
  // update the productVoteDetails
    const producInVotesArray = findById(voteDetails, selectedProductId);
console.log(voteDetails);

//if the user clicked on the product more than once, increment value
    if (producInVotesArray) {
        producInVotesArray.votes++;
        //else, is going to create an object with the value of one 
        // if theres no prodcuts in the votes array, push the product into the array
    } else {
        voteDetails.push({
            id: selectedProductId,
            votes: 1,
        });
    }
    //once the user cliks on the product = true. but this makes it false, uncheck it(?)
    document.querySelector('input[name="product"]:checked').checked = false;

    localStorage.setItem('votes', JSON.stringify(voteDetails));
//if votes are more or equal to 25, change location of window to results
    if (totalVotes >= 10) {
        window.location = 'results.html';
    }
    displayThreeProducts();
    //calling function
});
//reset the whole app whnen finished


function reset() {
    initializeState();
}

function getRandomProduct(someProducts) {
    const randomIndex = Math.floor(Math.random() * someProducts.length);
    const randomProduct = itemsData[randomIndex];

    return randomProduct;
}

displayThreeProducts();
reset();