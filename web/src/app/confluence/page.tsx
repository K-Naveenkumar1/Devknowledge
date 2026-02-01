"use client";

import React from "react";
import { FileText, Search, ExternalLink, ShieldCheck, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


export default function ConfluencePage() {
    const { integrations, connectTool, disconnectTool } = useIntegrations();
    const isConnected = integrations.confluence;

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

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Connected Spaces</h2>
                        <div className={`flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl transition-all ${isConnected ? "border-blue-500/30 bg-blue-500/5" : "border-zinc-800 bg-zinc-950"
                            }`}>
                            <div className={`p-4 rounded-full mb-4 transition-colors ${isConnected ? "bg-blue-500/20" : "bg-zinc-900"}`}>
                                {isConnected ? <CheckCircle2 className="h-8 w-8 text-blue-400" /> : <FileText className="h-8 w-8 text-zinc-700" />}
                            </div>
                            <h3 className="text-zinc-300 font-medium">{isConnected ? "Documentation Synchronized" : "No spaces synchronized yet"}</h3>
                            <p className="text-zinc-500 text-sm max-w-xs mt-2">
                                {isConnected
                                    ? "3 documentation spaces are currently indexed and available for the AI assistant."
                                    : "Synchronize your Confluence spaces to enable AI-powered documentation search."
                                }
                            </p>
                            <button
                                onClick={!isConnected ? toggleConnection : undefined}
                                className="mt-6 px-4 py-2 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-all text-sm font-medium"
                            >
                                {isConnected ? "Manage Spaces" : "Add Space"}
                            </button>
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
