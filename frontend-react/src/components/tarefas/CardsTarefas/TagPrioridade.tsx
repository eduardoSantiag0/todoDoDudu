import type { PrioridadeTarefa } from '../../../types/tarefa'

interface PriorityTagProps {
  prioridade: PrioridadeTarefa;
  finished?: boolean;
}

export function PriorityTag({ prioridade, finished = false }: PriorityTagProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    px-4 py-1 gap-2
    w-[143px] h-[28px]
    rounded-[4px]
    font-poppins
    text-[13.33px] leading-[20px]
    font-semibold
    overflow-hidden text-ellipsis whitespace-nowrap
    text-center
  `

  let variantClasses = ''
  let label = ''

  if (prioridade === 'LOW') {
    variantClasses = finished
      ? 'bg-priority-low-background/40 text-priority-low-text'
      : 'bg-priority-low-background text-priority-low-text'
    label = 'Baixa Prioridade'
  } else if (prioridade === 'MEDIUM') {
    variantClasses = finished
      ? 'bg-priority-medium-background/40 text-priority-medium-text'
      : 'bg-priority-medium-background text-priority-medium-text'
    label = 'Média Prioridade'
  } else if (prioridade === 'HIGH') {
    variantClasses = finished
      ? 'bg-priority-high-background/40 text-priority-high-text'
      : 'bg-priority-high-background text-priority-high-text'
    label = 'Alta Prioridade'
  } else if (prioridade === 'VERY_HIGH') {
    variantClasses = finished
      ? 'bg-priority-very-high-background/40 text-priority-very-high-text'
      : 'bg-priority-very-high-background text-priority-very-high-text'
    label = 'Altíssima Prioridade'
  }

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {label}
    </div>
  )
}
