"use client";

import React from "react";
import { Database, Search, Filter, RefreshCw, Plus } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";
import IntegrationGrid from "@/components/IntegrationGrid";


export default function SourcesPage() {
    const { integrations, sources, toggleSource } = useIntegrations();
    const hasConnectedIntegrations = Object.values(integrations).some(status => status === true);
    const connectedSources = sources.filter(s => s.connected);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Knowledge Sources</h1>
                    <p className="text-zinc-400">Manage the data that powers your AI assistant.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-white text-black rounded-lg font-medium transition-all">
                    <RefreshCw className="h-4 w-4" />
                    Sync All
                </button>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Filter sources..."
                                className="bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-1.5 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-2 py-1 transition-colors">
                            <Filter className="h-4 w-4" />
                            All Types
                        </button>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium px-2 py-1 transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Source
                    </button>
                </div>

                <div className="divide-y divide-zinc-800">
                    {!hasConnectedIntegrations ? (
                        <div className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4 border border-zinc-700">
                                <Database className="h-8 w-8 text-zinc-600" />
                            </div>
                            <h3 className="text-white font-semibold">No integrations connected</h3>
                            <p className="text-zinc-500 max-w-sm mt-1 mb-6">
                                Connect your first integration to start importing repositories and documents.
                            </p>
                            <IntegrationGrid />
                        </div>
                    ) : connectedSources.length === 0 ? (
                        <div className="p-12 flex flex-col items-center justify-center text-center">
                            <h3 className="text-white font-semibold">No sources imported yet</h3>
                            <p className="text-zinc-500 max-w-sm mt-1 mb-6">
                                Go to the individual integration pages to select which projects/repos to import.
                            </p>
                            <div className="mt-4">
                                <IntegrationGrid />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-zinc-950/20">
                            {connectedSources.map((source) => (
                                <div key={source.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                                            <Database className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-white font-medium">{source.name}</h4>
                                                <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase font-bold tracking-tight">
                                                    {source.type}
                                                </span>
                                            </div>
                                            <p className="text-zinc-500 text-xs mt-0.5">Last synced: Just now • Context mapped: 100%</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:flex flex-col items-end">
                                            <span className="text-emerald-500 text-xs font-semibold">Active</span>
                                            <span className="text-zinc-500 text-[10px]">Indexed & Ready</span>
                                        </div>
                                        <button
                                            onClick={() => toggleSource(source.id)}
                                            className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                            title="Remove Source"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="p-8 text-center border-t border-zinc-800">
                                <p className="text-zinc-500 text-sm mb-4">Want to add more? Manage your integrations below.</p>
                                <div className="flex justify-center">
                                    <IntegrationGrid />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
