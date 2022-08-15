import { addToCart, updateCartDOM } from "./cart";
import { syncCartOnLoad } from "./storage";


window.addEventListener('load', function bindAddToCartButtons() {
    const addToCartButtons = document.getElementsByClassName('add-to-cart')
    
    // bind onClick handler
    for (let i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i];
        
        button.addEventListener('click', addToCart);
    }
});

window.addEventListener('load', syncCartOnLoad);


window.addEventListener('load', updateCartDOM);