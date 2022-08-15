import { Analytics } from "./analytics";
import * as cartStorage from "./storage";

const analytics = new Analytics();

export function addToCart(event: Event) {
  const button = event.target as HTMLElement;
  const wrapper = button.parentNode as HTMLElement;
  const itemId = wrapper.dataset.itemId;
  const name = wrapper.querySelector("h4")?.textContent;
  const priceString = wrapper.querySelector("h5")?.textContent;

  if (!itemId || !name || !priceString) {
    throw new Error("Error parsing page");
  }

  const priceWithoutSymbol = priceString.replace(/^\$/, "");
  const price = parseFloat(priceWithoutSymbol);
  if (isNaN(price)) {
    throw new Error("Error parsing price");
  }

  cartStorage.addToStorage(itemId, name, 1, price);
  analytics.conversionEvent({
    cart: [{ id: itemId, price, quantity: 1, name }],
  });
}

export function updateCartDOM() {
  const wrapper = document.getElementById("cart-info");
  const count = wrapper?.querySelector("#count");
  const total = wrapper?.querySelector("#total");

  const cartContent = cartStorage.getStorageContents();

  if (count) {
    (
      count as HTMLElement
    ).textContent = `You have ${cartContent.numberOfItems} items in cart`;
  }

  if (total) {
    // TODO: support additional currencies and formatting for said currencies, conversion, etc.
    (total as HTMLElement).textContent = `Total: ${new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(cartContent.totalAmount)}`;
  }
}
