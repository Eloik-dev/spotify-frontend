import { useEffect, useState } from 'react'
import styles from './PlaylistContainer.module.scss'
import PlaylistEntity from '../../entities/PlaylistEntity'
import useRequest from '../../hooks/useRequest';
import ApiPaths from '../../common/ApiPaths';
import settings from '../../settings';

/**
 * Cette composante contiendra toutes les informations d'une liste de lecture
 */
export default function PlaylistContainer() {
  const [playlists, setPlaylists] = useState<PlaylistEntity[]>([]);
  const { getRequest } = useRequest();

  useEffect(() => {
    getListes();
  }, [])

  /**
   * Met à jour toutes les listes de lecture
   */
  const getListes = async () => {
    const playlists = await getRequest(settings.ApiPath + ApiPaths.Playlists.GetAll);
    console.log(playlists)
  }

  return (
    <div className={styles['playlistContainer']}>
      PlaylistContainer
    </div>
  )
}