import styles from './Authentication.module.scss'
import SpotifyLogo from '../../assets/icons/spotify-logo.svg';

/**
 * Affiche la page de connexion
 */
export default function Login() {
  return (
    <div className={styles['authentication-container']}>
      <div id={styles['innerBox']}>
        <div id={styles['header']}>
          <img src={SpotifyLogo} alt="Spoootify" />
        </div>
      </div>
    </div>
  )
}