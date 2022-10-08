import axios from "axios";
import React, { useContext, useState } from "react";
import { LISTE_UTILISATEUR, UTILISATEUR_CONNECTER } from "../../../reducer/Action";
import { MonContexte } from "../../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MEDIA_AFFICHAGE_MILIEU, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";
const CadreMembre = ({membre}) => {
  const { state, dispacth } = useContext(MonContexte);
  const { dispacthVisible } = useContext(VisibleContexte);
  const [showSuivre, setShowSuivre] = useState(true);
  const [showSupprimer, setShowSupprimer] = useState(false);

  
  const handleClickAjouter = async (id) => {
    const URL = `${process.env.REACT_APP_API_URL}/inviter/amis/${id}`;
    await axios
      .put(
        URL,
        { },
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
  const handleClickSuivre = async (id) => {
    setShowSuivre(!showSuivre)
    const URL = `${process.env.REACT_APP_API_URL}/suivre/utilisateur/${id}`;
    await axios
      .put(
        URL,
        { },
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
const handleClickSupprimer = async(id) => {
const ConfirmationSuppression = window.confirm('Voulez vous vraiment supprimer cet utilisateur ?')
    setShowSupprimer(!showSupprimer)
   if(ConfirmationSuppression){
    const URL = `${process.env.REACT_APP_API_URL}/supprimer/utilisateur/${id}`;
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

        if (response.status === 400)
        return console.log(response.data.SUPPRESSION_UTILISATEUR_ERREUR)
          
        if (response.status === 200) 
            dispacth({type: LISTE_UTILISATEUR, payload : response.data.LISTE_UTILISATEURS})
        return console.log(response);
      });
     }
  };

  const handleClickAnnuler = async (id)=>{
    const URL = `${process.env.REACT_APP_API_URL}/retirer/inviter/amis/${id}`;
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
  }
  const handleClickMembre = (nom)=>{
    dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
    dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
    dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
    dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
    dispacthVisible({type: NOM_MEMBRE, payload : nom})
    if (window.screen.width < 1000 ) {
      dispacthVisible({type : MEDIA_AFFICHAGE_MILIEU})
    }
  }

  return (
    <>
          <div  className="liste-membre">
          <div className="liste-membre-image-nom">
            <div className="liste-membre-image">
              <img src={'/assets/profil/' + membre.photo} alt="mes membres" />
            </div>
            <div
              className="liste-membre-nom" onClick={()=>handleClickMembre(membre.nom)}
            >
              {membre.nom}
            </div>
          </div>
          <>
          
          </>
          {
            state.UTILISATEUR_CONNECTER._id !== membre._id && 
            <div className="liste-membre-button">
                      {
             state.UTILISATEUR_CONNECTER.amis.includes(membre._id) ? <>
             </>:
             <>
              {
                state.UTILISATEUR_CONNECTER.attenteAmis.includes(membre._id) ? <button
                className="annuler"
                onClick={()=>handleClickAnnuler(membre._id)}
              >
                Annuler invitation
              </button> : <button
              className="ajouter"
              onClick={()=>handleClickAjouter(membre._id)}
            >
              Inviter
            </button>
            }
             </>
          }
           
            {
                showSuivre && <button className="ajouter" onClick={()=>handleClickSuivre(membre._id)}>Suivre</button>
            }
            {
              state.UTILISATEUR_CONNECTER.admin && <button className="supprimer" onClick={()=>handleClickSupprimer(membre._id)}>Suppr</button>
            }
            
          </div>
          }
          
        </div>
     
  </>
   
  );
};

export default CadreMembre;
