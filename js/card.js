const cartItems = [
  {
    name: "Gold Necklace",
    desc: "Elegant gold necklace for special occasions.",
    price: 1350,
    img: "images/6.jpg",
    qty:1
  },
  {
    name: "Diamond Earrings",
    desc: "Sparkling diamond earrings.",
    price: 2100,
    img: "images/61.jpg",
    qty:1
  },
  {
    name: "Gold Ring",
    desc: "Classic gold ring.",
    price: 1050,
    img: "images/62.jpg",
    qty:1
  }
];

const cartContainer = document.getElementById('cart-items');

function renderCart() {
  cartContainer.innerHTML = '';
  cartItems.forEach((item, index)=>{
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <p>Price: $${item.price}</p>
      </div>
      <div class="cart-item-actions">
        <select data-index="${index}">
          ${[...Array(10).keys()].map(i => `<option value="${i+1}" ${i+1===item.qty?'selected':''}>${i+1}</option>`).join('')}
        </select>
        <br>
        <button data-index="${index}">Delete</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });
  updateTotals();
}

function updateTotals() {
  let subtotal = cartItems.reduce((sum,item)=> sum + item.price*item.qty,0);
  document.getElementById('subtotal').innerText = `$${subtotal}`;
  const shipping = 30;
  document.getElementById('total').innerText = `$${subtotal + shipping}`;
  document.getElementById('cart-count').innerText = `${cartItems.reduce((sum,item)=>sum+item.qty,0)} items`;
  document.getElementById('cart-total').innerText = `$${subtotal}`;
}

cartContainer.addEventListener('change', e=>{
  if(e.target.tagName==='SELECT'){
    const index = e.target.dataset.index;
    cartItems[index].qty = parseInt(e.target.value);
    updateTotals();
  }
});

cartContainer.addEventListener('click', e=>{
  if(e.target.tagName==='BUTTON'){
    const index = e.target.dataset.index;
    cartItems.splice(index,1);
    renderCart();
  }
});

renderCart();
