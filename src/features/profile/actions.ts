"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProfileUpdate } from "./types";

export async function saveOnboardingStep1(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const update: ProfileUpdate = {
    nombre: (formData.get("nombre") as string) || null,
    apellido: (formData.get("apellido") as string) || null,
    apodo: (formData.get("apodo") as string) || null,
    nombre_visible: formData.get("nombre_visible") as ProfileUpdate["nombre_visible"],
    fecha_nacimiento: (formData.get("fecha_nacimiento") as string) || null,
  };

  const { error } = await supabase.from("profiles").update(update).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/onboarding/step2");
}

export async function saveOnboardingStep2(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const update: ProfileUpdate = {
    bio: (formData.get("bio") as string) || null,
    contacto_telegram: (formData.get("contacto_telegram") as string) || null,
    sitio_url: (formData.get("sitio_url") as string) || null,
  };

  const { error } = await supabase.from("profiles").update(update).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function updateProfile(_prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autorizado" };
  }

  const update: ProfileUpdate = {
    nombre: (formData.get("nombre") as string) || null,
    apellido: (formData.get("apellido") as string) || null,
    apodo: (formData.get("apodo") as string) || null,
    nombre_visible: formData.get("nombre_visible") as ProfileUpdate["nombre_visible"],
    fecha_nacimiento: (formData.get("fecha_nacimiento") as string) || null,
    bio: (formData.get("bio") as string) || null,
    contacto_telegram: (formData.get("contacto_telegram") as string) || null,
    sitio_url: (formData.get("sitio_url") as string) || null,
    disponibilidad: formData.get("disponibilidad") as ProfileUpdate["disponibilidad"],
    visibilidad_tarifa: formData.get("visibilidad_tarifa") as ProfileUpdate["visibilidad_tarifa"],
  };

  const tarifa = formData.get("tarifa_hora") as string;
  if (tarifa) {
    update.tarifa_hora = Number(tarifa);
  }

  const { error } = await supabase.from("profiles").update(update).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}
