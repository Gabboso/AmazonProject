import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {cars, raceCar} from '../data/car.js'
// import "../data/cart-class.js"; // directly runs all the code inside this file without importing anything;
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCartFetch} from "../data/cart.js";


async function loadPage() {   // async and await make our code much clearer;


// HANDLE ERRORS IN ASYNC AWAIT 
  try {
    // throw 'error1';
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])
/*
    const value = await new Promise((resolve, reject) => {
      // throw 'error1'; // we have 'await' before 'new Promise' so the error will take us to the catch of the try/catch

      loadCart(() => {
        // reject('error3'); // we use REJECT because throw DOESN'T WORK IN THE FUTURE (ASYNCHRONOUSLY) vs throw (SYNCHRONOUSLY)
        resolve(); // il valore tra le parentesi viene salvato in value;
      });
    }); 
*/

  } catch (error) { // error --> info about the error
    console.log('unexpected error. Please try again later.');
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();













/*
Promise.all([  // is gonna wait for all of the promises to finish before going to the next step [SO we can load more things at the same time and speed up the process];
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
]).then((values) => {
  console.log(values); // list containing the values of the promises from Promise.all
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}); 
*/

/*
// Promise
new Promise ((resolve) => {
  loadProducts(() =>{
    resolve('value1'); // whatever value we put inside resolve is gonna be saved in a parameter inside .then --> we can pass it as a parameter (WE CAN CHOOSE THE NAME (IN THIS CASE WE CALLED IT 'value')) inside the .then function  ===> let's us share a value between two steps of a promise
  })

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });  
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
// callBack 
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/



/*

const toyota = cars[0];
const tesla = cars[1];

toyota.go();
toyota.displayInfo();
console.log(toyota.isTrunkOpen);
toyota.openTrunk();
console.log(toyota.isTrunkOpen);
*/

/*
console.log(raceCar);
raceCar.go();
console.log(raceCar);


raceCar.displayInfo()

*/



// FINAL EXERCISES + Review

/*
function ex1 () {
  const ask = new XMLHttpRequest;

  ask.addEventListener('load', () =>{
    console.log(ask.response);
  });

  ask.open( 'GET', 'https://supersimplebackend.dev/greeting');
  ask.send();
}

ex1();  
*/
/*
function ex1Enhanced() {
  const promsie = fetch('https://supersimplebackend.dev/greeting').then(response => response.text())
  .then(data => {
    console.log(data);
  });
  return promise;
}

ex1Enhanced();
*/
/*
async function ex1Async() {
  const ask = await fetch('https://supersimplebackend.dev/greeting');
  const testo = await ask.text();
  console.log(testo);
}
ex1Async();
*/
/*
async function ex2 (name) {
  const response =  await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      name
    })
  });

  const data = await response.text();
  console.log(data);

} 
ex2('Gabriel');
*/
/*
async function xhrErr () {  
  try {
    const response = await fetch('https://www.amazon.it');
  } catch (err) {
    console.log('CORS error. Your request was blocked by the backend    ');
  }
  const testo = await response.text();
}
xhrErr();
*/
/*
async function postErr() {
    let response;
    try {
      response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Gabriel'
        })
      });
    if (response.status >= 400) {
      throw response;
    }
    } catch(error) { // err = response look at line 188
      if (error.status === 400) {
        const errorText = await error.json();
        console.log(errorText); 
      } else {
        console.log('NetWork error. Please try again later');
      }
    }
    const testo = await response.text()
    console.log(testo);
}
postErr();
*/