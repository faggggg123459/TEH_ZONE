const flowers = [
  { name: "Роза", price: 300, img: "rose.jpg" },
  { name: "Тюльпан", price: 250, img: "tulip.jpg" },
  { name: "Пион", price: 350, img: "peony.jpg" },
  { name: "Гербера", price: 200, img: "gerbera.jpg" },
  { name: "Лилия", price: 400, img: "lily.jpg" }
];

let cart = {};

function renderFlowers() {
  const container = document.getElementById('topFlowers');
  container.innerHTML = '';
  flowers.forEach((flower, index) => {
    container.innerHTML += `
      <div class="flower-card">
        <img src="images/${flower.img}" alt="${flower.name}" />
        <h3>${flower.name}</h3>
        <p>${flower.price}₴</p>
        <div class="action-row">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <span id="qty-${index}">0</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
          <button class="btn" onclick="addToCart(${index})">Добавить</button>
        </div>
      </div>
    `;
  });
}

function updateQuantity(id, delta) {
  const el = document.getElementById(`qty-${id}`);
  if (el) el.innerText = Math.max(0, parseInt(el.innerText) + delta);
}

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).innerText);
  if (qty > 0) {
    const item = flowers[index];
    if (!cart[item.name]) cart[item.name] = { ...item, quantity: 0 };
    cart[item.name].quantity += qty;
    updateCartView();
    document.getElementById(`qty-${index}`).innerText = 0;
  }
}

function addToCartCustom(name, price, id) {
  const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
  if (qty > 0) {
    if (!cart[name]) cart[name] = { name, price, quantity: 0 };
    cart[name].quantity += qty;
    updateCartView();
    document.getElementById(`qty-${id}`).innerText = 0;
  }
}

function updateCartView() {
  const container = document.getElementById('cartItems');
  container.innerHTML = '';
  Object.values(cart).forEach(item => {
    container.innerHTML += `<div>${item.name} x ${item.quantity} = ${item.price * item.quantity}₴</div>`;
  });
}

function clearCart() {
  cart = {};
  updateCartView();
}

function openCart() {
  document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

function openRegister() {
  document.getElementById('registerModal').style.display = 'flex';
}

function closeRegister() {
  document.getElementById('registerModal').style.display = 'none';
}

function register() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const error = document.getElementById('error-message');
  if (!name || !email) return error.textContent = 'Заполните все поля';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return error.textContent = 'Некорректный email';
  error.textContent = 'Регистрация прошла успешно!';
}

const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const petals = Array.from({ length: 30 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: 10 + Math.random() * 10,
  speed: 0.5 + Math.random() * 1.5,
  drift: (Math.random() - 0.5) * 1.5
}));

function drawPetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(144, 238, 144, 0.8)';
    ctx.ellipse(p.x, p.y, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speed;
    p.x += p.drift;
    if (p.y > canvas.height || p.x < 0 || p.x > canvas.width) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawPetals);
}
drawPetals();

window.onload = () => {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    renderFlowers();
  }, 3000);
};
