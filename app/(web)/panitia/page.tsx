'use client'
import React from 'react'
import Link from "next/link"
import { useLombaStore } from '@/app/store/useLombaStore'
import { usePesertaStore } from '@/app/store/usePesertaStore'
import { useJuriStore } from '@/app/store/useJuriStore'

export default function page() {
    const { lombas } = useLombaStore()
    const { peserta } = usePesertaStore()
    const { juri } = useJuriStore()

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
                        <tr className="border-b">
                            <td className="p-2">Lomba Futsal</td>
                            <td className="p-2">12 Okt 2025</td>
                            <td className="p-2 text-green-600 font-semibold">Aktif</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Lomba Cerdas Cermat</td>
                            <td className="p-2">15 Okt 2025</td>
                            <td className="p-2 text-yellow-600 font-semibold">Pending</td>
                        </tr>
                        <tr>
                            <td className="p-2">Lomba Paduan Suara</td>
                            <td className="p-2">20 Okt 2025</td>
                            <td className="p-2 text-red-600 font-semibold">Selesai</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export const menuPanitia = [
    { title: "Dashboard", link: "/panitia" },
    { title: "Daftar Lomba", link: "/panitia/lomba" },
    { title: "Peserta", link: "/panitia/peserta" },
    { title: "Juri", link: "/panitia/juri" },
    { title: "Pengaturan", link: "/panitia/settings" },
]

export function SideBar({ menu }: Readonly<{ menu: { title: string; link: string; }[] }>) {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-5">
            <h1 className="text-2xl font-bold mb-8">Panitia</h1>
            <nav className="flex flex-col gap-3">
                {menu.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.link}
                        className="px-3 py-2 rounded-lg hover:bg-gray-700"
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>
        </aside>

    )
}
