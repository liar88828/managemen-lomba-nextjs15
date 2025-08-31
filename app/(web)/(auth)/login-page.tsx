"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [message, setMessage] = useState("")
    const router = useRouter()
    return (
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    action={async (formData) => {
                        const res = await loginAction(formData)
                        setMessage(res.message)
                    }}
                    className="space-y-4"
                >
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" required />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" required />
                    </div>

                    <Button type="submit" className="w-full">
                        Masuk
                    </Button>
                    <Button type="button"
                        variant="outline"
                        onClick={() => { router.push('/register') }}
                        className="w-full"  >
                        Daftar
                    </Button>
                </form>
                {message && <p className="text-center mt-4">{message}</p>}
            </CardContent>
        </Card>
    )
}
