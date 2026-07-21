import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="rounded-full bg-brand-mint/10 size-16 flex items-center justify-center mx-auto">
        <svg
          className="size-8 text-brand-mint"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">Revisá tu email</h2>
        <p className="text-text-secondary text-sm mt-2">
          Te enviamos un link. Revisá tu bandeja de entrada y seguí las instrucciones.
        </p>
      </div>
      <Link href="/auth/login" className="text-sm text-brand-mint hover:underline font-medium">
        Volver al inicio
      </Link>
    </div>
  );
}
