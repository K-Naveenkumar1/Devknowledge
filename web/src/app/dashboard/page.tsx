"use client";

import SearchInput from "@/components/SearchInput";

export default function DashboardPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-8">

                {/* Header */}
                <div className="space-y-4 mb-8">
                    <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-xl">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                        Unified Knowledge Graph Active
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight heading-gradient pb-2">
                        One Search, <br /> All Your Technical Knowledge.
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Stop digging through scattered tools. Access GitHub, Jira, Confluence, and Slack in one unified interface.
                    </p>
                </div>

                {/* Search Component */}
                <SearchInput />

                {/* Footer info */}
                <div className="mt-20 text-zinc-500 text-sm">
                    <p>Press <kbd className="font-sans px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 mx-1">⌘ K</kbd> to search anytime</p>
                </div>
            </div>
        </main>
    );
}
