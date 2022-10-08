import React from 'react';
import { Link } from "react-router-dom";
const Inscription = () => {
    return (
        <div className="grand-inscription">
        <div className="inscription">
          <form>
            <div className="contenue">
              <div className="text-incription">Inscription</div>
              <div className="inscription-utilisateur">
                <div className="nom-utilisateur">
                  <div className="nom-label">Nom et prénom</div>
                  <div className="nom-input">
                    <input type="text" placeholder="Entrer votre nom et prénom" />
                  </div>
                </div>
                {/* <div className="prenom-utilisateur">
                  <div className="prenom-label">Prénom</div>
                  <div className="prenom-input">
                    <input type="text" placeholder="Entrer votre Prénom" />
                  </div>
                </div> */}
                <div className="email-utilisateur">
                  <div className="email-label">Email</div>
                  <div className="email-input">
                    <input type="email" placeholder="Entrer votre email" />
                  </div>
                </div>
                <div className="password-utilisateur">
                  <div className="password-label">Mot de passe</div>
                  <div className="password-input">
                    <input
                      type="password"
                      placeholder="Entrer votre mot de passe"
                    />
                  </div>
                </div>
                <div className="conf-password-utilisateur">
                  <div className="conf-password-label">
                    Confirmation de mot de passe
                  </div>
                  <div className="conf-password-input">
                    <input
                      type="password"
                      placeholder="Confirmer votre vot de passe"
                    />
                  </div>
                </div>
              </div>
              <div className="button">
                <button>Inscription</button>
              </div>
              <div className="mot-passe-oublie">
                <div className="mot-passe-oublie-texte">
                  <Link to='/password-email'>J'ai oublié mon mot de passe</Link>
                </div>
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

export default Inscription;