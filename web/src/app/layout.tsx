import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevKnowledge | Unified Technical Knowledge",
  description: "Unify access to your distributed technical knowledge across all development tools.",
};

import AppLayout from "@/components/AppLayout";
import { IntegrationProvider } from "@/context/IntegrationContext";
import { AuthProvider } from "@/context/AuthContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { ChatProvider } from "@/context/ChatContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AuthProvider>
          <IntegrationProvider>
            <WorkspaceProvider>
              <ChatProvider>
                <AppLayout>
                  {children}
                </AppLayout>
              </ChatProvider>
            </WorkspaceProvider>
          </IntegrationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
