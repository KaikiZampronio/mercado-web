const products = [
  { id: 1, name: "Produto 1", price: 10.0, description: "Descrição do Produto 1", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Produto 2", price: 20.0, description: "Descrição do Produto 2", image: "https://via.placeholder.com/150" },
];

let cart = [];

// Load products into catalog
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

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  alert('Produto adicionado ao carrinho!');
}

// Load cart items
function loadCart() {
  const cartDiv = document.getElementById('carrinho');
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

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  loadCart();
}

// Proceed to checkout
function checkout() {
  window.location.href = 'checkout.html';
}

// Handle checkout form submission
function submitCheckout(event) {
  event.preventDefault();
  alert('Pedido confirmado! Obrigado pela compra.');
  // Logic to clear the cart and redirect to catalog
  cart = [];
  window.location.href = 'index.html';
}

// Handle admin product form submission
function submitProduct(event) {
  event.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productDescription = document.getElementById('productDescription').value;
  const productImage = document.getElementById('productImage').value;
  const newProduct = {
      id: products.length + 1,
      name: productName,
      price: productPrice,
      description: productDescription,
      image: productImage
  };
  products.push(newProduct);
  loadAdminCatalog();
  alert('Produto adicionado com sucesso!');
}

// Load products into admin catalog for management
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

// Remove product from catalog
function removeProduct(productId) {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
      products.splice(productIndex, 1);
      loadAdminCatalog();
      alert('Produto removido com sucesso!');
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'adm' && password === 'adm123') {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = 'admin.html';
  } else {
      alert('Nome de usuário ou senha incorretos!');
  }
}

// Verify admin authentication
function verifyAdmin() {
  if (!localStorage.getItem('isAdmin')) {
      window.location.href = 'login.html';
  }
}

// Call loadCatalog function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('catalogo')) {
      loadCatalog();
  }

  if (document.getElementById('carrinho')) {
      loadCart();
  }

  if (document.getElementById('adminCatalogo')) {
      verifyAdmin();
      loadAdminCatalog();
  }
});
