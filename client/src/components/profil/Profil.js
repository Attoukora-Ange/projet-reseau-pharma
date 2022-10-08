import axios from "axios";
import React, { useContext, useRef } from "react";
import { BiCalendar, BiMailSend, BiMap } from "react-icons/bi";
import { BsTelephoneForward } from "react-icons/bs";
import { UTILISATEUR_CONNECTER } from "../../reducer/Action";
import { MonContexte } from "../../reducer/Contexte";
import { MODIFIER_PROFIL_UTILISATEUR, PHOTO_COUVERTURE_UTILISATEUR, PHOTO_PROFIL_UTILISATEUR } from "../../visibleReducer/Action";
import { VisibleContexte } from "../../visibleReducer/Contexte";


const Profil = () => {
  const {state, dispacth} = useContext(MonContexte);
  const {stateVisible, dispacthVisible} = useContext(VisibleContexte);
    const InputUseRefFileCouverture = useRef();
  const InputUseRefFileProfil = useRef();

  const handleClickPhotoCouverture = (e)=>{
    InputUseRefFileCouverture.current.click();
  }

  const handleChangePhotoCouverture = async (e)=>{
      const filname = e.target.files[0];
      const URL_Name = URL.createObjectURL(filname);
     dispacthVisible({type: PHOTO_COUVERTURE_UTILISATEUR, payload : URL_Name })

     const URL_COUVERTURE = `${process.env.REACT_APP_API_URL}/modifier/profil/couverture`;
      const fd = new FormData();
      fd.append("photo_couverture", filname);
      await axios
        .put(
          URL_COUVERTURE,
          {
            photo_couverture: fd.get("photo_couverture"),
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 500)
          return console.log(response.data.ERREUR_SERVER)

          if (response.status === 400)
          return console.log(response.data.FICHIER_PROFIL_COUVERTURE_FORMAT || response.data.FICHIER_COUVERTURE_MODIFIER_ECHEC)

          if (response.status === 200) 
          dispacth({type: UTILISATEUR_CONNECTER, payload : response.data.UTILISATEUR_MODIFIER_COUVERTURE})
          return console.log(response);
        })
  }
  const handleClickPhotoProfil= (e)=>{
    InputUseRefFileProfil.current.click();
  }

  const handleChangePhotoProfil = async (e)=>{
    const filname = e.target.files[0];
    const URL_Name = URL.createObjectURL(filname);
    dispacthVisible({type: PHOTO_PROFIL_UTILISATEUR, payload : URL_Name })
    
      const URL_PHOTO = `${process.env.REACT_APP_API_URL}/modifier/profil/photo`;
      const fd = new FormData();
      fd.append("photo_profil", filname);
      await axios
        .put(
          URL_PHOTO,
          {
            photo_profil: fd.get("photo_profil"),
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.status === 500)
          return console.log(response.data.ERREUR_SERVER)

          if (response.status === 400)
          return console.log(response.data.FICHIER_PROFIL_PHOTO_FORMAT || response.data.FICHIER_PROFIL_MODIFIER_ECHEC)

          if (response.status === 200) 
          dispacth({type: UTILISATEUR_CONNECTER, payload : response.data.UTILISATEUR_PHOTO})
          return console.log(response);
        })

  }

  const handleModifierInfo =()=>{
    dispacthVisible({type: MODIFIER_PROFIL_UTILISATEUR, payload : true })
  }

  return (
    <div className="profil-milieu">
      <div className="profil-milieu-contenue">
        <div className="profil-milieu-contenue-titre">Mon profil</div>
        <div className="profil-milieu-contenue-cadre">
          <div className="profil-milieu-contenue-cadre-image">
            <div className="profil-milieu-contenue-cadre-image-couverture">
              <div className="profil-milieu-contenue-cadre-image-couverture-image">
                <input ref={InputUseRefFileCouverture} type="file" onChange={handleChangePhotoCouverture} />
              </div>
              <div className="profil-milieu-contenue-cadre-couverture-image-file">
                <img src={stateVisible.photo_couverture_utilisateur || '/assets/couverture/' + state.UTILISATEUR_CONNECTER.photo_couverture} alt="profil utilisateur couverture" onClick={handleClickPhotoCouverture} />
              </div>
            </div>

            <div className="profil-milieu-contenue-cadre-image-photo">
              <div className="profil-milieu-contenue-cadre-image-photo-input-file">
                <input ref={InputUseRefFileProfil} type="file" onChange={handleChangePhotoProfil}/>
              </div>
              <div className="profil-milieu-contenue-cadre-image-photo-file">
                <img src={stateVisible.photo_profil_utilisateur || '/assets/profil/' + state.UTILISATEUR_CONNECTER.photo} alt="profil utilisateur" onClick={handleClickPhotoProfil} />
              </div>
            </div>
          </div>
        </div>
        <div className="profil-milieu-contenue-cadre-information">
          <div className="profil-milieu-contenue-cadre-information">
            <div className="profil-milieu-contenue-cadre-information-titre">
             Mes informations peronnelles
            </div>
            <div className="profil-milieu-contenue-cadre-information-generale-gauche-droite">
              <div className="profil-milieu-contenue-cadre-information-generale-gauche">
                <div className="profil-milieu-contenue-cadre-information-generale">
                  <div className="profil-milieu-contenue-cadre-information-generale-nom">
                    <div className="profil-milieu-contenue-cadre-information-generale-nom-label">
                      Nom et prénom:
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-nom-contenue">
                    {state.UTILISATEUR_CONNECTER.nom}
                    </div>
                  </div>
                  <div className="profil-milieu-contenue-cadre-information-generale-matrimoniale">
                    <div className="profil-milieu-contenue-cadre-information-generale-matrimoniale-label">
                      Situation matrimoniale :
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-matrimoniale-contenue">
                    {state.UTILISATEUR_CONNECTER.matrimoniale}
                    </div>
                  </div>
                  <div className="profil-milieu-contenue-cadre-information-generale-profession">
                    <div className="profil-milieu-contenue-cadre-information-generale-profession-label">
                      Profession :
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-profession-contenue">
                    {state.UTILISATEUR_CONNECTER.profession}
                    </div>
                  </div>
                  <div className="profil-milieu-contenue-cadre-information-generale-parent">
                    <div className="profil-milieu-contenue-cadre-information-generale-parent-label">
                      Contact parent :
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-parent-contenue">
                   {state.UTILISATEUR_CONNECTER.contactParent}
                    </div>
                  </div>
                </div>
              </div>
              <div className="profil-milieu-contenue-cadre-information-generale-droite">
                <div className="profil-milieu-contenue-cadre-information-generale">
                  <div className="profil-milieu-contenue-cadre-information-generale-naissance">
                    <div className="profil-milieu-contenue-cadre-information-generale-naissance-label">
                      <BiCalendar />
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-naissance-contenue">
                    {state.UTILISATEUR_CONNECTER.naissance}
                    </div>
                  </div>
                  <div className="profil-milieu-contenue-cadre-information-generale-numero">
                    <div className="profil-milieu-contenue-cadre-information-generale-numero-label">
                      <BsTelephoneForward />
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-numero-contenue">
                    {state.UTILISATEUR_CONNECTER.numero}
                    </div>
                  </div>
                  <div className="profil-milieu-contenue-cadre-information-generale-email">
                    <div className="profil-milieu-contenue-cadre-information-generale-email-label">
                      <BiMailSend />
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-email-contenue">
                    {state.UTILISATEUR_CONNECTER.email}
                    </div>
                  </div>
                  <div className="profil-milieu-contenue-cadre-information-generale-ville">
                    <div className="profil-milieu-contenue-cadre-information-generale-ville-label">
                      <BiMap />
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-ville-contenue">
                    {state.UTILISATEUR_CONNECTER.ville}
                    </div>
                  </div>
                </div>
              </div>
            </div>
                <div className="profil-milieu-contenue-cadre-information-button">
                  {
                    !stateVisible.modidifierProfil && <button onClick={handleModifierInfo}>Modifier</button>
                  }
                 
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
