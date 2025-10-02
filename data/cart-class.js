// Class;
// it has a different syntax;
// this points to the object that we generate
class Cart {
  
  // properties

  cartItems;  // <==> cartItems = undefined; // Public property => it can be accessed anywhere;
  #localStorageKey; // private property => can only be used inside this class [can only be changed from inside the class];
  

  // constructor method --> pro: when we generate an object it will run this constructor automatically
  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }


  // other methods

  #loadFromStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
  }];  
  }
  saveToStorage() {
  localStorage.setItem(this.#localStorageKey , JSON.stringify(this.cartItems));
  }
  addToCart (productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem; // copia il rieferimento, NON clona un oggetto nuovo
    });

    if (matchingItem) {
      matchingItem.quantity += 1; 
    } else {
      this.cartItems.push({
        productId : productId,
        quantity : 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }
  removeFromCart(productId) {
  const newCart = [];

  cart.cartItems.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  this.cartItems = newCart; 

  this.saveToStorage();
  }
  updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId)
        matchingItem = cartItem; // copia il rieferimento, NON clona un oggetto nuovo
    });

    if(!matchingItem) return;

    if(!(deliveryOptionId > 0 && deliveryOptionId < 4)) return;

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
  updateCartQuantity(location) {
    let cartQuantity = 0; 

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })

    location.innerHTML = cartQuantity;
  } // rivedere la posizione. metterlo nel file di rendering 
  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }

      if (matchingItem) {
        matchingItem.quantity = newQuantity;
      }
    })
  }
  totalCartQuantity () {
  let totalProductQuantity = 0;
  this.cartItems.forEach((cartItem) => {
    totalProductQuantity += cartItem.quantity;
  })
  return totalProductQuantity;
  }
}


export const cart = new Cart('cart-oop'); // between the brackets, we can put the parameters for the constructor
const businessCart = new Cart('cart-business');

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
 
// we just created a completely separated cart just by copying the object assigned to cart






console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
















