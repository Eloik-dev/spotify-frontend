import { createContext } from "react";

interface ListeContainerContext {
    getListes: () => void
}

export default createContext<ListeContainerContext>({
    getListes: () => { }
});