import { createContext } from "react";

interface MusiqueContainerContext {
    getMusiques: () => void
}

export default createContext<MusiqueContainerContext>({
    getMusiques: () => { }
});