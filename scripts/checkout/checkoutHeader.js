import { totalCartQuantity } from "../../data/cart.js";


export function renderCheckoutHeader() {
  const html = `
        Checkout (<a class="return-to-home-link   js-checkout-cart-quantity"
        href="amazon.html">${totalCartQuantity()}</a>)
  `
  document.querySelector('.js-checkout-header-middle-section').innerHTML = html;
}