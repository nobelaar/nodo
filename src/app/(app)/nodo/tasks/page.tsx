import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PrimaryButton } from "@/components/PrimaryButton";
import type { TaskEstado } from "@/features/tasks/types";

const ESTADO_LABELS: Record<string, string> = {
  abierta: "Abierta",
  tomada: "Tomada",
  hecha: "Hecha",
  verificada: "Verificada",
};

const ESTADO_CLASSES: Record<string, string> = {
  abierta: "bg-warm-yellow/20 text-warm-yellow",
  tomada: "bg-blue-raw/20 text-brand-blue",
  hecha: "bg-mint-raw/20 text-brand-mint",
  verificada: "bg-surface-inset text-text-muted",
};

const URGENCIA_LABELS: Record<string, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};

const URGENCIA_CLASSES: Record<string, string> = {
  baja: "text-text-muted",
  media: "text-text-secondary",
  alta: "text-coral",
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p className="text-text-secondary">Iniciá sesión para ver las tareas.</p>;

  const { estado } = await searchParams;

  let query = supabase
    .from("tasks")
    .select("*, profiles:creado_por(nombre, apellido, apodo, nombre_visible)")
    .order("created_at", { ascending: false });

  if (estado && estado !== "todas") {
    query = query.eq("estado", estado as TaskEstado);
  }

  const { data: tasks } = await query;

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();
  const canCreate = profile && profile.tier !== "tourist";

  const filtros = ["todas", "abierta", "tomada", "hecha", "verificada"];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-text-primary">Tareas</h1>
        {canCreate && (
          <Link href="/nodo/tasks/new">
            <PrimaryButton size="sm">Crear tarea</PrimaryButton>
          </Link>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filtros.map((f) => (
          <Link
            key={f}
            href={f === "todas" ? "/nodo/tasks" : `/nodo/tasks?estado=${f}`}
            className={`inline-flex items-center rounded-pill px-3 py-1.5 text-xs font-semibold font-display whitespace-nowrap transition-colors ${
              (f === "todas" && !estado) || estado === f
                ? "bg-primary text-on-primary"
                : "bg-surface border border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            {f === "todas" ? "Todas" : ESTADO_LABELS[f]}
          </Link>
        ))}
      </div>

      {!tasks || tasks.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <span className="text-3xl">📋</span>
          <p className="text-text-muted text-sm">
            No hay tareas {estado ? `con estado "${ESTADO_LABELS[estado]}"` : "todavía"}
          </p>
          {canCreate && (
            <Link href="/nodo/tasks/new">
              <PrimaryButton size="sm">Crear la primera</PrimaryButton>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <Link
              key={task.id}
              href={`/nodo/tasks/${task.id}`}
              className="rounded-lg border border-border bg-surface p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-semibold text-text-primary text-sm">
                  {task.titulo}
                </h3>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold font-display shrink-0 ${ESTADO_CLASSES[task.estado ?? "abierta"]}`}
                >
                  {ESTADO_LABELS[task.estado ?? "abierta"]}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`text-[11px] font-medium ${URGENCIA_CLASSES[task.urgencia ?? "media"]}`}
                >
                  {URGENCIA_LABELS[task.urgencia ?? "media"]}
                </span>
                <span className="text-[11px] text-text-muted">{task.categoria}</span>
                {task.tomada_por && <span className="text-[11px] text-text-muted">· Tomada</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
