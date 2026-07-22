"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { TaskCategoria, TaskUrgencia } from "./types";

export async function createTask(_prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (!profile || profile.tier === "tourist") {
    return { error: "Solo los serranos pueden crear tareas" };
  }

  const { error } = await supabase.from("tasks").insert({
    titulo: formData.get("titulo") as string,
    descripcion: formData.get("descripcion") as string,
    categoria: formData.get("categoria") as TaskCategoria,
    urgencia: formData.get("urgencia") as TaskUrgencia,
    creado_por: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/nodo", "layout");
  redirect("/nodo/tasks");
}

export async function takeTask(_prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const taskId = formData.get("taskId") as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  if (!profile || profile.tier === "tourist") {
    return { error: "Solo los serranos pueden tomar tareas" };
  }

  const { error } = await supabase
    .from("tasks")
    .update({ estado: "tomada", tomada_por: user.id })
    .eq("id", taskId)
    .eq("estado", "abierta");

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/nodo", "layout");
  redirect(`/nodo/tasks/${taskId}`);
}

export async function markTaskDone(_prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const taskId = formData.get("taskId") as string;

  const { error } = await supabase
    .from("tasks")
    .update({ estado: "hecha" })
    .eq("id", taskId)
    .eq("tomada_por", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/nodo", "layout");
  redirect(`/nodo/tasks/${taskId}`);
}

export async function verifyTask(_prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const taskId = formData.get("taskId") as string;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_platform_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_platform_admin) {
    return { error: "Solo un admin puede verificar tareas" };
  }

  const { error } = await supabase
    .from("tasks")
    .update({ estado: "verificada" })
    .eq("id", taskId)
    .eq("estado", "hecha");

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/nodo", "layout");
  redirect(`/nodo/tasks/${taskId}`);
}
