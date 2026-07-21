import type { Database } from "@/lib/supabase/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type Tier = Database["public"]["Enums"]["tier"];

export type NombreVisible = Database["public"]["Enums"]["nombre_visible"];
