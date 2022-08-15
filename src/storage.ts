let cart: {
  contents: {
    [itemId: string]: { price: number; quantity: number; name: string };
  };
  totalAmount: number;
  numberOfItems: number;
} = { contents: {}, totalAmount: 0, numberOfItems: 0 };

export function syncCartOnLoad() {
  // If we don't have a cart in localStorage already we don't need to do anything because it'll be set when
  // a cart item is added
  if (window.localStorage.getItem("cart")) {
    cart = JSON.parse(window.localStorage.cart);
  }
}

function incrementBy(itemId: string, by: number) {
  if (cart.contents[itemId]) {
    cart.contents[itemId].quantity += by;
    cart.totalAmount += cart.contents[itemId].price;
    cart.numberOfItems += by;
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function decrementBy(itemId: string, by: number) {
  // TODO: implement
  throw new Error("Not implemented");
}

function set(itemId: string, name: string, quantity: number, price: number) {
  if (cart.contents[itemId]) {
    throw new Error(`Item already exists ${itemId}`);
  }

  cart.contents[itemId] = { name, quantity, price };
  cart.totalAmount += quantity * price;
  cart.numberOfItems += quantity;

  window.localStorage.setItem("cart", JSON.stringify(cart));
}

export function getStorageContents() {
  return cart;
}

export function addToStorage(
  itemId: string,
  name: string,
  quantity: number,
  price: number
) {
  if (cart.contents[itemId]) {
    incrementBy(itemId, quantity);
  } else {
    set(itemId, name, quantity, price);
  }
}
