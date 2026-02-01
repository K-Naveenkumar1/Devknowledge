"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    FileText,
    MoreVertical,
    Send,
    Clock,
    Trash2,
    ExternalLink,
    CheckCircle2,
    Github,
    ChevronRight,
    Loader2,
    Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaces, Workspace } from "@/context/WorkspaceContext";
import { useIntegrations } from "@/context/IntegrationContext";

export default function WorkspacePage() {
    const {
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
        createWorkspace,
        updateWorkspace,
        publishWorkspace,
        deleteWorkspace,
        isLoading
    } = useWorkspaces();
    const { integrations } = useIntegrations();

    const [isCreating, setIsCreating] = useState(false);
    const [newWsName, setNewWsName] = useState("");
    const [publishLoading, setPublishLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWsName.trim()) return;
        const ws = await createWorkspace(newWsName, "New Workspace");
        setNewWsName("");
        setIsCreating(false);
        setActiveWorkspace(ws);
    };

    const handlePublish = async () => {
        if (!activeWorkspace) return;
        setPublishLoading(true);
        const result = await publishWorkspace(activeWorkspace.id);
        setPublishLoading(false);
        if (result.success) {
            // Show success notification or toast (omitted for brevity)
        }
    };

    const filteredWorkspaces = workspaces.filter(ws =>
        ws.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-2rem)] overflow-hidden bg-black rounded-3xl border border-zinc-800 shadow-2xl m-4">
            {/* Sidebar - Workspace List */}
            <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950/50">
                <div className="p-6 border-b border-zinc-800">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold text-white">Workspaces</h1>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all shadow-lg shadow-blue-900/40"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-300 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <AnimatePresence>
                        {isCreating && (
                            <motion.form
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleCreate}
                                className="p-3 bg-zinc-900 rounded-xl border border-blue-500/50 shadow-lg shadow-blue-900/10 mb-4"
                            >
                                <input
                                    autoFocus
                                    placeholder="Project Name..."
                                    value={newWsName}
                                    onChange={(e) => setNewWsName(e.target.value)}
                                    className="w-full bg-transparent border-none text-white text-sm outline-none mb-2"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreating(false)}
                                        className="px-2 py-1 text-xs text-zinc-500 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-1 bg-blue-600 rounded-md text-xs font-bold text-white"
                                    >
                                        Create
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {filteredWorkspaces.map((ws) => (
                        <button
                            key={ws.id}
                            onClick={() => setActiveWorkspace(ws)}
                            className={`w-full text-left p-4 rounded-2xl transition-all group ${activeWorkspace?.id === ws.id
                                ? "bg-zinc-900 ring-1 ring-zinc-700"
                                : "hover:bg-zinc-900/50"
                                }`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl border ${activeWorkspace?.id === ws.id
                                        ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                        : "bg-zinc-800 border-zinc-700 text-zinc-500"
                                        }`}>
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm truncate max-w-[120px]">{ws.name}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className={`h-1.5 w-1.5 rounded-full ${ws.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                                                }`} />
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                                                {ws.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor Detail View */}
            <div className="flex-1 flex flex-col bg-zinc-950">
                {activeWorkspace ? (
                    <motion.div
                        key={activeWorkspace.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col h-full"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white">{activeWorkspace.name}</h2>
                                    <p className="text-xs text-zinc-500 flex items-center gap-2 mt-1">
                                        <Clock className="h-3 w-3" />
                                        Created {new Date(activeWorkspace.created_at).toLocaleDateString()}
                                        {activeWorkspace.last_published && (
                                            <span className="flex items-center gap-1 text-emerald-500/80">
                                                • Last published {new Date(activeWorkspace.last_published).toLocaleTimeString()}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => deleteWorkspace(activeWorkspace.id)}
                                    className="p-2.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handlePublish}
                                    disabled={publishLoading}
                                    className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-xl font-bold transition-all shadow-xl disabled:opacity-50"
                                >
                                    {publishLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    Publish
                                </button>
                            </div>
                        </div>

                        {/* Config Area */}
                        <div className="p-4 bg-zinc-900/30 border-b border-zinc-800 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Publish Destination</label>
                                <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                                    <div className="p-1.5 bg-zinc-800 rounded-lg">
                                        {activeWorkspace.integration === "github" ? <Github className="h-4 w-4 text-white" /> : <ExternalLink className="h-4 w-4 text-zinc-500" />}
                                    </div>
                                    <span className="text-sm font-medium text-white capitalize">{activeWorkspace.integration}</span>
                                    {!integrations[activeWorkspace.integration as keyof typeof integrations] && (
                                        <span className="text-[10px] text-zinc-500">(Not Connected)</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Workspace Type</label>
                                <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                                    <div className="p-1.5 bg-zinc-800 rounded-lg">
                                        <Plus className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-medium text-white">Project Draft</span>
                                </div>
                            </div>
                        </div>

                        {/* Editor content */}
                        <div className="flex-1 p-8">
                            <textarea
                                value={activeWorkspace.content}
                                onChange={(e) => updateWorkspace(activeWorkspace.id, { content: e.target.value })}
                                placeholder="Start building your technical knowledge..."
                                className="w-full h-full bg-transparent text-zinc-300 resize-none outline-none font-mono leading-relaxed placeholder:text-zinc-700"
                            />
                        </div>

                        {/* Status bar */}
                        <div className="px-8 py-3 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                            <div className="flex items-center gap-4">
                                <span>UTF-8</span>
                                <span>Markdown</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    Auto-saving...
                                </span>
                                <span>{activeWorkspace.content.length} characters</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                        <div className="h-24 w-24 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Layers className="h-10 w-10 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Select a Workspace</h3>
                        <p className="text-zinc-500 max-w-sm mb-8">Choose an existing project or create a new workspace to start technical drafting and publishing to your integrations.</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/40 flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            New Workspace
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
