import { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";
import CadreAbonne from "./CadreAbonne";
const Abonnes = () => {
  const {state} = useContext(MonContexte)
  return (
    <div className="abonne-liste-amis-cadre">
      <div className="abonne-mes-amis-texte">Mes abonnés</div>
      <div className="droite-liste-abonne">
       
       {
        state.UTILISATEUR_CONNECTER.abonnes && <CadreAbonne abonnes = {state.UTILISATEUR_CONNECTER.abonnes}/>
       }
        
      </div>
    </div>
  );
};

export default Abonnes;
