import { cart } from "../../data/cart-class.js";

const localStorageKey = 'cart-oop';

describe('test suite: addToCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach (() => {
        spyOn(localStorage, 'setItem');
  });
  
  it ('adds an existing product to the cart', () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];

    expect(cart.cartItems.length).toEqual(1);
    cart.addToCart(productId1)
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(localStorageKey, JSON.stringify(cart.cartItems));  
  
    
  });


  it ('adds a new product to che cart', () => {


    cart.cartItems = [];

    // console.log(localStorage.getItem('cart'));



    cart.addToCart(productId1)
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(localStorageKey, JSON.stringify(cart.cartItems));   
  });
})




describe ('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach (() => {
        spyOn(localStorage, 'setItem');
  });

  it('removes a productId that is in the cart', () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];

    cart.removeFromCart(productId1);
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith(localStorageKey, JSON.stringify([]));
  
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
  });

   
  it('removes a productId that is not in the cart', () => {
    
    cart.cartItems = [];

    cart.removeFromCart(productId1);

    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith(localStorageKey, JSON.stringify([]));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
  
  
  
  
  });
  
}) 



describe ('test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it ('works when the required product is in the cart', () => {

    cart.cartItems =  [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];

    cart.updateDeliveryOptions(productId1, '3');
    expect(cart.cartItems.length).toEqual(2);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(localStorageKey, JSON.stringify(cart.cartItems));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    });

  
  it ('works when the required product is not in the cart', () => {

    cart.cartItems =  [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }
    ];

    cart.updateDeliveryOptions(productId2, '3');
    // console.log(cart);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);  



  });

  
  it ('works when the required product is in the cart', () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];

    cart.updateDeliveryOptions(productId1, '2');
    // console.log(cart);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes
    (1);  
    expect(cart.cartItems[0].deliveryOptionId).toEqual('2');



  });

  it ('works when the delivery option required is not present in the options', () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];

    cart.updateDeliveryOptions(productId2, '1');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);  

  });

});

