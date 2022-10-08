import { useContext } from "react";
import { MonContexte } from "../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../visibleReducer/Action";
import { VisibleContexte } from "../../visibleReducer/Contexte";

const Recherche = () => {

  const {state} = useContext(MonContexte);
  const {stateVisible, dispacthVisible} = useContext(VisibleContexte);
  const Filter = state.LISTE_DES_UTILISATEURS.filter(
    (fil) =>
    fil.nom.toLowerCase().includes(stateVisible.recherche_valeur.toLowerCase())
  );
 
  const handleClick = (nom)=>{
      dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
      dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
      dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
      dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
      dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
      dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
      dispacthVisible({type: NOM_MEMBRE, payload : nom})
    }

  return (
    <div className="recherche">
    <div className="recherche-utilisateur">
      {Filter.map((rech) => (
        <div key={rech._id} className="recherche-utilisateur-profil">
          <div className="recherche-utilisateur-profil-image">
            <img src={'/assets/profil/' + rech.photo} alt="recherche utilisateur" />
          </div>
          <div className="recherche-utilisateur-profil-identifiant">
            <div className="recherche-utilisateur-profil-identifiant-texte" onClick={()=>handleClick(rech.nom)}>
              {rech.nom}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Recherche;
