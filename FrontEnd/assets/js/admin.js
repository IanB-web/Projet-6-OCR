// définition des constantes récurentes

const token = localStorage.getItem("token");
const editionBand = document.querySelector(".edition");
const logLink = document.querySelector(".log");
const openModalBtn = document.querySelector(".change__btn");



// conditionnement token pour affichage de l'index "créateur"
if (token) {

  // on affiche les élements de base montrant que l'on peut éditer du contenu
  openModalBtn.style.display = "flex";
  editionBand.classList.remove("hidden");
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

  // création de la fonction click pour l'apparition de la modale
  openModalBtn.addEventListener("click", function() {
    
  })
}
