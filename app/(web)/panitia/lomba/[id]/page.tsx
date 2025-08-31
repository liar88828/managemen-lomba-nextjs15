import { getLombaDetail } from "@/app/actions/lomba"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function DetailLombaPage({ params }: { params: { id: string } }) {
    const lomba = await getLombaDetail(params.id)

    if (!lomba) return <p className="text-center mt-10">Lomba tidak ditemukan</p>

    return (
        <Card className="max-w-xl mx-auto mt-10 shadow-xl">
            <CardHeader>
                <CardTitle>{lomba.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-2">{lomba.deskripsi}</p>
                <p>📍 Lokasi: {lomba.lokasi}</p>
                <p>⏰ Waktu: {new Date(lomba.waktu).toLocaleString("id-ID")}</p>
            </CardContent>
        </Card>
    )
}
