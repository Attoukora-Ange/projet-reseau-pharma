const mongoose = require("mongoose");

const UTILISATEUR_SCHEMA = new mongoose.Schema({
  photo: {
    type: String,
    default: "profil.png",
    required: true,
  },
  photo_couverture: {
    type: String,
    default: "couverture.jpg",
    required: true,
  },
  nom: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
    unique: true,
    trim: true,
  },
  naissance: {
    type: String,
    trim: true,
    required: true,
    default: "01/01/1900", 
  },
  numero: {
    type: String,
    trim: true,
    required: true,
    default: "0000000000",
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  ville: {
    type: String,
    minLength: 3,
    maxLength: 55,
    trim: true,
    required: true,
    default: "abidjan",
  },
  matrimoniale: {
    type: String,
    minLength: 3,
    maxLength: 55,
    trim: true,
    required: true,
    default: "célibataire",
  },
  profession: {
    type: String,
    minLength: 3,
    maxLength: 55,
    trim: true,
    required: true,
    default: "sans emploi",
  },
  contactParent: {
    type: String,
    trim: true,
    required: true,
    default: "0000000000",
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minlength: 6,
  },
  nombreVisite: {
    type: Number,
    required: true,
  },
  verification: {
    type: String,
  },
  PasseGenere:{
    type: String,
    trim: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  active: {
    type: Boolean,
    trim: true,
  },
  amis: {
    type: [String],
  },
  attenteAmis: {
    type: [String],
  },
  suggestions: {
    type: [String],
  },
  abonnes: {
    type: [String],
  },
  suivies: {
    type: [String],
  },
  likes: {
    type: [String],
  }
  ,
  dateInscription: {
    type: Date,
    default: Date.now(),
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("UTILISATEUR", UTILISATEUR_SCHEMA);
