import React, { useContext } from 'react';
import { MEDIA_AFFICHAGE_DROIT, MEDIA_AFFICHAGE_GAUCHE } from '../../visibleReducer/Action';
import { VisibleContexte } from '../../visibleReducer/Contexte';
const Media = () => {
    const { dispacthVisible } = useContext(VisibleContexte);
    const handleAffichageGauche = ()=>{
        dispacthVisible({type: MEDIA_AFFICHAGE_GAUCHE})
        
    }
    const handleAffichageDroit = ()=>{
        dispacthVisible({type: MEDIA_AFFICHAGE_DROIT})
    }
    return (
        <div className='milieu-media-affiche'>
            <div className='media-button'>
                <button className='media-button-menu' onClick={handleAffichageGauche}>Mes amis / Suivie(e)s</button>
            </div>
            <div className='media-button'>
                <button className='media-button-menu' onClick={handleAffichageDroit}>Suggestions / Abonné(e)s / Membres</button>
            </div>
        </div>
    );
};

export default Media;