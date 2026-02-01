"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    Shield,
    Users,
    Lock,
    Globe,
    Search,
    User,
    ChevronRight,
    Circle,
    Hash
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat, Message } from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";

export default function CommunityChatPage() {
    const { messages, onlineUsers, sendMessage } = useChat();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState("");
    const [chatType, setChatType] = useState<"public" | "private">("public");
    const [activeRecipient, setActiveRecipient] = useState<typeof onlineUsers[0] | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        sendMessage(newMessage, chatType === "private" ? activeRecipient?.id : undefined);
        setNewMessage("");
    };

    const displayMessages = messages.filter(m => {
        if (chatType === "public") return !m.is_private;
        return m.is_private && (
            (m.sender_id === user?.id && m.recipient_id === activeRecipient?.id) ||
            (m.sender_id === activeRecipient?.id && m.recipient_id === user?.id)
        );
    });

    return (
        <div className="flex h-[calc(100vh-2rem)] overflow-hidden bg-black rounded-3xl border border-zinc-800 shadow-2xl m-4">
            {/* Sidebar - Channels/Users */}
            <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950/50">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold text-white mb-6">Community</h1>
                    <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 mb-6">
                        <button
                            onClick={() => setChatType("public")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${chatType === "public" ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            <Globe className="h-3.5 w-3.5" />
                            Public
                        </button>
                        <button
                            onClick={() => setChatType("private")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${chatType === "private" ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            <Lock className="h-3.5 w-3.5" />
                            Private
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {chatType === "public" ? (
                        <div className="p-4 space-y-1">
                            <p className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Channels</p>
                            <button className="w-full flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/80 text-white group">
                                <Hash className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-semibold">general-technical</span>
                                <Circle className="h-2 w-2 ml-auto fill-blue-500 text-blue-500" />
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900/30 rounded-xl transition-all text-zinc-400">
                                <Hash className="h-4 w-4 text-zinc-600" />
                                <span className="text-sm font-medium">architecture-reviews</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-900/30 rounded-xl transition-all text-zinc-400">
                                <Hash className="h-4 w-4 text-zinc-600" />
                                <span className="text-sm font-medium">security-updates</span>
                            </button>
                        </div>
                    ) : (
                        <div className="p-4 space-y-1">
                            <p className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Online Developers</p>
                            {onlineUsers.map(u => (
                                <button
                                    key={u.id}
                                    onClick={() => setActiveRecipient(u)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeRecipient?.id === u.id
                                            ? "bg-zinc-900 border border-zinc-800 shadow-xl"
                                            : "hover:bg-zinc-900/30 text-zinc-400"
                                        }`}
                                >
                                    <div className="relative">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                            {u.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                                    </div>
                                    <div className="flex-1 text-left overflow-hidden">
                                        <p className={`text-sm font-semibold truncate ${activeRecipient?.id === u.id ? "text-white" : "text-zinc-300"}`}>
                                            {u.name}
                                        </p>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{u.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-zinc-800 bg-zinc-900/20">
                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-xl border border-zinc-800/50">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-white uppercase tracking-wider">End-to-End Secure</p>
                            <p className="text-[9px] text-zinc-500">Your messages are encrypted</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-zinc-950">
                {/* Header */}
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
                            {chatType === "public" ? <Globe className="h-5 w-5 text-blue-500" /> : <User className="h-5 w-5 text-indigo-500" />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {chatType === "public" ? "general-technical" : (activeRecipient?.name || "Select a developer")}
                            </h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                    {chatType === "public" ? "1,248 developers online" : "Active Now"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-7 w-7 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[8px] text-zinc-500 font-bold">
                                {i === 4 ? "+1k" : "U" + i}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
                >
                    {displayMessages.map((msg) => {
                        const isMe = msg.sender_id === user?.id;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex gap-4 max-w-[80%] ${isMe ? "flex-row-reverse" : ""}`}>
                                    <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white uppercase border ${isMe ? "bg-blue-600 border-blue-500" : "bg-zinc-800 border-zinc-700"
                                        }`}>
                                        {msg.sender_name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                                        <div className="flex items-center gap-2 mb-1.5 px-1">
                                            <span className="text-xs font-bold text-white">{msg.sender_name}</span>
                                            <span className="text-[10px] text-zinc-600">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${isMe
                                                ? "bg-blue-600/10 border-blue-500/20 text-blue-50"
                                                : "bg-zinc-900 border-zinc-800 text-zinc-300"
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-zinc-950">
                    <form
                        onSubmit={handleSend}
                        className="relative flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-2 pl-4 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-2xl"
                    >
                        <input
                            type="text"
                            placeholder={chatType === "private" && !activeRecipient ? "Select a developer to start chatting..." : "Type your message..."}
                            disabled={chatType === "private" && !activeRecipient}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 bg-transparent border-none text-zinc-200 text-sm outline-none placeholder:text-zinc-600 py-2.5"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || (chatType === "private" && !activeRecipient)}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-zinc-800 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/20"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                    <p className="text-center text-[9px] text-zinc-600 mt-4 uppercase tracking-[0.2em]">
                        Your communications are secured with military-grade encryption
                    </p>
                </div>
            </div>
        </div>
    );
}
