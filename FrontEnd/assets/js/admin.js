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
   * Création d'une fonction pour fermer la modale
   */
  function closeModal() {
    // récupération du bouton pour fermer la modal + ajout de l'eventListener
    let modalCloseBtn = document.querySelector(".modal__close--btn");
    const modalContent = document.querySelector(".modal__content");

    modalCloseBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.remove("modal");
      modalContent.remove();
    });
  }
  /**
   * création de la fonction click pour l'apparition de la modale
   */

  /**
   * Création d'une fonction pour fermer la modale
   */
  function closeModal() {
    // récupération du bouton pour fermer la modal + ajout de l'eventListener
    let modalCloseBtn = document.querySelector(".modal__close--btn");
    const modalContent = document.querySelector(".modal__content");

    modalCloseBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.classList.remove("modal");
      modalContent.remove();
    });
  }
  /**
   * création de la fonction click pour l'apparition de la modale
   */

  openModalBtn.addEventListener("click", function (event) {
    event.preventDefault();
    function openModal1() {
      modal.classList.add("modal");
      modal.innerHTML = `
    <div class="modal__content">
      <span class="modal__close--btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
        </svg></span>      
      <span class="modal__title">Galerie Photo</span>
      <div class="modal__gallery"></div>
      <button type="button" class="modal__add--btn">Ajouter une photo</button>
    </div>
    `;
      // ajout de la fonction pour pouvoir fermer la modale
      closeModal();

      /**
       *     Création des balises dédiées à chaque projet
       */
      let modalGallery = document.querySelector(".modal__gallery");

      /**
       * Parcours les travaux et les affiches dans le DOM
       */
      function modalDisplayWorks(works) {
        // on parcours la liste des projets, et on on les affiches dans le DOM
        for (let i = 0; i < works.length; i++) {
          modalDisplayWork(works[i]);
        }
      }

      function modalDisplayWork(work) {
        const project = document.createElement("article");
        project.classList.add("modal__box");
    event.preventDefault();
    function openModal1() {
      modal.classList.add("modal");
      modal.innerHTML = `
    <div class="modal__content">
      <span class="modal__close--btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
        </svg></span>      
      <span class="modal__title">Galerie Photo</span>
      <div class="modal__gallery"></div>
      <button type="button" class="modal__add--btn">Ajouter une photo</button>
    </div>
    `;
      // ajout de la fonction pour pouvoir fermer la modale
      closeModal();

      /**
       *     Création des balises dédiées à chaque projet
       */
      let modalGallery = document.querySelector(".modal__gallery");

      /**
       * Parcours les travaux et les affiches dans le DOM
       */
      function modalDisplayWorks(works) {
        // on parcours la liste des projets, et on on les affiches dans le DOM
        for (let i = 0; i < works.length; i++) {
          modalDisplayWork(works[i]);
        }
      }

      function modalDisplayWork(work) {
        const project = document.createElement("article");
        project.classList.add("modal__box");
        
        project.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}" />
      <button class="modal__work--btn" data-id="${work.id}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <button class="modal__work--btn" data-id="${work.id}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

        modalGallery.appendChild(project);
      }
        modalGallery.appendChild(project);
      }

      async function modalInit() {
        // Affichage des projets
        const works = await getWorks();
        modalDisplayWorks(works);
        deleteWork();
      }
      async function modalInit() {
        // Affichage des projets
        const works = await getWorks();
        modalDisplayWorks(works);
        deleteWork();
      }

      modalInit();
      modalInit();

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
       * Fonction pour supprimer un projet de l'API + du site web
       */
      async function deleteProjects(projectIdToDelete) {
        await fetch(`http://localhost:5678/api/works/${projectIdToDelete}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log(response);

          // Supprimer visuellement le projet dans la modal
          const button = document.querySelector(
            `.modal__work--btn[data-id="${projectIdToDelete}"]`
          );
          const parent = button.closest(".modal__box");
          parent.remove();

          /// Supprimer visuellement le projet sur l'accueil
          const project = document.querySelector(
            `.projet__box[data-id="${projectIdToDelete}"]`
          );
          project.remove();
        });
      }
    }
    openModal1();

    const loadFile = (event) => {
      var reader = new FileReader();
      reader.onload = () => {
        var output = document.getElementById("output");
        console.log(reader.result);
        output.src = reader.result;
      };
      const file = event.target.files[0];
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    /**
     *    Création de la deuxième modale pour ajouter une projet
     */
    const addProjectBtn = document.querySelector(".modal__add--btn");
    addProjectBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.innerHTML = `
      <div class="modal__content">
         
         <span class="modal__close--btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  fill="none">
         <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
         </svg></span>
         <span href="" class="modal__return">
         <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
         <path d="M0.439478 8.94458C-0.146493 9.53055 -0.146493 10.4822 0.439478 11.0681L7.9399 18.5686C8.52587 19.1545 9.47748 19.1545 10.0635 18.5686C10.6494 17.9826 10.6494 17.031 10.0635 16.445L5.11786 11.5041H19.4999C20.3297 11.5041 21 10.8338 21 10.004C21 9.17428 20.3297 8.50393 19.4999 8.50393H5.12255L10.0588 3.56303C10.6447 2.97706 10.6447 2.02545 10.0588 1.43948C9.47279 0.853507 8.52118 0.853507 7.93521 1.43948L0.43479 8.9399L0.439478 8.94458Z" fill="black"/>
         </svg>
			</span>      
         <span class="modal__title">Ajout Photo</span>
         <form class="modal__form">
         <input type="file" accept="image/*" id="inputTest" class="modal__form--img">
         <img id="output" class="form__img--output"/>

                  <label for="title" class="form__title">Titre</label>
          <input type="text" name="title" id="title" />
          <div class="form__category">
				<label for="category">Catégorie</label>
				<select class="input__select form__categoryId" name="category" id="category">
					<option value="1">Objets</option>
					<option value="2">Appartements</option>
					<option value="3">Hôtels & restaurants</option>
				</select>
			</div>
         <input type="submit" value="Valider" class="btn modal--btn"/>
         </form>

         </div>
         `;

      const inputNode = document.querySelector("#inputTest");
      const outputNode = document.querySelector("#output");
      inputNode.addEventListener("change", loadFile);
      outputNode.addEventListener("click", () => {
        inputNode.click();
      });

      const modalForm = document.querySelector(".modal__form");

      // ajout de la fonctionnalité permettant de fermer la modale
      closeModal();

      // ajout de la fonctionnalité permettant l'ajout d'un projet
      addWork();
      // ajout de la fonctionnalité pour revenir à la modale 1
      const returnBtn = document.querySelector(".modal__return");
      returnBtn.addEventListener("click", function (event) {
        event.preventDefault();
        openModal1();
      });
 

      /**
       *  création listener formulaire correct / incorrect
       */
      function displayCheckForm() {
        const title = document.getElementById("title").value;
        const categoryId = document.querySelector(".form__categoryId").value;
        const image = document.querySelector(".modal__form--img").files[0];
        
        if (title === "" || categoryId === "" || image === undefined) {
          alert("Merci de remplir tous les champs");
          return;
        } else if (
          categoryId !== "1" &&
          categoryId !== "2" &&
          categoryId !== "3"
        ) {
          alert("Merci de choisir une catégorie valide");
          return;
        } else return true;
      }

      /**
       *  Ajouter un projet
       */

      async function addWork() {
      

        // Vérification formulaire
        modalForm.addEventListener("submit", async function (event) {
          event.preventDefault();
     
          const title = document.querySelector("#title").value;
          const categoryId = document.querySelector(".form__categoryId").value;



          let image = output.src;
          console.log(outputNode.src);


          // récupération des champs du formulaire ( charge utile)
          const formData = new FormData();
          formData.append("title", title);
          formData.append("category", categoryId);
          formData.append("image", image);

          // Vérification du format
          if (!displayCheckForm()) {
            return;
          }

          // Envoi des données au serveur
          const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
            .then((response) => {
              // gestion d'erreur
              if (response.status != 200) {
                throw new Error("Une erreur est survenue");
              }

              return response.json();
            })
            .then((work) => {
              console.log(work);
              modalDisplayWork(work);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    });
  });
}
