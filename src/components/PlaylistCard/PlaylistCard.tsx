import { FC } from 'react'
import styles from './PlaylistCard.module.scss'
import PlaylistEntity from '../../entities/PlaylistEntity'

interface IPlaylistCard {
  playlist: PlaylistEntity
}

/**
 * La barre de navigation permettant la sélection/modification/suppression de listes de lecture
 */
const PlaylistCard: FC<IPlaylistCard> = ({ playlist }) => {
  return (
    <div className={styles['playlist-card']}>
      {playlist.getNom()}
    </div>
  )
}

export default PlaylistCard;