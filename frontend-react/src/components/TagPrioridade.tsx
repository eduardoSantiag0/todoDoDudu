import type { PrioridadeTarefa } from "../types/tarefa";

interface PriorityTagProps {
  prioridade: PrioridadeTarefa;
}

export function PriorityTag({ prioridade }: PriorityTagProps) {
  let containerClasses = "";
  let label = "";

  if (prioridade === "LOW") {
    containerClasses = "bg-priority-low-background text-priority-low-text";
    label = "Baixa";
  } else if (prioridade === "MEDIUM") {
    containerClasses =
      "bg-priority-medium-background text-priority-medium-text";
    label = "Média";
  } else if (prioridade === "HIGH") {
    containerClasses =
      "bg-priority-high-background text-priority-high-text";
    label = "Alta";
  } else if (prioridade === "VERY_HIGH") {
    containerClasses =
      "bg-priority-very-high-background text-priority-very-high-text";
    label = "Altíssima";
  }

  return (
    <span
      className={
        "rounded-full px-2 py-0.5 text-xs font-medium " + containerClasses
      }
    >
      {label}
    </span>
  );
}
