"use client"

import { useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lomba, useLombaStore } from "@/app/store/useLombaStore"
import { formatDate, formatRupiah } from "@/app/lib/formatter"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Panitia, usePanitiaStore } from "@/app/store/usePanitiaStore"
import { usePesertaStore } from "@/app/store/usePesertaStore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function DetailLombaPage() {
    const params = useParams()
    const lombaId = params.id as string

    // const getLomba = useLombaStore((state) => state.getLomba)
    // const [lomba, setLomba] = useState<Lomba | undefined>()
    // useEffect(() => {
    //     setLomba(getLomba(lombaId))
    // }, [lombaId, getLomba])

    // langsung derive dari store -> selalu reactive
    const lomba = useLombaStore((state) => state.getLomba(lombaId))
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [lombaId])

    if (!mounted) {
        return <div>Loading...</div> // supaya server & client sama
    }

    if (!lomba) return <div>Lomba tidak ditemukan.</div>


    return (
        <div className="p-6 space-y-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Detail Lomba</h1>
                <Link href="/lomba">
                    <Button variant="outline">Kembali</Button>
                </Link>
            </div>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>{lomba.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Deskripsi:</strong> {lomba.deskripsi}</p>
                    <p><strong>Lokasi:</strong> {lomba.lokasi}</p>
                    <p><strong>Tanggal:</strong> {formatDate(lomba.waktu)}</p>
                    <p><strong>Dibuat pada:</strong> {formatDate(lomba.createdAt)}</p>
                </CardContent>
            </Card>

            <AlatLombaTable lomba={lomba} />

            {/* Panitia Lomba */}
            <LombaDetailPanitia lomba={lomba} />


            {/* Peserta Lomba */}
            <LombaDetailPeserta lomba={lomba} />

        </div>
    )
}



export function AlatLombaTable({ lomba }: Readonly<{ lomba: Lomba }>) {
    const { removeAlatFromLomba, addAlatToLomba, updateAlatInLomba } = useLombaStore()
    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [qty, setQty] = useState<number>(0)

    const resetForm = () => {
        setEditingId(null)
        setTitle("")
        setPrice(0)
        setQty(0)
    }

    const handleSave = () => {
        if (editingId) {
            updateAlatInLomba(lomba.id, {
                id: editingId,
                title,
                price,
                qty,
            })
        } else {
            addAlatToLomba(lomba.id, {
                title,
                price,
                qty,
            })
        }

        resetForm()
        setOpen(false)
    }

    const handleOpen = (alat?: any) => {
        if (alat) {
            setEditingId(alat.id)
            setTitle(alat.title)
            setPrice(alat.price)
            setQty(alat.qty)
        } else {
            setEditingId(null)
            resetForm()
        }
        setOpen(true)
    }

    if (!lomba) return <div className="text-red-500">Lomba not found</div>

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Daftar Alat Lomba</CardTitle>
                <Button onClick={() => handleOpen()}>Tambah Alat</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Daftar alat yang digunakan pada lomba.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Alat</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="w-20">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lomba.alatLomba?.map((alat: any) => (
                            <TableRow key={alat.id}>
                                <TableCell className="font-medium">{alat.title}</TableCell>
                                <TableCell>{formatRupiah(alat.price)}</TableCell>
                                <TableCell>{alat.qty}</TableCell>
                                <TableCell>{formatRupiah(alat.qty * alat.price)}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleOpen(alat)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeAlatFromLomba(lomba.id, alat.id)}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell className="font-bold">Total Biaya</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="font-bold">
                                {formatRupiah(lomba.alatLomba?.reduce((sum, alat) => sum + (alat.price * alat.qty), 0) || 0)}
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? "Edit Alat" : "Tambah Alat"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label className="block text-sm font-medium mb-1">Nama Alat</Label>
                            <Input
                                placeholder="Nama Alat"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1">Harga</Label>
                            <Input
                                type="number"
                                placeholder="Harga"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1">Qty</Label>
                            <Input
                                type="number"
                                placeholder="Qty"
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSave}>
                            {editingId ? "Update" : "Simpan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}



export function LombaDetailPanitia({ lomba }: Readonly<{ lomba: Lomba }>) {

    const { addPanitiaToLomba, removePanitiaFromLomba, } = useLombaStore()
    const panitiaList: Panitia[] = usePanitiaStore((state) => state.panitia)


    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Panitia Lomba</CardTitle>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">Kelola Panitia</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Kelola Panitia</DialogTitle>
                            <DialogDescription >Panitia yang tersedia</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            {panitiaList.length === 0 && (
                                <p className="text-sm text-muted-foreground">Belum ada panitia terdaftar.</p>
                            )}
                            {panitiaList
                                .filter((p) => !lomba.panitia?.some(lp => lp.id === p.id))
                                .map((p) => (
                                    <Card key={p.id}>
                                        <CardContent className="flex justify-between items-center ">
                                            <div>
                                                <p className="font-medium">{p.name}</p>
                                                <p className="text-sm text-muted-foreground">{p.email}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => addPanitiaToLomba(lomba.id, p)}
                                            >
                                                Tambah
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardHeader>

            <CardContent>
                <div className="grid gap-2">
                    {!lomba.panitia || lomba.panitia.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada panitia ditambahkan.</p>
                    ) : (
                        lomba.panitia.map((p) => (
                            <Card key={p.id}>
                                <CardContent className="flex justify-between items-center p-3">
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        <p className="text-sm text-muted-foreground">{p.email}</p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removePanitiaFromLomba(lomba.id, p.id)}
                                    >
                                        Hapus
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>

        </Card>

    )
}


export function LombaDetailPeserta({ lomba }: Readonly<{ lomba: Lomba }>) {

    const { addPesertaToLomba, removePesertaFromLomba } = useLombaStore()
    const pesertaList = usePesertaStore((state) => state.peserta)

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Peserta Lomba</CardTitle>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">Kelola Peserta</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Kelola Peserta</DialogTitle>
                            <DialogDescription>Peserta yang tersedia</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            {pesertaList.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Belum ada peserta terdaftar.
                                </p>
                            )}
                            {pesertaList
                                .filter((p) => !lomba.peserta?.some(lp => lp.id === p.id))
                                .map((p) => (
                                    <Card key={p.id}>
                                        <CardContent className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{p.name}</p>
                                                <p className="text-sm text-muted-foreground">{p.email}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => addPesertaToLomba(lomba.id, p)}
                                            >
                                                Tambah
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </CardHeader>

            <CardContent>
                <div className="grid gap-2">
                    {!lomba.peserta || lomba.peserta.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Belum ada peserta ditambahkan.
                        </p>
                    ) : (
                        lomba.peserta.map((p) => (
                            <Card key={p.id}>
                                <CardContent className="flex justify-between items-center p-3">
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        <p className="text-sm text-muted-foreground">{p.email}</p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removePesertaFromLomba(lomba.id, p.id)}
                                    >
                                        Hapus
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
