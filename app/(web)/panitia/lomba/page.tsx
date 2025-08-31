"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useLombaStore } from "@/app/store/useLombaStore"
import { Lomba } from "@/app/generated/prisma"
import { useRouter } from "next/navigation"
import { format } from "path"
import { formatDate } from "@/app/lib/formatter"

export default function LombaPage() {
    const router = useRouter()
    const { lombas, addLomba, updateLomba, deleteLomba } = useLombaStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState<Lomba | null>(null)

    const handleSave = (data: {
        id?: string
        title: string
        deskripsi: string
        lokasi: string
        waktu: string
    }) => {
        if (data.id) {
            updateLomba({
                id: data.id,
                createdAt: editData?.createdAt || new Date(),
                title: data.title,
                deskripsi: data.deskripsi,
                lokasi: data.lokasi,
                waktu: new Date(data.waktu),
                panitiaId: null,
            })
        } else {
            addLomba({
                id: String(Date.now()),
                title: data.title,
                deskripsi: data.deskripsi,
                lokasi: data.lokasi,
                waktu: new Date(data.waktu),
                panitiaId: null,
            })
        }
        setIsModalOpen(false)
    }

    return (
        <div className="p-6 space-y-6 w-full">
            <div className="flex justify-between items-center ">
                <h1 className="text-2xl font-bold">Daftar Lomba</h1>
                <Button onClick={() => { setEditData(null); setIsModalOpen(true) }}>Tambah Lomba</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {lombas.map((l) => (
                    <Card key={l.id} className="shadow-md">
                        <CardHeader>
                            <CardTitle>{l.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>{l.deskripsi}</p>
                            <p className="text-sm text-gray-500">Lokasi: {l.lokasi}</p>
                            <p className="text-sm text-gray-500">
                                Tanggal: {formatDate(l.waktu)}
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="secondary" onClick={() => router.push(`/panitia/lomba/${l.id}`)}>Detail</Button>
                                <Button size="sm" onClick={() => { setEditData(l); setIsModalOpen(true) }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteLomba(l.id)}>Hapus</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <LombaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editData || undefined}
            />
        </div>
    )
}

interface LombaModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: { id?: string; title: string; deskripsi: string; lokasi: string; waktu: string }) => void
    initialData?: Lomba
}

function LombaModal({ isOpen, onClose, onSave, initialData }: Readonly<LombaModalProps>) {
    const [title, setTitle] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [lokasi, setLokasi] = useState("")
    const [waktu, setWaktu] = useState("")

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title)
            setDeskripsi(initialData.deskripsi)
            setLokasi(initialData.lokasi)
            setWaktu(initialData.waktu.toISOString().split("T")[0]) // prefill YYYY-MM-DD
        } else {
            setTitle("")
            setDeskripsi("")
            setLokasi("")
            setWaktu("")
        }
    }, [initialData, isOpen])

    const handleSubmit = () => {
        onSave({ id: initialData?.id, title, deskripsi, lokasi, waktu })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Lomba" : "Tambah Lomba"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input placeholder="Judul lomba" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input placeholder="Deskripsi lomba" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                    <Input placeholder="Lokasi lomba" value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
                    <Input type="date" value={waktu} onChange={(e) => setWaktu(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSubmit}>{initialData ? "Update" : "Tambah"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
