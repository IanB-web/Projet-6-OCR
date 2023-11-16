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
  console.log(worksResults);
  return worksResults;
}

/**
 * récupérer les données de la route /api/categories
 */
async function getFilters() {
  const filtersResults = await fetch("http://localhost:5678/api/categories").then(
    (reponse) => {
      return reponse.json();
    }
  );
  console.log(filtersResults);
  return filtersResults;
}

/**
 * Parcours les travaux et les affiches dans le DOM
 */
function displayWorks(dataWorks) {
  for (let i = 0; i < dataWorks.length; i++) {
    // Création des balises dédiées à chaque projet
    const projet = document.createElement("article");
    projet.classList.add("projet__box");

    projet.innerHTML = `
      <img src="${dataWorks[i].imageUrl}" alt="" />
      <p>${dataWorks[i].title}</p>
    `;

    galleryNode.appendChild(projet);
  }
}

/**
 * Parcours les filtres et les affiches dans le DOM
 */
function displayFilters(dataFilters) {
  for (let i = 0; i < dataFilters.length; i++) {
    // Création des balises dédiées à chaque projet
    const filter = document.createElement("button");
    filter.setAttribute ("type","button")
    filter.classList.add("btn");
    filter.classList.add(`filter${dataFilters[i].id}`)

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
}

init();


