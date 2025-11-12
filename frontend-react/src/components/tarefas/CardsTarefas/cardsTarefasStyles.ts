// cardsTarefasStyles.ts

export type TaskCardVisualState = {
  finished: boolean
  late: boolean
}
export function getCardContainerClasses({ finished, late }: TaskCardVisualState) {
  const base = `
    box-border flex flex-col
    w-full min-w-0
    border rounded-lg
    px-4 py-3 gap-3 
    cursor-pointer select-none
    bg-background-main
    transition-colors duration-150
  `

  let extra = 'border-background-secondary'

  if (late && !finished) {
    extra = `
      border-danger-background
      bg-danger-background/10
      hover:bg-danger-background/15
    `
  } else {
    extra = `
      border-background-secondary
      hover:bg-button-hover active:bg-button-pressed
      hover:border-white active:border-white
    `
  }

  return `${base} ${extra}`
}

export function getTitleClasses({ finished }: TaskCardVisualState) {
  return finished
    ? 'mb-1 text-sm font-semibold text-[#ACACAC]'
    : 'mb-1 text-sm font-semibold text-text-default'
}

export function getDescriptionClasses({ finished }: TaskCardVisualState) {
  return finished
    ? 'mb-2 text-xs text-[#ACACAC] truncate max-w-full'
    : 'mb-2 text-xs text-text-muted truncate max-w-full'
}

export function getDateChipClasses({ late }: TaskCardVisualState) {
  if (late) {
    return `
      flex items-center justify-center
      px-2 py-1 gap-2
      w-[126px] h-[28px]
      rounded-[4px]
      bg-[#DDA9A9]
    `
  }

  return `
    flex items-center justify-center
    px-2 py-1 gap-2
    w-[126px] h-[28px]
    rounded-[4px]
    bg-[#E0E0E0]
  `
}


export function getDateTextClasses({ finished, late }: TaskCardVisualState) {
  const base = 'text-[13.33px] leading-[20px] font-semibold font-poppins'

  if (late) {
    if (finished) {
      return `${base} text-danger-background/40`
    }

    return `${base} text-danger-background`
  }

  return `${base} text-text-muted`
}

export function getDateIconClasses({ finished, late }: TaskCardVisualState) {
  // atrasada
  if (late) {
    if (finished) {
      return 'w-4 h-4 text-danger-background/40'
    }
    return 'w-4 h-4 text-danger-background'
  }
  return 'w-4 h-4 text-text-muted'
}