import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SettingItem {
    id: string;
    description: string;
    createdAt: string | Date;
}


export interface SettingState {
    rules: SettingItem[];
    banned: SettingItem[];
    announcements: SettingItem[];

    addRule: (rule: Omit<SettingItem, "id">) => void;
    updateRule: (rule: SettingItem) => void;
    deleteRule: (id: string) => void;

    addBanned: (item: Omit<SettingItem, "id">) => void;
    updateBanned: (item: SettingItem) => void;
    deleteBanned: (id: string) => void;

    addAnnouncement: (announcement: Omit<SettingItem, "id" | "createdAt">) => void;
    updateAnnouncement: (announcement: SettingItem) => void;
    deleteAnnouncement: (id: string) => void;
}

export const useSettingStore = create<SettingState>()(
    persist(
        (set) => ({
            rules: [],
            banned: [],
            announcements: [],

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

            addAnnouncement: (announcement) =>
                set((state) => ({
                    announcements: [
                        ...state.announcements,
                        { id: String(Date.now()), createdAt: new Date().toISOString(), ...announcement },
                    ],
                })),

            updateAnnouncement: (announcement) =>
                set((state) => ({
                    announcements: state.announcements.map((a) =>
                        a.id === announcement.id ? announcement : a
                    ),
                })),

            deleteAnnouncement: (id) =>
                set((state) => ({
                    announcements: state.announcements.filter((a) => a.id !== id),
                })),
        }),
        {
            name: "setting-storage", // key in localStorage
        }
    )
);
