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

type IntegrationContextType = {
    integrations: IntegrationState;
    connectTool: (tool: keyof IntegrationState) => void;
    disconnectTool: (tool: keyof IntegrationState) => void;
};

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

export function IntegrationProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuth();
    // Initialize with false to simulate fresh state
    const [integrations, setIntegrations] = useState<IntegrationState>({
        github: false,
        jira: false,
        confluence: false,
        slack: false,
    });

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

        if (isAuthenticated) {
            const { data: { user: supabaseUser } } = await supabase.auth.getUser();
            if (supabaseUser) {
                await supabase
                    .from("user_integrations")
                    .upsert({ user_id: supabaseUser.id, ...newState });
            }
        }
    };

    return (
        <IntegrationContext.Provider value={{ integrations, connectTool, disconnectTool }}>
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
