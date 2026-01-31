import AssistantChat from "@/components/AssistantChat";

export default function AIChatPage() {
    return (
        <div className="h-screen p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold heading-gradient">
                    Your Technical Copilot
                </h1>
                <p className="text-xl text-zinc-400 max-w-xl">
                    I can analyze your GitHub PRs, summarize Jira tickets, and search Confluence documentation. Just ask.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 cursor-pointer transition-colors group">
                        <h3 className="font-medium text-zinc-200 group-hover:text-blue-400">Catch up on PRs</h3>
                        <p className="text-sm text-zinc-500 mt-1">"Summarize open PRs assigned to me"</p>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 cursor-pointer transition-colors group">
                        <h3 className="font-medium text-zinc-200 group-hover:text-purple-400">Debug Issue</h3>
                        <p className="text-sm text-zinc-500 mt-1">"Find context for error code 500 in logs"</p>
                    </div>
                </div>
            </div>

            <div className="h-full max-h-[calc(100vh-3rem)]">
                <AssistantChat />
            </div>
        </div>
    );
}
