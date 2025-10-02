// fun render all at the end;

// MVC


// [M]
import {addToCart, cart, saveToStorage, totalCartQuantity, updateCartQuantity, loadCartFetch} from '../data/cart.js';
import { calculateDeliveryDate, getDeliveryOption, convertDate} from '../data/deliveryOptions.js';
import { addOrder, orders } from '../data/orders.js';
import { products, getProduct, loadProductsFetch } from '../data/products.js';
import {formatCurrency} from './utils/money.js'
// [V]
console.log(orders);



// function

await loadProductsFetch();
await loadCartFetch();
let location = document.querySelector('.js-cart-quantity');
updateCartQuantity(location);



function totalOrderPrice(order) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalProductQuantity = totalCartQuantity();
  (order.products).forEach((orderItem) => {
    const product = getProduct(orderItem.productId);
    productPriceCents += product.priceCents * orderItem.quantity;

    const deliveryOption =  getDeliveryOption(orderItem.deliveryOptionId); 
    shippingPriceCents +=  deliveryOption.priceCents; 


  });
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * .1;
  
  const totalCents = totalBeforeTaxCents + taxCents;
  return formatCurrency(totalCents);
}



function renderOrdersPage() {
  let html; 
  orders.forEach((order) =>{
    const orderDate = convertDate(order.orderTime);
    const totalPrice = totalOrderPrice(order);
    html = `
          <div class="order-container js-order-container-${order.id}">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${orderDate}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${totalPrice}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>

            <div class="order-details-grid js-order-details">  
    `;
    const products = order.products;
    const orderId = order.id;
    products.forEach((product) => {
      const productId = product.productId;
      const item = getProduct(product.productId);
      const name = item.name;
      const image = item.image;
      const deliveryTime = convertDate(product.estimatedDeliveryTime);
      const quantity = product.quantity;
      html += `
              <div class="product-image-container">
                <img src="${image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${item.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${deliveryTime}
                </div>
                <div class="product-quantity">
                  Quantity: ${quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id='${productId}'>
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>

              <div class="product-actions">
                <a href="tracking.html?orderId=${orderId}&productId=${productId}">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
      `;
    })
    html += `
            </div>
          </div> 
    `;
    document.querySelector('.js-orders-grid').innerHTML += html;


    // [C]

  });
  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity(location);
    });
  });
}

renderOrdersPage();















