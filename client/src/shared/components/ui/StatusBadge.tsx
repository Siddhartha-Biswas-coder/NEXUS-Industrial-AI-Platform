interface StatusBadgeProps {
  type: "rag" | "general" | "hybrid";
}

export default function StatusBadge({ type }: StatusBadgeProps) {
  const config = {
    rag: {
      label: "📄 Document Answer",
      className:
        "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    },
    general: {
      label: "🧠 General AI",
      className:
        "bg-purple-500/10 text-purple-300 border-purple-500/30",
    },
    hybrid: {
      label: "📄 + 🧠 Hybrid",
      className:
        "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
  };

  const item = config[type];

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border mb-3 ${item.className}`}
    >
      {item.label}
    </span>
  );
}