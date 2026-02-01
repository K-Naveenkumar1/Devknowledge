"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Github, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { signUp } = useAuth();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const fullName = `${firstName} ${lastName}`.trim();
        const { error: signUpError } = await signUp(email, password, fullName);

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // In a real app with email confirmation, you'd show a "Check email" message
            // or redirect to login.
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-900/20">
                            <span className="font-bold text-white text-xl">DK</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-zinc-400">Join the unified knowledge platform.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center py-8">
                            <div className="h-16 w-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="h-8 w-8" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
                            <p className="text-zinc-400 mb-6">We&apos;ve sent a verification link to {email}.</p>
                            <Link
                                href="/login"
                                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    placeholder="you@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2 py-2">
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                    <span>Unified Search across tools</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                    <span>AI-Powered Insights</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating account..." : "Get Started"}
                                {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    )}

                    <p className="mt-6 text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
