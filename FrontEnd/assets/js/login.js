const loginForm = document.querySelector(".form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const error = document.querySelector(".error");

// écoute de la modification de l'Email
loginForm.email.addEventListener("change", function () {
  validEmail(this);
});

// ******** Validation EMAIL ************
const validEmail = function (inputEmail) {
  // creation de la reg[ulière] exp[ression] pour la validation email
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  // récupéraction de la balise <small>
  let small = inputEmail.nextElementSibling;
  // on teste l'expression régulière
  let testEmail = emailRegExp.test(inputEmail.value);
  if (testEmail) {
    small.innerHTML = "Format Email valide";
    small.classList.add("valid");
    small.classList.remove("error");
  } else {
    small.innerHTML = "Format Email non valide";
    small.classList.remove("valid");
    small.classList.add("error");
  }
};

// action du bouton d'envoi du formulaire
// loginForm.addEventListener("submit", function (e) {
//   let passwordInput = document.getElementById("password");

//   if (emailInput.value.trim() == "") {
//     error.innerHTML = "Le champ email est requis.";
//     e.preventDefault();
//   } else if (passwordInput.value.trim() == "") {
//     error.innerHTML = "Le champ mot de passe est requis.";
//     e.preventDefault();
//   } else {
//     loginForm.submit();
//   }
// });

// création listener login

// création de la fonction pour se déconnecter
function deconnect() {
  const logLink = document.querySelector(".log");

  if (logLink) {
    // vérification si le token est déjà stocké dans le local storage
    if (localStorage.getItem("token")) {
      // si le token est présent on change le texte en "logout"
      logLink.textContent = "logout";

      // ajout du de l'event au click sur "logout"
      logLink.addEventListener("click", function (event) {
        event.preventDefault();

        // on supprime le token stocké dans le local storage
        localStorage.removeItem("token");

        // on se redirige vers la page login
        window.location.href = "login.html";
      });
    }
  }
}

async function logCheck() {
  // récupération des balises html nécessaires au process
  const loginForm = document.querySelector(".form");
  const errorMsg = document.querySelector(".error");

  // Vérification formulaire
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // récupération des champs du formulaire ( charge utile)
      const user = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };

      try {
        // appel de la fonction fetch avec les valeurs remplies
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        // vérification de la réponse
        if (response.status === 401) {
          errorMsg.textContent = "Mot de passe incorrect.";
          errorMsg.classList.add("error");
        } else if (response.status === 404) {
          errorMsg.textContent = "Erreur, utilisateur inconu.";
          errorMsg.classList.add("error");
        } else if (response.ok) {
          // si la réponse est réussie, on récupère les données en JSON
          const result = await response.json();

          // on vérifie ensuite le token
          if (result && result.token) {
            // stockage du token dans le local storage
            localStorage.setItem("token", result.token);

            // redirection vers la page d'acceuil
            window.location.href = "http://127.0.0.1:5501/index.html";

            // changement du texte du lien une fois connecté
            deconnect();
          }
        }
      } catch (error) {
        // message en cas d'erreurs de requetes ou de connection
        console.error("Erreur lors de la requête d'authentification", error);
      }
    });
  }
}

logCheck();
