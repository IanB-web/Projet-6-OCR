const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const error = document.querySelector(".error");

// récupération des balises html nécessaires au process
const loginForm = document.querySelector(".form");
const errorMsg = document.querySelector(".error");

// écoute de la modification de l'Email et du password
loginForm.email.addEventListener("keyup", displayCheckForm);
loginForm.password.addEventListener("keyup", displayCheckForm);

/**    ******** Validation EMAIL ************
 * 
 * Retourne vrai si l'email à un format correct, faux sinon
 */
function emailFormatIsValid(emailToCheck) {
  // creation de la reg[ulière] exp[ression] pour la validation email
  let regex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  
  return regex.test(emailToCheck);
}

/**    ******** Validation PASSWORD ************
 * 
 * Retourne vrai si le password a un format correct, faux sinon
 */
function passwordFormatIsValid(passwordToCheck) {
//     let regex = new RegExp(
//     "^[a-zA-Z]\w{3,8}$"
//   );
//   return regex.test(passwordToCheck);
  return true;
}

/**
 *  création listener login correct / incorrect
 */
function displayCheckForm() {
  if (
    !emailFormatIsValid(loginForm.email.value) ||
    !passwordFormatIsValid(loginForm.password.value)
  ) {
    // On affichera l'erreur
    errorMsg.textContent = "Identifiants incorrects";
    errorMsg.classList.add("error");
    return false;
  } else {
    errorMsg.textContent = "";
    errorMsg.classList.remove("error");
    return true;
  }
}

/**
 * initialisation des actions de validations/ou non du formulaire
 */
async function init() {
  // Vérification formulaire
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // récupération des champs du formulaire ( charge utile)
      const user = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };

      // Vérification du format
      if (!displayCheckForm()) {
        return;
      }

      // Envoi des données au serveur
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          // gestion d'erreur
          if (response.status != 200) {
            throw new Error("Une erreur est survenue");
          }

          return response.json();
        })
        .then((data) => {
          // stockage du token dans le local storage
          localStorage.setItem("token", data.token);

          // redirection vers la page d'acceuil
          window.location.href = "/";
        })
        .catch((error) => {
          errorMsg.textContent = "Identifiants incorrects";
          errorMsg.classList.add("error");

          localStorage.removeItem("token");
        });
    });
  }
}

init();

/**
 *  On a un formulaire de connexion (email / password)
 *  => On veux à la soumission du formulaire envoyer les données au serveur pour demander es-ce que l'utilisateur existe ?
 *  ===> Si oui alors le serveur retourne un token => on sauvegarde le token en localstorage
 *  ===> Si non, on affiche un message d'erreur à l'utilisateur dans un <p>
 *
 * => Pour éviter des requetes inutiles (mauvais format email / password)
 * ==> Pré-vérifier le format des données
 * ====> OK le format est correct, on envoi les données au serveur
 * ====> KO, le format est incorrect, on affiche un message d'erreur sans envoyer les données au serveur
 *
 *
 *
 * Lorsque soumission du formulaire
 * => Récupérer les données (email / password)
 * => Vérifie le format des données
 * ==> Soit le format est OK
 * ===> Envoi ces données via fetch (en post) au serveur (on utilise la route adéquate, /login avec le verbe POST)
 * ====> En fonction de la réponse du serveur
 * =====> 200: Soit sauvegarde du token en localStorage et redirige vers la page d'accueil
 * =====> Autre code: On affiche un message d'erreur
 * ==> Soit le format est mauvais : Affiche un message d'erreur
 *
 *
 */
