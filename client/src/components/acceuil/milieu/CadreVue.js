import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { CADRE_VUE_VISIBLE, PHOTO_CADRE_VUE_POSTE } from "../../../visibleReducer/Action";
import { VisibleContexte } from "../../../visibleReducer/Contexte";
const CadreVue = () => {
    const {stateVisible, dispacthVisible} = useContext(VisibleContexte)
    const handleClickClose = ()=>{
        dispacthVisible({type: PHOTO_CADRE_VUE_POSTE, payload : null})
        dispacthVisible({type: CADRE_VUE_VISIBLE, payload : false})
    }
    return (
        <div className='cadre-vue'>
            <div className="fermerture-icone-vue">
                <IoMdClose onClick={handleClickClose}/>
            </div>
            <div className="cadre-vue-image">
                <img src={stateVisible.photo_vue } alt="cadre vue" />
            </div>
        </div>
    );
};

export default CadreVue;