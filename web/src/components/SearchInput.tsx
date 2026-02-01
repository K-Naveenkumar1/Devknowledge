import React, { useState } from "react";
import { Search, Command, FileText, Github, Database, MessageSquare, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIntegrations } from "@/context/IntegrationContext";

export default function SearchInput() {
    const { sources } = useIntegrations();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const filteredResults = query.length > 2
        ? sources
            .filter(s => s.connected)
            .filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
            .map(s => ({
                id: s.id,
                title: s.name,
                type: s.type,
                desc: `Imported technical artifact from ${s.type}`,
                path: `/${s.type}`
            }))
        : [];

    return (
        <div className="w-full max-w-2xl relative group">
            <div className="relative z-20">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className={`h-5 w-5 transition-colors ${isFocused ? "text-blue-500" : "text-zinc-500"}`} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-xl py-4 pl-12 pr-12 text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-zinc-500 transition-all backdrop-blur-xl"
                    placeholder="Search projects, repos, docs..."
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                        onClick={() => query.length > 0 && router.push("/ai-chat")}
                        className={`p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all ${query.length > 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    {query.length === 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/50 border border-zinc-700/50">
                            <Command className="h-3 w-3 text-zinc-400" />
                            <span className="text-xs text-zinc-400 font-medium">K</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Dropdown */}
            {isFocused && query.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-zinc-800 bg-zinc-800/20">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Knowledge Match</span>
                    </div>
                    <div className="divide-y divide-zinc-800">
                        {filteredResults.length > 0 ? (
                            filteredResults.map(res => (
                                <button
                                    key={res.id}
                                    onClick={() => router.push(res.path)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                            {res.type === 'confluence' && <FileText className="h-4 w-4 text-blue-400" />}
                                            {res.type === 'github' && <Github className="h-4 w-4 text-zinc-400" />}
                                            {res.type === 'jira' && <Database className="h-4 w-4 text-blue-500" />}
                                            {res.type === 'slack' && <MessageSquare className="h-4 w-4 text-pink-500" />}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">{res.title}</p>
                                            <p className="text-zinc-500 text-xs">{res.desc}</p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase">
                                        {res.type}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <Search className="h-8 w-8 text-zinc-700 mx-auto mb-2" />
                                <p className="text-zinc-500 text-sm">No exact matches for &quot;{query}&quot;</p>
                                <button
                                    onClick={() => router.push("/ai-chat")}
                                    className="mt-4 text-blue-400 text-xs hover:underline"
                                >
                                    Ask the AI Assistant instead →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 blur transition duration-500 -z-10 ${isFocused ? "opacity-20" : "opacity-0"}`} />
        </div>
    );
}
