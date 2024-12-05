import { User } from "firebase/auth";
import { createContext } from "react";

interface UtilisateurContext {
    utilisateur: User | null | undefined
}

export default createContext<UtilisateurContext>({
    utilisateur: null
});