import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottom-nav";
import Sidebar from "@/components/sidebar";
import PCHeader from "@/components/pc-header";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MMOChill - Earn Rewards",
  description: "Complete tasks to earn rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Mobile Layout (visibile exclusively on devices below md breakpoint) */}
          <div className="md:hidden flex flex-col min-h-screen w-full bg-background relative overflow-hidden">
            <Navbar />
            
            <main className="flex-1 overflow-y-auto pb-24 p-4 no-scrollbar relative w-full h-full">
              {children}
            </main>
            
            <BottomNav />
          </div>

          {/* Desktop/PC Layout (hidden on mobile, visible on md and up) */}
          <div className="hidden md:flex h-screen w-full bg-background overflow-hidden selection:bg-primary/20">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              <PCHeader />
              <main className="flex-1 overflow-y-auto bg-muted/30 p-8 no-scrollbar">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster position="bottom-right" richColors theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
