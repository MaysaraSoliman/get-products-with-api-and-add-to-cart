export { addCartIconTotal }
// export { cart as cart, productsContainer as productsContainer }

const productsContainer = document.querySelector(".products .container");
const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

let products = [];

let getDataFromApi = async () => {
  let response = await fetch("https://dummyjson.com/products");
  let data = await response.json();
  products = data.products;
  renderProducts(data.products)
}
getDataFromApi()

let renderProducts = (products) => {
  productsContainer.innerHTML = ""
  products.forEach((data) => {
    productsContainer.innerHTML += ` <div class="product col-12 col-md-4 col-lg-3">
          <div class="card">
            <img
              src="${data.thumbnail}"
              class="card-img-top"
            />
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title">${data.title}</h5>
                <p class="card-price m-0">
                  <span class="fs-4 text-primary">$${data.price}</span> / piece
                </p>
                <p class="text-muted">Shipping via Eraasoft</p>
              </div>
              ${cart.find((ele) => ele.id == data.id) ?
        '<h5 class="fw-bolder text-center">Added to cart!</h5>'
        :
        `<button href="#" class="btn btn-primary w-100 add-to-cart" data-id="${data.id}">
                    Add to cart
                </button>`
      }
              
            </div>
          </div>
        </div>`
  })
  addEvents();
}

let addEvents = () => {
  let addToCartBtn = document.querySelectorAll(".products .container .product .add-to-cart");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", function () { addToCart(this) })
  })
}

let addToCart = (btn) => {
  let parentBtn = btn.closest(".card-body");
  let btnId = btn.dataset.id;
  let productObject = products.find((product) => {
    return product.id == btnId;
  })
  cart.push({ ...productObject, quantity: 1 });
  addCartIconTotal()
  btn.remove();
  parentBtn.innerHTML += '<h5 class="fw-bolder text-center">Added to cart!</h5>';
  addProductCartToLocalStorage()
}

let addProductCartToLocalStorage = () => {
  window.localStorage.setItem("cartProducts", JSON.stringify(cart))
}

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


