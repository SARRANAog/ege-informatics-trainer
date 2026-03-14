import Editor from "@monaco-editor/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MonacoEditor({ value, onChange }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <Editor
        height="420px"
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(next) => onChange(next ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          roundedSelection: false,
          automaticLayout: true,
          scrollBeyondLastLine: false
        }}
      />
    </div>
  );
}
