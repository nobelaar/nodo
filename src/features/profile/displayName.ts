import type { Profile } from "./types";

export function displayName(profile: Profile): string {
  switch (profile.nombre_visible) {
    case "apodo":
      if (profile.apodo) return profile.apodo;
      return [profile.nombre, profile.apellido].filter(Boolean).join(" ");
    case "apellido_nombre":
      return [profile.apellido, profile.nombre].filter(Boolean).join(" ");
    case "nombre_apellido":
    default:
      return [profile.nombre, profile.apellido].filter(Boolean).join(" ");
  }
}
