import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    const URL = `${process.env.REACT_APP_API_URL}/connexion`;
    e.preventDefault();
    await axios
      .post(
        URL,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        if (response.status === 500)
        return console.log(response.data.ERREUR_SERVER)
          
        if (response.status === 203)
          return console.log(response.data.TROUVER_EMAIL_PASSWORD_EXISTE ||
            response.data.UTILISATEUR_INACTIF);
        if (response.status === 200) 
        navigate('/')
        window.location.href('/')

        return console.log(response);
      });
  };
  return (
    <div className="grand-contenu-connexion">
      <div className="connexion">
        <form onSubmit={handleSubmit}>
          <div className="contenue">
            <div className="text-connexion">Connexion</div>
            <div className="connexion-utilisateur">
              <div className="email-utilisateur">
                <div className="email-label">Email</div>
                <div className="email-input">
                  <input
                    type="email"
                    placeholder="Entrer votre email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="password-utilisateur">
                <div className="password-label">Mot de passe</div>
                <div className="password-input">
                  <input
                    type="password"
                    placeholder="Entrer votre mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password off"
                  />
                </div>
              </div>
            </div>
            <div className="button">
              <button>Connexion</button>
            </div>
            <div className="mot-passe-oublie">
              <div className="mot-passe-oublie-texte">
                <Link to="/password-email">J'ai oublié mon mot de passe</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="connexion-change">
        <div className="connexion-change-texte">
          <Link to="/inscription">Inscription</Link>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
