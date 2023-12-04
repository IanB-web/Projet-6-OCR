const token = localStorage.getItem("token");
const edition = document.querySelector(".edition");
const logLink = document.querySelector(".log");

if (token) {
  edition.classList.remove("hidden");
  // on change le texte "login" en "logout"
  logLink.innerHTML = `logout`;
  // ajout du de l'event au click sur "logout"
  logLink.addEventListener("click", function (event) {
    event.preventDefault();

    // on supprime le token stocké dans le local storage
    localStorage.removeItem("token");
    // on rechange le text en "login"
    logLink.innerHTML = `login`;
    // on se redirige vers la page login
    window.location.href = "/";
  });
}

