"use client"

import { useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Peserta, usePesertaStore } from "@/app/store/usePesertaStore"

export default function DetailPesertaPage() {
    const params = useParams()
    const pesertaId = params.id as string
    const getPeserta = usePesertaStore((state) => state.getPeserta)
    const peserta: Peserta | undefined = getPeserta(pesertaId)

    if (!peserta) return <div>Peserta tidak ditemukan.</div>

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Detail Peserta</h1>
                <Link href="/peserta">
                    <Button variant="outline">Kembali</Button>
                </Link>
            </div>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>{peserta.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Email:</strong> {peserta.email}</p>
                    <p><strong>No HP:</strong> {peserta.hp}</p>
                    <p><strong>Lokasi:</strong> {peserta.lokasi}</p>
                    <p><strong>Lomba:</strong> {peserta.lomba}</p>
                    <p><strong>Dibuat pada:</strong> {peserta.createdAt.toLocaleString("id-ID")}</p>
                </CardContent>
            </Card>
        </div>
    )
}
