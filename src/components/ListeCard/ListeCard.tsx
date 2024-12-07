import { FC, MouseEvent, useState } from 'react';
import styles from './ListeCard.module.scss';
import ListeEntity from '../../entities/ListeEntity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModifyListePopup from '../Popups/Listes/ModifyListePopup/ModifyListePopup';
import DeletePopup from '../Popups/DeletePopup/DeletePopup';
import ApiPaths from '../../common/ApiPaths';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';

interface IListeCard {
  liste: ListeEntity;
}

/**
 * La barre supérieure permettant la sélection/modification/suppression de listes de lecture
 */
const ListeCard: FC<IListeCard> = ({ liste }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [modifyListeIsOpen, setModifyListeIsOpen] = useState(false);
  const [deleteListeIsOpen, setDeleteListeIsOpen] = useState(false);

  /**
   * Naviguer vers la page de la liste de lecture
   */
  const handleNavigateToListe = () => {
    if (modifyListeIsOpen || deleteListeIsOpen) {
      return;
    }

    navigate(`/listes/${liste.getId()}`);
  };

  /**
   * Ouvrir le menu de modification
   */
  const handleOpenModify = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModifyListeIsOpen(true);
  };

  /**
   * Ouvrir le menu de suppression
   */
  const handleOpenDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDeleteListeIsOpen(true);
  };

  return (
    <div className={styles['liste-card']} onClick={handleNavigateToListe}>
      <ModifyListePopup
        isOpen={modifyListeIsOpen}
        setIsOpen={setModifyListeIsOpen}
        listeId={liste.getId()}
        initialNom={liste.getNom()}
      />
      <DeletePopup
        isOpen={deleteListeIsOpen}
        setIsOpen={setDeleteListeIsOpen}
        id={liste.getId()}
        url={ApiPaths.Liste.Delete}
        message={intl.formatMessage({ id: 'deleteListePopup.title' })}
      />
      <div className={styles['top-content']}>
        {liste.getNom()}
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
        <FormattedMessage
          id="listCard.nbMusiques"
          values={{ nbMusiques: liste.getNbMusiques() }}
        />
      </div>
    </div>
  );
};

export default ListeCard;
