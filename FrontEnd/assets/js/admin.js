// définition des constantes récurentes

const token = localStorage.getItem("token");
const editionBand = document.querySelector(".edition");
const logLink = document.querySelector(".log");
const openModalBtn = document.querySelector(".change__btn");

/**
     * Récupération des travaux(projets) présents dans le backend
     */
    async function getWorks() {
      const worksResults = await fetch("http://localhost:5678/api/works").then(
        (reponse) => {
          return reponse.json();
        }
      );
      return worksResults;
    }


// conditionnement token pour affichage de l'index "créateur"
if (token) {
  // on affiche les élements de base montrant que l'on peut éditer du contenu
  openModalBtn.style.display = "flex";
  editionBand.classList.remove("hidden");
  // on change le texte "login" en "logout"
  logLink.innerHTML = `logout`;

  /**
   * ajout du de l'event au click sur "logout"
   */
  logLink.addEventListener("click", function (event) {
    event.preventDefault();

    // on supprime le token stocké dans le local storage
    localStorage.removeItem("token");
    // on rechange le text en "login"
    logLink.innerHTML = `login`;
    // on se redirige vers la page login
    window.location.href = "/";
  });

  /**
   * création de la fonction click pour l'apparition de la modale
   */
  openModalBtn.addEventListener("click", function (event) {
    event.preventDefault();

    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal__content">
      <span class="modal__close--btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
        </svg></span>      
      <span class="modal__title">Galerie Photo</span>
      <div class="modal__gallery"></div>
      <button type="button" class="modal__btn">Ajouter une photo</button>
    </div>
    `;

    // récupération du bouton pour fermer la modal + ajout de l'eventListener
    let modalCloseBtn = document.querySelector(".modal__close--btn");
    const modalContent = document.querySelector(".modal__content");
    

    modalCloseBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.remove("modal");
      modalContent.remove();
    });

    /**
     *     Création des balises dédiées à chaque projet
     */
    let modalGallery = document.querySelector(".modal__gallery");

    function modalDisplayWork(work) {
      const projet = document.createElement("article");
      projet.classList.add("modal__box");

      projet.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}" />
      <button class="modal__work--btn" data-id="${work.id}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

      modalGallery.appendChild(projet);
    }

    async function modalInit() {
      // Affichage des projets
      const works = await getWorks();
      modalDisplayWorks(works);
      deleteWork();
    }

    modalInit();
  });

  /**
   * création du listener + action sur le bouton pour supprimer un travail dans la modale
   */
  function deleteWork() {
    let btnDelete = document.querySelectorAll(".modal__work--btn");

    for (i = 0; i < btnDelete.length; i++) {
      const id = btnDelete[i].getAttribute("data-id");
      btnDelete[i].addEventListener("click", () => deleteProjects(id));
    }
  }

  /**
   *
   */
  async function deleteProjects(projectIdToDelete) {
    await fetch(`http://localhost:5678/api/works/${projectIdToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      /// Supprimier visuellement le projet dans la modal
      const button = document.querySelector(
        `.modal__work--btn[data-id="${projectIdToDelete}"]`
      );
      const parent = button.closest(".modal__box");
      parent.remove();

      /// Supprimer visuellement le projet sur l'accueil
    });
  }
}




/**
 * <input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/>
<script>
  var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
</script>
 */
