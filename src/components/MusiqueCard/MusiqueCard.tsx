import { FC, MouseEvent, useState } from 'react';
import styles from './MusiqueCard.module.scss';
import MusiqueEntity from '../../entities/MusiqueEntity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeletePopup from '../Popups/DeletePopup/DeletePopup';
import ApiPaths from '../../common/ApiPaths';
import ModifyMusiquePopup from '../Popups/Musiques/ModifyMusiquePopup';
import { useIntl } from 'react-intl';

interface IMusiqueCard {
  musique: MusiqueEntity;
}

/**
 * La carte permettant la sélection/modification/suppression de musiques
 */
const MusiqueCard: FC<IMusiqueCard> = ({ musique }) => {
  const intl = useIntl();
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
        message={intl.formatMessage({ id: 'deleteMusiquePopup.title' })}
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
        {intl.formatMessage({ id: 'terms.link' })}: {musique.getLien()} <br />
        {intl.formatMessage({ id: 'terms.artists' })}: {musique.getArtistes().join(', ')} <br />
        {intl.formatMessage({ id: 'terms.likes' })}: {musique.getLikes()} <br />
        {intl.formatMessage({ id: 'terms.dislikes' })}: {musique.getDislikes()} <br />
        {intl.formatMessage({ id: 'terms.date' })}: {musique.getDatePublication().toLocaleDateString()}
      </div>
    </div>
  );
};

export default MusiqueCard;
