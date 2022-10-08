import axios from "axios";
import React, { useContext } from "react";
import { UTILISATEUR_CONNECTER } from "../../../reducer/Action";
import { MonContexte } from "../../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MEDIA_AFFICHAGE_MILIEU, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";

const CadreAsuivre = ({ suivies }) => {
  const { state, dispacth } = useContext(MonContexte);


  const { dispacthVisible } = useContext(VisibleContexte);


  const handleClickMembreAsuivre = (nom)=>{
    dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
    dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
    dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
    dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
    dispacthVisible({type: NOM_MEMBRE, payload : nom})
    if (window.innerWidth < 1000 ) {
      dispacthVisible({type : MEDIA_AFFICHAGE_MILIEU})
    }
  }

  const handleDesabonne = async (id) => {
    const URL = `${process.env.REACT_APP_API_URL}/retirer/suivie/utilisateur/${id}`;
    await axios
      .delete(
        URL,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        if (response.status === 500)
        return console.log(response.data.ERREUR_SERVER)
          
        if (response.status === 200) 
            dispacth({type: UTILISATEUR_CONNECTER, payload : response.data.UTILISATEUR_AFFICHE})
        return console.log(response);
      });
  };
  return (
    <>
      {state.LISTE_DES_UTILISATEURS &&
        state.LISTE_DES_UTILISATEURS.map((user) => {
          for (let i = 0; i < suivies.length; i++) {
            if (user._id === suivies[i])
              return (
                <div key={user._id} className="liste-suivie">
                  <div className="liste-image-nom">
                    <div className="liste-suivie-image">
                      <img
                        src={"/assets/profil/" + user.photo}
                        alt="mes suivie"
                      />
                    </div>
                    <div className="liste-suivie-nom" onClick={()=>handleClickMembreAsuivre(user.nom)}>{user.nom}</div>
                  </div>
                  <div className="liste-suivie-button">
                    <button onClick={()=>handleDesabonne(user._id)}>Desabonner</button>
                  </div>
                </div>
              );
          }
        })}
    </>
  );
};

export default CadreAsuivre;
