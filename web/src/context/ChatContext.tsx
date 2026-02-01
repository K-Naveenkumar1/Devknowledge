"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

export type Message = {
    id: string;
    sender_id: string;
    sender_name: string;
    content: string;
    timestamp: string;
    is_private: boolean;
    recipient_id?: string;
    is_encrypted: boolean;
};

type ChatContextType = {
    messages: Message[];
    onlineUsers: { id: string; name: string; role: string }[];
    sendMessage: (content: string, recipientId?: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<{ id: string; name: string; role: string }[]>([]);

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        // Mock messages
        const mockMessages: Message[] = [
            {
                id: "1",
                sender_id: "other",
                sender_name: "Sarah Chen",
                content: "Has anyone looked at the new GitHub API changes for OAuth?",
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                is_private: false,
                is_encrypted: true
            },
            {
                id: "2",
                sender_id: "other-2",
                sender_name: "Alex Riviera",
                content: "Yeah, they updated the scopes. Make sure to include 'repo' if you need private repos.",
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                is_private: false,
                is_encrypted: true
            }
        ];
        setMessages(mockMessages);

        // Mock users
        setOnlineUsers([
            { id: "other", name: "Sarah Chen", role: "Senior Architect" },
            { id: "other-2", name: "Alex Riviera", role: "Security Eng" },
            { id: "other-3", name: "Jordan Smith", role: "DevOps" }
        ]);

        // Realtime handle (simplified)
        const channel = supabase.channel('community-chat')
            .on('broadcast', { event: 'message' }, (payload) => {
                setMessages(prev => [...prev, payload.payload as Message]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isAuthenticated, user]);

    const sendMessage = async (content: string, recipientId?: string) => {
        if (!user) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            sender_id: user.id,
            sender_name: user.name,
            content,
            timestamp: new Date().toISOString(),
            is_private: !!recipientId,
            recipient_id: recipientId,
            is_encrypted: true
        };

        setMessages(prev => [...prev, newMessage]);

        // Broadcast for public messages
        if (!recipientId) {
            await supabase.channel('community-chat').send({
                type: 'broadcast',
                event: 'message',
                payload: newMessage
            });
        }
    };

    return (
        <ChatContext.Provider value={{ messages, onlineUsers, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
