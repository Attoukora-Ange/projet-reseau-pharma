import React from "react";

const ModProfil = () => {
  return (
    <div className="modifier-profil">
      <div className="modifier-profil-cadre">
        <div className="modifier-profil-cadre-contenue">
          <form>
            <div className="modifier-profil-cadre-contenue-form-texte">
                modification des informations
            </div>
            <div className="modifier-profil-cadre-contenue-information">
              <div className="modifier-profil-cadre-contenue-information-generale-gauche-droite">
                <div className="modifier-profil-cadre-contenue-information-generale-gauche">
                  <div className="modifier-profil-cadre-contenue-information-nom">
                    <div className="modifier-profil-cadre-contenue-information-nom-label">
                      Nom et Prénom:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-nom-input">
                      <input type="text" placeholder="Entrer votre nom et prénom" />
                    </div>
                  </div>
                  {/* <div className="modifier-profil-cadre-contenue-information-prenom">
                    <div className="modifier-profil-cadre-contenue-information-prenom-label">
                      Prénom :
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-prenom-input">
                      <input type="text" placeholder="Entrer votre prénom" />
                    </div>
                  </div> */}
                  <div className="modifier-profil-cadre-contenue-information-situation">
                    <div className="modifier-profil-cadre-contenue-information-situation-label">
                      Situation matrimoniale:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-situation-input">
                      <select name="" id="">
                            <option value="célibataire">Célibataire</option>
                            <option value="couple">Couple</option>
                            <option value="marié(e)">Marié(e)</option>
                            <option value="divorcé(e)">Divorcé(e)</option>
                        </select>
                    </div>
                  </div>
                  <div className="modifier-profil-cadre-contenue-information-profession">
                    <div className="modifier-profil-cadre-contenue-information-profession-label">
                    profession:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-profession-input">
                      <input type="text" placeholder="Entrer votre profession" />
                    </div>
                  </div>
                  <div className="modifier-profil-cadre-contenue-information-parent">
                    <div className="modifier-profil-cadre-contenue-information-parent-label">
                    Contact parent:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-parent-input">
                      <input type="text" placeholder="Entrer un contact parent" />
                    </div>
                  </div>
                </div>
                <div className="modifier-profil-cadre-contenue-information-generale-droite">
                  <div className="modifier-profil-cadre-contenue-information-naissance">
                    <div className="modifier-profil-cadre-contenue-information-naissance-label">
                   Date de naissance :
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-naissance-input">
                      <input type="date" placeholder="Entrer votre date de naissance" />
                    </div>
                  </div>
                  <div className="modifier-profil-cadre-contenue-information-telephone">
                    <div className="modifier-profil-cadre-contenue-information-telephone-label">
                      Télephone:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-telephone-input">
                      <input type="tel" placeholder="Entrer votre numéro de telephone" />
                    </div>
                  </div>
                  <div className="modifier-profil-cadre-contenue-information-email">
                    <div className="modifier-profil-cadre-contenue-information-email-label">
                      Email:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-email-input">
                      <input type="email" placeholder="Entrer votre adresse email" />
                    </div>
                  </div>
                  <div className="modifier-profil-cadre-contenue-information-ville">
                    <div className="modifier-profil-cadre-contenue-information-ville-label">
                    Ville actuelle:
                    </div>
                    <div className="modifier-profil-cadre-contenue-information-ville-input">
                      <input type="text" placeholder="Entrer votre ville actuelle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="formulaire-button">
                <button>Valider</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModProfil;
