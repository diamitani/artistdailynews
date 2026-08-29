import React from "react";
import Link from "next/link";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-black text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-xl uppercase tracking-widest text-red-500">ADN Desk</span>
          <span className="text-gray-400 text-sm border-l border-gray-600 pl-4">Operator Console</span>
        </div>
        <nav className="flex space-x-4 text-sm font-semibold">
          <Link href="/news" className="text-gray-300 hover:text-white">View Site →</Link>
        </nav>
      </header>
      
      <div className="flex">
        {/* Sidebar Nav */}
        <aside className="w-64 min-h-[calc(100vh-52px)] bg-white border-r border-gray-200 p-6 flex flex-col space-y-2 text-sm font-medium">
          <Link href="/news/desk" className="bg-gray-100 text-black px-3 py-2 rounded">Today's Issue (Pending)</Link>
          <Link href="#" className="text-gray-600 hover:text-black px-3 py-2">All Items Pool</Link>
          <Link href="#" className="text-gray-600 hover:text-black px-3 py-2">Archives</Link>
          <Link href="#" className="text-gray-600 hover:text-black px-3 py-2">Sources Config</Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
