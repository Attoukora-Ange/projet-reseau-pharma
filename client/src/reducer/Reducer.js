import { LISTE_POSTS, LISTE_UTILISATEUR, UTILISATEUR_CONNECTER } from "./Action";

export const Reducer = (state, action)=>{
    switch (action.type) {
        case LISTE_UTILISATEUR:
          return({...state, LISTE_DES_UTILISATEURS: action.payload});

        case UTILISATEUR_CONNECTER:
          return({...state, UTILISATEUR_CONNECTER: action.payload});
        
          case LISTE_POSTS:
          return({...state, LISTE_DES_POSTE: action.payload});
          
        default:
          return(state);
      }
}