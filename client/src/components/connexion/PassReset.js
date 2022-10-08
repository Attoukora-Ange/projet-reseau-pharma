import React from 'react';
import { Link } from 'react-router-dom';
const PassReset = () => {
    return (
        <div className="grand-contenu-connexion">
        <div className="connexion">
        <form>
          <div className="contenue">
            <div className="text-connexion">Modifier mot de passe</div>
            <div className="connexion-utilisateur">           
              <div className="password-utilisateur">
                <div className="password-label">Nouveau mot de passe</div>
                <div className="password-input">
                  <input
                    type="password"
                    placeholder="Entrer votre nouveau mot de passe"
                  />
                </div>
              </div>
              <div className="password-utilisateur">
                <div className="password-label">Confirmation de mot de passe</div>
                <div className="password-input">
                  <input
                    type="password"
                    placeholder="Confirmer votre mot de passe"
                  />
                </div>
              </div>
            </div>
            <div className="button">
              <button>Valider</button>
            </div>
          </div>
        </form>
      </div>
      <div className="connexion-change">
        <div className="connexion-change-texte">
            <Link to='/connexion'>Connexion</Link>
        </div>
      </div>
      </div>
    );
};

export default PassReset;