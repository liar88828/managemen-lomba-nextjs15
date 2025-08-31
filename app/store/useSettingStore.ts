import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Rule {
    id: string;
    description: string;
}

export interface BannedItem {
    id: string;
    reason: string;
}

export interface SettingState {
    rules: Rule[];
    banned: BannedItem[];
    addRule: (rule: Omit<Rule, "id">) => void;
    updateRule: (rule: Rule) => void;
    deleteRule: (id: string) => void;
    addBanned: (item: Omit<BannedItem, "id">) => void;
    updateBanned: (item: BannedItem) => void;
    deleteBanned: (id: string) => void;
}

export const useSettingStore = create<SettingState>()(
    persist(
        (set) => ({
            rules: [],
            banned: [],

            addRule: (rule) =>
                set((state) => ({
                    rules: [...state.rules, { id: String(Date.now()), ...rule }],
                })),

            updateRule: (rule) =>
                set((state) => ({
                    rules: state.rules.map((r) => (r.id === rule.id ? rule : r)),
                })),

            deleteRule: (id) =>
                set((state) => ({
                    rules: state.rules.filter((r) => r.id !== id),
                })),

            addBanned: (item) =>
                set((state) => ({
                    banned: [...state.banned, { id: String(Date.now()), ...item }],
                })),

            updateBanned: (item) =>
                set((state) => ({
                    banned: state.banned.map((b) => (b.id === item.id ? item : b)),
                })),

            deleteBanned: (id) =>
                set((state) => ({
                    banned: state.banned.filter((b) => b.id !== id),
                })),
        }),
        {
            name: "setting-storage", // key in localStorage
        }
    )
);
