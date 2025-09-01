"use client"

import { useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Panitia, usePanitiaStore } from "@/app/store/usePanitiaStore"
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLombaStore } from "@/app/store/useLombaStore"

export default function DetailPanitiaPage() {
    const params = useParams()
    const PanitiaId = params.id as string
    const getPanitia = usePanitiaStore((state) => state.getPanitia)
    const Panitia: Panitia | undefined = getPanitia(PanitiaId)

    if (!Panitia) return <div>Panitia tidak ditemukan.</div>

    return (
        <div className="p-6 space-y-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Detail Panitia</h1>
                <Link href="/Panitia">
                    <Button variant="outline">Kembali</Button>
                </Link>
            </div>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>{Panitia.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Email:</strong> {Panitia.email}</p>
                    <p><strong>No HP:</strong> {Panitia.hp}</p>
                    <p><strong>Lokasi:</strong> {Panitia.lokasi}</p>
                    {/* <p><strong>Lomba:</strong> {Panitia.lomba}</p> */}
                    <p><strong>Dibuat pada:</strong> {Panitia.createdAt.toLocaleString("id-ID")}</p>
                </CardContent>
            </Card>

            {/* Panitia Lomba */}
            <PanitiaDetailLomba Panitia={Panitia} />


        </div>
    )
}





export function PanitiaDetailLomba({ Panitia }: Readonly<{ Panitia: Panitia }>) {
    const { getLombaByIdPanitia, lombas: lombaList, addPanitiaToLomba, removePanitiaFromLomba } = useLombaStore()

    // const [lombas, setLombas] = useState<Lomba[] | undefined>()
    // useEffect(() => {
    //     setLombas(getLombaByIdPanitia(Panitia.id))
    // }, [lombaList, Panitia.id, getLombaByIdPanitia])


    // derive lombas directly from store
    const lombas = getLombaByIdPanitia(Panitia.id)
    if (!lombas) return <div>Lomba tidak ditemukan.</div>

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Kelola Lomba</CardTitle>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">Kelola Lomba</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Kelola Panitia</DialogTitle>
                            <DialogDescription >Lomba yang tersedia</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            {lombaList.length === 0 && (
                                <p className="text-sm text-muted-foreground">Belum ada panitia terdaftar.</p>
                            )}
                            {lombaList
                                .filter((lomba) => !lombas?.some(lp => lp.id === lomba.id))
                                .map((lomba) => (
                                    <Card key={lomba.id}>
                                        <CardContent className="flex justify-between items-center ">
                                            <div>
                                                <p className="font-medium">{lomba.title}</p>
                                                <p className="text-sm text-muted-foreground">{lomba.deskripsi}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => addPanitiaToLomba(lomba.id, Panitia)}
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
                    {!lombas || lombas.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada panitia ditambahkan.</p>
                    ) : (
                        lombas.map((lomba) => (
                            <Card key={lomba.id}>
                                <CardContent className="flex justify-between items-center p-3">
                                    <div>
                                        <p className="font-medium">{lomba.title}</p>
                                        <p className="text-sm text-muted-foreground">{lomba.deskripsi}</p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removePanitiaFromLomba(lomba.id, Panitia.id)}
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
