import axios from "axios";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { LISTE_POSTS } from "../../../reducer/Action";
import { MonContexte } from "../../../reducer/Contexte";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";

const Commentaire = ({comment, idPoste}) => {
  const { state, dispacth } = useContext(MonContexte);
  const { dispacthVisible } = useContext(VisibleContexte);

 const handleSupprimerCommentaire = async (id)=>{
  const URL = `${process.env.REACT_APP_API_URL}/supprimer/post/commentaire/${idPoste}`;
  await axios
    .put(
      URL, {postCommentaireId : id},
     
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then( (response) => {
      if (response.status === 500)
      return console.log(response.data.ERREUR_SERVER)
        
      if (response.status === 200) 
          dispacth({type: LISTE_POSTS, payload: response.data.AFFICHER_POSTE})
   
      return console.log(response);
    });
 }

 const handleClickCommemtaireNom = (nom)=>{
  dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
  dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
  dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
  dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
  dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
  dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
  dispacthVisible({type: NOM_MEMBRE, payload : nom})
}

  return (
    <>
    {
      comment && comment.map((commentaire)=>(
        <div key={commentaire._id}>
        {
          state.UTILISATEUR_CONNECTER.nom === commentaire.post_commentaire_nom ? 
          <div className="texte-commentaire-utilisateur">
          <div className="utilisateur-commentaire-texte">
            <div className="utilisateur-commentaire-texte-supprimer">
              <div className="utilisateur-commenatire-nom" onClick={()=>handleClickCommemtaireNom(commentaire.post_commentaire_nom)}>{commentaire.post_commentaire_nom}</div>
              {
                state.UTILISATEUR_CONNECTER.nom === commentaire.post_commentaire_nom &&  <div className="utilisateur-commenatire-supprimer">
                <IoMdClose onClick={()=>handleSupprimerCommentaire(commentaire._id)} />
              </div>
              }
             
            </div>
            <div className="utilisateur-commenatire-post">
              {commentaire.post_commentaire_utilisateur_texte}
            </div>
          </div>
          <div className="utilisateur-commentaire">
            <img
              src={"/assets/profil/" + commentaire.post_commentaire_photo}
              alt="commentaire poste"
            />
          </div>
        </div>
        : <div className="texte-commentaire-utilisateur">
        <div className="utilisateur-commentaire">
          <img
            src={"/assets/profil/" + commentaire.post_commentaire_photo}
            alt="commentaire poste"
          />
        </div>
        <div className="utilisateur-commentaire-texte">
          <div className="utilisateur-commentaire-texte-supprimer">
            <div className="utilisateur-commenatire-nom" onClick={()=>handleClickCommemtaireNom(commentaire.post_commentaire_nom)}>{commentaire.post_commentaire_nom}</div>
            {
              state.UTILISATEUR_CONNECTER.nom === commentaire.post_commentaire_nom &&  <div className="utilisateur-commenatire-supprimer">
              <IoMdClose onClick={()=>handleSupprimerCommentaire(commentaire._id)} />
            </div>
            }
           
          </div>
          <div className="utilisateur-commenatire-post">
            {commentaire.post_commentaire_utilisateur_texte}
          </div>
        </div>
      </div>
        } 
      </div>
      ))
       
    }
     
    </>
  );
};

export default Commentaire;
