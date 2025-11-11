import { BsBellFill } from 'react-icons/bs'

interface PropriedadesBotaoNotificacao {
  temNotificacao?: boolean;
  aoClicar?: () => void;
}

export function BotaoNotificacao({
  temNotificacao = false,
  aoClicar,
}: PropriedadesBotaoNotificacao) {
  function lidarClique(
    evento: React.MouseEvent<HTMLButtonElement>,
  ) {
    evento.stopPropagation()
    if (aoClicar) {
      aoClicar()
    }
  }

  return (
    <button
      type="button"
      onClick={lidarClique}
      className="
        relative
        flex items-center justify-center
        w-8 h-[33px]
        rounded-[2px]
        p-1
        text-text-default
        transition-all duration-300 ease-out
        hover:bg-button-create-task-hover
        active:bg-button-notification-pressed
      "
    >
      <BsBellFill className="text-sm" />

      {/* bolinha de notificação quando temNotificacao = true */}
      {temNotificacao && (
        <span
          className="
            absolute
            top-[4px] right-[4px]
            w-2 h-2
            rounded-full
            bg-danger-background
            ring-2 ring-background-main
          "
        />
      )}
    </button>
  )
}
