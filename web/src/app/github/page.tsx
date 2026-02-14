"use client";

import React from "react";
import { Github, Folder, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";
import { useAuth } from "@/context/AuthContext";


export default function GitHubPage() {
    const { integrations, sources, isSyncing, connectTool, disconnectTool, toggleSource, addCustomSource, importAllSources } = useIntegrations();
    const isConnected = integrations.github;
    const isToolSyncing = isSyncing.github;
    const githubSources = sources.filter(s => s.type === "github");
    const [identity, setIdentity] = React.useState("");
    const [newRepo, setNewRepo] = React.useState("");

    const { signInWithGithub, user } = useAuth();
    const githubUsername = (user as any)?.user_metadata?.user_name || identity;

    const toggleConnection = async () => {
        if (isConnected) {
            disconnectTool("github");
            setIdentity("");
        } else {
            if (!identity.trim()) {
                alert("Please enter a GitHub username or organization.");
                return;
            }
            connectTool("github", identity);
        }
    };

    const handleAddRepo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRepo.trim()) {
            addCustomSource("github", newRepo.trim());
            setNewRepo("");
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
                                    <p className="text-zinc-400 text-sm">Grant permission for Devora to read your repository metadata and PR history.</p>
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
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-semibold">
                                    {isConnected ? "Select repositories to import" : "Connect to see repositories"}
                                </h3>
                                <p className="text-zinc-500 text-sm mt-1">
                                    {isConnected
                                        ? "These repositories were found in your account. Select which ones to map for AI reasoning."
                                        : "Grant access to your GitHub account to import repositories."}
                                </p>
                            </div>
                            {isConnected && githubSources.length > 0 && (
                                <button
                                    onClick={() => importAllSources("github")}
                                    className="px-4 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white transition-all"
                                >
                                    Import All
                                </button>
                            )}
                        </div>

                        <div className="divide-y divide-zinc-800">
                            {isConnected ? (
                                <>
                                    <div className="p-4 bg-zinc-800/20">
                                        <form onSubmit={handleAddRepo} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newRepo}
                                                onChange={(e) => setNewRepo(e.target.value)}
                                                placeholder="Enter repo name (e.g. org/repo)"
                                                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors"
                                            >
                                                Add Repo
                                            </button>
                                        </form>
                                    </div>
                                    {githubSources.map(repo => (
                                        <div key={repo.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                    <Github className="h-5 w-5 text-zinc-400" />
                                                </div>
                                                <div>
                                                    <p className="text-zinc-100 font-medium">{repo.name}</p>
                                                    <p className="text-zinc-500 text-xs text-uppercase tracking-wider">Repository</p>
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
                                    ))}
                                </>
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="h-16 w-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
                                        <Github className={`h-8 w-8 ${isToolSyncing ? "text-blue-500 animate-pulse" : "text-zinc-600"}`} />
                                    </div>
                                    <h4 className="text-zinc-400 font-medium mb-2">{isToolSyncing ? `Fetching ${identity}'s Repositories...` : "Find Your Repositories"}</h4>
                                    <p className="text-zinc-500 text-sm mb-8 max-w-xs">{isToolSyncing ? "We are scanning your account for public and private code." : "Enter your GitHub username or organization to discover repositories dynamically."}</p>

                                    {!isToolSyncing && (
                                        <div className="w-full max-w-xs mb-6">
                                            <input
                                                type="text"
                                                value={identity}
                                                onChange={(e) => setIdentity(e.target.value)}
                                                placeholder="GitHub Username / Org (e.g. vercel)"
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-center placeholder:text-zinc-600"
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={toggleConnection}
                                        disabled={isToolSyncing}
                                        className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 shadow-xl disabled:opacity-50"
                                    >
                                        {isToolSyncing ? (
                                            <>
                                                <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                Scanning...
                                            </>
                                        ) : (
                                            <>
                                                <Github className="h-5 w-5" />
                                                Connect & Discover
                                            </>
                                        )}
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
                            Devora only requests **Read-Only** access to your repositories. We never store your actual code—only a high-level technical map.
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
