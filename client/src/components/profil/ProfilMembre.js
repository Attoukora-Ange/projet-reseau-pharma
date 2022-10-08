import React, { useContext } from "react";
import { BiCalendar, BiMailSend, BiMap } from "react-icons/bi";
import { BsTelephoneForward } from "react-icons/bs";
import { MonContexte } from "../../reducer/Contexte";
import { VisibleContexte } from "../../visibleReducer/Contexte";
import ModPasse from "../acceuil/milieu/ModPasse";
import ModProfil from "../acceuil/milieu/ModProfil";
import Profil from "./Profil";
export const dataMembre = (nom, data)=>{
    return data.find(findValue=> findValue.nom.toLowerCase() === nom.toLowerCase())
  }

const ProfilMembre = () => {
  const {state} = useContext(MonContexte);
  const {stateVisible} = useContext(VisibleContexte);

  const Membre = dataMembre(stateVisible.nom_membre, state.LISTE_DES_UTILISATEURS);

  return (
    <>
    {
      state.UTILISATEUR_CONNECTER.nom === Membre.nom ? 
      <>
      <Profil />
      {
        stateVisible.modidifierProfil && 
        <>
            <ModProfil />
            <ModPasse />
        </>
      }

        </>

     :
<div>
      <div className="profil-milieu-membre">
        <div className="profil-milieu-contenue">
          <div className="profil-milieu-contenue-titre">
            Profil de {Membre.nom}
          </div>
          <div className="profil-milieu-contenue-cadre">
            <div className="profil-milieu-contenue-cadre-image">
              <div className="profil-milieu-contenue-cadre-image-couverture">
                <div className="profil-milieu-contenue-cadre-image-couverture-image">
                  <input type="file" />
                </div>
                <div className="profil-milieu-contenue-cadre-couverture-image-file">
                  <img src={'/assets/couverture/' + Membre.photo_couverture} alt="profil utilisateur couverture" />
                </div>
              </div>
              <div className="profil-milieu-contenue-cadre-image-photo">
                <div className="profil-milieu-contenue-cadre-image-photo-input-file">
                  <input type="file" />
                </div>
                <div className="profil-milieu-contenue-cadre-image-photo-file">
                  <img src={'/assets/profil/' + Membre.photo} alt="profil utilisateur" />
                </div>
              </div>
            </div>
          </div>
          <div className="profil-milieu-contenue-cadre-information">
            <div className="profil-milieu-contenue-cadre-information">
              <div className="profil-milieu-contenue-cadre-information-titre">
                Information personnelle
              </div>
              <div className="profil-milieu-contenue-cadre-information-generale-gauche-droite">
                <div className="profil-milieu-contenue-cadre-information-generale-gauche">
                  <div className="profil-milieu-contenue-cadre-information-generale">
                    <div className="profil-milieu-contenue-cadre-information-generale-nom">
                      <div className="profil-milieu-contenue-cadre-information-generale-nom-label">
                        Nom et prénom :
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-nom-contenue">
                      {Membre.nom}
                      </div>
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-matrimoniale">
                      <div className="profil-milieu-contenue-cadre-information-generale-matrimoniale-label">
                        Situation matrimoniale :
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-matrimoniale-contenue">
                      {Membre.matrimoniale}
                      </div>
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-profession">
                      <div className="profil-milieu-contenue-cadre-information-generale-profession-label">
                        Profession :
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-profession-contenue">
                      {Membre.profession}
                      </div>
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-parent">
                      <div className="profil-milieu-contenue-cadre-information-generale-parent-label">
                        Contact parent :
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-parent-contenue">
                      {Membre.contactParent}
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
                      {Membre.naissance}
                      </div>
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-numero">
                      <div className="profil-milieu-contenue-cadre-information-generale-numero-label">
                        <BsTelephoneForward />
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-numero-contenue">
                      {Membre.numero}
                      </div>
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-email">
                      <div className="profil-milieu-contenue-cadre-information-generale-email-label">
                        <BiMailSend />
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-email-contenue">
                      {Membre.email}
                      </div>
                    </div>
                    <div className="profil-milieu-contenue-cadre-information-generale-ville">
                      <div className="profil-milieu-contenue-cadre-information-generale-ville-label">
                        <BiMap />
                      </div>
                      <div className="profil-milieu-contenue-cadre-information-generale-ville-contenue">
                      {Membre.ville}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profil-milieu-contenue-cadre-information-button">
             {/* {
              state.UTILISATEUR_CONNECTER.nom === Membre.nom &&  <button onClick={handleModifierInfo}>Modifier</button>
             } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    
    </>
    
  );
};

export default ProfilMembre;
