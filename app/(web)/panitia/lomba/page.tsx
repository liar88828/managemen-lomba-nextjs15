"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { hapusLomba } from "@/app/actions/lomba"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTransition } from "react"
// import { prisma } from "@/app/lib/prisma"
import { lombaList } from "@/app/assets/lomba"

interface Lomba {
    id: string
    nama: string
    deskripsi: string
    tanggal: string
}

export default function DaftarLombaPage() {

    //   const lombaList = await prisma.lomba.findMany({ orderBy: { waktu: "asc" } })

    const [lombas, setLombas] = useState<Lomba[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState<Lomba | undefined>()

    const handleSave = (data: { id?: string; nama: string; deskripsi: string; tanggal: string }) => {
        if (data.id) {
            // Update
            setLombas((prev) =>
                prev.map((l) => (l.id === data.id ? { ...l, ...data } : l))
            )
        } else {
            // Tambah
            setLombas((prev) => [
                ...prev,
                { ...data, id: String(Date.now()) }
            ])
        }
    }

    const handleDelete = (id: string) => {
        setLombas((prev) => prev.filter((l) => l.id !== id))
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Daftar Lomba 17 Agustus</h1>
                <Button onClick={() => { setEditData(undefined); setIsModalOpen(true) }}>
                    Tambah Lomba
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {lombas.map((lomba) => (
                    <Card key={lomba.id} className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{lomba.nama}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>{lomba.deskripsi}</p>
                            <p className="text-sm text-gray-500">Tanggal: {lomba.tanggal}</p>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    size="sm"
                                    onClick={() => { setEditData(lomba); setIsModalOpen(true) }}
                                >
                                    Edit
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(lomba.id)}>
                                    Hapus
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal Tambah/Edit */}
            <LombaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editData}
            />
        </div>
    )
}


import { Input } from "@/components/ui/input"
interface LombaModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: { id?: string; nama: string; deskripsi: string; tanggal: string }) => void
    initialData?: { id?: string; nama: string; deskripsi: string; tanggal: string }
}

export function LombaModal({ isOpen, onClose, onSave, initialData }: LombaModalProps) {
    const [nama, setNama] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [tanggal, setTanggal] = useState("")

    useEffect(() => {
        if (initialData) {
            setNama(initialData.nama)
            setDeskripsi(initialData.deskripsi)
            setTanggal(initialData.tanggal)
        } else {
            setNama("")
            setDeskripsi("")
            setTanggal("")
        }
    }, [initialData, isOpen])

    const handleSubmit = () => {
        onSave({ id: initialData?.id, nama, deskripsi, tanggal })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Lomba" : "Tambah Lomba"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input placeholder="Nama lomba" value={nama} onChange={(e) => setNama(e.target.value)} />
                    <Input placeholder="Deskripsi lomba" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                    <Input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSubmit}>{initialData ? "Update" : "Tambah"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
