import { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";
import CadreListeAmis from "./CadreListeAmis";

const ListeAmis = () => {
  const {state} = useContext(MonContexte)
  return (
    <div className="liste-amis-cadre">
      <div className="mes-amis-texte">Mes amis</div>
      <div className="gauche-liste-amis">
        {
          state.UTILISATEUR_CONNECTER.amis && <CadreListeAmis amis = {state.UTILISATEUR_CONNECTER.amis} />
        }
        
      </div>
    </div>
  );
};

export default ListeAmis;
