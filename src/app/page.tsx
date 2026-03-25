"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, CheckCircle, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock Data
const activeTasks = [
  { id: 1, title: "Surf Website for 30s", reward: 250, time: "30s", type: "surf", available: true },
  { id: 2, title: "Download Partner App", reward: 1500, time: "5m", type: "app", available: true },
  { id: 3, title: "Watch Video Ad", reward: 500, time: "60s", type: "video", available: true },
];

const history = [
  { id: 101, title: "Surfed Example.com", reward: 250, status: "Success", time: "2 mins ago" },
  { id: 102, title: "Daily Login Bonus", reward: 100, status: "Success", time: "1 hour ago" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 md:items-start gap-6 md:gap-8">
      {/* Left Column */}
      <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
        {/* Welcome & Balance */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-br from-primary/90 to-blue-600 rounded-3xl p-6 text-primary-foreground shadow-lg overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10" />
          <div className="relative z-10">
            <p className="font-medium text-primary-foreground/80 mb-1">Total Balance</p>
            <div className="flex items-end gap-2 mb-4">
              <h2 className="text-4xl font-bold tracking-tight">12,450</h2>
              <span className="text-primary-foreground/80 text-sm font-medium mb-1.5">VND</span>
            </div>
            
            <div className="flex gap-4 max-w-sm">
              <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors py-2.5 rounded-2xl font-semibold backdrop-blur-md flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4" /> Withdraw
              </button>
              <button className="flex-1 bg-white hover:bg-gray-100 text-primary transition-colors py-2.5 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle className="w-4 h-4" /> Earn
              </button>
            </div>
          </div>
        </motion.section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 gap-4 md:gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">Today</span>
            </div>
            <p className="text-xl font-bold">+1,850 <span className="text-xs text-muted-foreground font-normal">VND</span></p>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-card border border-border rounded-3xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="text-xl font-bold">14 <span className="text-xs text-muted-foreground font-normal">Tasks</span></p>
          </motion.div>
        </section>

        {/* Recommended Tasks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Available Tasks</h3>
            <Link href="/tasks" className="text-primary text-sm font-medium flex items-center hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex flex-col gap-3">
            {activeTasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {task.type === "surf" && <Clock className="w-5 h-5" />}
                    {task.type === "app" && <CheckCircle className="w-5 h-5" />}
                    {task.type === "video" && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {task.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">+{task.reward}</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-0.5">VND</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="md:col-span-4 flex flex-col gap-6 md:gap-8">
        {/* Recent History */}
        <section>
          <h3 className="font-bold text-lg mb-4">Recent Earning</h3>
          <div className="bg-card border border-border rounded-2xl p-1 shadow-sm">
            {history.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                className={`p-3 flex items-center justify-between ${idx !== history.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
                <p className="font-semibold text-sm text-emerald-500">+{item.reward} đ</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Promo / Ads for PC */}
        <section className="hidden md:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white overflow-hidden relative shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mt-10 -mr-10" />
            <h3 className="font-bold text-xl mb-2 relative z-10">Invite Friends</h3>
            <p className="text-sm text-balance text-indigo-50 leading-relaxed mb-5 relative z-10">
              Earn 10% commission from your friends' lifetime task rewards!
            </p>
            <button className="bg-white text-indigo-600 font-bold py-2.5 px-4 rounded-xl text-sm hover:bg-gray-100 transition-colors relative z-10 w-full shadow-sm">
              Get Referral Link
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 animate-pulse">
      <div className="md:col-span-8 flex flex-col gap-6 md:gap-8">
        <div className="h-48 bg-muted rounded-3xl" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-muted rounded-3xl" />
          <div className="h-24 bg-muted rounded-3xl" />
        </div>
        <div>
          <div className="h-6 w-32 bg-muted rounded-md mb-4" />
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-4 hidden md:flex flex-col">
         <div className="h-6 w-32 bg-muted rounded-md mb-4" />
         <div className="h-48 bg-muted rounded-3xl mb-8" />
         <div className="h-48 bg-muted rounded-3xl" />
      </div>
    </div>
  );
}
