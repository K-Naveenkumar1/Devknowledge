"use client";

import React from "react";
import { Github, Folder, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


export default function GitHubPage() {
    const { integrations, connectTool, disconnectTool } = useIntegrations();
    const isConnected = integrations.github;

    const toggleConnection = () => {
        if (isConnected) {
            disconnectTool("github");
        } else {
            connectTool("github");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className={`p-3 border rounded-xl transition-colors ${isConnected ? "bg-emerald-500/10 border-emerald-500/30" : "bg-zinc-900 border-zinc-800"}`}>
                        <Github className={`h-8 w-8 ${isConnected ? "text-emerald-500" : "text-white"}`} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">GitHub Integration</h1>
                        <p className="text-zinc-400">Connect to your repositories and pull requests.</p>
                    </div>
                </div>
                <button
                    onClick={toggleConnection}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${isConnected
                            ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                >
                    {isConnected ? <CheckCircle2 className="h-5 w-5" /> : <Github className="h-5 w-5" />}
                    {isConnected ? "Connected" : "Connect GitHub account"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">How it works</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                                <div>
                                    <h3 className="text-white font-medium">Link your account</h3>
                                    <p className="text-zinc-400 text-sm">Grant permission for DevKnowledge to read your repository metadata and PR history.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                                <div>
                                    <h3 className="text-white font-medium">Data Mapping</h3>
                                    <p className="text-zinc-400 text-sm">Our AI analyzes your codebase context to provide better answers in the chat assistant.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                                <div>
                                    <h3 className="text-white font-medium">Search & Chat</h3>
                                    <p className="text-zinc-400 text-sm">Ask questions like "Who worked on the authentication logic?" or "Summarize my open PRs".</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center">
                        <div className="h-16 w-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            {isConnected ? <CheckCircle2 className="h-8 w-8 text-emerald-500" /> : <Folder className="h-8 w-8 text-zinc-600" />}
                        </div>
                        <h3 className="text-white font-semibold">{isConnected ? "GitHub Connected" : "No repositories connected"}</h3>
                        <p className="text-zinc-500 max-w-sm mt-1 mb-6">
                            {isConnected
                                ? "Your repositories are being synced. You can now search through your codebase context."
                                : "Connect your GitHub account to start syncing repository data and pull requests."
                            }
                        </p>
                        {isConnected && (
                            <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-left">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-zinc-400">Syncing repositories...</span>
                                    <span className="text-blue-400">85%</span>
                                </div>
                                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full w-[85%]" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-emerald-400 mb-4">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Security First</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4">
                            DevKnowledge only requests **Read-Only** access to your repositories. We never store your actual code—only a high-level knowledge graph.
                        </p>
                        <a href="#" className="flex items-center gap-1 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                            Read Security Whitepaper
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
