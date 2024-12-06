import { useEffect, useState } from 'react'
import styles from './ListeContainer.module.scss'
import useRequest from '../../hooks/useRequest';
import ApiPaths from '../../common/ApiPaths';
import Topbar from '../../components/Topbar/Topbar';
import ListeCard from '../../components/ListeCard/ListeCard';
import CreateListePopup from '../../components/Popups/Listes/CreateListePopup/CreateListePopup';
import ListeEntity from '../../entities/ListeEntity';
import ListeContainerContext from '../../context/ListeContainerContext';

/**
 * Cette composante contiendra toutes les informations d'une liste de lecture
 */
export default function ListeContainer() {
  const [listes, setListes] = useState<ListeEntity[]>([]);
  const [createListeIsOpen, setCreateListeIsOpen] = useState(false);
  const { getRequest } = useRequest();

  useEffect(() => {
    getListes();
  }, [])

  /**
   * Met à jour toutes les listes de lecture
   */
  const getListes = async () => {
    const resultat = await getRequest(ApiPaths.Liste.GetAll);
    const nouvellesListes = resultat.data.map((liste: any) => ListeEntity.toEntity(liste));
    setListes(nouvellesListes);
  };

  /**
   * Effectue une recherche sur les listes de lecture
   * @param recherche La recherche entrée
   */
  const handleSearch = (recherche: string) => {
  }

  /**
   * Ouvre la fenêtre de création de liste de lecture
   */
  const handleCreateListe = () => {
    setCreateListeIsOpen(true);
  }

  return (
    <ListeContainerContext.Provider value={{ getListes }}>
      <CreateListePopup isOpen={createListeIsOpen} setIsOpen={setCreateListeIsOpen} />
      <Topbar onSearch={handleSearch} onCreate={handleCreateListe} />
      <div id={styles['listes']}>
        {listes.length === 0 ? (
          <div id={styles['emptyMessage']}>
            Aucune liste trouvée
          </div>
        ) : (
          listes.map((liste, idx) => (
            <ListeCard key={idx} liste={liste} />
          ))
        )}
      </div>
    </ListeContainerContext.Provider>
  );
}