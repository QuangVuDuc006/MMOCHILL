"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function PCHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="hidden md:flex h-16 items-center justify-between px-8 bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search for tasks, history..." 
          className="w-full bg-muted/50 border border-border/50 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground/80">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-background"></span>
        </button>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        )}
        
        <div className="h-8 w-px bg-border/50 mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right">
            <p className="text-sm font-semibold leading-none">Vu Duc Quang</p>
            <p className="text-xs text-muted-foreground">Pro Member</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-primary overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Quang" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
