"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { SettingItem, useSettingStore } from "@/app/store/useSettingStore"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
    const { rules, banned, addRule, updateRule, deleteRule, addBanned, updateBanned, deleteBanned, addAnnouncement, announcements, deleteAnnouncement, updateAnnouncement, } = useSettingStore()



    return (
        <div className="p-6 space-y-6 w-full">
            <h1 className="text-2xl font-bold">Setting Lomba</h1>

            <SettingDialog
                buttonText="Announcement"
                title="Announcements"
                data={announcements}
                deleteRule={deleteAnnouncement}
                addRule={addAnnouncement}
                updateRule={updateAnnouncement}
            />

            <SettingDialog
                buttonText="Rule"
                title="Rules of Lomba"
                data={rules}
                deleteRule={deleteRule}
                addRule={addRule}
                updateRule={updateRule}
            />

            <SettingDialog
                buttonText="Banned"
                title="Banned Rules"
                data={banned}
                deleteRule={deleteBanned}
                addRule={addBanned}
                updateRule={updateBanned}
            />

        </div>
    )
}



export function SettingDialog({
    data,
    title,
    buttonText,
    deleteRule,
    addRule,
    updateRule
}: Readonly<{
    title: string,
    buttonText: string,
    data: SettingItem[],
    deleteRule: (id: string) => void,
    updateRule: (rule: SettingItem) => void,
    addRule: (rule: Omit<SettingItem, "id">) => void,
}>) {

    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
    const [ruleText, setRuleText] = useState("")
    const [ruleEdit, setRuleEdit] = useState<SettingItem | null>(null)

    // Handlers for Rules
    const saveRule = () => {
        if (ruleEdit) updateRule({ ...ruleEdit, description: ruleText })
        else addRule({ description: ruleText, createdAt: new Date() })
        setRuleText("")
        setRuleEdit(null)
        setIsRuleModalOpen(false)
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button onClick={() => setIsRuleModalOpen(true)}>Tambah Rule</Button>
                    {data.map((r) => (
                        <div key={r.id} className="flex justify-between items-center border p-3 rounded-xl">
                            <span>{r.description}</span>
                            <div className="flex gap-2">
                                <Button size="sm"
                                    onClick={() => {
                                        setRuleEdit(r);
                                        setRuleText(r.description);
                                        setIsRuleModalOpen(true)
                                    }}>Edit</Button>
                                <Button size="sm"
                                    variant="destructive"
                                    onClick={() => deleteRule(r.id)}>Hapus</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>


            <Dialog open={isRuleModalOpen} onOpenChange={() => setIsRuleModalOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{ruleEdit ? `Edit ${buttonText}` : `Tambah ${buttonText}`}</DialogTitle>
                    </DialogHeader>
                    <Textarea value={ruleText}
                        onChange={(e) => setRuleText(e.target.value)}
                        placeholder={`Masukkan ${buttonText} lomba`} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRuleModalOpen(false)}>Batal</Button>
                        <Button disabled={ruleText.length === 0} onClick={saveRule}>{ruleEdit ? "Update" : "Tambah"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </>
    )
}
