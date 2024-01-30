// définition des constantes récurentes

const token = localStorage.getItem("token");
const editionBand = document.querySelector(".edition");
const logLink = document.querySelector(".log");
const openModalBtn = document.querySelector(".change__btn");
const gallery = document.querySelector(".gallery");

/**
 * récupération de la fonction pour la réutiliser plus tard
 */
function displayWork(work) {
  // Création des balises dédiées à chaque projet
  const projet = document.createElement("article");
  projet.classList.add("projet__box");
  projet.setAttribute(`data-id`, `${work.id}`);

  projet.innerHTML = `
      <img src="${work.imageUrl}" alt="" />
      <p>${work.title}</p>
    `;

  gallery.appendChild(projet);
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
       * Parcours les travaux et les affiches dans la modale
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
    `;

        modalGallery.appendChild(project);
      }

      async function modal1Init() {
        // Affichage des projets
        const works = await getWorks();
        modalDisplayWorks(works);
        deleteWork();
        openModal2();
      }

      modal1Init();

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

    /**
     *    Création de la deuxième modale pour ajouter une projet
     */
    function openModal2() {
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
         <span class="modal__title title--add">Ajout Photo</span>

         <form class="modal__form">

               
                   
                    <input type="file" name="photo" id="photo" class="modal__form--img">
                    <img id="output" class="form__img--output"/>
                   <div class="input__elements"> <span class="input__svg"><svg xmlns="http://www.w3.org/2000/svg" width="70" height="61" viewBox="0 0 70 61" fill="none">
  <path d="M60.5517 6.88793C61.7228 6.88793 62.681 7.84612 62.681 9.01724V51.5768L62.0156 50.7118L43.9165 27.2894C43.3176 26.5042 42.3727 26.0517 41.3879 26.0517C40.4031 26.0517 39.4715 26.5042 38.8594 27.2894L27.8136 41.5824L23.7546 35.8998C23.1557 35.0614 22.1975 34.569 21.1595 34.569C20.1214 34.569 19.1632 35.0614 18.5644 35.9131L7.91783 50.8183L7.31896 51.6434V51.6034V9.01724C7.31896 7.84612 8.27715 6.88793 9.44827 6.88793H60.5517ZM9.44827 0.5C4.75048 0.5 0.93103 4.31945 0.93103 9.01724V51.6034C0.93103 56.3012 4.75048 60.1207 9.44827 60.1207H60.5517C65.2495 60.1207 69.069 56.3012 69.069 51.6034V9.01724C69.069 4.31945 65.2495 0.5 60.5517 0.5H9.44827ZM20.0948 26.0517C20.9337 26.0517 21.7644 25.8865 22.5394 25.5655C23.3144 25.2444 24.0186 24.7739 24.6118 24.1807C25.2049 23.5876 25.6755 22.8834 25.9965 22.1083C26.3175 21.3333 26.4828 20.5027 26.4828 19.6638C26.4828 18.8249 26.3175 17.9943 25.9965 17.2192C25.6755 16.4442 25.2049 15.74 24.6118 15.1468C24.0186 14.5537 23.3144 14.0831 22.5394 13.7621C21.7644 13.4411 20.9337 13.2759 20.0948 13.2759C19.2559 13.2759 18.4253 13.4411 17.6503 13.7621C16.8752 14.0831 16.171 14.5537 15.5779 15.1468C14.9847 15.74 14.5142 16.4442 14.1931 17.2192C13.8721 17.9943 13.7069 18.8249 13.7069 19.6638C13.7069 20.5027 13.8721 21.3333 14.1931 22.1083C14.5142 22.8834 14.9847 23.5876 15.5779 24.1807C16.171 24.7739 16.8752 25.2444 17.6503 25.5655C18.4253 25.8865 19.2559 26.0517 20.0948 26.0517Z" fill="#B9C5CC"/>
</svg></span>
                    <label for="photo" class="input__label">+ Ajouter une photo</label>
                    <span class="input__text">jpg, png : 4mo max</span>
</div>
                    <label for="js-title" class="form__title">Titre</label>
                    <input type="text" class="js-title" name="js-title" id="js-title">

                
                    <label for="category" class="form__title">Catégorie</label>
                    <select class="input__select form__categoryId" name="category" id="category">
                        <option value="1">Objets</option>
                        <option value="2">Appartements</option>
                        <option value="3">Hôtels & restaurants</option>
                    </select>
                

                    <button class="btn modal--btn">Valider</button>
         </form>

         </div>
         `;

        // définition pour lire le contenu de l'image chargée en conversion "string"
        const inputElements = document.querySelector(".input__elements")
        const loadFile = (event) => {
          var reader = new FileReader();
          reader.onload = () => {
            var output = document.getElementById("output");
            output.src = reader.result;
          };
          const file = event.target.files[0];
          if (file) {
            reader.readAsDataURL(file);
inputElements.innerHTML='';
          }
        };

        const inputNode = document.querySelector("#photo");
        const outputNode = document.querySelector("#output");
        inputNode.addEventListener("change", loadFile);
        outputNode.addEventListener("click", () => {
          inputNode.click();
        });

        const modalForm = document.querySelector(".modal__form");
        let title = document.querySelector(".js-title");

        /**
         *  Ajouter un projet
         */

        async function addWork(event) {
          // Vérification formulaire
          modalForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            let titleValue = title.value;
            let categoryId = document.querySelector(".form__categoryId").value;
            let image = document.querySelector(".modal__form--img").files[0];

            /**
             *  création listener formulaire correct / incorrect
             */
            function displayCheckForm() {
              /// add evenlistener change pour le titre
              if (titleValue === "" || categoryId === "") {
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

            // récupération des champs du formulaire ( charge utile)
            const formData = new FormData();
            formData.append("title", titleValue);
            formData.append("category", categoryId);
            formData.append("image", image);

            // Vérification du format
            if (!displayCheckForm()) {
              return;
            } else {
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
                  if (response.status != 201) {
                    throw new Error("Une erreur est survenue");
                  }

                  return response.json();
                })
                .then((work) => {
                  displayWork(work);
                })
                .then(() => {
                  openModal1();
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        }
        /**
         *  Ajout de la fonctionnalité de retour à la modale 1 avec la fleche
         */
        function getBack() {
          // ajout de la fonctionnalité pour revenir à la modale 1
          const returnBtn = document.querySelector(".modal__return");
          returnBtn.addEventListener("click", function (event) {
            event.preventDefault();
            openModal1();
          });
        }

        function modal2Init() {
          closeModal();
          addWork();
          getBack();
        }

        modal2Init();
      });
    }
  });
}
