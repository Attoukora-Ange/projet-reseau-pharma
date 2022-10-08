import React, { useContext } from 'react';
import { MonContexte } from '../../../reducer/Contexte';
import { VisibleContexte } from '../../../visibleReducer/Contexte';
import { dataMembre } from '../../profil/ProfilMembre';


const CardreInfo = () => {
    const {state} = useContext(MonContexte)
    const {stateVisible} = useContext(VisibleContexte)
    const Membre = dataMembre(stateVisible.nom_membre, state.LISTE_DES_UTILISATEURS);
    return (
        <div className='cadre'>
            <div className='cadre-gauche'>
                <div className='nombre-amis'>{ Membre.amis.length }</div>
                <div className='amis'>amis</div>
            </div>
            <div className='cadre-droite'>
                <div className='nombre-abonne'>{Membre.abonnes.length}</div>
                <div className='abonne'>abonnés</div>
            </div>
        </div>
    );
};

export default CardreInfo;