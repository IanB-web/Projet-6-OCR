// définition des constantes récurentes

const token = localStorage.getItem("token");
const editionBand = document.querySelector(".edition");
const logLink = document.querySelector(".log");
const openModalBtn = document.querySelector(".change__btn");
const modal = document.querySelector(".modal");


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
  openModalBtn.addEventListener("click", function (event) {
  event.preventDefault();
  modal.style.display = "block"
  });

  /**
   *  remplissage de la modale avec les tous projets existants 
   **/
const modalGallery = document.querySelector(".modal__gallery")

  // Récupération des travaux(projets) présents dans le backend
async function getWorks() {
  const worksResults = await fetch("http://localhost:5678/api/works").then(
    (reponse) => {
      return reponse.json();
    }
  );
  return worksResults;
}

// Parcours des travaux et les affiches dans la modale
function resetDisplayModalGallery() {
  modalGallery.innerHTML = "";
}
function displayWorks(works) {
  // on réinitialise la galerie des projets
  resetDisplayModalGallery();

  works.forEach(work => displayWork(work))
}

function displayWork(work) {
  // Création des balises dédiées à chaque projet
  const projet = document.createElement("article");
  projet.classList.add("modal__box");

  projet.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}" />
      <p><i class="fa-solid fa-trash-can"></i></p>
    `;

  modalGallery.appendChild(projet);
}

async function modalInit() {
  // Affichage des projets
  const works = await getWorks();
  displayWorks(works);}


modalInit();


}
