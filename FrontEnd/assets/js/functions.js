const galleryNode = document.querySelector(".gallery");

/**
 * récupérer les données de la route /api/works
 */
async function getWorks() {
  const results = await fetch("http://localhost:5678/api/works").then(
    (reponse) => {
      return reponse.json();
    }
  );
  console.log(results);
  return results;
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
 *
 */
async function init() {
  const works = await getWorks();
  displayWorks(works);

  // Affichage des catégories à rajouter
}

init();

/**
 * TODO :
 * - Faire pareil pour afficher les boutons de filtres catégories
 */
