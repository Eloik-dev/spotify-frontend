import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListeContainer from "../../container/ListeContainer/ListeContainer";
import './Home.module.scss'
import { auth } from "../../firebase";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import UtilisateurContext from "../../context/UtilisateurContext";
import styles from './Home.module.scss';
import MusiquesContainer from "../../container/MusiquesContainer/MusiquesContainer";

/**
 * Cette vue contrôlera l'affichage de la barre de navigation et la liste de lecture
 */
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // si loading = true, ça veut dire que le firebase n'est pas encore prêt.
    if (loading) return;
    // si user est null, l'utilisateur n'est pas authentifié
    console.log(user)
    if (!user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading) {
    return (
      <div className={styles['status-text-container']}>
        <div id={styles['statusText']}>Chargement en cours...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles['status-text-container']}>
        <div id={styles['statusText']}>Redirection vers la page de connexion...</div>
      </div>
    );
  }

  /**
   * Fait le rendu de la page selon l'url
   * @returns 
   */
  const renderContainer = () => {
    if (location.pathname.startsWith('/listes') && location.pathname.split('/').length > 2) {
      return <MusiquesContainer />;
    }
    return <ListeContainer />;
  };

  return (
    <main>
      <UtilisateurContext.Provider value={{ utilisateur: user }}>
        <Sidebar />
        {renderContainer()}
      </UtilisateurContext.Provider>
    </main>
  )
}