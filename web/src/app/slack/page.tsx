"use client";

import React from "react";
import { Slack, Hash, ExternalLink, ShieldCheck, MessageSquare, Zap } from "lucide-react";

export default function SlackPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <Slack className="h-8 w-8 text-[#E01E5A]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Slack Integration</h1>
                        <p className="text-zinc-400">Capture decisions and context from team conversations.</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#4A154B] hover:bg-[#611f69] text-white rounded-lg font-medium transition-all">
                    <Slack className="h-5 w-5" />
                    Connect Slack Workspace
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Slack className="h-32 w-32" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-4">Channel Synchronization</h2>
                        <p className="text-zinc-400 mb-6 max-w-lg">
                            Select specific channels for DevKnowledge to monitor. The AI will extract technical decisions, issue reports, and deployment logs to provide real-time updates.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['#engineering', '#deployments', '#prod-issues', '#tech-design'].map(channel => (
                                <div key={channel} className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500 text-sm flex items-center gap-2">
                                    <Hash className="h-3 w-3" />
                                    {channel.substring(1)}
                                </div>
                            ))}
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
