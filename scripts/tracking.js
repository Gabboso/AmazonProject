import { products, loadProductsFetch, getProduct, Product } from "../data/products.js";
import { convertDate, getDay } from "../data/deliveryOptions.js";
import { getItem, getOrder } from "../data/orders.js";
await loadProductsFetch();
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // default export


function renderTrackingPage() {
  
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const orderTime = getOrder(orderId);
  
  const product = getProduct(productId);
  const name = product.name;
  const image = product.image;
  
  const item = getItem(orderId, productId);
  const quantity = item.quantity;
  console.log(item);
  
  const deliveryTime = convertDate(item.estimatedDeliveryTime);
  const deliveryDay = getDay(item.estimatedDeliveryTime);

  const html = `
        
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDay}, ${deliveryTime}
        </div>

        <div class="product-info">
          ${name}
        </div>

        <div class="product-info">
          Quantity: ${quantity};
        </div>

        <img class="product-image" src="${image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar" ${setBarWidth()}></div>
        </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = html;

function setBarWidth() {
  const now = dayjs();
  const orderDate = dayjs(orderTime.orderTime); // data di inizio
  const deliveryDate = dayjs(item.estimatedDeliveryTime); // data di consegna stimata

  let progress = (now.valueOf() - orderDate.valueOf()) /
                 (deliveryDate.valueOf() - orderDate.valueOf()) * 100;

  progress = Math.max(0, Math.min(progress, 100)); // limita tra 0 e 100
  return `style="width: ${progress}%;"`;
}


  
}
renderTrackingPage();