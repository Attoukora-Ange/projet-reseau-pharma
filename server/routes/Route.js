const {
  POST_INSCRIPTION,
  POST_CONNEXION,
  GET_VERIFICATION,
  POST_DECONNEXION,
  PUT_MODIFIER_UTILISATEUR,
  POST_REINITIALISER_CODE,
  POST_CODE_REINITIALISE,
  PUT_MODIFIER_MOT_PASSE,
  DELETE_UTILISATEUR,
  GET_VISITEUR,
  GET_LISTE_UTILISATEUR,
  PUT_COUVERTURE_UTILISATEUR,
  PUT_PHOTO_UTILISATEUR,
  POST_POSTER,
  DELETE_INVITER_AMIS,
  PUT_INVITER_AMIS,
  PUT_INVITER_AMIS_ACCEPTER,
  DELETE_INVITER_AMIS_REFUSER,
  PUT_SUIVIE_UTILISATEUR,
  DELETE_SUIVIE_UTILISATEUR,
  DELETE_AMI,
  PUT_POSTER_LIKES,
  GET_LISTE_POSTER,
  PUT_POSTER_COMMENTAIRE,
  PUT_POSTER_UNLIKES,
  DELETE_POST_POSTER,
  DELETE_POSTER_COMMENTAIRE,
  GET_UTILISATEUR_CONNECTER,
} = require("../controllers/Controller");
const { body } = require("express-validator");
const { verifieToken, verifieTokenJWT } = require("../controllers/createJwt");
const multer = require("multer");
const ROUTE = require("express").Router();

//Fonction de stockage de fichier
const STOCKAGE = (chemin) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `../client/public/assets/${chemin}`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname.split(" ").join("_"));
    },
  });
};
const UPLOAD_COUVERTURE = multer({ storage: STOCKAGE("couverture") });
const UPLOAD_PROFIL = multer({ storage: STOCKAGE("profil") });
const UPLOAD_POST = multer({ storage: STOCKAGE("post") });

//GET
ROUTE.get("/jwt", verifieTokenJWT);
ROUTE.get("/visiteur", verifieToken, GET_VISITEUR);
ROUTE.get("/liste/utilisateur", verifieToken, GET_LISTE_UTILISATEUR);
ROUTE.get("/verification", GET_VERIFICATION);
ROUTE.get("/liste/poster", verifieToken, GET_LISTE_POSTER);
ROUTE.get("/utilisateur/connecter", verifieToken, GET_UTILISATEUR_CONNECTER);

//POST
ROUTE.post(
  "/connexion",
  body("password")
    .isLength({ min: 6 })
    .withMessage("Au moins 6 caractères pour le mot de passe"),
  body("email").isEmail().withMessage("Seulement email valide"),
  POST_CONNEXION
);

ROUTE.post(
  "/inscription",
  body("nom")
    .isLength({ min: 3, max: 55 })
    .withMessage("Au moins 3 a 55 caractères au plus 55 pour le nom"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Au moins 6 caractères pour le mot de passe"),
  body("passwordConfirme")
    .isLength({ min: 6 })
    .withMessage("Au moins 6 caractères pour la confirmation mot de passe"),
  body("email").isEmail().withMessage("Seulement email valide"),
  POST_INSCRIPTION
);

ROUTE.post(
  "/password/code/genere",
  body("emailReinitialisation")
    .trim()
    .isEmail()
    .withMessage("Seulement email valide"),
  POST_REINITIALISER_CODE
);

ROUTE.post(
  "/password/code/reinitialiser",
  body("emailReinitialisation")
    .trim()
    .isEmail()
    .withMessage("Seulement email valide"),
  POST_CODE_REINITIALISE
);

ROUTE.get("/deconnexion", POST_DECONNEXION);

ROUTE.post(
  "/post",
  verifieToken,
  UPLOAD_POST.single("post_image"),
  body("post_texte")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Au moins 1 a 255 caractères au plus 55 pour le nom"),
  POST_POSTER
);

//PUT
ROUTE.put("/inviter/amis/:id_amis", verifieToken, PUT_INVITER_AMIS);
ROUTE.put("/suivre/utilisateur/:id_amis", verifieToken, PUT_SUIVIE_UTILISATEUR);
ROUTE.put(
  "/inviter/amis/accepter/:id_amis",
  verifieToken,
  PUT_INVITER_AMIS_ACCEPTER
);
ROUTE.put(
 
  body("nom")
    .trim()
    .isLength({ min: 3, max: 55 })
    .withMessage("Au moins 3 a 55 caractères au plus 55 pour le nom"),
  body("naissance")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Le format de date est invalide"),
  body("numero")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Le numéro doit avoir 10 chiffres"),
  body("email").trim().isEmail().withMessage("Seulement email valide"),
  body("ville")
    .trim()
    .isLength()
    .withMessage("Au moins 3 caractères pour la ville"),
  body("matrimoniale")
    .trim()
    .isLength()
    .withMessage("Au moins 3 caractères pour la situation matrimoniale"),
  body("profession")
    .trim()
    .isLength()
    .withMessage("Au moins 3 caractères pour la profession"),
  body("contactParent")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Le contact parenet doit avoir 10 chiffres"),
  verifieToken,
  PUT_MODIFIER_UTILISATEUR
);


ROUTE.put(
  "/modifier/password",
  body("ancienPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Au moins 6 caractères pour l'ancien mot de passe"),
  body("nouveauPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Au moins 6 caractères pour le nouveau mot de passe"),
  body("confirmeNouveauPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Au moins 6 caractères pour la confirmation mot de passe"),
  verifieToken,
  PUT_MODIFIER_MOT_PASSE
);

ROUTE.put(
  "/modifier/profil/photo",
  verifieToken,
  UPLOAD_PROFIL.single("photo_profil"),
  PUT_PHOTO_UTILISATEUR
);

ROUTE.put(
  "/modifier/profil/couverture",
  verifieToken,
  UPLOAD_COUVERTURE.single("photo_couverture"),
  PUT_COUVERTURE_UTILISATEUR
);

ROUTE.put("/post/like/:id_post", verifieToken, PUT_POSTER_LIKES);
ROUTE.put("/post/unlike/:id_post", verifieToken, PUT_POSTER_UNLIKES);
ROUTE.put(
  "/post/commentaire/:id_post",
  verifieToken,
  body("postCommentaire")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Au moins 1 a 255 caractères au plus 55 pour le nom"),
  PUT_POSTER_COMMENTAIRE
);

//DELETE
ROUTE.delete(
  "/inviter/amis/refuser/:id_amis",
  verifieToken,
  DELETE_INVITER_AMIS_REFUSER
);
ROUTE.delete("/retirer/amis/:id_amis", verifieToken, DELETE_AMI);
ROUTE.delete(
  "/retirer/inviter/amis/:id_amis",
  verifieToken,
  DELETE_INVITER_AMIS
);
ROUTE.delete(
  "/retirer/suivie/utilisateur/:id_amis",
  verifieToken,
  DELETE_SUIVIE_UTILISATEUR
);
ROUTE.delete("/supprimer/utilisateur/:id", verifieToken, DELETE_UTILISATEUR);

ROUTE.delete("/post/supprimer/:id_post", verifieToken, DELETE_POST_POSTER);
ROUTE.put(
  "/supprimer/post/commentaire/:id_post",
  verifieToken,
  body("postCommentaireId"),
  DELETE_POSTER_COMMENTAIRE
);

module.exports = ROUTE;
