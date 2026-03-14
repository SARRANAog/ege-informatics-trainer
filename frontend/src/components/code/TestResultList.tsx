type Props = {
  feedback: any;
};

export default function TestResultList({ feedback }: Props) {
  const tests = feedback?.feedback?.tests?.results ?? [];

  return (
    <div className="space-y-2">
      {tests.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-slate-400">
          Тесты пока не запускались.
        </div>
      ) : (
        tests.map((item: any) => (
          <div
            key={item.name}
            className={`rounded-2xl border p-4 text-sm ${
              item.passed ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-50" : "border-rose-300/20 bg-rose-500/10 text-rose-50"
            }`}
          >
            <div className="font-semibold">{item.name}</div>
            <div className="mt-2">Ожидалось: {item.expected || "∅"}</div>
            <div>Получено: {item.actual || "∅"}</div>
            {item.stderr ? <div className="mt-2 opacity-80">stderr: {item.stderr}</div> : null}
          </div>
        ))
      )}
    </div>
  );
}
