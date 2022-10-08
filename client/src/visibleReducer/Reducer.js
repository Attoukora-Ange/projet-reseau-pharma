import { MON_PROFIL_VISIBLE, CADRE_VUE_VISIBLE, PROFIL_MEMBRE_VISIBLE, CADRE_VUE_POSTE, PHOTO_CADRE_VUE_POSTE, RECHERCHE_VISIBLE, RECHERCHE_VALEUR, NOM_MEMBRE, PHOTO_PROFIL_UTILISATEUR, PHOTO_COUVERTURE_UTILISATEUR, MODIFIER_PROFIL_UTILISATEUR, TEXTE_POSTE, POST_FICHIER, MEDIA_AFFICHAGE_GAUCHE, MEDIA_AFFICHAGE_MILIEU, MEDIA_AFFICHAGE_DROIT } from "./Action";

export const Reducer = (state, action)=>{
    switch (action.type) {
        case MON_PROFIL_VISIBLE:
          return({...state, monProfil: action.payload});

        case CADRE_VUE_VISIBLE:
          return({...state, cadreVue: action.payload});
        
          case PROFIL_MEMBRE_VISIBLE:
          return({...state, membreProfil: action.payload});

          case CADRE_VUE_POSTE:
          return({...state, poste: action.payload});
          
          case PHOTO_CADRE_VUE_POSTE:
          return({...state, photo_vue: action.payload});
          
          case RECHERCHE_VISIBLE:
          return({...state, recherche_vue: action.payload});

          case RECHERCHE_VALEUR:
          return({...state, recherche_valeur: action.payload});
          
          case NOM_MEMBRE:
          return({...state, nom_membre: action.payload});
          
          case PHOTO_PROFIL_UTILISATEUR:
          return({...state, photo_profil_utilisateur: action.payload});
          
          case PHOTO_COUVERTURE_UTILISATEUR:
          return({...state, photo_couverture_utilisateur: action.payload});
          
          case MODIFIER_PROFIL_UTILISATEUR:
          return({...state, modidifierProfil: action.payload});
          
          case TEXTE_POSTE:
          return({...state, texte_poste: action.payload});
          
          case POST_FICHIER:
          return({...state, fichier_poster: action.payload});
          
          case MEDIA_AFFICHAGE_GAUCHE:
          return({...state, affichageGauche: true, affichageMilieu: false, affichageDroit: false});
          
          case MEDIA_AFFICHAGE_MILIEU:
          return({...state, affichageGauche: false, affichageMilieu: true, affichageDroit: false});
          
          case MEDIA_AFFICHAGE_DROIT:
          return({...state, affichageGauche: false, affichageMilieu: false, affichageDroit: true});
          
        default:
          return(state);
      }
}