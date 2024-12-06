import { Button, Input } from '@mui/material'
import styles from './Topbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

interface ITopbar {
  onPrevious?: () => void
  onSearch: (recherche: string) => void
  onCreate: () => void
}

/**
 * Une barre supérieure permettant la recherche et l'ajout soit de liste de lecture, soit de musique
 */
const Topbar: FC<ITopbar> = ({ onPrevious, onSearch, onCreate }) => {
  return (
    <div className={styles['topbar']}>
      {onPrevious ?
        <Button onClick={onPrevious}>
          <FontAwesomeIcon fontSize={20} icon={faAngleLeft} />
        </Button>
        : <div />}

      <div id={styles['topbarContent']}>
        <Input placeholder='Rechercher' onChange={(e) => onSearch(e.target.value)} />
        <Button variant="outlined" onClick={onCreate}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </div>
  )
}

export default Topbar;