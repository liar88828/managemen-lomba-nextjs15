"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Peserta, usePesertaStore } from "@/app/store/usePesertaStore"
import { useLombaStore } from "@/app/store/useLombaStore"


export default function Page() {
    const { peserta, addPeserta, updatePeserta, deletePeserta } = usePesertaStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState<Peserta | null>(null)

    const handleSave = (data: {
        id?: string
        name: string
        email: string
        hp: string
        lokasi: string
        lomba: string
    }) => {
        if (data.id) {
            if (!data.id) throw new Error("Peserta id is required for update")
            updatePeserta({ ...data, id: data.id, createdAt: editData?.createdAt || new Date() })
        } else {
            addPeserta({ ...data, id: String(Date.now()) })
        }
        setIsModalOpen(false)
    }

    return (
        <div className="p-6 space-y-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Daftar Peserta</h1>
                <Button onClick={() => { setEditData(null); setIsModalOpen(true) }}>Tambah Peserta</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {peserta.map((p) => (
                    <Card key={p.id} className="shadow-md">
                        <CardHeader>
                            <CardTitle>{p.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Email:</strong> {p.email}</p>
                            <p><strong>No HP:</strong> {p.hp}</p>
                            <p><strong>Lokasi:</strong> {p.lokasi}</p>
                            <p><strong>Lomba:</strong> {p.lomba}</p>
                            <p><strong>Dibuat pada:</strong> {p.createdAt.toLocaleString("id-ID")}</p>
                            <div className="flex gap-2 mt-2">
                                <Button size="sm" onClick={() => { setEditData(p); setIsModalOpen(true) }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => deletePeserta(p.id)}>Hapus</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <PesertaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editData || undefined}
            />
        </div>
    )
}
interface PesertaModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: {
        id?: string
        name: string
        email: string
        hp: string
        lokasi: string
        lomba: string
    }) => void
    initialData?: Peserta
}

export function PesertaModal({ isOpen, onClose, onSave, initialData }: Readonly<PesertaModalProps>) {
    const { lombas } = useLombaStore()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [hp, setHp] = useState("")
    const [lokasi, setLokasi] = useState("")
    const [lomba, setLomba] = useState("")

    // prefill form when editing
    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setEmail(initialData.email)
            setHp(initialData.hp)
            setLokasi(initialData.lokasi)
            setLomba(initialData.lomba)
        } else {
            setName("")
            setEmail("")
            setHp("")
            setLokasi("")
            setLomba("")
        }
    }, [initialData, isOpen])

    const handleSubmit = () => {
        onSave({ id: initialData?.id, name, email, hp, lokasi, lomba })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Peserta" : "Tambah Peserta"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                        <Input id="name" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="hp" className="block text-sm font-medium text-gray-700">No HP</label>
                        <Input id="hp" placeholder="No HP" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">Lokasi</label>
                        <Input id="lokasi" placeholder="Lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="lomba" className="block text-sm font-medium text-gray-700">Lomba</label>
                        <select
                            id="lomba"
                            value={lomba}
                            onChange={(e) => setLomba(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">-- Pilih Lomba --</option>
                            {lombas.map((l) => (
                                <option key={l.id} value={l.title}>
                                    {l.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSubmit}>{initialData ? "Update" : "Tambah"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}