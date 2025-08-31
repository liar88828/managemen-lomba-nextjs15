"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input, } from "@/components/ui/input"
import { BannedItem, Rule, useSettingStore } from "@/app/store/useSettingStore"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
    const { rules, banned, addRule, updateRule, deleteRule, addBanned, updateBanned, deleteBanned } = useSettingStore()

    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
    const [ruleEdit, setRuleEdit] = useState<Rule | null>(null)
    const [ruleText, setRuleText] = useState("")

    const [isBannedModalOpen, setIsBannedModalOpen] = useState(false)
    const [bannedEdit, setBannedEdit] = useState<BannedItem | null>(null)
    const [bannedText, setBannedText] = useState("")

    // Handlers for Rules
    const saveRule = () => {
        if (ruleEdit) updateRule({ ...ruleEdit, description: ruleText })
        else addRule({ description: ruleText })
        setRuleText("")
        setRuleEdit(null)
        setIsRuleModalOpen(false)
    }

    const saveBanned = () => {
        if (bannedEdit) updateBanned({ ...bannedEdit, reason: bannedText })
        else addBanned({ reason: bannedText })
        setBannedText("")
        setBannedEdit(null)
        setIsBannedModalOpen(false)
    }

    return (
        <div className="p-6 space-y-6 w-full">
            <h1 className="text-2xl font-bold">Setting Lomba</h1>

            {/* Rules Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Rules of Lomba</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button onClick={() => setIsRuleModalOpen(true)}>Tambah Rule</Button>
                    {rules.map((r) => (
                        <div key={r.id} className="flex justify-between items-center border p-2 rounded">
                            <span>{r.description}</span>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => { setRuleEdit(r); setRuleText(r.description); setIsRuleModalOpen(true) }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteRule(r.id)}>Hapus</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Banned Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Can be Banned</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button onClick={() => setIsBannedModalOpen(true)}>Tambah</Button>
                    {banned.map((b) => (
                        <div key={b.id} className="flex justify-between items-center border p-2 rounded">
                            <span>{b.reason}</span>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => { setBannedEdit(b); setBannedText(b.reason); setIsBannedModalOpen(true) }}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => deleteBanned(b.id)}>Hapus</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Modals */}
            <Dialog open={isRuleModalOpen} onOpenChange={() => setIsRuleModalOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{ruleEdit ? "Edit Rule" : "Tambah Rule"}</DialogTitle>
                    </DialogHeader>
                    <Textarea value={ruleText} onChange={(e) => setRuleText(e.target.value)} placeholder="Masukkan rule lomba" />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRuleModalOpen(false)}>Batal</Button>
                        <Button onClick={saveRule}>{ruleEdit ? "Update" : "Tambah"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isBannedModalOpen} onOpenChange={() => setIsBannedModalOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{bannedEdit ? "Edit Banned Item" : "Tambah Banned Item"}</DialogTitle>
                    </DialogHeader>
                    <Input value={bannedText} onChange={(e) => setBannedText(e.target.value)} placeholder="Masukkan yang bisa dibanned" />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBannedModalOpen(false)}>Batal</Button>
                        <Button onClick={saveBanned}>{bannedEdit ? "Update" : "Tambah"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
