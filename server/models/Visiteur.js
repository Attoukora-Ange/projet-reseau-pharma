const mongoose = require("mongoose");

const VISITEUR_SCHEMA = mongoose.Schema({
  nombreVisiteurConecte: {
    type: Number,
    trim: true,
  },
  nombreVisiteur: {
    type: Number,
    trim: true,
  },
  dateDerniereVisite: {
    type: Date,
    default: Date.now(),
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("VISITEUR", VISITEUR_SCHEMA);
