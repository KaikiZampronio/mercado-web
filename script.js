let products = [];
let cart = [];

// carregar produtos no catálogo
function loadCatalog() {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'produto';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        catalogo.appendChild(productDiv);
    });
}

// Adicionar produtos ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert('Produto adicionado ao carrinho!');
    localStorage.setItem('cart', JSON.stringify(cart));
}

// carregar itens do carrinho
function loadCart() {
    const cartDiv = document.getElementById('carrinho');
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
    cartDiv.innerHTML = '';
    let total = 0;
    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'carrinho-item';
        cartItem.innerHTML = `
            <p>${product.name} - R$ ${product.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartDiv.appendChild(cartItem);
        total += product.price;
    });
    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Remover itens do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// ir para o checkout
function checkout() {
    window.location.href = 'check.html';
}

// finalizar compra
function submitCheckout(event) {
    event.preventDefault();
    alert('Pedido confirmado! Obrigado pela compra.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'index.html';
}

// senha do adm
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'adm' && password === 'adm') {
        localStorage.setItem('admin', 'loggedIn');
        window.location.href = 'admin.html';
    } else {
        alert('Credenciais incorretas. Tente novamente.');
    }
}

// verificar login
function verifyAdmin() {
    const adminLoggedIn = localStorage.getItem('admin');
    if (adminLoggedIn !== 'loggedIn') {
        window.location.href = 'login.html';
    } else {
        loadAdminCatalog();
    }
}

// armazenar os produtos
function submitProduct(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').value;

    const newProduct = {
        id: products.length,
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    loadAdminCatalog();
    document.getElementById('productForm').reset();
}

// adicionar produto adm
function loadAdminCatalog() {
  const adminCatalogo = document.getElementById('adminCatalogo');
  adminCatalogo.innerHTML = '';
  products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'produto';
      productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>R$ ${product.price.toFixed(2)}</p>
          <button onclick="removeProduct(${product.id})">Remover</button>
      `;
      adminCatalogo.appendChild(productDiv);
  });
}

// Remover produto adm
function removeProduct(productId) {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
      products.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(products));
      loadAdminCatalog();
      alert('Produto removido com sucesso!');
  }
}

// inicializa os produtos no catálogo
document.addEventListener('DOMContentLoaded', () => {
    const storedProducts = localStorage.getItem('products');
    products = storedProducts ? JSON.parse(storedProducts) : [];
    if (document.getElementById('catalogo')) {
        loadCatalog();
    }
    if (document.getElementById('carrinho')) {
        loadCart();
    }
});
