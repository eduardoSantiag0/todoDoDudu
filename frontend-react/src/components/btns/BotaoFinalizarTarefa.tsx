// src/components/BotaoFinalizarTarefa.tsx
import { BsCheck2 } from 'react-icons/bs'

interface BotaoFinalizarTarefaProps {
  tarefaEstaFinalizada: boolean;
  aoClicarBotao: () => void;
}

export function BotaoFinalizarTarefa({
  tarefaEstaFinalizada,
  aoClicarBotao,
}: BotaoFinalizarTarefaProps) {
  function lidarClique(
    evento: React.MouseEvent<HTMLButtonElement>,
  ) {
    evento.stopPropagation()
    aoClicarBotao()
  }

  // ESTADO FINALIZADO
  if (tarefaEstaFinalizada) {
    return (
      <button
        type="button"
        onClick={lidarClique}
        className="
          flex flex-row items-center
          w-[129px] h-10
          rounded-[12px]
          p-1 gap-2
          transition-all duration-300 ease-out
          hover:bg-button-hover
          btn-ghost
        "
      >
        {/* círculo externo 32x32 com borda tracejada verde */}
        <span
          className="
            flex items-center justify-center
            w-8 h-8
            rounded-full
            border border-dashed border-priority-low-text
            cursor-pointer
          "
        >
          <BsCheck2 className="text-priority-low-text" />
        </span>

        <span
          className="
            text-priority-low-text
            text-[16px]
            leading-[100%]
            cursor-pointer
          "
        >
          Finalizado
        </span>
      </button>
    )
  }

  // ESTADO DEFAULT (não finalizada)
  return (
    <button
      type="button"
      onClick={lidarClique}
      className="
        flex flex-row items-center
        w-[113px] h-10
        rounded-[12px]
        p-1 gap-2
        transition-all duration-300 ease-out
        hover:bg-button-hover
      "
    >
      {/* círculo 32x32 com borda pontilhada BRANCA e ícone BsCheck2 branco */}
      <span
        className="
          flex items-center justify-center
          w-8 h-8
          rounded-full
          border border-dashed border-text-default
          cursor-pointer
        "
      >
        <BsCheck2 className="text-text-default text-base" />
      </span>

      <span
        className="
          text-[16px]
          leading-[100%]
          font-normal
          text-text-default text-base
          cursor-pointer
        "
      >
        Finalizar
      </span>
    </button>
  )
}
