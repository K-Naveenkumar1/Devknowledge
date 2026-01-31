"use client";

import React from "react";
import { Database, Layout, ExternalLink, ShieldCheck, CheckSquare } from "lucide-react";

export default function JiraPage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <Database className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Jira Integration</h1>
                        <p className="text-zinc-400">Sync your issues, sprints, and project timelines.</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all">
                    <Layout className="h-5 w-5" />
                    Connect Jira Instance
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Capabilities</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Summarize recent sprint progress",
                                "Find blockers in active tickets",
                                "Link PRs to Jira issues automatically",
                                "Generate status reports for stakeholders",
                                "Search history of completed work",
                                "Estimate effort based on similar tasks"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-center p-3 rounded-lg bg-zinc-950 border border-zinc-800/50">
                                    <CheckSquare className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm text-zinc-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 flex flex-col items-center text-center">
                        <div className="h-20 w-20 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
                            <Database className="h-10 w-10 text-zinc-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Connect to Atlassian</h3>
                        <p className="text-zinc-500 max-w-md mb-8">
                            DevKnowledge needs to connect to your Atlassian Cloud instance to analyze issue history and project data.
                        </p>
                        <button className="px-8 py-3 bg-zinc-100 hover:bg-white text-black font-semibold rounded-xl transition-all shadow-lg hover:shadow-white/5">
                            Authenticate with Atlassian
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 text-blue-400 mb-4">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Privacy</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4">
                            We only index ticket metadata and descriptions. Comments and attachments are processed locally in your browser for summary generation.
                        </p>
                        <a href="#" className="flex items-center gap-1 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                            Data Privacy Details
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
