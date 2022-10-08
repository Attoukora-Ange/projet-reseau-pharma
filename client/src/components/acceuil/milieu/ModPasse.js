import React from 'react';

const ModPasse = () => {
    return (
        <div className="modifier-password">
        <div className="modifier-password-cadre">
          <div className="modifier-password-cadre-contenue">
            <form>
              <div className="modifier-password-cadre-contenue-form-texte">
                  modification du mot de passe
              </div>
              <div className="modifier-password-cadre-contenue-information">
                <div className="modifier-password-cadre-contenue-information-generale-gauche-droite">
                  <div className="modifier-password-cadre-contenue-information-generale-gauche">

                    <div className="modifier-password-cadre-contenue-information-ancien">
                      <div className="modifier-password-cadre-contenue-information-ancien-label">
                        Ancien mot de passe :
                      </div>
                      <div className="modifier-password-cadre-contenue-information-ancien-input">
                        <input type="password" placeholder="Entrer votre ancien mot de passe" autoComplete="current-password off"/>
                      </div>
                    </div>
                    <div className="modifier-password-cadre-contenue-information-nouveau">
                      <div className="modifier-password-cadre-contenue-information-nouveau-label">
                        Nouveau mot de passe :
                      </div>
                      <div className="modifier-password-cadre-contenue-information-nouveau-input">
                        <input type="password" placeholder="Entrer votre nouveau mot de passe" autoComplete="new-password off"/>
                      </div>
                    </div>
                    <div className="modifier-password-cadre-contenue-information-confirmer">
                      <div className="modifier-password-cadre-contenue-information-confirmer-label">
                       Confirmer Nouveau mot de passe :
                      </div>
                      <div className="modifier-password-cadre-contenue-information-confirmer-input">
                        <input type="password" placeholder="Confirmer votre nouveau mot de passe" autoComplete="new-password off"/>
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

export default ModPasse;