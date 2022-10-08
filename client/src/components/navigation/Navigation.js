import React, { useContext, useEffect } from "react";
import "../../css/navigation/navigation.css";
import { GoSearch } from "react-icons/go";
import Recherche from "../recherche/Recherche";
import { IdContexte } from "../../App";
import { MonContexte } from "../../reducer/Contexte";
import { UTILISATEUR_CONNECTER } from "../../reducer/Action";
import axios from "axios";
import { VisibleContexte } from "../../visibleReducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MEDIA_AFFICHAGE_MILIEU, MON_PROFIL_VISIBLE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VALEUR, RECHERCHE_VISIBLE } from "../../visibleReducer/Action";
import { useNavigate } from "react-router-dom";
// import { IoIosArrowDown } from "react-icons/io";

const Navigation = () => {
  const navigate = useNavigate()
  const {state, dispacth} = useContext(MonContexte)
  const {stateVisible, dispacthVisible } = useContext(VisibleContexte);
  const URL_LISTE_UTILISATEUR =  `${process.env.REACT_APP_API_URL}/utilisateur/connecter`;
  const id = useContext(IdContexte)
  useEffect(() => {
    axios
      .get(URL_LISTE_UTILISATEUR, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        dispacth({type: UTILISATEUR_CONNECTER, payload: response.data.UTILISATEUR_CONNECTER})
        
      })
      .catch((err) => {
        console.log(err);
      });
  // }, [navigate, dispacth, id ]);
  }, [stateVisible]);



  const handleChangeRecherche = (e) => {
    if (e.target.value.length > 0) {
      dispacthVisible({type: RECHERCHE_VALEUR, payload : e.target.value});
      dispacthVisible({type: RECHERCHE_VISIBLE, payload : true});
    } else {
      dispacthVisible({type: RECHERCHE_VISIBLE, payload : false});
      dispacthVisible({type: RECHERCHE_VALEUR, payload : ''});
    }
  };

  
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
          window.location.href('/')
        })
        .catch((err) => {
          console.log(err);
        });
   
  }

  const handleLogoPage = () => {
   
    dispacthVisible({type : MON_PROFIL_VISIBLE, payload : false})
    dispacthVisible({type : CADRE_VUE_VISIBLE, payload : false})
    dispacthVisible({type : PROFIL_MEMBRE_VISIBLE, payload : false})
    dispacthVisible({type : CADRE_VUE_POSTE, payload : true})
    if (window.innerWidth < 1000 ) {
      dispacthVisible({type : MEDIA_AFFICHAGE_MILIEU})
    }
    
  };
  
  return (
    <div className="navigation-contenue">
      <div className="navigation">
        <div className="navigation-gauche">
          <div className="logo" onClick={handleLogoPage}>
            Pharma 36
          </div>
        </div>
{
  id && <>
  <div className="navigation-milieu">
  <input
    type="search"
    placeholder="Rechercher par nom ou prénom..."
    onChange={handleChangeRecherche}
  />
  <GoSearch />
</div>
{
  state.UTILISATEUR_CONNECTER && 
  <>
        <div className="navigation-droite">
          <div className="image-utilisateur">
            <div className="image">
              <img src={"/assets/profil/" + state.UTILISATEUR_CONNECTER.photo} alt="attoukora ange" />
            </div>
            <div className="utilisateur">
              <div className="utilisateur-nom" id="utilisateur">
                {state.UTILISATEUR_CONNECTER.nom}
              </div>
              <div className="icone">
                {/* <IoIosArrowDown /> */}
              </div>
            </div>
          </div>
          <div className="navigation-droite-sous-menu" id="sous-menu">
            {/* <div className="sous-menu">
            <ul>
            <li className="profileClick" onClick={handleClickProfile}>Profil</li>
            <li className="profileClick">Profil</li>
            <li>Déconnecté</li>
            </ul>
            </div> */}
          </div>
        </div>
        <div className="navigation-droite-visible" onClick={handleDeconnexion}>
          Deconnexion
        </div>
        </>
        
}
        </>

}
       

  </div>
  {
  stateVisible.recherche_vue && 
  <Recherche />
  }
    </div>
     
  );
};

export default Navigation;

