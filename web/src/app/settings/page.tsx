"use client";

import React from "react";
import { Settings, User, Bell, Lock, Globe, Moon } from "lucide-react";

export default function SettingsPage() {
    const categories = [
        { name: "Profile", icon: User, description: "Manage your personal information" },
        { name: "Notifications", icon: Bell, description: "Control how you receive alerts" },
        { name: "Security", icon: Lock, description: "Password and authentication settings" },
        { name: "Appearance", icon: Moon, description: "Customize the look and feel" },
        { name: "Language", icon: Globe, description: "Select your preferred language" },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400">
                    <Settings className="h-8 w-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Project Settings</h1>
                    <p className="text-zinc-400">Configure your workspace and personal preferences.</p>
                </div>
            </div>

            <div className="space-y-4">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className="group flex items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-900 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg group-hover:border-zinc-700 transition-colors">
                                <cat.icon className="h-5 w-5 text-zinc-400 group-hover:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">{cat.name}</h3>
                                <p className="text-zinc-500 text-sm">{cat.description}</p>
                            </div>
                        </div>
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 group-hover:bg-zinc-800">
                            <span className="text-zinc-500">→</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 border-t border-zinc-800 flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-semibold text-zinc-300">Software Version</h4>
                    <p className="text-xs text-zinc-500 font-mono mt-1">v0.1.0-alpha (Build 20260201)</p>
                </div>
                <button className="text-xs text-zinc-500 hover:text-white transition-colors underline decoration-dotted">
                    Check for updates
                </button>
            </div>
        </div>
    );
}
