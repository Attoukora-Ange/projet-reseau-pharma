const mongoose = require("mongoose");

const POST_SCHEMA = new mongoose.Schema(
  {
    postNom: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    postPhoto: {
      type: String,
      required: true,
    },
    postTexte: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    postNombreLike: {
      type: [String],
      required: true,
    },
    postCommentaire: {
      type: [
        {
          post_commentaire_id_utilisateur: String,
          post_commentaire_nom: String,
          post_commentaire_photo: String,
          post_commentaire_utilisateur_texte: String,
          post_commentaire_utilisateur_date: {
            type: Date,
            default: new Date().getTime(),
          },
        },
      ],
    },

    postDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("POST", POST_SCHEMA);
