'use client'
import React from 'react'
import { useLombaStore } from '@/app/store/useLombaStore'
import { usePesertaStore } from '@/app/store/usePesertaStore'
import { useJuriStore } from '@/app/store/useJuriStore'
import { formatDate } from '@/app/lib/formatter'

export default function Page() {
    const { lombas } = useLombaStore()
    const { peserta } = usePesertaStore()
    const { juri } = useJuriStore()

    const statusDate = (date: string | Date) => {
        const now = new Date();
        const targetDate = new Date(date);

        if (now < targetDate) {
            return { text: "Pending", color: "yellow-600" };
        } else if (now.toDateString() === targetDate.toDateString()) {
            return { text: "Aktif", color: "green-600" };
        } else {
            return { text: "Selesai", color: "red-600" };
        }

    }

    return (
        <div className="p-6 space-y-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard Panitia</h1>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold">Total Lomba</h3>
                    <p className="text-2xl font-bold text-blue-600">{lombas.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold">Total Peserta</h3>
                    <p className="text-2xl font-bold text-green-600">{peserta.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold">Total Juri</h3>
                    <p className="text-2xl font-bold text-purple-600">{juri.length}</p>
                </div>
            </div>

            {/* Table contoh daftar lomba */}
            <div className="mt-10 bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Daftar Lomba Terbaru</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Nama Lomba</th>
                            <th className="p-2">Tanggal</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lombas.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-4 text-center text-gray-500">Belum ada lomba tersedia.</td>
                            </tr>
                        ) : (
                            lombas.map((lomba) => {
                                const status = statusDate(lomba.waktu);
                                return (
                                    <tr key={lomba.id} className="border-b">
                                        <td className="p-2">{lomba.title}</td>
                                        <td className="p-2">{formatDate(lomba.waktu)}</td>
                                        <td className={`p-2 text-${status.color} font-semibold`}>{status.text}</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


