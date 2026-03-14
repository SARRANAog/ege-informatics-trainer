type Props = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </div>
  );
}
