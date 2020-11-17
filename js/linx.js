var nextPage =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
const request = new XMLHttpRequest();
document.onload = getNextPage();

function getNextPage() {
  request.open("GET", nextPage);
  request.responseType = "json";
  request.send();
  request.onload = doLoad;
}

function doLoad() {
  const response = request.response;
  const products = response.products;
  nextPage = "https://" + response.nextPage;

  loadProductsColCards(products);
}

function getStrValueBRL(value, decimals) {
  const newValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: decimals
  });

  return newValue;
}

function loadProductsColCards(products) {
  const productsRow = document.querySelector(".products");

  products.forEach((product) => {
    const productCol = createElement("div", productsRow, "product");
    const productCard = createElement("div", productCol, "productCard");

    const image = createElement("img", productCard);
    image.src = product.image;

    const name = createElement("p", productCard);
    name.textContent = product.name;

    const description = createElement("p", productCard);
    description.textContent = product.description;

    const oldPrice = createElement("p", productCard);
    oldPrice.innerHTML = "De:  " + getStrValueBRL(product.oldPrice, 2);

    const price = createElement("p", productCard);
    price.innerHTML = "<b>Por: " + getStrValueBRL(product.price, 2) + "</b>";

    const installments = createElement("p", productCard);
    installments.innerHTML =
      "ou " +
      product.installments.count +
      "x de " +
      getStrValueBRL(product.installments.value, 2);

    const buy = createElement("button", productCard);
    buy.textContent = "Comprar";
  });
}

function createElement(type, parent, classList) {
  const element = document.createElement(type);
  if (classList !== undefined) {
    if (Array.isArray(classList)) {
      element.classList.add(...classList);
    } else {
      element.className = classList;
    }
  }
  parent.append(element);
  return element;
}

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
