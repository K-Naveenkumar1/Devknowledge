"use client";

import React from "react";
import { FileText, Search, ExternalLink, ShieldCheck, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


export default function ConfluencePage() {
    const { integrations, sources, connectTool, disconnectTool, toggleSource } = useIntegrations();
    const isConnected = integrations.confluence;
    const confluenceSources = sources.filter(s => s.type === "confluence");

    const toggleConnection = () => {
        if (isConnected) {
            disconnectTool("confluence");
        } else {
            connectTool("confluence");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className={`p-3 border rounded-xl transition-colors ${isConnected ? "bg-blue-400/10 border-blue-400/30" : "bg-zinc-900 border-zinc-800"}`}>
                        <FileText className={`h-8 w-8 ${isConnected ? "text-blue-400" : "text-blue-400"}`} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Confluence Integration</h1>
                        <p className="text-zinc-400">Index your technical documentation and wikis.</p>
                    </div>
                </div>
                <button
                    onClick={toggleConnection}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${isConnected
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                >
                    {isConnected ? <CheckCircle2 className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    {isConnected ? "Connected" : "Index Documentation"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 flex items-center justify-between">
                        <div className="max-w-md">
                            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                Unified Search <Sparkles className="h-5 w-5 text-yellow-500" />
                            </h2>
                            <p className="text-zinc-300">
                                Turn your static documentation into an interactive knowledge base. Our AI can answer questions based on your specific team wikis.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <BookOpen className="h-24 w-24 text-blue-500/20" />
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-zinc-800">
                            <h3 className="text-white font-semibold">
                                {isConnected ? "Select spaces to index" : "Connect Confluence"}
                            </h3>
                            <p className="text-zinc-500 text-sm mt-1">
                                {isConnected
                                    ? "These spaces were found in your instance. Index them to enable AI reasoning over docs."
                                    : "Link your documentation to start importing knowledge."}
                            </p>
                        </div>

                        <div className="divide-y divide-zinc-800">
                            {isConnected ? (
                                confluenceSources.map(space => (
                                    <div key={space.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                <FileText className="h-5 w-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-zinc-100 font-medium">{space.name}</p>
                                                <p className="text-zinc-500 text-xs text-uppercase tracking-wider">Wiki Space</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleSource(space.id)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${space.connected
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-blue-600 text-white hover:bg-blue-500"
                                                }`}
                                        >
                                            {space.connected ? "Indexed" : "Index"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="h-16 w-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4 border border-zinc-700">
                                        <BookOpen className="h-8 w-8 text-zinc-600" />
                                    </div>
                                    <h4 className="text-zinc-400 font-medium">No Connection Available</h4>
                                    <p className="text-zinc-500 text-sm mt-1 mb-6">Index your documentation to enable AI search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-blue-400 mb-4">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Indexing</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4">
                            We create a vector index of your documentation to enable semantic search. Your data remains encrypted at rest and is never used to train public models.
                        </p>
                        <a href="#" className="flex items-center gap-1 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                            Security Overview
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
