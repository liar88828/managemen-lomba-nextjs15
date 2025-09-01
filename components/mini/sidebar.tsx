import Link from "next/link";
import { Navbar01NavLink } from "./navbar";

export function SideBar({ menu }: Readonly<{ menu: Navbar01NavLink[] }>) {
    return (
        <aside className="w-64 bg-gray-900 text-white flex-col p-5 hidden md:flex">
            <h1 className="text-2xl font-bold mb-8">Panitia</h1>
            <nav className="flex flex-col gap-3">
                {menu.map((item, idx) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="px-3 py-2 rounded-lg hover:bg-gray-700"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )

}

