import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe ('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';


  beforeAll(async () => { // by passing the parameter 'done' the hook (beforeAll in this case), will end only when the done() function is called --> and will start execute the describe() functions
    
    await loadProductsFetch();
  });

  beforeEach(() => {  // will run this function before each of our tests;
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary">
    </div>
    <p>--------------------------------------------</p>
    <div class = 'js-payment-summary'></div>
    <p>---------------------------------------------</p>
    <div class = 'js-checkout-header-middle-section'></div>
    `

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId : productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();

    renderOrderSummary(); // for this to run correctly we need the code inside the beforeAll() to wait for the datas to be fetched and putted inside the products var


  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  }); 

  it('displays the cart', () => {
   
    expect(
      document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
    
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');

    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');

  });
  
  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(document.querySelector(`
      js-cart-item-container-${productId1}`)
    ).toEqual(null);
    
    expect(document.querySelector(`
      js-cart-item-container-${productId2}`)
    ).not.toEqual();

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');

  });

  it('change delivery option', () => {
    document.querySelector(`.js-delivery-option-input-${productId1}-3`).click();
    
    
    // [questo script e quello subito dopo fanno la stessa cosa]expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).getAttribute('checked')).toEqual('');
    
    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);  
    expect(cart[0].deliveryOptionId).toEqual('3'); 

    expect(document.querySelector('.js-total-shipping-price').innerText).toEqual('$14.98');
    expect(document.querySelector('.js-total-payment').innerText).toEqual('$63.50');
  });


});