type Props = {
  feedback: any;
};

export default function OutputPanel({ feedback }: Props) {
  if (!feedback) {
    return <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-slate-400">Здесь появятся результаты проверки.</div>;
  }

  if (feedback.ok === false) {
    return (
      <div className="rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-sm text-rose-100">
        Проверка заблокирована: {feedback.message}
      </div>
    );
  }

  const ast = feedback.feedback?.ast;
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-slate-200">
      <div className="font-semibold">Структурная проверка</div>
      <div className="mt-2">AST OK: {String(Boolean(ast?.ok))}</div>
      <div className="mt-1">Совпадает с требованиями: {String(Boolean(ast?.matches_requirements))}</div>
      {Array.isArray(ast?.missing_nodes) && ast.missing_nodes.length > 0 ? (
        <div className="mt-2 text-amber-200">Не хватает конструкций: {ast.missing_nodes.join(", ")}</div>
      ) : null}
    </div>
  );
}
