import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Panitia } from "./usePanitiaStore"
import { Peserta } from "./usePesertaStore"

export interface AlatLomba {
    id: string
    title: string
    price: number
    qty: number
}

export interface Lomba {
    id: string
    createdAt: string | Date
    title: string
    deskripsi: string
    lokasi: string
    waktu: Date
    panitia: Panitia[]
    peserta: Peserta[]
    alatLomba: AlatLomba[]
}

interface LombaState {
    lombas: Lomba[]
    addLomba: (l: Omit<Lomba, "createdAt" | "panitia" | "peserta" | "alatLomba">) => void
    updateLomba: (l: Lomba) => void
    deleteLomba: (id: string) => void
    getLomba: (id: string) => Lomba | undefined

    addPanitiaToLomba: (lombaId: string, panitia: Panitia) => void
    removePanitiaFromLomba: (lombaId: string, panitiaId: string) => void

    addPesertaToLomba: (lombaId: string, peserta: Peserta) => void
    removePesertaFromLomba: (lombaId: string, pesertaId: string) => void

    addAlatToLomba: (lombaId: string, alat: Omit<AlatLomba, "id">) => void
    updateAlatInLomba: (lombaId: string, alat: AlatLomba) => void
    removeAlatFromLomba: (lombaId: string, alatId: string) => void

    getLombaByIdPeserta: (idPeserta: string) => Lomba[]
    getLombaByIdPanitia: (idPanitia: string) => Lomba[]
}

export const useLombaStore = create<LombaState>()(
    persist(
        (set, get) => ({
            lombas: [],

            addLomba: (l) =>
                set((state) => ({
                    lombas: [
                        ...state.lombas,
                        {
                            ...l,
                            createdAt: new Date(),
                            panitia: [],
                            peserta: [],
                            alatLomba: [],
                        },
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

            addPanitiaToLomba: (lombaId, panitia) => {
                const lomba = get().lombas.find((l) => l.id === lombaId)
                if (!lomba) return

                const alreadyExists = lomba.panitia.some((p) => p.id === panitia.id)
                if (alreadyExists) return

                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId ? { ...l, panitia: [...l.panitia, panitia] } : l
                    ),
                }))
            },

            removePanitiaFromLomba: (lombaId, panitiaId) =>
                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId
                            ? { ...l, panitia: l.panitia.filter((p) => p.id !== panitiaId) }
                            : l
                    ),
                })),

            addPesertaToLomba: (lombaId, peserta) => {
                const lomba = get().lombas.find((l) => l.id === lombaId)
                if (!lomba) return

                const alreadyExists = lomba.peserta.some((p) => p.id === peserta.id)
                if (alreadyExists) return

                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId ? { ...l, peserta: [...l.peserta, peserta] } : l
                    ),
                }))
            },

            removePesertaFromLomba: (lombaId, pesertaId) =>
                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId
                            ? { ...l, peserta: l.peserta.filter((p) => p.id !== pesertaId) }
                            : l
                    ),
                })),

            // ----------------- alatLomba -----------------
            addAlatToLomba: (lombaId, alat) =>
                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId
                            ? {
                                ...l,
                                alatLomba: [
                                    ...l.alatLomba,
                                    { id: String(Date.now()), ...alat },
                                ],
                            }
                            : l
                    ),
                })),

            updateAlatInLomba: (lombaId, alat) =>
                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId
                            ? {
                                ...l,
                                alatLomba: l.alatLomba.map((a) =>
                                    a.id === alat.id ? alat : a
                                ),
                            }
                            : l
                    ),
                })),

            removeAlatFromLomba: (lombaId, alatId) =>
                set((state) => ({
                    lombas: state.lombas.map((l) =>
                        l.id === lombaId
                            ? { ...l, alatLomba: l.alatLomba.filter((a) => a.id !== alatId) }
                            : l
                    ),
                })),

            // ----------------- query helpers -----------------
            getLombaByIdPeserta: (idPeserta) => {
                return get().lombas.filter((l) =>
                    l.peserta.some((p) => p.id === idPeserta)
                )
            },

            getLombaByIdPanitia: (idPanitia) => {
                return get().lombas.filter((l) =>
                    l.panitia.some((p) => p.id === idPanitia)
                )
            },
        }),
        { name: "lomba-storage" }
    )
)
