import Sidebar from "../../components/Sidebar/Sidebar";
import PlaylistContainer from "../../container/PlaylistContainer/PlaylistContainer";
import './Layout.module.scss'

/**
 * Cette vue contrôlera l'affichage de la barre de navigation et la liste de lecture
 */
export default function Layout() {
  return (
    <main>
      <Sidebar />
      <PlaylistContainer />
    </main>
  )
}