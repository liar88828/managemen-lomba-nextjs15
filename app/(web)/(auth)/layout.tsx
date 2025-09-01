import React from 'react'


export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="  min-h-screen bg-gray-50 w-full">
            <div className="flex items-center justify-center flex-1 p-6">
                {children}
            </div>
        </div>
    )
}
