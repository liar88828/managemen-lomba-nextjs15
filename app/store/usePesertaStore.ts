import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Peserta {
    id: string
    name: string
    email: string
    hp: string
    lokasi: string
    createdAt: string | Date
}

interface PesertaState {
    peserta: Peserta[]
    addPeserta: (p: Omit<Peserta, "createdAt">) => void
    updatePeserta: (p: Peserta) => void
    deletePeserta: (id: string) => void
    getPeserta: (id: string) => Peserta | undefined
}

export const usePesertaStore = create<PesertaState>()(
    persist(
        (set, get) => ({
            peserta: [],
            addPeserta: (p) =>
                set((state) => ({ peserta: [...state.peserta, { ...p, createdAt: new Date() }] })),
            updatePeserta: (p) =>
                set((state) => ({
                    peserta: state.peserta.map((item) => (item.id === p.id ? p : item)),
                })),
            deletePeserta: (id) =>
                set((state) => ({
                    peserta: state.peserta.filter((item) => item.id !== id),
                })),
            getPeserta: (id) => get().peserta.find((p) => p.id === id),
        }),
        {
            name: "peserta-storage", // key in localStorage
        })
)
