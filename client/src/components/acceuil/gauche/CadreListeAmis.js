import axios from "axios";
import { useContext } from "react";
import { UTILISATEUR_CONNECTER } from "../../../reducer/Action";
import { MonContexte } from "../../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MEDIA_AFFICHAGE_MILIEU, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";

const CadreListeAmis = ({amis}) => {
  const { state, dispacth } = useContext(MonContexte);

  const { dispacthVisible } = useContext(VisibleContexte);


  const handleClickMembreAmis = (nom)=>{
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
  const handleRetirer = async (id) => {
    const URL = `${process.env.REACT_APP_API_URL}/retirer/amis/${id}`;
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
            dispacth({type: UTILISATEUR_CONNECTER, payload: response.data.UTILISATEUR_AFFICHE})
     
        return console.log(response);
      });
  };
  return (
    <>
    {state.LISTE_DES_UTILISATEURS &&
      state.LISTE_DES_UTILISATEURS.map((user) => {
        for (let i = 0; i < amis.length; i++) {
          if (user._id === amis[i])
            return (
              <div key={user._id} className="liste-amis">
              <div className="liste-image-nom">
                <div className="liste-amis-image">
                  <img src={"/assets/profil/" + user.photo} alt="un ami" />
                </div>
                <div className="liste-amis-nom" onClick={()=>handleClickMembreAmis(user.nom)}>{user.nom}</div>
              </div>
              <div className="liste-amis-button">
                <button onClick={()=>handleRetirer(user._id)}>Rétirer</button>
              </div>
            </div>
            );
        }
      })}
  </>
  );
};

   
export default CadreListeAmis;
