import { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE, TEXTE_POSTE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";

const Haut = () => {
const {state} = useContext(MonContexte)
const { dispacthVisible } = useContext(VisibleContexte);
const handleChange = (e)=>{
    dispacthVisible({type: TEXTE_POSTE, payload : e.target.value})
}

const handleClickProfil = (nom)=>{
    dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
    dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
    dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
    dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
    dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
    dispacthVisible({type: NOM_MEMBRE, payload : nom})
  }

    return (
        <div className='milieu-haut'>
           <div className='milieu-haut-photo-input'>
                <div className='milieu-haut-photo'>
                    <img src={'/assets/profil/' + state.UTILISATEUR_CONNECTER.photo} alt="utilisateur profil" onClick={()=>handleClickProfil(state.UTILISATEUR_CONNECTER.nom)}/>
                </div>
                <div className='milieu-haut-input'>
                    <input type="text" placeholder='Quoi de neuf ?'  onChange={handleChange}/>
                </div>
           </div>
        </div>
    );
};

export default Haut;