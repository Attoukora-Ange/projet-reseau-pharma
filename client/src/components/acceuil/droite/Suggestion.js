import React, { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";
import CadreSuggestion from "./CadreSuggestion";

const Suggestion = () => {
  const {state} = useContext(MonContexte)
  return (
    <div className="suggestion-liste-amis-cadre">
      <div className="suggestion-mes-amis-texte">Suggestion d'amis</div>
       <div className="droite-liste-suggestion">
       {state.UTILISATEUR_CONNECTER.suggestions && <CadreSuggestion suggestions = {state.UTILISATEUR_CONNECTER.suggestions} />}
              
        </div>
      </div>
  );
};

export default Suggestion;
