"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useIntegrations } from "@/context/IntegrationContext";


type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
};

export default function AssistantChat() {
    const { integrations } = useIntegrations();
    const connectedToolsCount = Object.values(integrations).filter(Boolean).length;

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: connectedToolsCount > 0
                ? `Hello! I&apos;m connected to ${connectedToolsCount} of your tools. How can I help you today?`
                : "Hello! Connect your tools in the Knowledge Sources tab to get started. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");

        // Simulate AI response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "I&apos;m processing that request directly with your integrated tools. Give me a moment...",
                    timestamp: new Date(),
                },
            ]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                        DevKnowledge AI
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                    </h3>
                    <p className="text-xs text-zinc-400">Connected to {connectedToolsCount} {connectedToolsCount === 1 ? 'tool' : 'tools'}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${msg.role === "assistant" ? "flex-row" : "flex-row-reverse"
                            }`}
                    >
                        <div
                            className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "assistant"
                                ? "bg-zinc-800 border border-zinc-700"
                                : "bg-blue-600"
                                }`}
                        >
                            {msg.role === "assistant" ? <Bot className="h-4 w-4 text-zinc-400" /> : <User className="h-4 w-4 text-white" />}
                        </div>

                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "assistant"
                                ? "bg-zinc-800/50 text-zinc-200 border border-zinc-700/50"
                                : "bg-blue-600 text-white"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Action Bar */}
            <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/30 flex gap-2 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setInput("Explain this code using linked docs and known issues:")}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                    🔍 Explain Code
                </button>
                <button
                    onClick={() => setInput("Trace the root cause of this error based on recent PRs:")}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                    🐞 Root Cause
                </button>
                <button
                    onClick={() => setInput("Why was this design choice made? Check Jira and PR sources.")}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                    🧠 Decision Memory
                </button>
                <button
                    onClick={() => setInput("Has this issue happened before?")}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                    ♻️ Check Duplicate
                </button>
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-900/50">
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask complex questions..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-100 placeholder-zinc-500"
                    />
                    <button
                        onClick={handleSend}
                        className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
