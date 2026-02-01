"use client";

import { motion } from "framer-motion";
import { Github, MessageSquare, FileText, Database, CheckCircle2, Circle, Plus, AlertCircle, Loader2 } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";
import { useRouter } from "next/navigation";

const tools = [
    { id: "github", name: "GitHub", icon: Github, description: "Repo & PR Context", path: "/github" },
    { id: "jira", name: "Jira", icon: Database, description: "Issue Tracking", path: "/jira" },
    { id: "confluence", name: "Confluence", icon: FileText, description: "Knowledge Base", path: "/confluence" },
    { id: "slack", name: "Slack", icon: MessageSquare, description: "Team Chat", path: "/slack" },
] as const;

export default function IntegrationGrid() {
    const { integrations } = useIntegrations();
    const router = useRouter();

    const handleToolClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mt-12">
            {tools.map((tool, index) => {
                const isConnected = integrations[tool.id as keyof typeof integrations];

                const Icon = tool.icon;

                return (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleToolClick(tool.path)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${isConnected
                            ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                            : "border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-zinc-700"
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className={`p-2 rounded-lg border transition-colors ${isConnected ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-500" : "bg-zinc-950 border-zinc-800 group-hover:border-zinc-700 text-zinc-400"
                                }`}>
                                <Icon className={`h-5 w-5 ${isConnected ? "text-emerald-400" : "text-zinc-400 group-hover:text-zinc-100"}`} />
                            </div>
                            {isConnected ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <Plus className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400" />
                            )}
                        </div>
                        <div className="relative z-10">
                            <h3 className={`font-medium ${isConnected ? "text-emerald-100" : "text-zinc-200"}`}>{tool.name}</h3>
                            <p className={`text-sm ${isConnected ? "text-emerald-500/70" : "text-zinc-500"}`}>
                                {isConnected ? "Connected" : tool.description}
                            </p>
                        </div>

                        {/* Conditional Glow */}
                        {!isConnected && <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:to-blue-500/5 transition-all duration-500" />}
                    </motion.div>
                );
            })}
        </div>
    );
}
