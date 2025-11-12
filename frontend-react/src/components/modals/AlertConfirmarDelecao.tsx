import { BsFillXCircleFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

interface AlertConfirmarDelecaoProps {
  tipo: 'Lista' | 'Tarefa';
  nome?: string;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export function AlertConfirmarDelecao({
  tipo,
  nome,
  aoConfirmar,
  aoCancelar,
}: AlertConfirmarDelecaoProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
      "
      onClick={aoCancelar}
    >
      <div
        className="
          w-[413px] max-w-[90vw]
          rounded-[12px]
          bg-background-main
          ring-1 ring-background-secondary
          p-4
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho / botão fechar */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={aoCancelar}
            className="btn btn-ghost btn-transition rounded-md cursor-pointer"
          >
            <BsFillXCircleFill className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-1 space-y-4">
          <h2
            className="font-semibold text-[19.2px] leading-[29px]"
          >
            Tem certeza que deseja deletar {tipo.toLowerCase()}
            {nome ? ` “${nome}”?` : '?'}
          </h2>

          <p className="text-[16px] leading-[24px]/90">
            Essa ação não é reversível.
          </p>

          <button
            type="button"
            onClick={aoConfirmar}
            className="
              btn btn-transition
              w-full h-10 rounded-[8px]
              bg-transparent
              hover:bg-danger-background/20
              flex items-center justify-center gap-2
            "
          >
            <AiFillDelete className="w-4 h-4 text-danger-background" />
            <span className="text-[16px] leading-[24px] text-danger-background cursor-pointer ">
              Deletar {tipo.toLowerCase()}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
