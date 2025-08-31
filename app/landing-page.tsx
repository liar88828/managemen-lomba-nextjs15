'use client'
// app/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { lombaList } from "./assets/lomba"
import { SessionUser } from "./actions/config"


export default function LandingPage({ user }: Readonly<{ user: SessionUser | undefined }>) {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="bg-red-600 text-white py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Lomba 17 Agustus 🎉
        </motion.h1>
        <p className="text-lg mb-6">Rayakan Kemerdekaan dengan semangat kompetisi!</p>
        <Button asChild size="lg" className="bg-white text-red-600 font-bold">
          {
            user
              ? <Link href="/halaman">Halaman Menu</Link>
              : <Link href="/register">Daftar Sekarang</Link>
          }
        </Button>
      </section>

      {/* Tentang */}
      <section className="py-16 px-6 md:px-20 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Tentang Acara</h2>
        <p className="text-gray-700">
          Acara lomba 17 Agustus ini diselenggarakan oleh panitia untuk merayakan Hari Kemerdekaan Republik Indonesia.
          Banyak lomba seru yang bisa diikuti semua kalangan!
        </p>
      </section>

      {/* Daftar Lomba */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Daftar Lomba</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lombaList.map((lomba: any) => (
            <Card key={lomba.id} className="shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{lomba.nama}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{lomba.deskripsi}</p>
                <Button asChild>
                  <Link href={`/lomba/${lomba.id}`}>Detail</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-red-600 text-white">
        <h2 className="text-3xl font-bold mb-6">Siap Jadi Juara?</h2>
        <Button asChild size="lg" className="bg-white text-red-600 font-bold">
          <Link href="/register">Daftar Sekarang</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Panitia 17 Agustus. Semua Hak Dilindungi.</p>
        <p className="mt-2 text-sm">Kontak: panitia@example.com</p>
      </footer>
    </div>
  )
}
