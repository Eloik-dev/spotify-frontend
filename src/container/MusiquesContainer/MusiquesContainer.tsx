import { useEffect, useState } from 'react';
import styles from './MusiquesContainer.module.scss';
import MusiqueEntity from '../../entities/MusiqueEntity';
import useRequest from '../../hooks/useRequest';
import ApiPaths from '../../common/ApiPaths';
import MusiqueContainerContext from '../../context/MusiqueContainerContext';
import CreateMusiquePopup from '../../components/Popups/Musiques/CreateMusiquePopup';
import Topbar from '../../components/Topbar/Topbar';
import MusiqueCard from '../../components/MusiqueCard/MusiqueCard';
import ListeEntity from '../../entities/ListeEntity';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

/**
 * Cette composante contiendra toutes les informations d'une liste de musiques
 */
export default function MusiquesContainer() {
  const navigate = useNavigate();
  const liste_id = window.location.pathname.split('/')[2];

  const [musiques, setMusiques] = useState<MusiqueEntity[]>([]);
  const [createMusiqueIsOpen, setCreateMusiqueIsOpen] = useState(false);
  const { getRequest, postRequest } = useRequest();

  useEffect(() => {
    getMusiques();
  }, [])

  /**
   * Met à jour toutes les musiques de la liste
   */
  const getMusiques = async () => {
    const resultat = await getRequest(`${ApiPaths.Liste.Get}/${liste_id}`);
    const liste = ListeEntity.toEntity(resultat.data);
    setMusiques(liste.getMusiques());
  };

  /**
   * Effectue une recherche sur les musiques
   * @param recherche La recherche entrée
   */
  const handleSearch = async (recherche: string) => {
    const resultat = await postRequest(ApiPaths.Musiques.Search, { liste_id, recherche });
    const nouvellesMusiques = resultat.data.map((musique: any) => MusiqueEntity.toEntity(musique));
    setMusiques(nouvellesMusiques);
  }

  /**
   * Ouvre la fenêtre de création de musique
   */
  const handleCreateMusique = () => {
    setCreateMusiqueIsOpen(true);
  }

  /**
   * Retourner à /
   */
  const handlePrevious = () => {
    navigate('/');
  }

  return (
    <MusiqueContainerContext.Provider value={{ getMusiques }}>
      <CreateMusiquePopup isOpen={createMusiqueIsOpen} setIsOpen={setCreateMusiqueIsOpen} />
      <Topbar onPrevious={handlePrevious} onSearch={handleSearch} onCreate={handleCreateMusique} />
      <div id={styles['musiques']}>
        {musiques.length === 0 ? (
          <div id={styles['emptyMessage']}>
            <FormattedMessage id="musiquesContainer.empty" />
          </div>
        ) : (
          musiques.map((musique, idx) => (
            <MusiqueCard key={idx} musique={musique} />
          ))
        )}
      </div>
    </MusiqueContainerContext.Provider>
  );
}
