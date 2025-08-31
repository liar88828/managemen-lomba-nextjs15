"use server"

import { prisma } from "../lib/prisma"


export async function tambahLomba(formData: FormData) {
  const title = formData.get("title") as string
  const deskripsi = formData.get("deskripsi") as string
  const lokasi = formData.get("lokasi") as string
  const waktu = formData.get("waktu") as string

  try {
    await prisma.lomba.create({
      data: {
        title,
        deskripsi,
        lokasi,
        waktu: new Date(waktu),
      },
    })
    return { success: true, message: "Lomba berhasil ditambahkan" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

export async function updateLomba(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const deskripsi = formData.get("deskripsi") as string
  const lokasi = formData.get("lokasi") as string
  const waktu = formData.get("waktu") as string

  try {
    await prisma.lomba.update({
      where: { id },
      data: {
        title,
        deskripsi,
        lokasi,
        waktu: new Date(waktu),
      },
    })
    return { success: true, message: "Lomba berhasil diupdate" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

export async function hapusLomba(id: string) {
  try {
    await prisma.lomba.delete({ where: { id } })
    return { success: true, message: "Lomba berhasil dihapus" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

export async function getLombaDetail(id: string) {
  try {
    const lomba = await prisma.lomba.findUnique({ where: { id } })
    return lomba
  } catch {
    return null
  }
}
