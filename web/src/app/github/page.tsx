"use client";

import React from "react";
import { Github, Folder, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


export default function GitHubPage() {
    const { integrations, sources, connectTool, disconnectTool, toggleSource } = useIntegrations();
    const isConnected = integrations.github;
    const githubSources = sources.filter(s => s.type === "github");

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

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-zinc-800">
                            <h3 className="text-white font-semibold">
                                {isConnected ? "Select repositories to import" : "Connect to see repositories"}
                            </h3>
                            <p className="text-zinc-500 text-sm mt-1">
                                {isConnected
                                    ? "These repositories were found in your account. Select which ones to map for AI reasoning."
                                    : "Grant access to your GitHub account to import repositories."}
                            </p>
                        </div>

                        <div className="divide-y divide-zinc-800">
                            {isConnected ? (
                                githubSources.map(repo => (
                                    <div key={repo.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                <Github className="h-5 w-5 text-zinc-400" />
                                            </div>
                                            <div>
                                                <p className="text-zinc-100 font-medium">{repo.name}</p>
                                                <p className="text-zinc-500 text-xs text-uppercase tracking-wider">Public Repository</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleSource(repo.id)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${repo.connected
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-blue-600 text-white hover:bg-blue-500"
                                                }`}
                                        >
                                            {repo.connected ? "Imported" : "Import"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="h-16 w-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4 border border-zinc-700">
                                        <Folder className="h-8 w-8 text-zinc-600" />
                                    </div>
                                    <h4 className="text-zinc-400 font-medium">Authentication Required</h4>
                                    <p className="text-zinc-500 text-sm mt-1 mb-6">Connect your account above to browse repositories.</p>
                                    <button
                                        onClick={toggleConnection}
                                        className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-2"
                                    >
                                        <Github className="h-4 w-4" /> Link Account Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-emerald-400 mb-4">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Security First</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                            DevKnowledge only requests **Read-Only** access to your repositories. We never store your actual code—only a high-level technical map.
                        </p>
                        <a href="#" className="flex items-center gap-1 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                            Read Security Whitepaper
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>

                    {isConnected && (
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                            <h4 className="text-white font-semibold mb-2">Sync Status</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                        <span>Knowledge Graph Construction</span>
                                        <span>{githubSources.some(s => s.connected) ? "Synced" : "Pending Import"}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className={`h-full bg-emerald-500 transition-all duration-500 ${githubSources.some(s => s.connected) ? "w-full" : "w-0"}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
