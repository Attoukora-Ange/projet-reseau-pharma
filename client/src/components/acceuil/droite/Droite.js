import React, { useContext } from 'react';
import Suggestion from './Suggestion';
import '../../../css/accueil/droite.css'
import Abonnes from './Abonnes';
import Membre from './Membre';
import { VisibleContexte } from '../../../visibleReducer/Contexte';
const Droite = () => {
    const {stateVisible} = useContext(VisibleContexte)
    return (
        <div style={ window.innerWidth < 1000 ? stateVisible.affichageDroit  ? {width: '100%'} : {display : 'none'} : {display : 'block'}}>
           <Suggestion/>
           <Abonnes/>
           <Membre/>
        </div>
    );
};

export default Droite;