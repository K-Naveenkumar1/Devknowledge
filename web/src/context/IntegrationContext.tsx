"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
    // Initialize with false to simulate fresh state, or load from localStorage in a real app
    const [integrations, setIntegrations] = useState<IntegrationState>({
        github: false, // Default to disconnected as per requirement
        jira: false,
        confluence: false,
        slack: false,
    });

    const connectTool = (tool: keyof IntegrationState) => {
        setIntegrations((prev) => ({ ...prev, [tool]: true }));
    };

    const disconnectTool = (tool: keyof IntegrationState) => {
        setIntegrations((prev) => ({ ...prev, [tool]: false }));
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
