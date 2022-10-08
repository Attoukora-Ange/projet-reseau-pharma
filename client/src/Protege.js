import React from "react";
import { Navigate } from "react-router-dom";
// import { IdContexte } from "./App";
import Media from "./components/media/Media";
import Accueil from "./pages/Accueil";

const Protege = ({id}) => {
    // const id = useContext(IdContexte);
   console.log(id)
  return (
    <div>
      {id ? (
        <>
          <Media />
          <Accueil />
        </>
      ) : (
        <>
        <Navigate to="/connexion" />
        {console.log(id)}
        </>
      )}
    </div>

  );
};

export default Protege;
