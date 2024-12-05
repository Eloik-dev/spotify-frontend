import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Sidebar.module.scss'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faHome, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router'

/**
 * La barre de navigation permettant la sélection/modification/suppression de listes de lecture
 */
export default function Sidebar() {
  const navigate = useNavigate();

  /**
   * Déconnecte l'utilisateur et le renvoi à la page de connexion
   */
  const handlerDeconnexion = () => {
    signOut(auth);
    navigate('/login');
  }

  /**
   * Navigue à l'accueil
   */
  const handlerAccueil = () => {
    navigate('/');
  }

  return (
    <div className={styles['sidebar']}>
      <div id={styles['boutonsTop']}>
        <FontAwesomeIcon fontSize={40} className='speutifye-icon' icon={faSpotify} />
        <button id={styles['boutonHome']} onClick={handlerAccueil}>
          <FontAwesomeIcon fontSize={25} icon={faHome} />
        </button>
      </div>
      <button id={styles['boutonSignout']} onClick={handlerDeconnexion}>
        <FontAwesomeIcon fontSize={25} icon={faSignOut} />
      </button>
    </div>
  )
}