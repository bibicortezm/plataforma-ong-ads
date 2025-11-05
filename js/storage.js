// js/storage.js
function saveToLocalStorage(form) {
  const data = {};
  form.querySelectorAll("input").forEach(input => {
    data[input.id] = input.value;
  });
  localStorage.setItem("cadastro", JSON.stringify(data));
}
