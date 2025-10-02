import { cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOptions, saveToStorage } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js ';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // default export

import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'

import { renderPaymentSummary } from "./paymentSummary.js";
import isSatSun from "../../exercise/ex1.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


/*

const today = dayjs();
console.log(isSatSun(today));

*/






/*
const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM, D'));
*/

export function renderOrderSummary() {



  const location = document.querySelector('.js-checkout-cart-quantity');

  // updateCartQuantity(location);
    

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    
    const dateString = deliveryDate.format ('dddd MMMM D');
    
    cartSummaryHTML += `
    <div class="cart-item-container
    js-cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span data-product-id = '${matchingProduct.id}' class="update-quantity-link js-update-quantity-link link-primary">
              Update
            </span> 
            <input class = "quantity-input js-quantity-input" data-product-id="${matchingProduct.id}">
            <span class = "save-quantity-link link-primary" data-product-id ='${matchingProduct.id}'>Save</span>
            <span class="delete-quantity-link link-primary js-delete-link-${matchingProduct.id} js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
        ${deliveryOptionsHTML(matchingProduct)}
        </div>
      </div>
    </div>
    
    `;

    function deliveryOptionsHTML(matchingProduct) {
      let html = '';
      
      deliveryOptions.forEach((deliveryOption) => {

        const datestring = calculateDeliveryDate(deliveryOption);
 
        const priceString = deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)} -`
        
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input
              js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${datestring}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `

      });

      return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML
  })

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {  // {controller}
      const productId = link.dataset.productId;
      removeFromCart(productId); // {update datas}
      // updateCartQuantity(location); // my code; wrote it in order to update the checkout(x) in the middle topo of the page
      // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
      
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary(); // {reload the html with updated datas}

      // this above is an example of MVC approach to js to build interactive webpages;

    })
  })

  document.querySelectorAll('.js-update-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      const productSection = document.querySelector(`.js-cart-item-container-${productId}`);
      
      productSection.classList.add('is-editing-quantity');

    
    });
  }) 

  document.querySelectorAll('.save-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      update(button);
      saveToStorage();
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();

    });
  });
  document.querySelectorAll('.js-quantity-input').forEach((button) => {
    button.addEventListener('keydown', (event) => {
      if(event.key === 'Enter') {
        update(button);
        saveToStorage();
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();

      }
    });
  });

  function update (button) {
      const productId = button.dataset.productId;

      const newQuantity = Number(document.querySelector(`.js-cart-item-container-${productId}`).querySelector('.quantity-input').value);

      if (newQuantity < 0 || newQuantity >= 1000) return; 
      
      updateQuantity(productId, newQuantity);

      // updateCartQuantity(document.querySelector('.js-checkout-cart-quantity'));
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () =>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })

}

