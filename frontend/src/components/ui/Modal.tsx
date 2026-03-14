import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  open: boolean;
}>;

export default function Modal({ open, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 p-6">{children}</div>
    </div>
  );
}
