import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Juri {
    id: string
    name: string
    lomba: string
}

interface JuriState {
    juri: Juri[]
    addJuri: (j: Juri) => void
    updateJuri: (j: Juri) => void
    deleteJuri: (id: string) => void
}

export const useJuriStore = create<JuriState>()(
    persist((set) => ({
        juri: [],
        addJuri: (j) => set((state) => ({ juri: [...state.juri, j] })),
        updateJuri: (j) =>
            set((state) => ({
                juri: state.juri.map((item) => (item.id === j.id ? j : item)),
            })),
        deleteJuri: (id) =>
            set((state) => ({
                juri: state.juri.filter((item) => item.id !== id),
            })),
    }), {
        name: "juri-storage", // key in localStorage
    })
)