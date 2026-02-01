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
    isSyncing: Partial<IntegrationState>;
    isGlobalSyncing: boolean;
    connectTool: (tool: keyof IntegrationState, identity?: string) => Promise<void>;
    disconnectTool: (tool: keyof IntegrationState) => void;
    syncAll: () => Promise<void>;
    toggleSource: (sourceId: string) => void;
    addCustomSource: (tool: keyof IntegrationState, sourceName: string) => void;
    importAllSources: (tool: keyof IntegrationState) => void;
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
    const [isSyncing, setIsSyncing] = useState<Partial<IntegrationState>>({});
    const [isGlobalSyncing, setIsGlobalSyncing] = useState(false);

    // Load integration state from Supabase when user logs in
    useEffect(() => {
        const fetchIntegrations = async () => {
            if (isAuthenticated) {
                const { data: { user: supabaseUser } } = await supabase.auth.getUser();
                if (supabaseUser) {
                    const { data: integratedData } = await supabase
                        .from("user_integrations")
                        .select("github, jira, confluence, slack")
                        .eq("user_id", supabaseUser.id)
                        .single();

                    const { data: { session } } = await supabase.auth.getSession();
                    let currentIntegrations = integratedData || { github: false, jira: false, confluence: false, slack: false };

                    // Auto-detect GitHub connection from session
                    if (session?.provider_token && !currentIntegrations.github) {
                        currentIntegrations.github = true;
                        await supabase
                            .from("user_integrations")
                            .upsert({ user_id: supabaseUser.id, ...currentIntegrations });
                    }

                    if (currentIntegrations) {
                        setIntegrations(currentIntegrations);
                    }

                    // Fetch sources from DB first
                    const { data: sourcesData } = await supabase
                        .from("user_sources")
                        .select("*")
                        .eq("user_id", supabaseUser.id);

                    if (sourcesData && sourcesData.length > 0) {
                        setSources(sourcesData.map((s: any) => ({
                            id: s.id,
                            name: s.name,
                            type: s.type as keyof IntegrationState,
                            connected: s.connected
                        })));
                    }
                }
            } else {
                setIntegrations({ github: false, jira: false, confluence: false, slack: false });
                setSources([]);
            }
        };

        fetchIntegrations();
    }, [isAuthenticated]);

    const connectTool = async (tool: keyof IntegrationState, identity: string = "User") => {
        setIsSyncing(prev => ({ ...prev, [tool]: true }));

        await new Promise(resolve => setTimeout(resolve, 1500));

        const newState = { ...integrations, [tool]: true };
        setIntegrations(newState);

        // Generate high-quality fake data as requested
        const fakeData: Record<keyof IntegrationState, IntegrationSource[]> = {
            github: [
                { id: `gh-${Date.now()}-1`, name: `${identity}/core-platform`, type: "github", connected: false },
                { id: `gh-${Date.now()}-2`, name: `${identity}/ui-components`, type: "github", connected: false },
                { id: `gh-${Date.now()}-3`, name: `${identity}/auth-service`, type: "github", connected: false },
                { id: `gh-${Date.now()}-4`, name: `${identity}/dev-docs`, type: "github", connected: false },
            ],
            jira: [
                { id: `jr-${Date.now()}-1`, name: "Project Phoenix - Sprint 24", type: "jira", connected: false },
                { id: `jr-${Date.now()}-2`, name: "Platform Backlog", type: "jira", connected: false },
                { id: `jr-${Date.now()}-3`, name: "Product Roadmap 2026", type: "jira", connected: false },
            ],
            confluence: [
                { id: `cf-${Date.now()}-1`, name: "Architecture Decision Records", type: "confluence", connected: false },
                { id: `cf-${Date.now()}-2`, name: "Onboarding Guides", type: "confluence", connected: false },
                { id: `cf-${Date.now()}-3`, name: "API Documentation", type: "confluence", connected: false },
            ],
            slack: [
                { id: `sl-${Date.now()}-1`, name: "#engineering-core", type: "slack", connected: false },
                { id: `sl-${Date.now()}-2`, name: "#deployments", type: "slack", connected: false },
                { id: `sl-${Date.now()}-3`, name: "#architecture-chat", type: "slack", connected: false },
            ]
        };

        const discovered = fakeData[tool];
        setSources(prev => [...prev.filter(s => s.type !== tool), ...discovered]);
        setIsSyncing(prev => ({ ...prev, [tool]: false }));

        if (isAuthenticated) {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                // Update integration state
                await supabase
                    .from("user_integrations")
                    .upsert({ user_id: supabaseUser.id, ...newState });

                // Store discovered fake details in database
                const sourcesToStore = discovered.map(s => ({
                    user_id: supabaseUser.id,
                    id: s.id,
                    name: s.name,
                    type: s.type,
                    connected: s.connected
                }));

                await supabase
                    .from("user_sources")
                    .upsert(sourcesToStore);
            }
        }
    };

    const fetchGithubRepos = async (token: string) => {
        // Fallback or override with fake data if needed, keeping the logic for real fetch too if user changes mind
        try {
            const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const repos = await response.json();
            if (Array.isArray(repos)) {
                return repos.map((repo: any) => ({
                    id: repo.id.toString(),
                    name: repo.full_name,
                    type: "github" as const,
                    connected: false
                }));
            }
        } catch (e) { }
        return [];
    };

    const addCustomSource = async (tool: keyof IntegrationState, sourceName: string) => {
        const newSource: IntegrationSource = {
            id: `${tool}-${Date.now()}`,
            name: sourceName,
            type: tool,
            connected: true
        };
        setSources(prev => [...prev, newSource]);

        if (isAuthenticated) {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                await supabase.from("user_sources").upsert({
                    user_id: supabaseUser.id,
                    ...newSource
                });
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

                await supabase
                    .from("user_sources")
                    .delete()
                    .eq("user_id", supabaseUser.id)
                    .eq("type", tool);
            }
        }
    };

    const toggleSource = async (sourceId: string) => {
        const source = sources.find(s => s.id === sourceId);
        if (!source) return;

        const newConnected = !source.connected;
        setSources(prev => prev.map(s =>
            s.id === sourceId ? { ...s, connected: newConnected } : s
        ));

        if (isAuthenticated) {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                await supabase
                    .from("user_sources")
                    .update({ connected: newConnected })
                    .eq("user_id", supabaseUser.id)
                    .eq("id", sourceId);
            }
        }
    };

    const syncAll = async () => {
        setIsGlobalSyncing(true);
        // Simulate deep indexing across all sources
        await new Promise(resolve => setTimeout(resolve, 3000));
        setSources(prev => prev.map(s => ({ ...s, connected: true })));
        setIsGlobalSyncing(false);
    };

    const importAllSources = (tool: keyof IntegrationState) => {
        setSources(prev => prev.map(s =>
            s.type === tool ? { ...s, connected: true } : s
        ));
    };

    return (
        <IntegrationContext.Provider value={{ integrations, sources, isSyncing, isGlobalSyncing, connectTool, disconnectTool, syncAll, toggleSource, addCustomSource, importAllSources }}>
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
