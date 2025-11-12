import { BsBellFill } from 'react-icons/bs'

interface BotaoNotificacaoProps {
  temNotificacao?: boolean;
  aoClicar?: () => void;
}

export function BotaoNotificacao({
  temNotificacao = false,
  aoClicar,
}: BotaoNotificacaoProps) {
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
        btn hover:bg-button-hover cursor-pointer
      "
    >
      <BsBellFill className="text-sm" />

      {temNotificacao && (
        <span
          className="
            top-0.5 right-1
            w-2 h-2
            animate-ping
            rounded-full
            bg-danger-background
            ring-2 ring-background-main
          "
        />
      )}
    </button>
  )
}
