import axios from "axios";
import React, { useContext, useEffect } from "react";
import "../../../css/accueil/milieu.css";
import { LISTE_POSTS } from "../../../reducer/Action";
import { MonContexte } from "../../../reducer/Contexte";
import { VisibleContexte } from "../../../visibleReducer/Contexte";
import Media from "../../media/Media";
// import Profil from "../../profil/Profil";
import ProfilMembre from "../../profil/ProfilMembre";
import CadrePhoto from "./CadrePhoto";
import CadrePoste from "./CadrePoste";
import CadreVue from "./CadreVue";
import CardreInfo from "./CardreInfo";
import Haut from "./Haut";
// import ModPasse from "./ModPasse";
// import ModProfil from "./ModProfil";
const Milieu = () => {
  const { state, dispacth } = useContext(MonContexte);
  const { stateVisible } = useContext(VisibleContexte);
  const URL_LISTE_POSTER =  `${process.env.REACT_APP_API_URL}/liste/poster`;
  useEffect(() => {
    axios
      .get(URL_LISTE_POSTER, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispacth({type: LISTE_POSTS, payload: response.data.LISTE_POSTER
          })
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ stateVisible]);

  return (
    <div className="milieu">
     
      {
        stateVisible.membreProfil && <>
        <ProfilMembre />
        <CardreInfo />
      </>
      }
      
      <>
       
        {
          stateVisible.poste &&  <>
           {/* <Media/> */}
           <Haut />
          <CadrePhoto />
          {
          stateVisible.cadreVue && <CadreVue />
        }
          {
            state.LISTE_DES_POSTE && 
            state.LISTE_DES_POSTE.map(post =>(
              <div key={post._id}>
              <CadrePoste poste = {post} />
              </div>
            ))
            
          }
          </>
        }
       
        
      </>
    </div>
  );
};

export default Milieu;
