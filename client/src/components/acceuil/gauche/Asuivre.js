import { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";
import CadreAsuivre from "./CadreAsuivre";

const Asuivre = () => {
  const {state} = useContext(MonContexte)
 
  return (
    <div className="liste-suivie-cadre">
      <div className="mes-suivie-texte">Personnes suivies</div>
      <div className="gauche-liste-suivie">
        {
          state.UTILISATEUR_CONNECTER.suivies && <CadreAsuivre suivies = {state.UTILISATEUR_CONNECTER.suivies} />
        }
        
      </div>
    </div>
  );
};

export default Asuivre;
