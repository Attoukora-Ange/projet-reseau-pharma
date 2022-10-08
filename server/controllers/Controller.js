const UTILISATEUR = require("../models/Utilisateur");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const EnvoiEmail = require("./EnvoiEmail");
const { createToken } = require("./createJwt");
const Visiteur = require("../models/Visiteur");
const POSTER_UTILISATEUR = require("../models/Post");

// Constant de nodemailler
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILLER_EMAIL,
    pass: process.env.NODE_MAILLER_PASS,
  },
});

//Envoi de mail INSCRIPTION
const MAIL_OPTIONS = (nom, email, verify) => {
  return {
    from: process.env.NODE_MAILLER_EMAIL,
    to: email,
    subject: "Confirmation d'inscription", // Subject line
    html: `<h2>Bonjour ${nom}, vous êtes déja inscrit.</h2>
    <h3>Pour activer votre compte sur le RESEAU SOCIAL DE PHARMA 36,
    veuillez cliquer sur ce lien:
    <br/>
    <a target='_' href='${process.env.DOMAINE}/activation/verification/${verify}'> CLICK ICI POUR ACTIVER LE COMPTE </a></p>
    </h3>`,
    //   <a target='_' href='${process.env.DOMAINE}'> CLICK ICI POUR ACTIVER LE COMPTE </a></p>
  };
};
//Envoi de mail REINITIALISATION
const MAIL_OPTION_2 = (nom, email, passeGenere) => {
  return {
    from: process.env.NODE_MAILLER_EMAIL,
    to: email,
    subject: "Réinitialisation de mot de passe",
    html: `<h3>Bonjour ${nom}, pour réinitialiser votre mot de passe du RESEAU SOCIAL DE PHARMA 36,
     veuillez entrer ce code : ${passeGenere}`,
  };
};

//Controller Obtenir le nombre de visiteur
module.exports.GET_VISITEUR = async (req, res) => {
  try {
    const Visiteurs = await Visiteur.find();
    Visiteurs.forEach((visite) => {
      if (visite == "")
        return res.status(403).json({
          VISITEUR_TROUVER: "Aucun visiteur trouvé sur le site",
        });
    });
    return res.status(200).json({
      VISITEUR_TROUVER: Visiteurs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'obtention de visiteur`,
    });
  }
};

//Controller Obtenir la liste des utilusateurs en triant
module.exports.GET_LISTE_UTILISATEUR = async (req, res) => {
  try {
    const LISTE_UTILISATEURS = await UTILISATEUR.find().sort({ nom: 1 });
    LISTE_UTILISATEURS.forEach((Utilisateur) => {
      if (Utilisateur == "")
        return res.status(403).json({
          UTILISATEUR_TROUVER: "Aucun utilisateur trouvé",
        });
      Utilisateur.password = ""; //Vider le contenu de password
      Utilisateur.verification = ""; //Vider le contenu de la verification
      Utilisateur.PasseGenere = ""; //Vider le contenu de passeGene
    });
    console.log(LISTE_UTILISATEURS)
    return res.status(200).json({
       LISTE_UTILISATEURS
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'obtention de la liste des utilisateurs`,
    });
  }
};

//Modifier la photo de couverture d'un utilisateur
module.exports.PUT_COUVERTURE_UTILISATEUR = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;

  if (!req.file || req.file === undefined)
    return res.status(400).json({
      FICHIER_COUVERTURE_MODIFIER_ECHEC: "Aucun fichier à ajouter",
    });
  const FICHIER_PROFIL_COUVERTURE = req.file;

  if (
    FICHIER_PROFIL_COUVERTURE.mimetype != "image/gif" &&
    FICHIER_PROFIL_COUVERTURE.mimetype != "image/jpeg" &&
    FICHIER_PROFIL_COUVERTURE.mimetype != "image/png"
  )
    return res.status(400).json({
      FICHIER_PROFIL_COUVERTURE_FORMAT:
        "Format invalide car le fichier doit être des images ou photos de type gif, jpeg, jpg ou png ",
    });
  try {
     await UTILISATEUR.findByIdAndUpdate(
      ID_UTILISATEUR,
      {
        photo_couverture: FICHIER_PROFIL_COUVERTURE.filename,
      }
    );
    const UTILISATEUR_MODIFIER_COUVERTURE = await UTILISATEUR.findById(ID_UTILISATEUR)
    if (UTILISATEUR_MODIFIER_COUVERTURE){
      console.log("Fichier sauvegardé avec succes")
      return res.status(200).json({
        UTILISATEUR_MODIFIER_COUVERTURE
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de lenregistrement du fichier document`,
    });
  }
};

//Modifier la photo de profil d'un utilisateur
module.exports.PUT_PHOTO_UTILISATEUR = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;

  if (!req.file || req.file === undefined)
    return res.status(400).json({
      FICHIER_PROFIL_MODIFIER_ECHEC: "Aucun fichier à ajouter",
    });
  const FICHIER_PROFIL_PHOTO = req.file;

  if (
    FICHIER_PROFIL_PHOTO.mimetype != "image/gif" &&
    FICHIER_PROFIL_PHOTO.mimetype != "image/jpeg" &&
    FICHIER_PROFIL_PHOTO.mimetype != "image/png"
  )
    return res.status(400).json({
      FICHIER_PROFIL_PHOTO_FORMAT:
        "Format invalide car le fichier doit être de type image ou photo",
    });
  try {
     await UTILISATEUR.findByIdAndUpdate(
      ID_UTILISATEUR,
      {
        photo: FICHIER_PROFIL_PHOTO.filename,
      }
    );
      const UTILISATEUR_PHOTO = await UTILISATEUR.findById(ID_UTILISATEUR)

    if (UTILISATEUR_PHOTO){
      console.log("Fichier sauvegardé avec succes") 
        return res.status(200).json({
          UTILISATEUR_PHOTO
        });

    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'enregistrement de la photo de profile`,
    });
  }
};

// Partie refuser une invitation
module.exports.DELETE_INVITER_AMIS_REFUSER = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_AMIS = req.params.id_amis;

  try {
    const UTILISATEUR_EXISTE_AMIS = await UTILISATEUR.findById(ID_AMIS);
    if (!UTILISATEUR_EXISTE_AMIS)
    return res.status(200).json({
        UTILISATEUR_AMIS_INEXISTANT: `Cet utilisateur ${ID_AMIS} n'est pas inscrire`,
      });

    // const UTILISATEUR_SUGGESTION_AMIS = await UTILISATEUR.findOne({
    //   suggestions: 
    //     {
    //       id: ID_AMIS,
    //     photo: UTILISATEUR_EXISTE_AMIS.photo,
    //     nom:UTILISATEUR_EXISTE_AMIS.nom
    //   },
    // });
    // if (UTILISATEUR_SUGGESTION_AMIS == null)
    //   return res.status(200).json({
    //     UTILISATEUR_SUGGESTION_VIDE: `Aucun utilisateur dans votre liste de suggestion`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { suggestions: ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $pull: { attenteAmis: ID_UTILISATEUR },
    });

    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);

    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};

// Partie retirer un amie
module.exports.DELETE_AMI = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_AMIS = req.params.id_amis;
  try {
    const UTILISATEUR_EXISTE_AMIS = await UTILISATEUR.findById(ID_AMIS);
    if (!UTILISATEUR_EXISTE_AMIS)
      return res.status(200).json({
        UTILISATEUR_AMIS_INEXISTANT: `Cet utilisateur ${ID_AMIS} n'est pas inscrire`,
      });

    // const UTILISATEUR_AMIS = await UTILISATEUR.findOne(
    //   { amis: 
    //   {
    //   id: ID_AMIS,
    //   photo: UTILISATEUR_EXISTE_AMIS.photo,
    //   nom: UTILISATEUR_EXISTE_AMIS.nom
    // }  });
    // if (UTILISATEUR_AMIS == null)
    //   return res.status(200).json({
    //     UTILISATEUR_SUGGESTION_VIDE: `Aucun ami dans votre liste d'ami'`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { amis:ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $pull: { amis: ID_UTILISATEUR },
    });

    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);

    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};

//Partie accepter une invitation
module.exports.PUT_INVITER_AMIS_ACCEPTER = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_AMIS = req.params.id_amis;

  try {
    const UTILISATEUR_EXISTE_AMIS = await UTILISATEUR.findById(ID_AMIS);
    if (!UTILISATEUR_EXISTE_AMIS)
      return res.status(200).json({
        UTILISATEUR_AMIS_INEXISTANT: `Cet utilisateur ${ID_AMIS} n'est pas inscrire`,
      });

    // const UTILISATEUR_ACCEPTER_AMIS = await UTILISATEUR.findOne({
    //   amis: {
    //     id: ID_AMIS,
    //     photo: UTILISATEUR_EXISTE_AMIS.photo,
    //     nom:UTILISATEUR_EXISTE_AMIS.nom
    //   },
    // });
  
    // if (UTILISATEUR_ACCEPTER_AMIS)
    //   return res.status(200).json({
    //     UTILISATEUR_AJOUTER_EXISTANT: `Cet utilisateur ${ID_AMIS} existe deja dans votre liste d'amis`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $push: { amis: ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $push: { amis: ID_UTILISATEUR },
    });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { attenteAmis: ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { suggestions: ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $pull: { suggestions: ID_UTILISATEUR },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $pull: { attenteAmis: ID_UTILISATEUR },
    });

    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);

    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};

//Partie envoyer une invitation
module.exports.PUT_INVITER_AMIS = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_AMIS = req.params.id_amis;
 
  try {
    const UTILISATEUR_EXISTE_AMIS = await UTILISATEUR.findById(ID_AMIS);
    if (!UTILISATEUR_EXISTE_AMIS)
      return res.status(200).json({
        UTILISATEUR_AMIS_INEXISTANT: `Cet utilisateur ${ID_AMIS} n'est pas inscrire`,
      });

    // const UTILISATEUR_AJOUTER_AMIS = await UTILISATEUR.findOne({
    //   attenteAmis: {
    //     id: ID_AMIS,
    //     photo: UTILISATEUR_EXISTE_AMIS.photo,
    //     nom: UTILISATEUR_EXISTE_AMIS.nom
    //   },
    // });
    // if (UTILISATEUR_AJOUTER_AMIS)
    //   return res.status(200).json({
    //     UTILISATEUR_AJOUTER_EXISTANT: `Cet utilisateur ${ID_AMIS} existe deja dans votre liste d'attente`,
    //   });

    // const UTILISATEUR_AMIS_EXISTE = await UTILISATEUR.findOne({
    //   amis: {
    //     id: ID_AMIS,
    //     photo: UTILISATEUR_EXISTE_AMIS.photo,
    //     nom: UTILISATEUR_EXISTE_AMIS.nom
    //    },
    // });
    // console.log({
    //   UTILISATEUR_AMIS_EXISTE
    //  });
    // if (UTILISATEUR_AMIS_EXISTE)
    //   return res.status(200).json({
    //     UTILISATEUR_AMIS_EXISTE: `vous êtes déja amis avec cet utilisateur ${ID_AMIS}`,
    //   });

    if(ID_UTILISATEUR == ID_AMIS)  return res.status(203).json(ERREUR = 'Vous ne pouvez pas vous inviter');

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $push: { attenteAmis: ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $push: { suggestions:  ID_UTILISATEUR  },
    });

    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);

    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};
//Partie s'abonner a un utilisateur
module.exports.PUT_SUIVIE_UTILISATEUR = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_SUIVIE = req.params.id_amis;
  try {
    const UTILISATEUR_EXISTE_SUIVIE = await UTILISATEUR.findById(ID_SUIVIE);
    if (!UTILISATEUR_EXISTE_SUIVIE)
      return res.status(200).json({
        UTILISATEUR_SUIVIE_INEXISTANT: `Cet utilisateur ${ID_SUIVIE} n'est pas inscrire`,
      });

    // const UTILISATEUR_AJOUTER_SUIVIE = await UTILISATEUR.findOne({
    //   suivies: {
    //     id : ID_SUIVIE,
    //     photo: UTILISATEUR_EXISTE_SUIVIE.photo,
    //     nom: UTILISATEUR_EXISTE_SUIVIE.nom,
    //   },
    // });
    // console.log(UTILISATEUR_AJOUTER_SUIVIE)
    // if (UTILISATEUR_AJOUTER_SUIVIE)
    //   return res.status(200).json({
    //     UTILISATEUR_AJOUTER_SUIVIE_EXISTANT: `Cet utilisateur ${ID_SUIVIE} existe déjà dans votre liste de personne à suivre`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $push: { suivies: ID_SUIVIE },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_SUIVIE, {
      $push: { abonnes: ID_UTILISATEUR}
    });

    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);

    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};

//Partie retirer une invitation envoyé
module.exports.DELETE_INVITER_AMIS = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_AMIS = req.params.id_amis;
  try {
    // const UTILISATEUR_EXISTE_AMIS = await UTILISATEUR.findOne({
    //   attenteAmis: ID_AMIS,
    // });
    // if (UTILISATEUR_EXISTE_AMIS == null)
    //   return res.status(200).json({
    //     UTILISATEUR_AMIS_INEXISTANT: `Cet utilisateur ${ID_AMIS} n'est plus dans l'attente de vos invitations d'amis`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { attenteAmis: ID_AMIS },
    });
    await UTILISATEUR.findByIdAndUpdate(ID_AMIS, {
      $pull: { suggestions: ID_UTILISATEUR },
    });
    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);
    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours du retaire d'invitation d'un membre`,
    });
  }
};
//Partie se desabonner d'un utilisateur
module.exports.DELETE_SUIVIE_UTILISATEUR = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_SUIVIE = req.params.id_amis;

  try {
    const UTILISATEUR_EXISTE_SUIVIE = await UTILISATEUR.findOne({
      _id: ID_SUIVIE
    });
    // if (UTILISATEUR_EXISTE_SUIVIE == null)
    //   return res.status(200).json({
    //     UTILISATEUR_SUIVIE_INEXISTANT: `Vous ne suivez plus cet utilisateur ${ID_SUIVIE}`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { suivies: ID_SUIVIE},
    });
    await UTILISATEUR.findByIdAndUpdate(ID_SUIVIE, {
      $pull: { abonnes: ID_UTILISATEUR },
    });
    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);
    return res.status(200).json({ UTILISATEUR_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours du retaire d'invitation d'un membre`,
    });
  }
};

//Post Connexion Utilisateur
module.exports.POST_CONNEXION = async (req, res) => {
  const passwordlUtilisateur = req.body.password;
  const emailUtilisateur = req.body.email;

  //Capture des erreur au cours de la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //On verifie si l'email existe déja avant de l'enregister
    const EXISTE_UTILISATEUR = await UTILISATEUR.findOne({
      email: emailUtilisateur,
    });

    if (!EXISTE_UTILISATEUR)
      return res.status(203).json({
        TROUVER_EMAIL_PASSWORD_EXISTE: `L'email ou le mot de passe n'existe pas`,
      });

    //Si l'utilisateur (email) existe, on verifie le mot de passe
    const VERIFIER_PASSWORD = bcrypt.compareSync(
      passwordlUtilisateur,
      EXISTE_UTILISATEUR.password
    );
    if (!VERIFIER_PASSWORD)
      return res.status(203).json({
        TROUVER_EMAIL_PASSWORD_EXISTE: `L'email ou le mot de passe n'existe pas`,
      });

    // const activation = await User.findOne({ email: userEmail });
    if (!EXISTE_UTILISATEUR.active)
      return res.status(203).json({
        UTILISATEUR_INACTIF: `Votre compte n'est pas encore activé. Vous devez l'activer à partir du lien envoyé sur votre compte email`,
      });
    // Quand l'utilisateur est authentifié, on crée le JWT
    const {
      amis,
      ville,
      naissance,
      attenteAmis,
      suggestions,
      suivies,
      likes,
      abonnes,
      password,
      active,
      email,
      numero,
      admin,
      contactParent,
      PasseGenere,
      verification,
      ...payload
    } = EXISTE_UTILISATEUR._doc;

    const token = createToken(payload);
    res.cookie("access_token", token, {
      // expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1), //second min hour days year
      expires: new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000), //annee jour heure min sec misecc
      path: "/",
      httpOnly: true, // backend only
      sameSite: "strict", // set to none for cross-request
    });

    const totalNombreVisiteur = await Visiteur.findOne();
    const totalNombrePersonne = await UTILISATEUR.findOne({ email });
    if (totalNombreVisiteur == null) {
      const nombreVisiteurConecte = 1;
      const newVisiteur = new Visiteur({
        nombreVisiteurConecte,
      });
      newVisiteur.save();
    } else {
      totalNombrePersonne.nombreVisite += 1;
      totalNombreVisiteur.nombreVisiteurConecte += 1;

      const nombreVisiteurConecte = totalNombreVisiteur.nombreVisiteurConecte;
      const nombreVisite = totalNombrePersonne.nombreVisite;
      await Visiteur.findByIdAndUpdate(totalNombreVisiteur._id, {
        nombreVisiteurConecte,
      });
      await UTILISATEUR.findByIdAndUpdate(totalNombrePersonne._id, {
        nombreVisite,
      });
    }
    return res
      .status(200)
      .json({ UTILISATEUR_CONNECTER: EXISTE_UTILISATEUR._doc});
  } catch (error) {
    //Erreur au niveau du server
    console.log(error);
    return res.status(500).json({
      ERREUR_SERVER: `Quelques choses de mauvais s'est passé au cours de la connexion`,
    });
  }
};
//get utilisateur connecter
module.exports.GET_UTILISATEUR_CONNECTER= async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  try{
  const UTILISATEUR_CONNECTER = await UTILISATEUR.findOne({_id:ID_UTILISATEUR})
    return res
      .status(200)
      .json({ UTILISATEUR_CONNECTER});
  } catch (error) {
    //Erreur au niveau du server
    console.log(error);
    return res.status(500).json({
      ERREUR_SERVER: `Quelques choses de mauvais s'est passé au cours de la connexion`,
    });
  }
};

//Post Inscription Utilisateur
// module.exports.POST_INSCRIPTION = async (req, res) => {
//   const verify = Math.floor(Math.random() * 10000000 + 1);
//   let { nom, email, password, passwordConfirme } = req.body;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     if (password != passwordConfirme)
//       return res.status(203).json({
//         PASSWORD_DIFFERENT: `Le mot de passe et la confirmation sont différent`,
//       });

//     const TROUVER_NOM_EXISTE = await UTILISATEUR.findOne({ nom });
//     if (TROUVER_NOM_EXISTE)
//       return res
//         .status(400)
//         .json({ UTILISATEUR_EXISTE: `Le nom ${nom} existe déjà` });

//     const TROUVER_EMAIL_EXISTE = await UTILISATEUR.findOne({ email });
//     if (TROUVER_EMAIL_EXISTE)
//       return res
//         .status(400)
//         .json({ UTILISATEUR_EXISTE: `L'email ${email} existe déjà` });

//     const SALT_PASSWORD = bcrypt.genSaltSync(10);
//     password = bcrypt.hashSync(password, SALT_PASSWORD);

//     const NEW_INSCIPTION = new UTILISATEUR({
//       nom,
//       email,
//       password,
//       nombreVisite: 0,
//       verification: verify,
//       admin: false,
//     });
//     NEW_INSCIPTION.save()
//       .then(
//         res.cookie("id_utilisateur_inscritption", NEW_INSCIPTION.id),
//         console.log("UTILISATEUR, enregistré avec sucèss"),
//         res.status(200).json({
//           INSCIPTION_SUCCESS: `L'utilisateur, ${nom} à été enregistré avec sucèss, veuillez activer votre compte à partir du lien envoyé à votre email`,
//         })
//       )
//       .catch((e) => console.log(e.message));
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(400)
//       .json({ ERREUR_SERVER: "Erreur au cours de l'inscription " });
//   }
// };
module.exports.POST_INSCRIPTION = async (req, res) => {
  const verify = Math.floor(Math.random() * 10000000 + 1);
  let { nom, email, password, passwordConfirme } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (password != passwordConfirme)
      return res.status(203).json({
        PASSWORD_DIFFERENT: `Le mot de passe et la confirmation sont différent`,
      });

    const TROUVER_NOM_EXISTE = await UTILISATEUR.findOne({ nom });
    if (TROUVER_NOM_EXISTE)
      return res
        .status(400)
        .json({ UTILISATEUR_EXISTE: `Le nom ${nom} existe déjà` });

    const TROUVER_EMAIL_EXISTE = await UTILISATEUR.findOne({ email });
    if (TROUVER_EMAIL_EXISTE)
      return res
        .status(400)
        .json({ UTILISATEUR_EXISTE: `L'email ${email} existe déjà` });

    if (email === process.env.NODE_MAILLER_EMAIL)
      return transporter.sendMail(
        MAIL_OPTIONS(nom, email, verify),
        function (error, info) {
          if (error) {
            console.log(error);
            return res
              .status(203)
              .json({ ERREUR_ENVOI_MESSAGE: `Erreur d'envoye de message` });
          } else {
            const SALT_PASSWORD = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, SALT_PASSWORD);

            const NEW_INSCIPTION = new UTILISATEUR({
              nom,
              email,
              password,
              nombreVisite: 0,
              verification: verify,
              admin: true,
            });
            NEW_INSCIPTION.save()
              .then(
                res.cookie("id_utilisateur_inscritption", NEW_INSCIPTION.id),
                res.status(200).json({
                  INSCIPTION_SUCCESS: `L'utilisateur, ${nom} à été enregistré avec sucèss`,
                })
              )
              .catch((e) => {
                console.log(e.message);
              });
          }
        }
      );

    transporter.sendMail(
      MAIL_OPTIONS(nom, email, verify),
      function (error, info) {
        if (error) {
          console.log(error);
          return res
            .status(203)
            .json({ ERREUR_ENVOI_MESSAGE: `Erreur d'envoye de message` });
        } else {
          const SALT_PASSWORD = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(password, SALT_PASSWORD);

          const NEW_INSCIPTION = new UTILISATEUR({
            nom,
            email,
            password,
            nombreVisite: 0,
            verification: verify,
            admin: false,
          });
          NEW_INSCIPTION.save()
            .then(
              res.cookie("id_utilisateur_inscritption", NEW_INSCIPTION.id),
              console.log("UTILISATEUR, enregistré avec sucèss"),
              res.status(200).json({
                INSCIPTION_SUCCESS: `L'utilisateur, ${nom} à été enregistré avec sucèss, veuillez activer votre compte à partir du lien envoyé à votre email`,
              })
            )
            .catch((e) => console.log(e.message));
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ ERREUR_SERVER: "Erreur au cours de l'inscription " });
  }
};

module.exports.POST_REINITIALISER_CODE = async (req, res) => {
  const PasseGenere = Math.floor(Math.random() * 1000000 + 1);
  const { emailReinitialisation } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const MOT_PASSE_OUBLIE = await UTILISATEUR.findOne({
      email: emailReinitialisation,
    });
    if (!MOT_PASSE_OUBLIE)
      return res.status(203).json({
        TROUVER_EMAIL_EXISTE: `Aucun utilisateur n'a été trouvé avec cette adresse email`,
      });

    transporter.sendMail(
      MAIL_OPTION_2(MOT_PASSE_OUBLIE.nom, emailReinitialisation, PasseGenere),
      async (error, info) => {
        if (error) {
          console.log(error);
          return res
            .status(203)
            .json({ ENVOI_EMAIL_ERREUR: `Erreur d'envoye de message` });
        } else {
          console.log("Email et reponse envoyés " + info.response);
          res.cookie("id_utilisateur_oublie", MOT_PASSE_OUBLIE._id);
          await UTILISATEUR.findByIdAndUpdate(MOT_PASSE_OUBLIE._id, {
            PasseGenere,
          });
          return res.status(200).json({
            ENVOI_EMAIL_SUCCESS:
              "Votre code a été envoyé à l'adresse email avec succès",
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la réinitialisation de mot de passe`,
    });
  }
};

module.exports.POST_CODE_REINITIALISE = async (req, res) => {
  const { id_utilisateur_oublie } = req.cookies;
  const { PasseGenere, nouveauPassword } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const UTILISATEUR_MOT_PASSE = await UTILISATEUR.findById(
      id_utilisateur_oublie
    );
    if (!UTILISATEUR_MOT_PASSE)
      return res.status(200).json({
        UTILISATEUR_EXISTE: `Aucun utilisateur n'a été trouvé`,
      });
    if (UTILISATEUR_MOT_PASSE.PasseGenere != PasseGenere)
      return res.status(203).json({
        ERREUR_CODE: `Le code entré est incorrect, veuillez entrer le bon code envoyé par email`,
      });

    const genSaltSync = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(nouveauPassword, genSaltSync);

    await UTILISATEUR.findByIdAndUpdate(id_utilisateur_oublie, {
      password,
      PasseGenere: "",
    });
    console.log(UTILISATEUR_MOT_PASSE);
    return res.status(200).json({
      MOT_PASSE_REINITIALISE_SUCCESS:
        "Le mot de passe à été réinitialisé avec succès",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`,
    });
  }
};

//Modier un utilisateur
module.exports.PUT_MODIFIER_UTILISATEUR = async (req, res) => {
  const ID_UTILISATEUR = req.user;
  let {
    nom,
    naissance,
    email,
    numero,
    ville,
    matrimoniale,
    profession,
    contactParent,
  } = req.body;

  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Rechercher id d'un utilisateur connecter et modifier ces informations
    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      // photo : photo || "./uploads/profil/random-user.png",
      nom,
      naissance,
      email,
      numero,
      ville,
      matrimoniale,
      profession,
      contactParent,
    });

    return res.status(200).json({
      MODIFICATION_SUCCES: "Vos informations ont bien été mis à jour",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`,
    });
  }
};

//Deconnexion d'un utilisateur
module.exports.POST_DECONNEXION = (req, res) => {
  try {
    //Suppresion du token donc deconnexion de l'utilisateur
    res.clearCookie("access_token");
    // res.cookie("access_token", "");
    return res
      .status(200)
      .json({ UTILISATEUR_DECONNECTER: "Vous avez été déconnécté" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la vérifcation de l'inscription`,
    });
  }
};

module.exports.GET_VERIFICATION = async (req, res) => {
  const { verify } = req.query;
  const id = req.cookies.id_utilisateur_inscritption;
  if (!verify)
    return res.status(403).json({
      VERIFICATION_ECHEC:
        "Le compte n'a pas été trouvé pendant la vérification",
    });
  try {
    const VERIFICATION_INSCRIPTION = await UTILISATEUR.findOne({ _id: id });
    if (!VERIFICATION_INSCRIPTION)
      return res.status(403).json({
        VERIFICATION_ECHEC:
          "Le compte n'a pas été trouvé pendant la vérification",
      });
    if (VERIFICATION_INSCRIPTION.verification == null)
      return res
        .status(403)
        .json({ VERIFICATION_ECHEC: "Erreur pendant la vérification" });
    if (verify != VERIFICATION_INSCRIPTION.verification)
      return res.status(403).json({
        LIEN_VERIFICATION_ECHEC: `Ce lien avec l'identifiant ${verify} n'est plus valide, veuillez contacter l'administrateur par email`,
      });

      await UTILISATEUR.findByIdAndUpdate(id, {
      active: true,
    });

    await UTILISATEUR.findByIdAndUpdate(id, { verification: "" });
    return res
      .status(200)
      .json({ VERIFICATION_SUCCES: "Votre compte a été activé avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la vérifcation de l'inscription`,
    });
  }
};

module.exports.PUT_UTILISATEUR_STATUT = async (req, res) => {
  const { id } = req.params;
  const { utilisateur, admin } = req.body;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const UTILISATEUR_STATUT = await UTILISATEUR.findByIdAndUpdate(id, {
      utilisateur,
      admin,
    });
    return res
      .status(200)
      .json(`Le statut de ${UTILISATEUR_STATUT.nom} a été modifié avec succès`);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        `Quelque chose de mauvais s'est passé au cours de la modification du statut`
      );
  }
};

//Modifier le mot de passe d'un utilisateur
module.exports.PUT_MODIFIER_MOT_PASSE = async (req, res) => {
  const idUtilisateur = req.user;
  let { ancienPassword, nouveauPassword, confirmeNouveauPassword } = req.body;
  const saltPassword = 10;
  //Capture des erreur au cours de la modification
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Rechercher id d'un utilisateur connecter

  try {
    const UTILISATEUR_MODIFIER = await UTILISATEUR.findOne({
      id: idUtilisateur._id,
    });
    const { password } = UTILISATEUR_MODIFIER._doc;
    const VERIFIER_PASSWORD = await bcrypt.compare(ancienPassword, password);
    // Vérifier et modifier sont mot de passe
    if (!ancienPassword || !nouveauPassword || !confirmeNouveauPassword)
      return res.status(200).json({
        CHAMPS_VIDE: "Un des champs est vide",
      });
    if (!VERIFIER_PASSWORD)
      return res.status(200).json({
        ANCIEN_MOT_PASSE_ERREUR: "Votre ancien mot de passe est incorrect",
      });
    if (nouveauPassword != confirmeNouveauPassword)
      return res.status(200).json({
        CONFIRMATION_MOT_PASSE_ERREUR:
          "Le nouveau mot de passe est différent de la confirmation de mot de passe",
      });
    nouveauPassword = bcrypt.hashSync(nouveauPassword, saltPassword);

    //Enregistrer le mot de passe modifié dans la base de données
    await UTILISATEUR.findByIdAndUpdate(idUtilisateur, {
      password: nouveauPassword,
    });
    return res.status(200).json({
      MODIFIER_MOT_PASSE_SUCCESS:
        "Votre mot de passe à été modifié avec succès",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la modification de mot de passe`,
    });
  }
};

module.exports.DELETE_UTILISATEUR = async (req, res) => {
  const { id } = req.params;
  try {
    const SUPPRIMER_UTILISATEUR = await UTILISATEUR.findByIdAndDelete(id);

    if (SUPPRIMER_UTILISATEUR == null)
      return res.status(400).json({
        SUPPRESSION_UTILISATEUR_ERREUR: `L'idenfifiant ${id} n'existe pas ou est incorrect`,
      });
    const LISTE_UTILISATEURS = await UTILISATEUR.find().sort({ nom: 1 })
    return res.status(200).json({
      LISTE_UTILISATEURS
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de la suppression de l'utilisateur`,
    });
  }
};

// **********************************************************

module.exports.GET_LISTE_POSTER = async (req, res) => {
  // const trier = req.query;
  try {
    // console.log(trier);
    const LISTE_POSTER = await POSTER_UTILISATEUR.find().sort({ createdAt: -1 });
    return res.status(200).json({
       LISTE_POSTER,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'obtention de la liste des utilisateurs`,
    });
  }
};

//post image et le texte du post
module.exports.POST_POSTER = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const post_texte = req.body.post_texte;
 

  //Capture des erreur au cours de la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  if (!req.file || req.file === undefined)
    return res.status(400).json("Aucun fichier à ajouter");
  const POSTER_IMAGE = req.file;

  if (
    POSTER_IMAGE.mimetype != "image/gif" &&
    POSTER_IMAGE.mimetype != "image/jpeg" &&
    POSTER_IMAGE.mimetype != "image/jpg" &&
    POSTER_IMAGE.mimetype != "image/png"
  )
    return res.status(400).json({
      POSTER_IMAGE_ERREUR:
        "Format invalide car le fichier doit être de type image ou photo",
    });
  const PROFIL_UTILISATEUR = await UTILISATEUR.findById(ID_UTILISATEUR)
  try {
    const NEW_POSTER_IMAGE = new POSTER_UTILISATEUR({
      postNom: PROFIL_UTILISATEUR.nom,
      photo: PROFIL_UTILISATEUR.photo,
      postTexte: post_texte,
      postPhoto: POSTER_IMAGE.filename,
    });

    NEW_POSTER_IMAGE.save()
      .then(
        console.log("Image sauvegader avec success")
      )
      .catch((e) => console.log(e.message));
      const POSTER_AFFICHE_UTILISATEUR = await POSTER_UTILISATEUR.find();
     return res.status(200).json({POSTER_AFFICHE_UTILISATEUR})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'enregistrement de l'image poster`,
    });
  }
};

//Partie envoyer une invitation
module.exports.PUT_POSTER_LIKES = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_POST = req.params.id_post;
  try {
    const POST_UTILISATEUR_EXISTE = await POSTER_UTILISATEUR.findById(ID_POST);
    if (!POST_UTILISATEUR_EXISTE)
      return res.status(400).json({
        POSTER_UTILISATEUR_EXISTANT: `Ce post ${ID_POST} n'existe pas`,
      });

    // const UTILISATEUR_POST_LIKE = await POSTER_UTILISATEUR.findOne({
    //   postNombreLike: ID_UTILISATEUR,
    // });
    // if (UTILISATEUR_POST_LIKE)
    //   return res.status(400).json({
    //     UTILISATEUR_POST_LIKE_EXISTANT: `Ce poste ${ID_POST} est déjà aimé par ${ID_UTILISATEUR}`,
    //   });

    // const UTILISATEUR_EXISTE_LIKE = await UTILISATEUR.findOne({
    //   likes: ID_POST,
    // });
    // if (UTILISATEUR_EXISTE_LIKE)
    //   return res.status(400).json({
    //     UTILISATEUR_LIKE_EXISTE: `vous avez déjà aimé ce poste ${ID_POST}`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $push: { likes: ID_POST },
    });
    await POSTER_UTILISATEUR.findByIdAndUpdate(ID_POST, {
      $push: { postNombreLike: ID_UTILISATEUR },
    });

    const POSTER_AFFICHE = await POSTER_UTILISATEUR.find().sort({ createdAt: -1 });

    return res.status(200).json({ POSTER_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};
//Partie supprimer un poster
module.exports.DELETE_POST_POSTER = async (req, res) => {
  // const ID_UTILISATEUR = req.user;
  const ID_POST = req.params.id_post;
  try {
    const POST_UTILISATEUR_EXISTE = await POSTER_UTILISATEUR.findById(ID_POST);
    if (!POST_UTILISATEUR_EXISTE)
      return res.status(200).json({
        POSTER_UTILISATEUR_INEXISTANT: `Ce post ${ID_POST} n'existe pas`,
      });

    await POSTER_UTILISATEUR.findByIdAndDelete(ID_POST);

    const AFFICHER_POSTE = await POSTER_UTILISATEUR.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      AFFICHER_POSTE
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};

//Partie ne plus aimé un poster
module.exports.PUT_POSTER_UNLIKES = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const ID_POST = req.params.id_post;
  try {
    const POST_UTILISATEUR_EXISTE = await POSTER_UTILISATEUR.findById(ID_POST);
    if (!POST_UTILISATEUR_EXISTE)
      return res.status(400).json({
        POSTER_UTILISATEUR_INEXISTANT: `Ce post ${ID_POST} n'existe pas`,
      });

    // const UTILISATEUR_POST_UNLIKE = await POSTER_UTILISATEUR.findOne({
    //   postNombreLike: ID_UTILISATEUR,
    // });
    // if (!UTILISATEUR_POST_UNLIKE)
    //   return res.status(400).json({
    //     UTILISATEUR_POST_LIKE_INEXISTANT: `Ce poste ${ID_POST} n'est pas encore aimé par ${ID_UTILISATEUR}`,
    //   });

    // const UTILISATEUR_EXISTE_UNLIKE = await UTILISATEUR.findOne({
    //   likes: ID_POST,
    // });
    // if (!UTILISATEUR_EXISTE_UNLIKE)
    //   return res.status(400).json({
    //     UTILISATEUR_UNLIKE_INEXISTANT: `vous n'avez pas encor aimé ce poste ${ID_POST}`,
    //   });

    await UTILISATEUR.findByIdAndUpdate(ID_UTILISATEUR, {
      $pull: { likes: ID_POST },
    });
    await POSTER_UTILISATEUR.findByIdAndUpdate(ID_POST, {
      $pull: { postNombreLike: ID_UTILISATEUR },
    });

    const POSTER_AFFICHE = await POSTER_UTILISATEUR.find().sort({ createdAt: -1 });

    return res.status(200).json({ POSTER_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};
module.exports.PUT_POSTER_COMMENTAIRE = async (req, res) => {
  const ID_UTILISATEUR = req.user._id;
  const postCommentaire = req.body.postCommentaire;
  const ID_POST = req.params.id_post;

  //Capture des erreur au cours de la validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const POST_UTILISATEUR_EXISTE = await POSTER_UTILISATEUR.findById(ID_POST);
    if (!POST_UTILISATEUR_EXISTE)
    return res.status(400).json({
      POSTER_UTILISATEUR_EXISTANT: `Ce post ${ID_POST} n'existe pas`,
      });

    const UTILISATEUR_AFFICHE = await UTILISATEUR.findById(ID_UTILISATEUR);
    await POSTER_UTILISATEUR.findByIdAndUpdate(ID_POST, {
      $push: {
        postCommentaire: {
          post_commentaire_id_utilisateur: UTILISATEUR_AFFICHE._id,
          post_commentaire_nom: UTILISATEUR_AFFICHE.nom,
          post_commentaire_photo: UTILISATEUR_AFFICHE.photo,
          post_commentaire_utilisateur_texte: postCommentaire,
        },
      },
    });

    const POSTER_AFFICHE = await POSTER_UTILISATEUR.find().sort({ createdAt: -1 });

    return res.status(200).json({ POSTER_AFFICHE });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};

//Supprimer commentaire d'un poste
module.exports.DELETE_POSTER_COMMENTAIRE = async (req, res) => {
  // const ID_UTILISATEUR = req.user;
  const POST_ID_COMMENTAIRE = req.body.postCommentaireId;
  const ID_POST = req.params.id_post;

  try {
    const POST_UTILISATEUR_EXISTE = await POSTER_UTILISATEUR.findById(ID_POST);
    if (!POST_UTILISATEUR_EXISTE)
    return res.status(400).json({
      POSTER_UTILISATEUR_EXISTANT: `Ce post ${ID_POST} n'existe pas`,
    });
    
    await POSTER_UTILISATEUR.findByIdAndUpdate(ID_POST, {
      $pull: {
        postCommentaire: {
          _id: POST_ID_COMMENTAIRE,
        },
      },
    });
    const AFFICHER_POSTE = await POSTER_UTILISATEUR.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      AFFICHER_POSTE
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      ERREUR_SERVER: `Quelque chose de mauvais s'est passé au cours de l'invitation d'un membre`,
    });
  }
};
