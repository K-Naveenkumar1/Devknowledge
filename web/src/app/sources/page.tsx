"use client";

import React from "react";
import {
    Database,
    Search,
    Filter,
    RefreshCcw,
    Github,
    Slack,
    FileText,
    Layers,
    ExternalLink,
    CheckCircle2,
    Clock,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useIntegrations } from "@/context/IntegrationContext";

export default function SourcesPage() {
    const { sources, integrations, isGlobalSyncing, syncAll, toggleSource } = useIntegrations();
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredSources = sources.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: "Total Artifacts", value: sources.length, icon: Database, color: "text-blue-500" },
        { label: "Connected Tools", value: Object.values(integrations).filter(Boolean).length, icon: Zap, color: "text-amber-500" },
        { label: "Indexed Data", value: "1.2 GB", icon: CheckCircle2, color: "text-emerald-500" },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Knowledge Sources</h1>
                    <p className="text-zinc-400">Manage and explore all technical knowledge indexed by Devora.</p>
                </div>
                <button
                    onClick={syncAll}
                    disabled={isGlobalSyncing}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-xl shadow-blue-900/40 disabled:opacity-50"
                >
                    {isGlobalSyncing ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                    Sync All Sources
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-zinc-950 border border-zinc-800 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Filter by repo, channel, or doc name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-300 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-400 hover:text-white transition-all">
                            <Filter className="h-4 w-4" />
                            All Types
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-zinc-800">
                    {filteredSources.length > 0 ? (
                        filteredSources.map((source) => (
                            <div key={source.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-blue-400 transition-colors">
                                        {source.type === "github" && <Github className="h-6 w-6" />}
                                        {source.type === "slack" && <Slack className="h-6 w-6" />}
                                        {source.type === "jira" && <Layers className="h-6 w-6" />}
                                        {source.type === "confluence" && <FileText className="h-6 w-6" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-white font-semibold">{source.name}</h3>
                                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border border-zinc-700">
                                                {source.type}
                                            </span>
                                        </div>
                                        <p className="text-zinc-500 text-xs flex items-center gap-2 mt-1">
                                            <Clock className="h-3 w-3" />
                                            Last synced 2 hours ago
                                            <span className="text-emerald-500 font-medium ml-1">Synced</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleSource(source.id)}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${source.connected
                                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                            : "bg-blue-600 text-white hover:bg-blue-500"
                                            }`}
                                    >
                                        {source.connected ? "Imported" : "Import"}
                                    </button>
                                    <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                                        <ExternalLink className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center">
                            <div className="h-20 w-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-zinc-700" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No sources found</h3>
                            <p className="text-zinc-500 max-w-xs mx-auto">Connect more integrations to start indexing your technical knowledge.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
