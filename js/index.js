// js/spa.js
import { templateHome, templateProjetos, templateCadastro } from './templates.js';

function renderPage(page) {
  let html = "";
  if (page === "home") html = templateHome;
  else if (page === "projetos") html = templateProjetos;
  else if (page === "cadastro") html = templateCadastro;

  document.getElementById("main-content").innerHTML = html;

  // Só ativa validação se formulário presente
  if (page === "cadastro") setupFormValidation();
}

// Navegação SPA
document.getElementById("homeBtn").onclick = () => renderPage("home");
document.getElementById("projetosBtn").onclick = () => renderPage("projetos");
document.getElementById("cadastroBtn").onclick = () => renderPage("cadastro");

// Carrega a home no início
renderPage("home");
