"use client";

import React from "react";
import { Slack, Hash, ExternalLink, ShieldCheck, MessageSquare, Zap, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


export default function SlackPage() {
    const { integrations, sources, connectTool, disconnectTool, toggleSource } = useIntegrations();
    const isConnected = integrations.slack;
    const slackSources = sources.filter(s => s.type === "slack");

    const toggleConnection = () => {
        if (isConnected) {
            disconnectTool("slack");
        } else {
            connectTool("slack");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className={`p-3 border rounded-xl transition-colors ${isConnected ? "bg-pink-500/10 border-pink-500/30" : "bg-zinc-900 border-zinc-800"}`}>
                        <Slack className={`h-8 w-8 ${isConnected ? "text-pink-500" : "text-[#E01E5A]"}`} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Slack Integration</h1>
                        <p className="text-zinc-400">Capture decisions and context from team conversations.</p>
                    </div>
                </div>
                <button
                    onClick={toggleConnection}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${isConnected
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                        : "bg-[#4A154B] hover:bg-[#611f69] text-white"
                        }`}
                >
                    {isConnected ? <CheckCircle2 className="h-5 w-5" /> : <Slack className="h-5 w-5" />}
                    {isConnected ? "Connected" : "Connect Slack Workspace"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-zinc-800">
                            <h3 className="text-white font-semibold">
                                {isConnected ? "Select channels to sync" : "Connect Slack workspace"}
                            </h3>
                            <p className="text-zinc-500 text-sm mt-1">
                                {isConnected
                                    ? "Select which channels the AI should monitor for technical context."
                                    : "Link your workspace to browse channels."}
                            </p>
                        </div>

                        <div className="divide-y divide-zinc-800">
                            {isConnected ? (
                                slackSources.map(channel => (
                                    <div key={channel.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                <Hash className="h-5 w-5 text-pink-500" />
                                            </div>
                                            <div>
                                                <p className="text-zinc-100 font-medium">{channel.name}</p>
                                                <p className="text-zinc-500 text-xs">Public Channel</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleSource(channel.id)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${channel.connected
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-[#4A154B] text-white hover:bg-[#611f69]"
                                                }`}
                                        >
                                            {channel.connected ? "Syncing" : "Sync"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="h-16 w-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4 border border-zinc-700">
                                        <ShieldCheck className="h-8 w-8 text-zinc-600" />
                                    </div>
                                    <h4 className="text-zinc-400 font-medium">Workspace Not Linked</h4>
                                    <p className="text-zinc-500 text-sm mt-1 mb-6">Connect your workspace to select channels.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                            <MessageSquare className="h-6 w-6 text-[#2EB67D] mb-4" />
                            <h3 className="text-white font-medium mb-1">Thread Summaries</h3>
                            <p className="text-zinc-500 text-sm">Long discussions are summarized into actionable bullet points.</p>
                        </div>
                        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                            <Zap className="h-6 w-6 text-[#ECB22E] mb-4" />
                            <h3 className="text-white font-medium mb-1">Decision Log</h3>
                            <p className="text-zinc-500 text-sm">Automatically track architecture decisions made in chat.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-pink-400 mb-4">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Compliance</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4">
                            We never index Private Channels or Direct Messages unless explicitly authorized. Data is filtered to exclude PII (Personally Identifiable Information).
                        </p>
                        <a href="#" className="flex items-center gap-1 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                            Data Retention Policy
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
