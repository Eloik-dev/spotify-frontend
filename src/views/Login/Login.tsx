import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Login.module.scss'
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { Button, OutlinedInput } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useNavigate } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

/**
 * Affiche la page de connexion
 */
export default function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Données utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);

  /**
   * Connecte l'utilisateur à l'aide de Firebase
   */
  const handleConnexion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  return (
    <div className={styles['authentication-container']}>
      <form onSubmit={handleConnexion} className={styles['inner-box']}>
        <div className={styles['header']}>
          <FontAwesomeIcon className='speutifye-icon' icon={faSpotify} />
          <h1>
            <FormattedMessage id="login.title" />
          </h1>
        </div>
        <hr className={styles['separateur']} />
        <div className={styles['champs-container']}>
          <div className={styles['champ']}>
            <label htmlFor="email">
              <FormattedMessage id="login.courriel" />
            </label>
            <OutlinedInput type='email' name='email' placeholder="Courriel" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles['champ']}>
            <label htmlFor="password">
              <FormattedMessage id="login.password" />
            </label>
            <OutlinedInput type='password' name='password' placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <Button type='submit' id={styles['boutonConnexion']} variant='outlined'>
          <FormattedMessage id="login.confirm" />
        </Button>
      </form>
    </div>
  )
}