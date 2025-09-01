"use client"

import { SessionData, } from "@/app/actions/config"
import { deleteSession } from "@/app/actions/session"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function LogoutPage({ session }: Readonly<{ session: SessionData }>) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleLogout = () => {
        setLoading(true)
        deleteSession(session?.user?.id || '')

        // Redirect to login
        router.replace("/login")
    }

    return (

        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Logout</CardTitle>
                <CardDescription>Are you sure you want to logout?</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-3">
                <Button
                    onClick={handleLogout}
                    variant="destructive"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Logging out..." : "Logout"}
                </Button>
                <Button
                    onClick={() => router.back()}
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    Cancel
                </Button>
            </CardFooter>
        </Card>


    )
}
