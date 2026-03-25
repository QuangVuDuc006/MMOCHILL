"use client";

import { motion } from "framer-motion";
import { Clock, CheckSquare, TrendingUp, ExternalLink } from "lucide-react";
import { DatabaseTask } from "@/app/actions/tasks";

export default function TaskCard({ task, index }: { task: DatabaseTask, index: number }) {
  return (
    <motion.a
      href={task.target_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-card border border-border rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
    >
      <ExternalLink className="absolute top-4 right-4 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
      
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {task.type === "surf" && <Clock className="w-6 h-6" />}
          {task.type === "app" && <CheckSquare className="w-6 h-6" />}
          {task.type === "video" && <TrendingUp className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {task.time_requirement} seconds
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-auto">
        <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded-lg uppercase tracking-wider">
          {task.type}
        </span>
        <div className="text-right">
          <p className="font-bold text-lg text-emerald-500 leading-none">+{task.reward_amount}</p>
          <p className="text-[10px] text-muted-foreground uppercase font-semibold">VND</p>
        </div>
      </div>
    </motion.a>
  );
}
