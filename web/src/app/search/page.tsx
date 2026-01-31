"use client";

import React from "react";
import { Search, History, Star, Clock } from "lucide-react";

export default function SearchPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto text-center">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Search Knowledge</h1>
                <p className="text-zinc-400 max-w-lg mx-auto">
                    Deep search across your repositories, issues, and documentation in one go.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mb-16">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-2 flex items-center">
                        <Search className="h-5 w-5 text-zinc-500 ml-4" />
                        <input
                            type="text"
                            placeholder="Search across all integrations..."
                            className="w-full bg-transparent px-4 py-3 text-lg text-white outline-none"
                        />
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs mr-2">
                            ESC
                        </kbd>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                    <History className="h-6 w-6 text-zinc-500 mb-4 mx-auto" />
                    <h3 className="text-white font-medium mb-2">Recent Searches</h3>
                    <p className="text-sm text-zinc-500 italic">No recent activity</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                    <Star className="h-6 w-6 text-zinc-500 mb-4 mx-auto" />
                    <h3 className="text-white font-medium mb-2">Saved Queries</h3>
                    <p className="text-sm text-zinc-500 italic">No saved searches</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
                    <Clock className="h-6 w-6 text-zinc-500 mb-4 mx-auto" />
                    <h3 className="text-white font-medium mb-2">Quick Access</h3>
                    <p className="text-sm text-zinc-500 italic">No bookmarks found</p>
                </div>
            </div>
        </div>
    );
}
