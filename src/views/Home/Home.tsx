import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../../components/Sidebar/Sidebar";
import PlaylistContainer from "../../container/PlaylistContainer/PlaylistContainer";
import './Home.module.scss'
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import UtilisateurContext from "../../context/UtilisateurContext";

/**
 * Cette vue contrôlera l'affichage de la barre de navigation et la liste de lecture
 */
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // si loading = true, ça veut dire que le firebase n'est pas encore prêt.
    if (loading) return;
    // si user est null, l'utilisateur n'est pas authentifié
    console.log(user)
    if (!user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (!user) { 
    return <div>Redirection vers la page de connexion...</div>; 
  }

  return (
    <main>
      <UtilisateurContext.Provider value={{ utilisateur: user }}>
        <Sidebar />
        <PlaylistContainer />
      </UtilisateurContext.Provider>
    </main>
  )
}