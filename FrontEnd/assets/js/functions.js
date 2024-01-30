const galleryNode = document.querySelector(".gallery");
const filtersNode = document.querySelector(".filters");

/**
 * récupérer les données de la route /api/works
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
 * récupérer les données de la route /api/categories
 */
async function getFilters() {
  const filtersResults = await fetch(
    "http://localhost:5678/api/categories"
  ).then((reponse) => {
    return reponse.json();
  });
  return filtersResults;
}

function resetDisplayWorks() {
  galleryNode.innerHTML = "";
}

/**
 * Parcours les travaux et les affiches dans le DOM
 */
function displayWorks(works) {
  // on réinitialise la galerie des projets
  resetDisplayWorks();

  // on parcours la liste des projets, et on on les affiches dans le DOM
  for (let i = 0; i < works.length; i++) {
    displayWork(works[i]);
  }

  //works.forEach(work => displayWork(work))
}

function displayWork(work) {
  // Création des balises dédiées à chaque projet
  const projet = document.createElement("article");
  projet.classList.add("projet__box");
  projet.setAttribute(`data-id`, `${work.id}`);

  projet.innerHTML = `
      <img src="${work.imageUrl}" alt="" />
      <p>${work.title}</p>
    `;

  galleryNode.appendChild(projet);
}

/**
 * Parcours les filtres et les affiches dans le DOM
 */
function displayFilters(dataFilters) {
  for (let i = 0; i < dataFilters.length; i++) {
    // Création des balises dédiées à chaque projet
    const filter = document.createElement("button");
    filter.setAttribute("type", "button");
    filter.classList.add("btn");
    filter.setAttribute("data-id", dataFilters[i].id);

    filter.innerHTML = `
    ${dataFilters[i].name}
    `;

    filtersNode.appendChild(filter);
  }
}

/**
 *
 */
async function init() {
  // Affichage des projets
  const works = await getWorks();
  displayWorks(works);

  // Affichage des filtres
  const filters = await getFilters();
  displayFilters(filters);

  const filtersBtns = document.querySelectorAll(".filters .btn");
  filtersBtns.forEach((button) => {
    button.addEventListener("click", async () => {
      // on défini un id pour chaque bouton
      const id = button.getAttribute("data-id");

      // on récupère la liste des projets via la fonction getworks
      const list = await getWorks();

      /*
      const projects = [];

      list.forEach((project) => {
        const categoryId = project.categoryId;

        if (id == -1 || categoryId == id) {
          projects.push(project);
        }
      });
      */

      const newList = list.filter(
        (project) => id === "0" || project.category.id === parseInt(id)
      );

      displayWorks(newList);

      // Ajoute la classe active lorsque l'on clique sur le bouton et l'enleve sur les autres boutons
      
      document.querySelectorAll(".filters .btn").forEach(button => {
      button.classList.remove("btn__active");})

      button.classList.add("btn__active");
    });
  });
}

init();
