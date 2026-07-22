import { createClient } from "@/lib/supabase/server";
import { displayName } from "@/features/profile/displayName";
import { TakeTaskButton, MarkDoneButton, VerifyTaskButton } from "@/features/tasks/task-actions";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Profile } from "@/features/profile/types";

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

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: task } = await supabase
    .from("tasks")
    .select("*, creador:creado_por(*), tomador:tomada_por(*)")
    .eq("id", id)
    .single();

  if (!task) notFound();

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const creador = task.creador as unknown as Profile | null;
  const tomador = task.tomador as unknown as Profile | null;

  const isOwner = task.creado_por === user.id;
  const isTaker = task.tomada_por === user.id;
  const isAdmin = currentProfile?.is_platform_admin ?? false;
  const isSerrano = currentProfile && currentProfile.tier !== "tourist";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/nodo/tasks" className="text-text-muted hover:text-text-secondary">
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="font-display text-2xl font-bold text-text-primary">{task.titulo}</h1>
      </div>

      <span
        className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold font-display self-start ${ESTADO_CLASSES[task.estado ?? "abierta"]}`}
      >
        {ESTADO_LABELS[task.estado ?? "abierta"]}
      </span>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-surface border border-border rounded-pill px-3 py-1 text-text-secondary">
          {task.categoria}
        </span>
        <span className="text-xs bg-surface border border-border rounded-pill px-3 py-1 text-text-secondary">
          {task.urgencia}
        </span>
      </div>

      {task.descripcion && (
        <section>
          <h3 className="font-display text-sm font-semibold text-text-secondary mb-2">
            Descripción
          </h3>
          <p className="text-sm text-text-primary leading-relaxed">{task.descripcion}</p>
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h3 className="font-display text-sm font-semibold text-text-secondary">Información</h3>
        <div className="grid grid-cols-2 gap-2">
          {creador && <Field label="Creada por" value={displayName(creador)} />}
          {tomador && <Field label="Tomada por" value={displayName(tomador)} />}
          <Field label="Creada" value={new Date(task.created_at).toLocaleDateString("es-AR")} />
        </div>
      </section>

      <div className="flex flex-col gap-2 pt-2">
        {task.estado === "abierta" && isSerrano && !isOwner && <TakeTaskButton taskId={task.id} />}

        {task.estado === "tomada" && isTaker && <MarkDoneButton taskId={task.id} />}

        {task.estado === "hecha" && isAdmin && <VerifyTaskButton taskId={task.id} />}

        {task.estado === "tomada" && !isTaker && (
          <p className="text-sm text-text-muted text-center py-2">
            Esta tarea ya fue tomada por otro serrano.
          </p>
        )}

        {task.estado === "verificada" && (
          <p className="text-sm text-brand-mint text-center py-2">
            ✔ Tarea verificada y completada.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface border border-border p-3">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="text-sm text-text-primary font-medium mt-0.5">{value}</p>
    </div>
  );
}
