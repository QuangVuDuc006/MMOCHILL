"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type TaskStatus = 'active' | 'inactive';

export interface DatabaseTask {
  id: string;
  title: string;
  target_url: string;
  reward_amount: number;
  status: TaskStatus;
  type: 'surf' | 'app' | 'video';
  time_requirement: number;
  created_at?: string;
}

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
  return data as DatabaseTask[];
}

export async function getActiveTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching active tasks:", error);
    return [];
  }
  return data as DatabaseTask[];
}

export async function addTask(formData: FormData) {
  const taskData = {
    title: formData.get("title") as string,
    target_url: formData.get("target_url") as string,
    reward_amount: Number(formData.get("reward_amount")),
    status: formData.get("status") as TaskStatus,
    type: formData.get("type") as 'surf' | 'app' | 'video',
    time_requirement: Number(formData.get("time_requirement")),
  };

  const { error } = await supabase.from("tasks").insert([taskData]);

  if (error) {
    return { success: false, error: error.message };
  }

  // Revalidate both admin and public task pages
  revalidatePath("/admin/tasks");
  revalidatePath("/tasks");
  return { success: true };
}

export async function updateTask(id: string, formData: FormData) {
  const taskData = {
    title: formData.get("title") as string,
    target_url: formData.get("target_url") as string,
    reward_amount: Number(formData.get("reward_amount")),
    status: formData.get("status") as TaskStatus,
    type: formData.get("type") as 'surf' | 'app' | 'video',
    time_requirement: Number(formData.get("time_requirement")),
  };

  const { error } = await supabase.from("tasks").update(taskData).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/tasks");
  revalidatePath("/tasks");
  return { success: true };
}

export async function updateTaskStatus(id: string, currentStatus: TaskStatus) {
  const newStatus = currentStatus === "active" ? "inactive" : "active";
  const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", id);
  
  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/tasks");
  revalidatePath("/tasks");
  return { success: true, newStatus };
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/tasks");
  revalidatePath("/tasks");
  return { success: true };
}
