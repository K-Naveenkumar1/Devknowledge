"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";
import { useIntegrations } from "./IntegrationContext";

export type Workspace = {
    id: string;
    name: string;
    description: string;
    content: string;
    status: "draft" | "published";
    integration: string;
    last_published?: string;
    created_at: string;
};

type WorkspaceContextType = {
    workspaces: Workspace[];
    activeWorkspace: Workspace | null;
    isLoading: boolean;
    setActiveWorkspace: (workspace: Workspace | null) => void;
    createWorkspace: (name: string, description: string) => Promise<Workspace | null>;
    updateWorkspace: (id: string, updates: Partial<Workspace>) => Promise<void>;
    publishWorkspace: (id: string) => Promise<{ success: boolean; error?: string }>;
    deleteWorkspace: (id: string) => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const { integrations } = useIntegrations();
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            if (!isAuthenticated || !user) {
                setWorkspaces([]);
                setIsLoading(false);
                return;
            }

            // In a real app, this would be a Supabase query
            // For now, we'll use localStorage and simulate Supabase
            const stored = localStorage.getItem(`workspaces_${user.id}`);
            if (stored) {
                setWorkspaces(JSON.parse(stored));
            } else {
                // Initial mock data
                const initial: Workspace[] = [
                    {
                        id: "ws-1",
                        name: "Frontend Refactor",
                        description: "Modernizing the authentication flow",
                        content: "## Goals\n- Switch to Tailwind 4\n- Add framer-motion animations",
                        status: "draft",
                        integration: "github",
                        created_at: new Date().toISOString()
                    }
                ];
                setWorkspaces(initial);
                localStorage.setItem(`workspaces_${user.id}`, JSON.stringify(initial));
            }
            setIsLoading(false);
        };

        fetchWorkspaces();
    }, [isAuthenticated, user]);

    const createWorkspace = async (name: string, description: string) => {
        const newWs: Workspace = {
            id: `ws-${Date.now()}`,
            name,
            description,
            content: "",
            status: "draft",
            integration: integrations.github ? "github" : "none",
            created_at: new Date().toISOString()
        };

        const updated = [newWs, ...workspaces];
        setWorkspaces(updated);
        if (user) localStorage.setItem(`workspaces_${user.id}`, JSON.stringify(updated));
        return newWs;
    };

    const updateWorkspace = async (id: string, updates: Partial<Workspace>) => {
        const updated = workspaces.map(ws => ws.id === id ? { ...ws, ...updates } : ws);
        setWorkspaces(updated);
        if (activeWorkspace?.id === id) {
            setActiveWorkspace({ ...activeWorkspace, ...updates });
        }
        if (user) localStorage.setItem(`workspaces_${user.id}`, JSON.stringify(updated));
    };

    const publishWorkspace = async (id: string) => {
        const ws = workspaces.find(w => w.id === id);
        if (!ws) return { success: false, error: "Workspace not found" };

        // Simulate publishing to an integration
        await new Promise(resolve => setTimeout(resolve, 1500));

        const updates: Partial<Workspace> = {
            status: "published",
            last_published: new Date().toISOString()
        };

        await updateWorkspace(id, updates);
        return { success: true };
    };

    const deleteWorkspace = async (id: string) => {
        const updated = workspaces.filter(ws => ws.id !== id);
        setWorkspaces(updated);
        if (activeWorkspace?.id === id) setActiveWorkspace(null);
        if (user) localStorage.setItem(`workspaces_${user.id}`, JSON.stringify(updated));
    };

    return (
        <WorkspaceContext.Provider value={{
            workspaces,
            activeWorkspace,
            isLoading,
            setActiveWorkspace,
            createWorkspace,
            updateWorkspace,
            publishWorkspace,
            deleteWorkspace
        }}>
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspaces() {
    const context = useContext(WorkspaceContext);
    if (context === undefined) {
        throw new Error("useWorkspaces must be used within a WorkspaceProvider");
    }
    return context;
}
