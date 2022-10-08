import Gauche from "../components/acceuil/gauche/Gauche";
import Droite from "../components/acceuil/droite/Droite";
import Milieu from "../components/acceuil/milieu/Milieu";
import "../css/accueil/accueil.css";
import { useContext, useEffect } from "react";
import axios from "axios";
import { MonContexte } from "../reducer/Contexte";
import { LISTE_UTILISATEUR } from "../reducer/Action";
import { VisibleContexte } from "../visibleReducer/Contexte";
const Accueil = () => {
  const {state, dispacth} = useContext(MonContexte)
  const {stateVisible} = useContext(VisibleContexte)
  const URL_LISTE_UTILISATEUR =  `${process.env.REACT_APP_API_URL}/liste/utilisateur`;
  
  useEffect(() => {
    axios
      .get(URL_LISTE_UTILISATEUR, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", 
        },
      })
      .then((response) => {
        console.log(response.data.LISTE_UTILISATEURS);
        dispacth({type: LISTE_UTILISATEUR, payload: response.data.LISTE_UTILISATEURS
          })
        
      })
      .catch((err) => {
        console.log(err);
      });
  // }, [state.UTILISATEUR_CONNECTER, dispacth]);
  }, []);
  console.log(window.innerWidth)

  return (
    <>
    {
      state.UTILISATEUR_CONNECTER && <div className="page-accueil">
        <div className="page-accueil-gauche" style={ window.innerWidth < 1000 ? stateVisible.affichageGauche ? {display : 'flex'} : {display : 'none'} : {display : 'flex'}}>
          <Gauche />
        </div>
        <div className="page-accueil-milieu" style={ window.innerWidth < 1000 ? stateVisible.affichageMilieu ? {display : 'flex'} : {display : 'none'} : {display : 'flex'}}>
          <Milieu />
        </div>
        <div className="page-accueil-droit" style={ window.innerWidth < 1000 ? stateVisible.affichageDroit  ? {display : 'flex', margin : 'auto', width: '100%'} : {display : 'none'} : {display : 'flex'}}>
          <Droite />
        </div>
      </div>
    }
      
    </>
  );
};

export default Accueil;
