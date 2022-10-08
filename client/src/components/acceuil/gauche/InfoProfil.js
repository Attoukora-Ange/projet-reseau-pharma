import { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";

const InfoProfil = () => {
    const {state} = useContext(MonContexte);
    return (
        <div className='info-profil'>
            <div className='info-profil-texte'>Info utilisateur</div>
            <div className="information-profil">
            <div className="information-profil-date">Date de naissance : {state.UTILISATEUR_CONNECTER.naissance}</div>
            <div className="information-profil-ville-actuelle">Ville actuelle : <span>{state.UTILISATEUR_CONNECTER.ville}</span> </div>
            <div className="information-profil-numero">Numéro : {state.UTILISATEUR_CONNECTER.numero}</div>
        </div>
        </div>
    );
};

export default InfoProfil;