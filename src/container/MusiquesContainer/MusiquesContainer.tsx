import { useEffect, useState } from 'react';
import styles from './MusiquesContainer.module.scss';
import MusiqueEntity from '../../entities/MusiqueEntity';
import useRequest from '../../hooks/useRequest';
import ApiPaths from '../../common/ApiPaths';
import MusiqueContainerContext from '../../context/MusiqueContainerContext';
import CreateMusiquePopup from '../../components/Popups/Musiques/CreateMusiquePopup/CreateMusiquePopup';
import Topbar from '../../components/Topbar/Topbar';
import MusiqueCard from '../../components/MusiqueCard/MusiqueCard';
import ListeEntity from '../../entities/ListeEntity';
import { useNavigate } from 'react-router';

/**
 * Cette composante contiendra toutes les informations d'une liste de musiques
 */
export default function MusiquesContainer() {
  const navigate = useNavigate();
  const id = window.location.pathname.split('/')[2];

  const [musiques, setMusiques] = useState<MusiqueEntity[]>([]);
  const [createMusiqueIsOpen, setCreateMusiqueIsOpen] = useState(false);
  const { getRequest } = useRequest();

  useEffect(() => {
    console.log(id)
    getMusiques();
  }, [])

  /**
   * Met à jour toutes les musiques de la liste
   */
  const getMusiques = async () => {
    const resultat = await getRequest(`${ApiPaths.Liste.Get}/${id}`);
    const liste = ListeEntity.toEntity(resultat.data);

    setMusiques(liste.getMusiques());
  };

  /**
   * Effectue une recherche sur les musiques
   * @param recherche La recherche entrée
   */
  const handleSearch = (recherche: string) => {
    // Implement search logic here
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
      <div className={styles['musiques-container']}>
        <CreateMusiquePopup isOpen={createMusiqueIsOpen} setIsOpen={setCreateMusiqueIsOpen} />
        <Topbar onPrevious={handlePrevious} onSearch={handleSearch} onCreate={handleCreateMusique} />
        <div id={styles['musiques']}>
          {musiques.length === 0 ? (
            <div id={styles['emptyMessage']}>
              Aucune musique trouvée
            </div>
          ) : (
            musiques.map((musique, idx) => (
              <MusiqueCard key={idx} musique={musique} />
            ))
          )}
        </div>
      </div>
    </MusiqueContainerContext.Provider>
  );
}
