import { FC, MouseEvent, useState } from 'react';
import styles from './MusiqueCard.module.scss';
import MusiqueEntity from '../../entities/MusiqueEntity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeletePopup from '../Popups/DeletePopup/DeletePopup';
import ApiPaths from '../../common/ApiPaths';
import ModifyMusiquePopup from '../Popups/Musiques/ModifyMusiquePopup/ModifyMusiquePopup';

interface IMusiqueCard {
  musique: MusiqueEntity;
}

/**
 * La carte permettant la sélection/modification/suppression de musiques
 */
const MusiqueCard: FC<IMusiqueCard> = ({ musique }) => {
  const [modifyMusiqueIsOpen, setModifyMusiqueIsOpen] = useState(false);
  const [deleteMusiqueIsOpen, setDeleteMusiqueIsOpen] = useState(false);

  /**
   * Ouvrir le menu de modification
   */
  const handleOpenModify = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModifyMusiqueIsOpen(true);
  };

  /**
   * Ouvrir le menu de suppression
   */
  const handleOpenDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteMusiqueIsOpen(true);
  };

  /**
   * Ouvre la musique dans une autre page, car on a pas la motivation de parler avec l'API YouTube
   */
  const handleOpenMusique = () => {
    if (modifyMusiqueIsOpen || deleteMusiqueIsOpen) return;

    window.open(musique.getLien(), '_blank');
  };

  return (
    <div className={styles['musique-card']} onClick={handleOpenMusique}>
      <ModifyMusiquePopup
        isOpen={modifyMusiqueIsOpen}
        setIsOpen={setModifyMusiqueIsOpen}
        musique={musique}
      />
      <DeletePopup
        isOpen={deleteMusiqueIsOpen}
        setIsOpen={setDeleteMusiqueIsOpen}
        id={musique.getId()}
        url={ApiPaths.Musiques.Delete}
        message="Voulez-vous vraiment supprimer cette musique ?"
      />
      <div className={styles['top-content']}>
        {musique.getNom()}
        <div className={styles['actions']}>
          <Button onClick={handleOpenModify}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button onClick={handleOpenDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
      <hr />
      <div className={styles['bottom-content']}>
        Lien: {musique.getLien()} <br />
        Artistes: {musique.getArtistes().join(', ')} <br />
        Likes: {musique.getLikes()} <br />
        Dislikes: {musique.getDislikes()} <br />
        Date de Publication: {musique.getDatePublication().toLocaleDateString()}
      </div>
    </div>
  );
};

export default MusiqueCard;
