import React, { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";
import CadreMembre from "./CadreMembre";

const Membre = () => {
  const {state} = useContext(MonContexte)
  
  // function SortArray(x, y) {
  //   return x.nom.localeCompare(y.nom, "fr", { ignorePunctuation: true });
  // }

  // const datas = state.data.data.sort(SortArray);


  return (
    <div className="membre-liste-amis-cadre">
      <div className="membre-mes-amis-texte">Membres du site</div>
{
  state.LISTE_DES_UTILISATEURS && <div className="droite-liste-membre">
    {
      state.LISTE_DES_UTILISATEURS.map((membre)=>(
        <div key={membre._id}>
          <CadreMembre membre = {membre} />
        </div>
      ))
    }
  
</div>

}
      
    </div>
  );
};

export default Membre;
