export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '3'
    }
  ];
  // saveToStorage();  
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart (productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem; // copia il rieferimento, NON clona un oggetto nuovo
    });

    if (matchingItem) {
      matchingItem.quantity += 1; 
    } else {
      cart.push({
        productId : productId,
        quantity : 1,
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
}

export function updateCartQuantity(location) {
    let cartQuantity = 0; 

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })

    location.innerHTML = cartQuantity;
 } // rivedere la posizione. metterlo nel file di rendering 

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart; 

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }

    if (matchingItem) {
      matchingItem.quantity = newQuantity;
    }
  })
}

export function updateDeliveryOptions(productId, deliveryOptionId) {
   let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId)
      matchingItem = cartItem; // copia il rieferimento, NON clona un oggetto nuovo
  });

  if(!matchingItem) return;

  if(!(deliveryOptionId > 0 && deliveryOptionId < 4)) return;

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function totalCartQuantity () {
  let totalProductQuantity = 0;
  cart.forEach((cartItem) => {
    totalProductQuantity += cartItem.quantity;
  })
  return totalProductQuantity;
}


/*
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response); 
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send();
}

*/
export async function loadCartFetch() {
  let promise;
  try {
    promise = await fetch('https://supersimplebackend.dev/cart');
    const text = await promise.text();
    console.log(text);
  } catch (err) {
    console.log(err);
  }
  return promise;
}
