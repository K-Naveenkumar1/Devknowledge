"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Database, MessageSquare, Zap, Shield, Search, Sparkles, Code, Layout, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Floating Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="px-6 h-16 flex items-center justify-between bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/20">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Zap className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Devora</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-all shadow-lg">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-indigo-600/8 blur-[100px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/6 blur-[90px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
              <Sparkles className="h-3 w-3" />
              <span>Powered by Advanced Repo Mapping</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              One Search, <br /> All Your Technical Knowledge.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop wasting time searching through Slack threads, Jira tickets, and GitHub PRs.
              Devora unifies your team&apos;s distributed context into one intelligent interface.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20">
                Start Your Free Trial <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-2xl border border-zinc-800 transition-all">
                See How It Works
              </Link>
            </div>
          </motion.div>


          {/* Dashboard Preview - Animated */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="relative p-1 bg-gradient-to-b from-zinc-700 to-transparent rounded-[2.5rem] shadow-2xl">
              <div className="bg-zinc-950 rounded-[2.2rem] overflow-hidden border border-white/5">
                <div className="bg-gradient-to-br from-zinc-900 to-black p-8 aspect-video flex items-center justify-center relative">
                  {/* Simulated Dashboard UI */}
                  <div className="w-full h-full flex flex-col gap-4">
                    {/* Search Bar */}
                    <div className="flex items-center gap-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl px-6 py-4 backdrop-blur-xl">
                      <Search className="h-5 w-5 text-blue-400" />
                      <div className="flex-1 text-zinc-400 text-sm">Ask anything about your codebase...</div>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-lg border border-blue-500/30">⌘K</div>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      <motion.div
                        className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Github className="h-8 w-8 text-white mb-3" />
                        <div className="h-2 bg-zinc-700 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                      </motion.div>

                      <motion.div
                        className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        <MessageSquare className="h-8 w-8 text-pink-500 mb-3" />
                        <div className="h-2 bg-zinc-700 rounded w-2/3 mb-2"></div>
                        <div className="h-2 bg-zinc-700 rounded w-full"></div>
                      </motion.div>

                      <motion.div
                        className="bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      >
                        <Database className="h-8 w-8 text-blue-400 mb-3" />
                        <div className="h-2 bg-zinc-700 rounded w-1/2 mb-2"></div>
                        <div className="h-2 bg-zinc-700 rounded w-3/4"></div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trusted By / Integrations Banner */}
      <section id="integrations" className="py-20 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-12">Universal Integration Ecosystem</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "GitHub", icon: Github, color: "text-white" },
              { name: "Jira", icon: Layers, color: "text-blue-500" },
              { name: "Confluence", icon: Layout, color: "text-blue-400" },
              { name: "Slack", icon: MessageSquare, color: "text-pink-500" }
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="flex flex-col items-center gap-4 group cursor-default">
                  <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                    <Icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <span className="text-zinc-400 group-hover:text-white font-medium transition-colors">{tool.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section - Why Devora */}
      <section className="py-32 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Teams Choose Devora</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">
                Join thousands of engineering teams who have transformed their workflow and productivity
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                10x
              </div>
              <div className="text-zinc-400 text-sm font-medium">Faster Knowledge Retrieval</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                85%
              </div>
              <div className="text-zinc-400 text-sm font-medium">Reduction in Context Switching</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/20 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                50K+
              </div>
              <div className="text-zinc-400 text-sm font-medium">Developers Trust Us</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-8 rounded-3xl bg-gradient-to-br from-orange-900/20 to-transparent border border-orange-500/20 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
                99.9%
              </div>
              <div className="text-zinc-400 text-sm font-medium">Uptime Guarantee</div>
            </motion.div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Eliminate Knowledge Silos</h3>
              <p className="text-zinc-400 leading-relaxed">
                Break down barriers between teams and tools. Devora creates a unified knowledge graph that connects all your technical information, making it instantly accessible to everyone who needs it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Accelerate Onboarding</h3>
              <p className="text-zinc-400 leading-relaxed">
                New team members get up to speed 5x faster with AI-powered context discovery. No more hunting through Slack channels or outdated wikis—everything they need is at their fingertips.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Designed for Modern Engineering</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Build context, eliminate silos, and accelerate delivery with our integrated AI intelligence layer.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Semantic Search</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Use natural language to search across your codebase, tickets, and docs. &quot;Why was the auth logic changed last June?&quot; works beautifully.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Repo Intelligence</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Devora maps your repository structure and PR history to provide architectural context that generic LLMs can&apos;t see.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Enterprise Security</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Your data remains yours. We use bank-grade encryption and never use your private codebase to train public AI models.
              </p>
            </div>

            {/* New Premium Features */}
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-orange-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Real-Time Collaboration</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Share insights instantly with your team. Live cursors, collaborative annotations, and synchronized knowledge updates in real-time.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-cyan-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">AI Code Review</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Automated code analysis with context-aware suggestions. Catch bugs, security issues, and performance bottlenecks before they ship.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-pink-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Smart Notifications</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Get notified only about what matters. AI-powered filtering ensures you never miss critical updates while avoiding noise.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Github className="h-6 w-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Version Control Intelligence</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Understand the evolution of your codebase. Track changes, identify patterns, and predict potential conflicts before they happen.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-yellow-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Automated Documentation</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Generate comprehensive documentation automatically. Keep your docs in sync with code changes without manual effort.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-teal-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Cross-Platform Sync</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Seamlessly sync across all your devices and tools. Access your knowledge base from anywhere, anytime, on any platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-700 to-indigo-800 overflow-hidden text-center">
            <div className="absolute -top-24 -right-24 h-64 w-64 bg-white/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-black/20 blur-[80px] rounded-full" />

            <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 leading-tight">Ready to unify your <br /> dev knowledge?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all">
                Get Started for Free
              </Link>
              <Link href="#contact" className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/20 font-bold rounded-2xl hover:bg-white/10 transition-all">
                Contact Sales
              </Link>
            </div>
            <p className="mt-8 text-blue-100/70 text-sm relative z-10">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white text-xl font-bold">
              <Zap className="h-6 w-6 text-blue-500" fill="currentColor" />
              Devora
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              The intelligent knowledge layer for high-performance engineering teams. Unify your tools, amplify your impact.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-xs text-center">
          &copy; 2026 Devora Inc. All rights reserved. Built for builders.
        </div>
      </footer>
    </div>
  );
}
