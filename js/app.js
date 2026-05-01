'use strict';

let cart = [];

const formatPrice = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function productArt(product, small = false) {
  const v = product.visual || {};
  return `
    <div class="product-art${small ? ' small-art' : ''}"
      data-type="${v.tipo || 'perfume'}"
      data-label="${v.label || product.marca.slice(0, 5)}"
      style="--product:${v.cor || '#c9a45f'};--accent:${v.acento || '#111216'}">
    </div>
  `;
}

function productCard(product) {
  const badges = [
    product.destaque ? '<span>Destaque</span>' : ''
  ].join('');

  return `
    <article class="product-card">
      <div class="product-badges">${badges}</div>
      <div class="product-art-wrap">${productArt(product)}</div>
      <div class="product-body">
        <div class="product-meta"><span>${product.categoria}</span><span>${product.marca}</span></div>
        <div class="product-name">${product.nome}</div>
        <div class="product-note">${product.nota}</div>
        <div class="product-price">${formatPrice(product.preco)}</div>
      </div>
      <div class="product-actions">
        <button class="btn-add-cart" type="button" data-add="${product.id}">Adicionar</button>
        <button class="btn-wa-quick" type="button" data-wa="${product.id}" aria-label="Pedir ${product.nome} pelo WhatsApp">WA</button>
      </div>
    </article>
  `;
}

function showToast(message) {
  const host = document.getElementById('toastContainer');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  host.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(APP_CONFIG.storageKey));
    cart = Array.isArray(saved) ? saved : [];
  } catch {
    cart = [];
  }
  updateCartCount();
}

function saveCart() {
  localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount, #fabCartCount').forEach(el => {
    el.textContent = total;
    el.style.display = total ? 'inline-flex' : 'none';
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({ id: product.id, qty: 1 });
  saveCart();
  showToast(`${product.nome} adicionado ao orçamento.`);
}

function cartProduct(item) {
  return produtos.find(product => product.id === item.id);
}

function changeQty(id, amount) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + amount);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('budgetTotal');
  if (!list || !totalEl) return;

  const validItems = cart
    .map(item => ({ item, product: cartProduct(item) }))
    .filter(entry => entry.product);

  if (!validItems.length) {
    list.innerHTML = '<p class="empty-cart">Seu orçamento esta vazio.</p>';
    totalEl.innerHTML = 'Total: <span>R$ 0,00</span>';
    return;
  }

  list.innerHTML = validItems.map(({ item, product }) => `
    <div class="cart-item">
      <div class="cart-thumb"><div class="cart-image-placeholder" aria-hidden="true"></div></div>
      <div class="cart-name">${product.nome}<small>${product.marca} - ${product.categoria}</small></div>
      <div class="qty-control">
        <button type="button" data-qty="${product.id}" data-delta="-1">-</button>
        <span>${item.qty}</span>
        <button type="button" data-qty="${product.id}" data-delta="1">+</button>
      </div>
      <div class="cart-price">${formatPrice(product.preco * item.qty)}</div>
      <button class="remove-cart" type="button" data-remove="${product.id}" aria-label="Remover">x</button>
    </div>
  `).join('');

  const total = validItems.reduce((sum, entry) => sum + entry.product.preco * entry.item.qty, 0);
  totalEl.innerHTML = `Total: <span>${formatPrice(total)}</span>`;
}

function buildWhatsappMessage(singleProduct = null) {
  if (singleProduct) {
    return `${APP_CONFIG.whatsappGreeting}\n\nTenho interesse em:\n${singleProduct.nome}\n${singleProduct.marca}\n${formatPrice(singleProduct.preco)}`;
  }

  const name = (document.getElementById('customerName')?.value || '').trim();
  const obs = (document.getElementById('customerObs')?.value || '').trim();
  const lines = [`${APP_CONFIG.whatsappGreeting}`];
  if (name) lines.push(`Nome: ${name}`);
  lines.push('', 'Produtos do orçamento:');

  let total = 0;
  cart.forEach(item => {
    const product = cartProduct(item);
    if (!product) return;
    total += product.preco * item.qty;
    lines.push(`- ${product.nome} (${item.qty}x) - ${formatPrice(product.preco * item.qty)}`);
  });

  lines.push('', `Total estimado: ${formatPrice(total)}`);
  if (obs) lines.push('', `Observacoes: ${obs}`);
  return lines.join('\n');
}

function openWhatsapp(message) {
  window.open(`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function wireProductButtons(scope = document) {
  scope.querySelectorAll('[data-add]').forEach(button => {
    button.addEventListener('click', () => {
      const product = produtos.find(item => item.id === Number(button.dataset.add));
      if (product) addToCart(product);
    });
  });

  scope.querySelectorAll('[data-wa]').forEach(button => {
    button.addEventListener('click', () => {
      const product = produtos.find(item => item.id === Number(button.dataset.wa));
      if (product) openWhatsapp(buildWhatsappMessage(product));
    });
  });
}

function wireCartModal() {
  const modal = document.getElementById('cartModal');
  document.querySelectorAll('[data-open-cart]').forEach(button => {
    button.addEventListener('click', () => {
      renderCart();
      modal?.showModal();
    });
  });
  document.querySelectorAll('[data-close-cart]').forEach(button => button.addEventListener('click', () => modal?.close()));
  modal?.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });

  document.getElementById('cartItemsList')?.addEventListener('click', event => {
    const qtyButton = event.target.closest('[data-qty]');
    const removeButton = event.target.closest('[data-remove]');
    if (qtyButton) changeQty(Number(qtyButton.dataset.qty), Number(qtyButton.dataset.delta));
    if (removeButton) removeFromCart(Number(removeButton.dataset.remove));
  });

  document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    cart = [];
    saveCart();
    renderCart();
  });

  document.getElementById('sendWaBtn')?.addEventListener('click', () => {
    if (!cart.length) {
      showToast('Adicione produtos ao orçamento primeiro.');
      return;
    }
    openWhatsapp(buildWhatsappMessage());
  });
}

function wireCommon() {
  const nav = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 40));

  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  menuToggle?.addEventListener('click', () => navMenu?.classList.toggle('open'));

  const wa = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(APP_CONFIG.whatsappGreeting)}`;
  const heroWa = document.getElementById('heroWaBtn');
  if (heroWa) heroWa.href = wa;

  const phone = document.getElementById('phoneLinkContact');
  const email = document.getElementById('emailLinkContact');
  const address = document.getElementById('addressContact');
  if (phone) {
    phone.href = APP_CONFIG.contact.phoneHref;
    phone.textContent = APP_CONFIG.contact.phoneDisplay;
  }
  if (email) {
    email.href = APP_CONFIG.contact.emailHref;
    email.textContent = APP_CONFIG.contact.email;
  }
  if (address) address.innerHTML = APP_CONFIG.contact.addressHtml;
}

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  wireCommon();
  wireCartModal();

});
