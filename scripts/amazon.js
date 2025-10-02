/*
import {cart, addToCart, updateCartQuantity} from '../data/cart.js';
import { products, loadProducts} from '../data/products.js'; // lista di classi 
import { formatCurrency } from './utils/money.js';

const url = new URL(window.location.href);
const urlParamValue = (url.searchParams.get('search') || '').toLowerCase();

function renderProductGrid() {
  let productsHTML = '';
  products.forEach((product) => {
    const productKeywords = product.keywords.map(k => k.toLowerCase());
    const productName = product.name.toLowerCase();
    if (!urlParamValue ||  productName.includes(urlParamValue) || productKeywords.some(kw =>kw.includes(urlParamValue))) {
      console.log(product)
      productsHTML +=  `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
  
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
  
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
  
          <div class="product-price">
            ${product.getPrice()}
          </div>
  
          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
  
          ${product.extraInfoHTML()}
  
          <div class="product-spacer"></div>
  
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
  
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    }
  });
  // i DATA ATTRIBUTE sono degli attributi html che ci permettonon di assegnare agli elementi html un qualsiasi tipo di informazione: si scrivono 'data-' + a piacere. Per estrarli poi dall html basta usare il dom + .dataset è .nomeAttributo

  document.querySelector('.js-products-grid').innerHTML = productsHTML;


  let location = document.querySelector('.js-cart-quantity');

  updateCartQuantity(location);



  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId =  button.dataset.productId; //note that the name product-name gets converted to productName (kebab case to camel case)

      addToCart(productId);

      updateCartQuantity(location);

    });
  })

  
  
  const searchButton = document.querySelector('.js-search-button');
  
  const searchBar = document.querySelector('.js-search-bar');
   
  searchButton.addEventListener('click', () => {
    
    const searchValue = searchBar.value.toLowerCase();
    
    window.location.href = `amazon.html?search=${searchValue}`;
  });

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const searchValue = searchBar.value.toLowerCase();
    
      window.location.href = `amazon.html?search=${searchValue}`;
    }
  }); 

  
}






loadProducts(renderProductGrid); // this function that we provided to loadProducts is called callback;
*/


import { cart, addToCart, updateCartQuantity } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js'; 
import { formatCurrency } from './utils/money.js';

const url = new URL(window.location.href);
const urlParamValue = (url.searchParams.get('search') || '').toLowerCase();

// Funzione per aggiungere listener a tutti i bottoni "Add to Cart"
function setupAddToCartButtons() {
  const location = document.querySelector('.js-cart-quantity');

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity(location);
    });
  });
}

// Funzione per aggiungere listener alla barra di ricerca
function setupSearchBar() {
  const searchBar = document.querySelector('.js-search-bar');
  const searchButton = document.querySelector('.js-search-button');

  const performSearch = () => {
    const searchValue = searchBar.value.toLowerCase();
    window.location.href = `amazon.html?search=${searchValue}`;
  };

  searchButton.addEventListener('click', performSearch);
  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') performSearch();
  });
}

// Funzione principale per renderizzare i prodotti
function renderProductGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    const productName = product.name.toLowerCase();
    const productKeywords = product.keywords.map(k => k.toLowerCase());

    if (!urlParamValue || productName.includes(urlParamValue) || productKeywords.some(kw => kw.includes(urlParamValue))) {
      productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>
          <div class="product-name limit-text-to-2-lines">${product.name}</div>
          <div class="product-rating-container">
            <img class="product-rating-stars" src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>
          <div class="product-price">${product.getPrice()}</div>
          <div class="product-quantity-container">
            <select>
              ${[...Array(10)].map((_, i) => `<option ${i===0 ? 'selected' : ''} value="${i+1}">${i+1}</option>`).join('')}
            </select>
          </div>
          ${product.extraInfoHTML()}
          <div class="product-spacer"></div>
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">Added
          </div>
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    }
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // Setup listener
  setupAddToCartButtons();
  setupSearchBar();
}

// Carica i prodotti e chiama il callback
loadProducts(renderProductGrid);







