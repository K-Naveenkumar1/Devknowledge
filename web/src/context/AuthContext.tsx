"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


type AuthContextType = {
    isAuthenticated: boolean;
    user: { name: string; role: string } | null;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);

    // Initialize from Supabase and localStorage
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setIsAuthenticated(true);
                setUser({
                    name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "User",
                    role: "Developer"
                });
            } else {
                const loggedIn = localStorage.getItem("isLoggedIn") === "true";
                if (loggedIn) {
                    setIsAuthenticated(true);
                    setUser({ name: "John Doe", role: "Frontend Developer" });
                }
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setIsAuthenticated(true);
                setUser({
                    name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "User",
                    role: "Developer"
                });
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async () => {
        // In a real app, this would be a real Supabase sign in
        // For now we simulate and fallback
        setIsAuthenticated(true);
        setUser({ name: "John Doe", role: "Frontend Developer" });
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
