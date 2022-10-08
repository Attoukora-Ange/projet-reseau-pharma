import React from 'react';
import { Link } from 'react-router-dom';
const Password = () => {
    return (
        <div className="grand-contenu-connexion">
        <div className="connexion">
        <form>
          <div className="contenue">
            <div className="text-connexion">Récupérer le mot de passe</div>
            <div className="connexion-utilisateur">
              <div className="email-utilisateur">
                <div className="email-label">Email</div>
                <div className="email-input">
                  <input type="email" placeholder="Entrer votre email" />
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

export default Password;