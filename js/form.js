// js/form.js
function setupFormValidation() {
  const form = document.getElementById("cadastroForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    let valid = true;
    form.querySelectorAll("input[required]").forEach(input => {
      if (!input.value.trim()) {
        input.nextElementSibling.innerText = "Preenchimento obrigatório!";
        valid = false;
      } else {
        input.nextElementSibling.innerText = "";
      }
    });

    if (!valid) e.preventDefault();
    else {
      saveToLocalStorage(form);
      alert("Dados enviados!");
    }
  });
}
