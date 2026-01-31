"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    MessageSquare,
    Database,
    Settings,
    Github,
    Slack,
    FileText,
    Zap,
    Layers
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { name: "Overview", icon: Home, href: "/" },
    { name: "AI Assistant", icon: MessageSquare, href: "/ai-chat" },
    { name: "Knowledge Sources", icon: Database, href: "/sources" },
];

const integrationItems = [
    { name: "GitHub", icon: Github, href: "/github" },
    { name: "Jira", icon: Layers, href: "/jira" },
    { name: "Confluence", icon: FileText, href: "/confluence" },
    { name: "Slack", icon: Slack, href: "/slack" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl transition-transform">
            <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
                {/* Logo */}
                <div className="mb-10 flex items-center px-2">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">DevKnowledge</span>
                </div>

                {/* Navigation */}
                <div className="space-y-1">
                    <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Main Menu
                    </p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 rounded-lg bg-zinc-900"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className={`relative z-10 mr-3 h-5 w-5 transition-colors ${isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-blue-400"
                                    }`} />
                                <span className="relative z-10">{item.name}</span>
                                {isActive && (
                                    <div className="absolute right-3 z-10 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Integrations */}
                <div className="mt-8 space-y-1">
                    <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Integrations
                    </p>
                    {integrationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-zinc-900 text-white"
                                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? "text-blue-500" : "text-zinc-500 group-hover:text-zinc-300"
                                    }`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Settings at bottom */}
                <div className="mt-auto pt-6 border-t border-zinc-800">
                    <Link
                        href="/settings"
                        className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname === "/settings"
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                            }`}
                    >
                        <Settings className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-zinc-300" />
                        <span>Settings</span>
                    </Link>

                    <div className="mt-4 flex items-center px-3 py-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase ring-2 ring-zinc-900">
                            JD
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="truncate text-xs font-medium text-white">John Doe</p>
                            <p className="truncate text-[10px] text-zinc-500">Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
