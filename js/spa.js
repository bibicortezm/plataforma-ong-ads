export const templateHome = `<h1>Bem-vindo à ONG</h1><p>Missão ...</p>`;
export const templateProjetos = `<h2>Projetos Sociais</h2><ul>...</ul>`;
export const templateCadastro = `
  <form id="cadastroForm">
    Nome: <input id="nome" required><span class="erro"></span><br>
    Email: <input type="email" id="email" required><span class="erro"></span><br>
    <button type="submit">Enviar</button>
  </form>
`;
// js/spa.js
// Lógica SPA (Single Page Application) e Roteamento

import { 
  templateHome, 
  templateProjetos, 
  templateCadastro 
} from './templates.js';

import { setupFormValidation } from './form.js';
import { saveToLocalStorage } from './storage.js';
import { setupKeyboardNavigation, setupModeToggle } from './accessibility.js';

// Estado da aplicação
const state = {
  currentPage: 'home',
  history: []
};

/**
 * Renderiza uma página específica
 * @param {string} page - Nome da página ('home', 'projetos', 'cadastro')
 */
function renderPage(page) {
  let html = '';
  
  switch(page) {
    case 'home':
      html = templateHome;
      break;
    case 'projetos':
      html = templateProjetos;
      break;
    case 'cadastro':
      html = templateCadastro;
      break;
    default:
      html = templateHome;
  }

  // Atualiza o DOM
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = html;
    mainContent.setAttribute('role', 'main');
  }

  // Atualiza estado
  state.currentPage = page;
  state.history.push(page);

  // Ativa funcionalidades específicas da página
  if (page === 'cadastro') {
    setupFormValidation();
  }

  // Reativa navegação por teclado e acessibilidade
  setupKeyboardNavigation();
  setupModeToggle();

  // Log para debug (remover em produção)
  console.log(`Página renderizada: ${page}`);
}

/**
 * Configura os botões de navegação
 */
function setupNavigation() {
  const homeBtn = document.getElementById('homeBtn');
  const projetosBtn = document.getElementById('projetosBtn');
  const cadastroBtn = document.getElementById('cadastroBtn');

  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage('home');
      window.scrollTo(0, 0); // Scroll para o topo
    });
  }

  if (projetosBtn) {
    projetosBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage('projetos');
      window.scrollTo(0, 0);
    });
  }

  if (cadastroBtn) {
    cadastroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage('cadastro');
      window.scrollTo(0, 0);
    });
  }
}

/**
 * Inicializa a aplicação SPA
 */
export function initSPA() {
  // Aguarda o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupNavigation();
      setupKeyboardNavigation();
      setupModeToggle();
      renderPage('home'); // Carrega home inicial
    });
  } else {
    setupNavigation();
    setupKeyboardNavigation();
    setupModeToggle();
    renderPage('home');
  }
}

/**
 * Retorna o estado atual da aplicação
 */
export function getAppState() {
  return state;
}

/**
 * Navega para uma página específica
 * @param {string} page - Nome da página
 */
export function navigateTo(page) {
  renderPage(page);
}

/**
 * Retorna o histórico de navegação
 */
export function getNavigationHistory() {
  return state.history;
}

/**
 * Limpa o histórico de navegação
 */
export function clearHistory() {
  state.history = [];
}

