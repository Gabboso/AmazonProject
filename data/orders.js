export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder (order) {
  orders.unshift(order) // method that add the element to the beginning of an array
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getItem(orderId, productId) {
  let matchingItem;

  orders.forEach((order) => {
    if (order.id === orderId) {
       order.products.forEach((product) => {
        if (product.productId === productId)
          matchingItem = product;
       });
    }
  });

  return matchingItem;
}

export function getOrder(orderId) {
  let MatchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      MatchingOrder = order;
    }
  });

  return MatchingOrder;
}