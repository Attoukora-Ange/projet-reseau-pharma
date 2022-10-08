import Accueil from "./pages/Accueil";
import "./css/initialisation/initialisation.css";
import Navigation from "./components/navigation/Navigation";
import { Route, Routes, useNavigate } from "react-router-dom";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import PassReset from "./components/connexion/PassReset";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Media from "./components/media/Media";
import Protege from "./Protege";
export const IdContexte = createContext();


function App() {

  const [id, setId] = useState(null);
  const navigate = useNavigate()
  const URL_UTILISATEUR = `${process.env.REACT_APP_API_URL}/jwt`;
  useEffect(() => {
    axios
      .get(URL_UTILISATEUR, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setId(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [URL_UTILISATEUR, navigate,id]);
  // }, []);

  return (
    <IdContexte.Provider value={id}>
      <div className="App">
        <Navigation />
        {console.log(id)}
        {id ? (
          <>
          {/* <Media/> */}
            <Routes>
              <Route path="/" element={<Protege id = {id}/>} />
            </Routes>
          </>
        ) : ( 
          <>
            <Routes>
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/password-email" element={<PassReset />} />
            </Routes>
          </>
        )} 
      </div>
    </IdContexte.Provider>
  );
}

export default App;
