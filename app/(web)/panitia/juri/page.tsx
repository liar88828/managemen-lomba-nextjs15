"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Juri, useJuriStore } from "@/app/store/useJuriStore"

export default function JuriPage() {
    const { juri, addJuri, updateJuri, deleteJuri } = useJuriStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState<Juri | null>(null)

    const handleSave = (data: { id?: string; name: string; lomba: string }) => {
        if (data.id) {
            updateJuri({ id: data.id, name: data.name, lomba: data.lomba })
        } else {
            addJuri({ id: String(Date.now()), name: data.name, lomba: data.lomba })
        }
        setIsModalOpen(false)
    }

    return (
        <div className="p-6 space-y-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Daftar Juri</h1>
                <Button onClick={() => { setEditData(null); setIsModalOpen(true) }}>Tambah Juri</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {juri.map((j) => (
                    <Card key={j.id} className="shadow-md">
                        <CardHeader>
                            <CardTitle>{j.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>Lomba: {j.lomba}</p>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => { setEditData(j); setIsModalOpen(true) }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteJuri(j.id)}>Hapus</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <JuriModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editData || undefined}
            />
        </div>
    )
}

interface JuriModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: { id?: string; name: string; lomba: string }) => void
    initialData?: Juri
}

function JuriModal({ isOpen, onClose, onSave, initialData }: JuriModalProps) {
    const [name, setName] = useState("")
    const [lomba, setLomba] = useState("")

    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setLomba(initialData.lomba)
        } else {
            setName("")
            setLomba("")
        }
    }, [initialData, isOpen])

    const handleSubmit = () => {
        onSave({ id: initialData?.id, name, lomba })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Juri" : "Tambah Juri"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input placeholder="Nama Juri" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Lomba" value={lomba} onChange={(e) => setLomba(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSubmit}>{initialData ? "Update" : "Tambah"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
