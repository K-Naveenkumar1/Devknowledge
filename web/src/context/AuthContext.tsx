"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";


type AuthContextType = {
    isAuthenticated: boolean;
    user: { id: string; name: string; email: string; role: string } | null;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);

    // Initialize from Supabase and localStorage
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setIsAuthenticated(true);
                setUser({
                    id: session.user.id,
                    email: session.user.email || "",
                    name: session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "User",
                    role: "Developer"
                });
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setIsAuthenticated(true);
                setUser({
                    id: session.user.id,
                    email: session.user.email || "",
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

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        return { error };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signUp, logout }}>
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
