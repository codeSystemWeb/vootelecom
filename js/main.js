// HEADER SCROLL
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("header-active");
  } else {
    header.classList.remove("header-active");
  }
});

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ANIMAÇÃO AO APARECER (cards)
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
document.querySelectorAll(".plano-card,.feature-card,.stat-card")
  .forEach(el => {
    el.classList.add("hidden");
    cardObserver.observe(el);
  });

// CONTADORES
const counters = document.querySelectorAll(".stat-card h3");
const speed = 200;
counters.forEach(counter => {
  const animate = () => {
    const value = +counter.innerText.replace(/\D/g, '');
    const data = +counter.getAttribute('data-count') || value;
    const time = data / speed;
    if (value < data) {
      counter.innerText = Math.ceil(value + time);
      setTimeout(animate, 10);
    } else {
      counter.innerText = data;
    }
  };
});

// MENU MOBILE
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("open");
});
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
    hamburger.classList.remove('open');
  });
});

// FAQ
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// LISTA DE CIDADES
const cities = [
  "Espinosa BA","Angical BA","Anita Garibaldi SC","Anta Gorda RS","Aracatu BA","Barra da Estiva BA",
  "Brumado BA","Rio Pardo RS","Caxias do Sul RS","Porto Alegre RS","Florianópolis SC","Blumenau SC",
  "Joinville SC","Chapecó SC","Pelotas RS","Santa Maria RS","Vitória da Conquista BA","Feira de Santana BA",
  "Salvador BA","Goiânia GO","Anápolis GO","Palmas TO","Araguaína TO","Belo Horizonte MG","Uberlândia MG",
  "Montes Claros MG","Juiz de Fora MG","Divinópolis MG","Sete Lagoas MG","Itabuna BA","Ilhéus BA",
  "Criciúma SC","Lages SC","Passo Fundo RS","Novo Hamburgo RS","Canoas RS","Bagé RS"
];

const citiesGrid = document.getElementById('citiesGrid');
const citySearch = document.getElementById('citySearch');
const cityCount = document.getElementById('cityCount');
const activeFilter = document.getElementById('activeFilter');
const emptyState = document.getElementById('emptyState');
const stateFilters = document.getElementById('stateFilters');

let selectedState = 'ALL';

function parseCity(item) {
  const validStates = ['RS', 'SC', 'BA', 'GO', 'TO', 'MG'];
  const parts = item.trim().split(' ');
  const last = parts[parts.length - 1];
  if (validStates.includes(last)) {
    return { city: parts.slice(0, -1).join(' '), state: last, full: item };
  }
  const stateIndex = parts.findIndex(part => validStates.includes(part));
  if (stateIndex !== -1) {
    return {
      city: parts.slice(0, stateIndex).join(' '),
      state: parts[stateIndex],
      full: item
    };
  }
  return { city: item, state: '', full: item };
}

function renderCities() {
  const query = citySearch.value.trim().toLowerCase();
  const filtered = cities
    .map(parseCity)
    .filter(item => {
      const matchesText = item.full.toLowerCase().includes(query);
      const matchesState = selectedState === 'ALL' || item.state === selectedState;
      return matchesText && matchesState;
    })
    .sort((a, b) => a.city.localeCompare(b.city, 'pt-BR'));

  if (filtered.length === 0) {
    citiesGrid.innerHTML = '';
    citiesGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    citiesGrid.innerHTML = filtered.map(item => `
      <article class="city-card">
        <strong>${item.city}</strong>
        <span>${item.state || 'BR'}</span>
      </article>
    `).join('');
    citiesGrid.style.display = 'grid';
    emptyState.style.display = 'none';
  }

  cityCount.textContent = `${filtered.length} cidade${filtered.length === 1 ? '' : 's'}`;
  activeFilter.textContent = `Filtro: ${selectedState === 'ALL' ? 'Todos' : selectedState}`;

  console.log("renderCities rodou:", filtered);
}

stateFilters.addEventListener('click', (e) => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  selectedState = pill.dataset.state;
  document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
  pill.classList.add('active');
  renderCities();
});
citySearch.addEventListener('input', renderCities);

// ANIMAÇÃO REVEAL (seções)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));

// Inicialização
renderCities();

console.log("VOO Telecom carregado");
