"use client";

import React from "react";
import { Database, Layout, ExternalLink, ShieldCheck, CheckSquare, CheckCircle2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


export default function JiraPage() {
    const { integrations, sources, connectTool, disconnectTool, toggleSource } = useIntegrations();
    const isConnected = integrations.jira;
    const jiraSources = sources.filter(s => s.type === "jira");

    const toggleConnection = () => {
        if (isConnected) {
            disconnectTool("jira");
        } else {
            connectTool("jira");
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className={`p-3 border rounded-xl transition-colors ${isConnected ? "bg-blue-500/10 border-blue-500/30" : "bg-zinc-900 border-zinc-800"}`}>
                        <Database className={`h-8 w-8 ${isConnected ? "text-blue-500" : "text-blue-500"}`} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Jira Integration</h1>
                        <p className="text-zinc-400">Sync your issues, sprints, and project timelines.</p>
                    </div>
                </div>
                <button
                    onClick={toggleConnection}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${isConnected
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                >
                    {isConnected ? <CheckCircle2 className="h-5 w-5" /> : <Layout className="h-5 w-5" />}
                    {isConnected ? "Connected" : "Connect Jira Instance"}
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

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-zinc-800">
                            <h3 className="text-white font-semibold">
                                {isConnected ? "Available Projects" : "Connect Jira account"}
                            </h3>
                            <p className="text-zinc-500 text-sm mt-1">
                                {isConnected
                                    ? "Select projects to import tickets and activity into the knowledge graph."
                                    : "Link your Atlassian account to browse projects."}
                            </p>
                        </div>

                        <div className="divide-y divide-zinc-800">
                            {isConnected ? (
                                jiraSources.map(project => (
                                    <div key={project.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                                <Database className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-zinc-100 font-medium">{project.name}</p>
                                                <p className="text-zinc-500 text-xs">Atlassian Cloud Project</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleSource(project.id)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${project.connected
                                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                    : "bg-blue-600 text-white hover:bg-blue-500"
                                                }`}
                                        >
                                            {project.connected ? "Imported" : "Import"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="h-16 w-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-4 border border-zinc-700">
                                        <Layout className="h-8 w-8 text-zinc-600" />
                                    </div>
                                    <h4 className="text-zinc-400 font-medium">Authentication Required</h4>
                                    <p className="text-zinc-500 text-sm mt-1 mb-6">Connect your instance to fetch projects.</p>
                                    <button
                                        onClick={toggleConnection}
                                        className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-2"
                                    >
                                        <Database className="h-4 w-4" /> Connect Atlassian
                                    </button>
                                </div>
                            )}
                        </div>
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
