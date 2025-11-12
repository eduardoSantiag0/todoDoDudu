import { PrioridadeTarefa } from '../../../types/tarefa'

interface PriorityTagProps {
  prioridade: PrioridadeTarefa;
  finished?: boolean;
}

const PRIORITY_CONFIG: Record<
  PrioridadeTarefa,
  { normal: string; finished: string; label: string }
> = {
  [PrioridadeTarefa.LOW]: {
    normal: 'bg-priority-low-background text-priority-low-text',
    finished: 'bg-priority-low-background/40 text-priority-low-text',
    label: 'Baixa Prioridade',
  },
  [PrioridadeTarefa.MEDIUM]: {
    normal: 'bg-priority-medium-background text-priority-medium-text',
    finished: 'bg-priority-medium-background/40 text-priority-medium-text',
    label: 'Média Prioridade',
  },
  [PrioridadeTarefa.HIGH]: {
    normal: 'bg-priority-high-background text-priority-high-text',
    finished: 'bg-priority-high-background/40 text-priority-high-text',
    label: 'Alta Prioridade',
  },
  [PrioridadeTarefa.VERY_HIGH]: {
    normal: 'bg-priority-very-high-background text-priority-very-high-text',
    finished: 'bg-priority-very-high-background/40 text-priority-very-high-text',
    label: 'Altíssima Prioridade',
  },
}

export function PriorityTag({ prioridade, finished = false }: PriorityTagProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    px-4 py-1 gap-2
    w-[143px] h-[28px]
    rounded-[4px]
    text-[13.33px] leading-[20px]
    font-semibold
    overflow-hidden text-ellipsis whitespace-nowrap
    text-center
  `

  const config = PRIORITY_CONFIG[prioridade]

  const variantClasses = finished ? config.finished : config.normal
  const label = config.label

  return <div className={`${baseClasses} ${variantClasses}`}>{label}</div>
}
