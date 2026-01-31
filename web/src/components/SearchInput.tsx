"use client";

import { Search, Command } from "lucide-react";


export default function SearchInput() {
    return (
        <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
                type="text"
                className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-xl py-4 pl-12 pr-12 text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-zinc-500 transition-all backdrop-blur-xl"
                placeholder="Search everything (commands, issues, docs)..."
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/50 border border-zinc-700/50">
                    <Command className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs text-zinc-400 font-medium">K</span>
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition duration-500 -z-10" />
        </div>
    );
}
