import React, { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Commentaire from "./Commentaire";
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, MON_PROFIL_VISIBLE, NOM_MEMBRE, PHOTO_CADRE_VUE_POSTE, PROFIL_MEMBRE_VISIBLE, RECHERCHE_VISIBLE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";
import axios from "axios";
import { LISTE_POSTS } from "../../../reducer/Action";
import { MonContexte } from "../../../reducer/Contexte";


const CadrePoste = ({ poste }) => {
  const { state, dispacth } = useContext(MonContexte);
  const { dispacthVisible } = useContext(VisibleContexte);
  const [montrerVoirPlus, setMontrerVoirPlus] = useState(false);
  const [montrerCommentaire, setMontrerCommentaire] = useState(false);
  const [commentaire, setCommentaire] = useState('');

  const handleTexteLong = (texteLong) => {
    return (
      <>
        {montrerVoirPlus ? (
          <div className="text-long-contenue">{texteLong.slice(0)}</div>
        ) : (
          <div className="text-long-contenue">
            {texteLong.slice(0, 100) + "..."}
            <span onClick={() => setMontrerVoirPlus(true)}>Voir plus</span>
          </div>
        )}
      </>
    );
  };

  const handleTexteCourt = (texteCourt) => {
    return (
      <div className="text-court-contenue">
          <>{texteCourt}</>
      </div>
    );
  };

  const handleClickVoir = (nom)=>{
      dispacthVisible({type: MON_PROFIL_VISIBLE, payload : false})
      dispacthVisible({type: PROFIL_MEMBRE_VISIBLE, payload : true})
      dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
      dispacthVisible({type: CADRE_VUE_POSTE, payload : false})
      dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
      dispacthVisible({type: RECHERCHE_VISIBLE, payload : false})
      dispacthVisible({type: NOM_MEMBRE, payload : nom})
  }

  const handleSupprimerPost = async (id)=>{
    const URL = `${process.env.REACT_APP_API_URL}/post/supprimer/${id}`;
    await axios
      .delete(
        URL,
       
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        if (response.status === 500)
        return console.log(response.data.ERREUR_SERVER)
          
        if (response.status === 200) 
            dispacth({type: LISTE_POSTS, payload: response.data.AFFICHER_POSTE})
     
        return console.log(response);
      });

  }

  const handleClickLike = async (id)=>{
    const URL = `${process.env.REACT_APP_API_URL}/post/like/${id}`;
    await axios
        .put(
          URL,
          { },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 500)
          return console.log(response.data.ERREUR_SERVER)

          if (response.status === 400)
          return console.log(response.data.POSTER_UTILISATEUR_EXISTAN || response.data.UTILISATEUR_POST_LIKE_EXISTANT)

          if (response.status === 200) 
          dispacth({type: LISTE_POSTS, payload : response.data.POSTER_AFFICHE})
          return console.log(response);
        })
      }
        
  const handleClickUnLike = async (id)=>{
    const URL = `${process.env.REACT_APP_API_URL}/post/unlike/${id}`;
    await axios
        .put(
          URL,
          { },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 500)
          return console.log(response.data.ERREUR_SERVER)

          if (response.status === 400)
          return console.log(response.data.POSTER_UTILISATEUR_INEXISTANT || response.data.UTILISATEUR_POST_LIKE_INEXISTANT || response.data.UTILISATEUR_UNLIKE_INEXISTANT)

          if (response.status === 200) 
          dispacth({type: LISTE_POSTS, payload : response.data.POSTER_AFFICHE})
          return console.log(response);
        })
  }

 const handleCommentaire = async (id)=>{
  const URL = `${process.env.REACT_APP_API_URL}/post/commentaire/${id}`;
  await axios
      .put(
        URL,
        { postCommentaire : commentaire },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 500)
        return console.log(response.data.ERREUR_SERVER)
      
        if (response.status === 400)
        return console.log(response.data.POSTER_UTILISATEUR_EXISTANT)

        if (response.status === 200) 
        dispacth({type: LISTE_POSTS, payload : response.data.POSTER_AFFICHE})
        return console.log(response);
      })
      setCommentaire('')

 }
  return (
        <div className="cadre-poste">
          <div className="cardre-poste-gauche-droite">
            <div className="cadre-poste-contenue">
              <div className="cadre-poste-contenue-image">
                <img
                  src={"/assets/profil/" + poste.photo}
                  alt="post utilisateur"
                />
              </div>
              <div className="cadre-poste-contenue-utilisateur">
                <div className="cadre-poste-contenue-utilisateur-nom" onClick={()=>handleClickVoir(poste.postNom)}>
                  {poste.postNom}
                </div>
                <div className="cadre-poste-contenue-utilisateur-date-poste">
                  {poste.postDate.split('T')[0]}
                </div>
              </div>
            </div>
            <div className="cardre-contenue-droite">
              {
                poste.postNom === state.UTILISATEUR_CONNECTER.nom && <div className="fermerture-icone">
                <IoMdClose onClick={()=>handleSupprimerPost(poste._id)}/>
              </div>
              }
              
            </div>
          </div>
          <div className="poste-information">
            <div className="poste-information-texte">
              {poste.postTexte.length < 100
                ? handleTexteCourt(poste.postTexte)
                : handleTexteLong(poste.postTexte)}
            </div>
            <div className="poste-information-image">
              <img src={"/assets/post/" + poste.postPhoto} alt="poste utilisateur" />
            </div>
          </div>
          <div className="ensemble-bas-poste">
            <div className="cardre-reaction-poste">
              <div className="coeur">
                <div className="nombre-coeur">{poste.postNombreLike.length}</div>
                {
                  poste.postNombreLike.includes(state.UTILISATEUR_CONNECTER._id) ? 
                  <div className="coeur-poste">
                  <BsFillHeartFill onClick={()=>handleClickUnLike(poste._id)}/>
                </div> :
                  <div className="coeur-poste">
                  <BsHeart onClick={()=>handleClickLike(poste._id)} />
                </div>
                }
                
              </div>
              <div className="commentaire">
                <div className="nombre-commentaire">
                  {poste.postCommentaire.length}
                </div>
                <div className="commentaire-poste">
                  <BiComment
                    onClick={() => setMontrerCommentaire(!montrerCommentaire)}
                  />
                </div>
              </div>
            </div>
            {montrerCommentaire && (
              <div className="commentaire-texte">
                <div className="bas-commentaire">
                  <Commentaire comment = {poste.postCommentaire} idPoste={poste._id} />
                </div>
                <div className="bas-commentaire-texare-envoie">
                  <div className="commentaire-utilisateure-bas">
                    <div className="commentaire-textarea">
                      <textarea
                      value={commentaire}
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Votre commentaire..."
                     onChange={(e)=>setCommentaire(e.target.value)}></textarea>
                    </div>
                    <div className="envoie-commentaire">
                      <FiSend onClick={()=>handleCommentaire(poste._id)}/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  );
};

export default CadrePoste;
