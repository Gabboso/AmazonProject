import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOptions} from "../../data/cart.js";


describe('test suite: addToCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach (() => {
        spyOn(localStorage, 'setItem');
  });


  
  it ('adds an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();



    addToCart(productId1)
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));    
    
  });

  it ('adds a new product to che cart', () => {


    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    // console.log(localStorage.getItem('cart'));
    loadFromStorage();



    addToCart(productId1)
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));   
  });
})

describe ('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach (() => {
        spyOn(localStorage, 'setItem');
  });
  it('removes a productId that is in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        }]);
    });
  
    loadFromStorage();

    removeFromCart(productId1);

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
  });

  it('removes a productId that is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
  
    loadFromStorage();

    removeFromCart(productId1);

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
  
  
  
  
  });

}) 



describe ('test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  

  it ('works when the required product is in the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return null;
    });
  
    loadFromStorage();


    updateDeliveryOptions(productId1, '3');
    expect(cart.length).toEqual(2);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it ('works when the required product is not in the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: ' 2'
      }]);
    });

    loadFromStorage();

    updateDeliveryOptions(productId1, '3');
    // console.log(cart);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);  



  });
  it ('works when the required product is not in the cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: ' 2'
      }]);
    });

    loadFromStorage();

    updateDeliveryOptions(productId1);
    // console.log(cart);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);  



  });
  it ('works when the delivery option required is not present in the options', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: ' 2'
      }]);
    });

    loadFromStorage();

    updateDeliveryOptions(productId2, '1');
    console.log(cart);



  });
});