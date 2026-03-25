import { CheckSquare, Clock, ExternalLink, TrendingUp } from "lucide-react";
import { getActiveTasks } from "@/app/actions/tasks";
import TaskCard from "./task-card";

// Make this page a React Server Component (default in app router) to fetch directly from Supabase
export default async function TasksPage() {
  
  // Fetch from Real Database via server action
  const activeTasks = await getActiveTasks();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10" />
         <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckSquare className="w-6 h-6" /> Task Center
            </h1>
            <p className="text-indigo-50 text-sm max-w-sm">
              Complete the tasks below to earn rewards. Click a task to open it in a new tab. Anti-cheat timers are enabled.
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeTasks.length === 0 ? (
          <div className="col-span-1 sm:grid-cols-2 text-center py-12 text-muted-foreground bg-card rounded-3xl border border-border">
            No active tasks at the moment. Please check back later!
          </div>
        ) : (
          activeTasks.map((task, index) => (
             // Client component specifically for the framer motion wrapper
            <TaskCard key={task.id} task={task} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
