'use strict';

let cart = [];
let currentCategory = 'Todos';
let currentBrand = 'Todas';
let searchQuery = '';
let sortMode = 'default';

const formatPrice = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const searchCategories = [
  { categoria: 'Perfumes', termos: ['perfume', 'perfumes'] },
  { categoria: 'Cremes', termos: ['creme', 'cremes'] },
  { categoria: 'Hidratantes', termos: ['hidratante', 'hidratantes'] }
];

function productArt(product) {
  if (product.imagem) {
    return `<img class="product-photo" src="${product.imagem}" alt="${product.nome}" loading="lazy">`;
  }
  const v = product.visual || {};
  return `
    <div class="product-art"
      data-type="${v.tipo || 'perfume'}"
      data-label="${v.label || product.marca.slice(0, 5)}"
      style="--product:${v.cor || '#c9a45f'};--accent:${v.acento || '#111216'}">
    </div>
  `;
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-badges">${product.maisVendido ? '<span>Mais vendido</span>' : ''}</div>
      <div class="product-art-wrap${product.imagem ? ' has-photo' : ''}">${productArt(product)}</div>
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
      <div class="cart-thumb">${product.imagem ? `<img src="${product.imagem}" alt="${product.nome}">` : '<div class="cart-image-placeholder" aria-hidden="true"></div>'}</div>
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

function getCategories() {
  return [...new Set(produtos.map(product => product.categoria))].sort();
}

function productsInCategory(category = currentCategory) {
  return category === 'Todos'
    ? produtos
    : produtos.filter(product => product.categoria === category);
}

function getBrands(category = currentCategory) {
  return [...new Set(productsInCategory(category).map(product => product.marca))].sort();
}

function countBy(key, source = produtos) {
  return source.reduce((map, product) => {
    map[product[key]] = (map[product[key]] || 0) + 1;
    return map;
  }, {});
}

function setCategory(value) {
  currentCategory = value;
  if (currentBrand !== 'Todas' && !getBrands(currentCategory).includes(currentBrand)) {
    currentBrand = 'Todas';
  }
}

function renderFilterList(hostId, items, activeValue, onClick, totalLabel, source = produtos) {
  const host = document.getElementById(hostId);
  if (!host) return;
  const countMap = hostId.toLowerCase().includes('brand') ? countBy('marca', source) : countBy('categoria', source);
  const allCount = source.length;
  host.innerHTML = [totalLabel, ...items].map(item => `
    <button class="filter-item sidebar-cat-item${item === activeValue ? ' active' : ''}" type="button" data-filter="${item}">
      <span>${item}</span><b class="cat-count">${item === totalLabel ? allCount : countMap[item]}</b>
    </button>
  `).join('');
  host.querySelectorAll('.filter-item').forEach(button => {
    button.addEventListener('click', () => {
      onClick(button.dataset.filter);
      renderAll();
    });
  });
}

function passesFilters(product) {
  if (currentCategory !== 'Todos' && product.categoria !== currentCategory) return false;
  if (currentBrand !== 'Todas' && product.marca !== currentBrand) return false;
  if (!searchQuery) return true;

  const tokens = normalize(searchQuery).split(/\s+/).filter(Boolean);
  const categorySearch = searchCategories.find(item => tokens.some(token => item.termos.includes(token)));
  if (categorySearch && product.categoria !== categorySearch.categoria) return false;

  const remainingTokens = categorySearch
    ? tokens.filter(token => !categorySearch.termos.includes(token))
    : tokens;
  if (!remainingTokens.length) return true;

  const haystack = normalize(`${product.nome} ${product.marca} ${product.categoria} ${product.nota}`);
  return remainingTokens.every(token => haystack.includes(token));
}

function filteredProducts() {
  const result = produtos.filter(passesFilters);
  switch (sortMode) {
    case 'name-az':
      result.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case 'price-asc':
      result.sort((a, b) => a.preco - b.preco);
      break;
    case 'price-desc':
      result.sort((a, b) => b.preco - a.preco);
      break;
    default:
      result.sort((a, b) => a.numero - b.numero);
  }
  return result;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const resultsInfo = document.getElementById('resultsInfo');
  if (!grid) return;

  const result = filteredProducts();
  if (resultsInfo) resultsInfo.textContent = `${result.length} produto${result.length === 1 ? '' : 's'}`;
  if (!result.length) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';
  grid.innerHTML = result.map(productCard).join('');
  wireProductButtons(grid);
}

function renderFilters() {
  const brandScope = productsInCategory();
  const brands = getBrands();
  renderFilterList('sidebarCats', getCategories(), currentCategory, setCategory, 'Todos');
  renderFilterList('drawerCats', getCategories(), currentCategory, setCategory, 'Todos');
  renderFilterList('sidebarBrands', brands, currentBrand, value => currentBrand = value, 'Todas', brandScope);
  renderFilterList('drawerBrands', brands, currentBrand, value => currentBrand = value, 'Todas', brandScope);
}

function renderActiveFilters() {
  const host = document.getElementById('activeFilters');
  if (!host) return;
  const chips = [];
  if (currentCategory !== 'Todos') chips.push(['category', currentCategory]);
  if (currentBrand !== 'Todas') chips.push(['brand', currentBrand]);
  if (searchQuery) chips.push(['search', `"${searchQuery}"`]);

  host.innerHTML = chips.map(([type, label]) => `
    <span class="filter-chip">${label}<button type="button" data-chip="${type}">x</button></span>
  `).join('');

  host.querySelectorAll('[data-chip]').forEach(button => {
    button.addEventListener('click', () => {
      clearFilter(button.dataset.chip);
      renderAll();
    });
  });
}

function clearFilter(type) {
  if (type === 'category') setCategory('Todos');
  if (type === 'brand') currentBrand = 'Todas';
  if (type === 'search') {
    searchQuery = '';
    document.querySelectorAll('#searchInput, #mobileSearchInput').forEach(input => input.value = '');
  }
  syncControls();
}

function clearAllFilters() {
  currentCategory = 'Todos';
  currentBrand = 'Todas';
  searchQuery = '';
  sortMode = 'default';
  document.querySelectorAll('#searchInput, #mobileSearchInput').forEach(input => input.value = '');
  syncControls();
  renderAll();
}

function updateFilterBadge() {
  const badge = document.getElementById('filterBadge');
  if (!badge) return;
  const count = [
    currentCategory !== 'Todos',
    currentBrand !== 'Todas',
    searchQuery,
    sortMode !== 'default'
  ].filter(Boolean).length;
  badge.textContent = count ? count : '';
}

function syncControls() {
  document.querySelectorAll('#sortSelect, #drawerSort').forEach(select => select.value = sortMode);
  document.querySelectorAll('#searchInput, #mobileSearchInput').forEach(input => {
    if (input.value !== searchQuery) input.value = searchQuery;
  });
}

function renderAll() {
  renderFilters();
  renderProducts();
  renderActiveFilters();
  syncControls();
  updateFilterBadge();
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

function wireControls() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  menuToggle?.addEventListener('click', () => navMenu?.classList.toggle('open'));

  const nav = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 40));

  document.querySelectorAll('#searchInput, #mobileSearchInput').forEach(input => {
    input.addEventListener('input', () => {
      searchQuery = input.value.trim();
      renderAll();
    });
  });

  document.querySelectorAll('#sortSelect, #drawerSort').forEach(select => {
    select.addEventListener('change', () => {
      sortMode = select.value;
      renderAll();
    });
  });

  document.getElementById('clearAllBtn')?.addEventListener('click', clearAllFilters);
  document.getElementById('drawerClear')?.addEventListener('click', clearAllFilters);

  const drawer = document.getElementById('filterDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const openDrawer = () => {
    renderFilters();
    drawer?.classList.add('open');
    overlay?.classList.add('open');
  };
  const closeDrawer = () => {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
  };
  document.getElementById('btnFiltros')?.addEventListener('click', openDrawer);
  document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerApply')?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  document.getElementById('viewGrid')?.addEventListener('click', () => {
    document.body.classList.remove('list-view');
    document.getElementById('viewGrid')?.classList.add('active');
    document.getElementById('viewList')?.classList.remove('active');
  });
  document.getElementById('viewList')?.addEventListener('click', () => {
    document.body.classList.add('list-view');
    document.getElementById('viewList')?.classList.add('active');
    document.getElementById('viewGrid')?.classList.remove('active');
  });
}

function applyQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');
  if (categoria && getCategories().includes(categoria)) currentCategory = categoria;
}

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  applyQueryParams();
  wireControls();
  wireCartModal();
  document.getElementById('totalProducts').textContent = produtos.length;
  document.getElementById('totalBrands').textContent = getBrands().length;
  renderAll();
});
