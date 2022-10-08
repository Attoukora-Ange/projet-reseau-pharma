const nodemailer = require("nodemailer");

const EnvoiEmail = (mailOptions, DATA)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODE_MAILLER_EMAIL,
          pass: process.env.NODE_MAILLER_PASS,
        },
      });
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res
            .status(203)
            .json({ ERREUR_ENVOI_MESSAGE: `Erreur d'envoye de message` });
        } else {
          const SALT_PASSWORD = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(password, SALT_PASSWORD);
  
          const NEW_INSCIPTION = new UTILISATEUR({
            nom: DATA.nom,
            email : DATA.email,
            password: DATA.password,
            nombreVisite: DATA.nombreVisite,
            verification: DATA.verify,
            admin: DATA.admin,
          });
          NEW_INSCIPTION.save()
            .then(
              console.log("UTILISATEUR, enregistré avec sucèss"),
              res
                .status(400)
                .json({
                  INSCIPTION_SUCCESS: `L' UTILISATEUR, ${nom} à été enregistré avec sucèss`,
                })
            )
            .catch((e) => console.log(e.message));
        }
      });
}

module.exports = EnvoiEmail;