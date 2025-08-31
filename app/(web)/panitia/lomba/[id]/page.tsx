"use client"

import { useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLombaStore } from "@/app/store/useLombaStore"
import { Lomba } from "@/app/generated/prisma"

export default function DetailLombaPage() {
    const params = useParams()
    const lombaId = params.id as string
    const getLomba = useLombaStore((state) => state.getLomba)
    const lomba: Lomba | undefined = getLomba(lombaId)

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
                    <p><strong>Tanggal:</strong> {lomba.waktu.toLocaleDateString("id-ID")}</p>
                    <p><strong>Panitia ID:</strong> {lomba.panitiaId || "-"}</p>
                    <p><strong>Dibuat pada:</strong> {lomba.createdAt.toLocaleString("id-ID")}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Peserta Lomba</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Daftar peserta akan ditampilkan di sini.</p>
                </CardContent>
            </Card>
        </div>
    )
}
