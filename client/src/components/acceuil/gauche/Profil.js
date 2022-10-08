import axios from "axios";
import { useContext } from "react";
import { useNavigate} from "react-router-dom";

import { MonContexte } from "../../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";

const Profil = () => {
const {state} = useContext(MonContexte)


const { dispacthVisible } = useContext(VisibleContexte);
const navigate = useNavigate()
  const handleDeconnexion = async ()=>{
    const URL_DECONNEXION =  `${process.env.REACT_APP_API_URL}/deconnexion`;
      axios
        .get(URL_DECONNEXION, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data)
       
          navigate('/connexion');
        })
        .catch((err) => {
          console.log(err);
        });
   
  }

  const handleClickProfile = (nom) => {
    const SousMenu = document.querySelector("#sous-menu");
    SousMenu.classList.toggle("sous-menu-toggle");
    dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
    dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
    dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
    dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
    dispacthVisible({type: NOM_MEMBRE, payload : nom})
  };
 
  return (
    <div className="profil">
      <div className="profil-couverture">
        <div className="couverture">
          <div className="couverture-image">
            <img src={'/assets/couverture/' + state.UTILISATEUR_CONNECTER.photo_couverture } alt="couverture utilisateur" />
          </div>
          <div className="image-profil">
            <img src={'/assets/profil/' + state.UTILISATEUR_CONNECTER.photo} alt="profil utilisateur" />
          </div>
        </div>
        <div className="denomination-profil">
          <div className="denomination-profil-nom">{state.UTILISATEUR_CONNECTER.nom}</div>
          <div className="denomination-profil-profession">{state.UTILISATEUR_CONNECTER.profession}</div>
          <div style={{paddingTop:'1rem', color:'green', cursor:'pointer'}} className="denomination-profil-profession" onClick={()=>handleClickProfile(state.UTILISATEUR_CONNECTER.nom)}>PROFIL</div>
          <div style={{paddingTop:'1rem', color:'crimson', cursor:'pointer'}} className="denomination-profil-profession" onClick={handleDeconnexion}>DECONNEXION</div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
