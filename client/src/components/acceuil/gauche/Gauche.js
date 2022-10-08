import React from "react";
import Profil from "./Profil";
import "../../../css/accueil/gauche.css";
import ListeAmis from "./ListeAmis";
import CardreInfo from "./CardreInfo";
import InfoProfil from "./InfoProfil";
import Asuivre from "./Asuivre";

const Gauche = () => {
   
  return (
    <div className="gauche">
      <Profil />
      <InfoProfil />
      <CardreInfo />
      <ListeAmis />
      <Asuivre />
      
    </div>
  );
};

export default Gauche;
