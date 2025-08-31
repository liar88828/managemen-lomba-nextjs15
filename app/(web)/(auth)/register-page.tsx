"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { registerAction } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
export default function RegisterPage() {
  const [message, setMessage] = useState("")
  const router = useRouter()
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-center">Daftar Akun</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            const res = await registerAction(formData)
            setMessage(res.message)
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input type="text" name="name" required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" required />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <select
              name="role"
              className="w-full border rounded-md p-2"
              defaultValue="PESERTA"
            >
              <option value="PESERTA">Peserta</option>
              <option value="PANITIA">Panitia</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <Button type="submit" className="w-full">
            Daftar
          </Button>

          <Button type="button"
            variant="outline"
            onClick={() => { router.push('/login') }}
            className="w-full">
            Masuk
          </Button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </CardContent>
    </Card>
  )
}
