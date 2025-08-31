import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Lomba {
    id: string
    createdAt: Date
    title: string
    deskripsi: string
    lokasi: string
    waktu: Date
    panitiaId: string | null
}

interface LombaState {
    lombas: Lomba[]
    addLomba: (l: Omit<Lomba, "createdAt">) => void
    updateLomba: (l: Lomba) => void
    deleteLomba: (id: string) => void
    getLomba: (id: string) => Lomba | undefined
}

export const useLombaStore = create<LombaState>()(
    persist(
        (set, get) => ({
            lombas: [],
            addLomba: (l) =>
                set((state) => ({
                    lombas: [
                        ...state.lombas,
                        { ...l, createdAt: new Date() }, // auto createdAt
                    ],
                })),
            updateLomba: (l) =>
                set((state) => ({
                    lombas: state.lombas.map((item) => (item.id === l.id ? l : item)),
                })),
            deleteLomba: (id) =>
                set((state) => ({
                    lombas: state.lombas.filter((item) => item.id !== id),
                })),
            getLomba: (id) => get().lombas.find((l) => l.id === id),
        }), {
        name: "lomba-storage", // key in localStorage
    }))
