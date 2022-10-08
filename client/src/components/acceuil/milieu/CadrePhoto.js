import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { LISTE_POSTS } from '../../../reducer/Action';
import { MonContexte } from '../../../reducer/Contexte';
import { CADRE_VUE_POSTE, CADRE_VUE_VISIBLE, PHOTO_CADRE_VUE_POSTE, POST_FICHIER } from '../../../visibleReducer/Action';
import { VisibleContexte } from '../../../visibleReducer/Contexte';

const CadrePhoto = () => {
    const {dispacth} = useContext(MonContexte)
  const {stateVisible, dispacthVisible} = useContext(VisibleContexte)
    const InputUseRefFile = useRef();

    const handleClickPhoto = (e)=>{
        InputUseRefFile.current.click();
    }

    const handleChangePhoto = (e)=>{
        const filname = e.target.files[0];
        const URL_Name = URL.createObjectURL(filname);
        dispacthVisible({type: CADRE_VUE_VISIBLE, payload : true })
        dispacthVisible({type: POST_FICHIER, payload : filname })
        dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : URL_Name })
    }
    const handleClickPost = async ()=>{
        const fd = new FormData();
        fd.append("post_texte", stateVisible.texte_poste);
        fd.append("post_image", stateVisible.fichier_poster
        );
         const URL = `${process.env.REACT_APP_API_URL}/post`;
        await axios
          .post(
            URL,
            {
                post_image: fd.get("post_image"),
                post_texte: fd.get("post_texte"),
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            if (response.status === 500)
            return console.log(response.data.ERREUR_SERVER)

            if (response.status === 400)
            return console.log(response.data.POSTER_IMAGE_ERREUR)

            if (response.status === 200) 
            dispacth({type: LISTE_POSTS, payload : response.data.POSTER_AFFICHE_UTILISATEUR})
            dispacthVisible({type: CADRE_VUE_POSTE, payload : true})
            dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : false})
            dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
            return console.log(response);
          })
         
    }
    return (
        <div className='cadre-photo'>
        <div className='cadre-photo-contenue'>
            <div className='cadre-photo-contenue-icone-photo'>
                <FaPhotoVideo onClick={handleClickPhoto}/> 
                <div className='cadre-photo-contenue-icone-photo-texte-photo'>
                    <input ref={InputUseRefFile} onChange={handleChangePhoto} style={{display:'none'}} type="file"/>
                </div>
                <div className='cadre-photo-contenue-icone-photo-texte'>Photo/Vidéo</div>

            </div>
            <div className='cadre-photo-contenue-icone-envoie'>
                <FiSend onClick={handleClickPost}/>
                <div className='cadre-photo-contenue-icone-envoie-texte'>Envoyer</div>
            </div>
        </div>
        </div>
    );
};

export default CadrePhoto;