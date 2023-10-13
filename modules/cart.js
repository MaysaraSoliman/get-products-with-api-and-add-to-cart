// import { addCartIconTotal } from "./app.js";
// import { cart, productsContainer } from "./app.js";
let cart = [];
let cartContainer = document.querySelector(".cart-cont");
let cartTable = document.querySelector(".cart-cont .cart tbody") || "";


let addProductsToCart = () => {
    cartTable.innerHTML = "";
    cart.forEach((product) => {
        cartTable.innerHTML += ` <tr class="cart-product">
        <td>
          <div class="first-col d-flex gap-3 align-items-center">
           <div class="cart-product-img">
           <img
           src="${product.thumbnail}"
         />
           </div>
            <h5>${product.title}</h5>
          </div>
        </td>

        <td>
          <div class="cart-product-amount">
            <span class="change-amount change-amount-dec" data-id="${product.id}">-</span>
            <span class="quantity">${product.quantity}</span>
            <span class="change-amount change-amount-inc" data-id="${product.id}">+</span>
          </div>
        </td>

        <td>
          <div
            class="mb-2 d-flex flex-column text-end justify-content-end align-items-end"
          >
            <span class="fw-bolder fs-4"> $${product.price}</span>
            <span class="remove-product" data-id="${product.id}"> Remove </span>
          </div>
        </td>
      </tr>`
    })
    addEvents();
    removeProduct();
    removeAllProducts();
}

let addEvents = () => {
    let decreamentBtn = document.querySelectorAll(".cart-product .cart-product-amount .change-amount-dec ");
    let increamentBtn = document.querySelectorAll(".cart-product .cart-product-amount .change-amount-inc ");

    decreamentBtn.forEach((btn) => {
        let changeQuantity = decreaseQuantity();
        btn.addEventListener("click", function () {
            let counter = this.closest(".cart-product-amount").querySelector(".quantity");
            counter.innerHTML = changeQuantity(counter.innerHTML);
            addQuantityToLocalStorage(this.dataset.id, counter.innerHTML);
            calcTotals();
        })
    })

    increamentBtn.forEach((btn) => {
        let changeQuantity = increaseQuantity();
        btn.addEventListener("click", function () {
            let counter = this.closest(".cart-product-amount").querySelector(".quantity");
            counter.innerHTML = changeQuantity(counter.innerHTML);
            addQuantityToLocalStorage(this.dataset.id, parseInt(counter.innerHTML));
            calcTotals();
        })
    })
}

let decreaseQuantity = () => {
    let count = 1;
    return function (currentQuantity) {
        count = parseInt(currentQuantity);
        if (count > 1) count--;
        let quantity = count;
        return quantity;
    }
}

let increaseQuantity = () => {
    let count = 1;
    return function (currentQuantity) {
        count = parseInt(currentQuantity);
        count++;
        let quantity = count;
        return quantity;
    }
}

let addQuantityToLocalStorage = (id, currentQuantity) => {
    let productObj = cart.find((product) => {
        return product.id == id
    })
    productObj.quantity = currentQuantity;
    addProductCartToLocalStorage();
}

let removeProduct = () => {
    let removeBtn = document.querySelectorAll(".cart-product .remove-product");
    removeBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            let productParent = this.closest(".cart-product");
            cart = cart.filter((product) => {
                return product.id != this.dataset.id;
            })
            addProductCartToLocalStorage()
            productParent.remove()
            checkCartEmpty()
            addCartIconTotal()
            calcTotals();
        })
    })
}

let removeAllProducts = () => {
    let removeAllBtn = document.querySelector(".cart-cont .remove-all-products");
    removeAllBtn.addEventListener("click", () => {
        cart = [];
        checkCartEmpty();
        addCartIconTotal();
        addProductCartToLocalStorage();
    })
}


let getProductsFromLocalStorage = () => {
    if (localStorage.getItem("cartProducts")) {
        cart = JSON.parse(localStorage.getItem("cartProducts"));
        addProductsToCart();
        calcTotals();
    }
}
getProductsFromLocalStorage()

let addCartIconTotal = () => {
    let cartNum = document.querySelector("nav .cart-num");
    cartNum.textContent = cart.length;
    if (cart.length == 0) {
        cartNum.classList.remove("cart-num-active");
    } else {
        cartNum.classList.add("cart-num-active");
    }
}
addCartIconTotal();

let addProductCartToLocalStorage = () => {
    window.localStorage.setItem("cartProducts", JSON.stringify(cart));
}

let checkCartEmpty = () => {
    if (cart.length == 0) {
        cartContainer.innerHTML = `<h2 class="fw-bolder text-center mb-0">Cart is empty!</h2>`;
    }
}
checkCartEmpty()

function calcTotals() {
    let totalPriceAmount = document.querySelector(".cart-cont .total-price");
    let totalItems = document.querySelector(".cart-cont .items-num");
    // let totalPrice = 0;
    // cart.forEach((product) => {
    //     totalPrice += (product.price * product.quantity);
    // })
    // totalPriceAmount.innerHTML = "$" + totalPrice;
    totalPriceAmount.innerHTML = "$" + cart.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);

    totalItems.innerHTML = cart.reduce((acc, product) => {
        return acc + product.quantity;
    }, 0);
}






