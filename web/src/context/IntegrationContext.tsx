"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";


type IntegrationState = {
    github: boolean;
    jira: boolean;
    confluence: boolean;
    slack: boolean;
};

type IntegrationSource = {
    id: string;
    name: string;
    type: keyof IntegrationState;
    connected: boolean;
};

type IntegrationContextType = {
    integrations: IntegrationState;
    sources: IntegrationSource[];
    connectTool: (tool: keyof IntegrationState) => void;
    disconnectTool: (tool: keyof IntegrationState) => void;
    toggleSource: (sourceId: string) => void;
};

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

export function IntegrationProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    // Initialize with false to simulate fresh state
    const [integrations, setIntegrations] = useState<IntegrationState>({
        github: false,
        jira: false,
        confluence: false,
        slack: false,
    });
    const [sources, setSources] = useState<IntegrationSource[]>([]);

    // Load integration state from Supabase when user logs in
    useEffect(() => {
        const fetchIntegrations = async () => {
            if (isAuthenticated) {
                const { data: { user: supabaseUser } } = await supabase.auth.getUser();
                if (supabaseUser) {
                    const { data, error } = await supabase
                        .from("user_integrations")
                        .select("github, jira, confluence, slack")
                        .eq("user_id", supabaseUser.id)
                        .single();

                    if (data && !error) {
                        setIntegrations(data);
                    }
                }
            }
        };

        fetchIntegrations();
    }, [isAuthenticated]);

    const connectTool = async (tool: keyof IntegrationState) => {
        const newState = { ...integrations, [tool]: true };
        setIntegrations(newState);

        // Mock fetching sources after connecting
        const mockSources: Record<keyof IntegrationState, IntegrationSource[]> = {
            github: [
                { id: "gh-1", name: "facebook/react", type: "github", connected: false },
                { id: "gh-2", name: "vercel/next.js", type: "github", connected: false },
                { id: "gh-3", name: "tailwindlabs/tailwindcss", type: "github", connected: false },
            ],
            jira: [
                { id: "jr-1", name: "Platform Scaling (CORE)", type: "jira", connected: false },
                { id: "jr-2", name: "Auth Redesign (SEC)", type: "jira", connected: false },
            ],
            confluence: [
                { id: "cf-1", name: "Engineering Handbooks", type: "confluence", connected: false },
                { id: "cf-2", name: "Product Specs", type: "confluence", connected: false },
            ],
            slack: [
                { id: "sl-1", name: "#engineering-general", type: "slack", connected: false },
                { id: "sl-2", name: "#backend-team", type: "slack", connected: false },
            ]
        };

        setSources(prev => [...prev, ...mockSources[tool]]);

        if (isAuthenticated) {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                await supabase
                    .from("user_integrations")
                    .upsert({ user_id: supabaseUser.id, ...newState });
            }
        }
    };

    const disconnectTool = async (tool: keyof IntegrationState) => {
        const newState = { ...integrations, [tool]: false };
        setIntegrations(newState);
        setSources(prev => prev.filter(s => s.type !== tool));

        if (isAuthenticated) {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                await supabase
                    .from("user_integrations")
                    .upsert({ user_id: supabaseUser.id, ...newState });
            }
        }
    };

    const toggleSource = (sourceId: string) => {
        setSources(prev => prev.map(s =>
            s.id === sourceId ? { ...s, connected: !s.connected } : s
        ));
    };

    return (
        <IntegrationContext.Provider value={{ integrations, sources, connectTool, disconnectTool, toggleSource }}>
            {children}
        </IntegrationContext.Provider>
    );
}

export function useIntegrations() {
    const context = useContext(IntegrationContext);
    if (context === undefined) {
        throw new Error("useIntegrations must be used within an IntegrationProvider");
    }
    return context;
}
