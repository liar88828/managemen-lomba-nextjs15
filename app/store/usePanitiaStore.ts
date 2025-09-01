import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Panitia {
    id: string
    name: string
    email: string
    hp: string
    lokasi: string
    createdAt: Date
    // lomba: string
}

interface PanitiaState {
    panitia: Panitia[]
    addPanitia: (p: Omit<Panitia, "createdAt">) => void
    updatePanitia: (p: Panitia) => void
    deletePanitia: (id: string) => void
    getPanitia: (id: string) => Panitia | undefined
}

export const usePanitiaStore = create<PanitiaState>()(
    persist(
        (set, get) => ({
            panitia: [],
            addPanitia: (p) =>
                set((state) => ({ panitia: [...state.panitia, { ...p, createdAt: new Date() }] })),
            updatePanitia: (p) =>
                set((state) => ({
                    panitia: state.panitia.map((item) => (item.id === p.id ? p : item)),
                })),
            deletePanitia: (id) =>
                set((state) => ({
                    panitia: state.panitia.filter((item) => item.id !== id),
                })),
            getPanitia: (id) => get().panitia.find((p) => p.id === id),
        }),
        {
            name: "panitia-storage", // key in localStorage
        })
)
