import { useContext } from "react";
import { MonContexte } from "../../../reducer/Contexte";

const CardreInfo = () => {
    const {state} = useContext(MonContexte)
    return (
        <div className='cadre'>
            <div className='cadre-gauche'>
                <div className='nombre-amis'>{state.UTILISATEUR_CONNECTER.amis ? state.UTILISATEUR_CONNECTER.amis.length : 0}</div>
                <div className='amis'>amis</div>
            </div>
            <div className='cadre-droite'>
                <div className='nombre-abonne'>{state.UTILISATEUR_CONNECTER.abonnes ? state.UTILISATEUR_CONNECTER.abonnes.length : 0}</div>
                <div className='abonne'>abonnés</div>
            </div>
        </div>
    );
};

export default CardreInfo;