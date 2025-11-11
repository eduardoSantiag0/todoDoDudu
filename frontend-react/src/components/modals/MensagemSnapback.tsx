// src/components/MensagemSnapback.tsx
import { BsCheckCircleFill, BsXLg } from 'react-icons/bs'

interface PropriedadesMensagemSnapback {
  mensagem: string;
  aoFecharMensagem: () => void;
}

export function MensagemSnapback({
  mensagem,
  aoFecharMensagem,
}: PropriedadesMensagemSnapback) {
  return (
    <div className="fixed left-1/2 top-6 z-30 -translate-x-1/2">
      <div
        className="
          flex items-center justify-between
          rounded-[12px]
          border border-white/60
          bg-background-main
          px-4 py-2
          gap-4
          font-poppins
          shadow-md
          min-h-10
          max-w-[90vw]
        "
      >
        {/* Ícone + texto */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <BsCheckCircleFill className="w-5 h-5 text-success-background flex-none" />

          <span
            className="
              text-[16px]
              leading-[24px]
              font-normal
              text-success-background
              text-center
            "
          >
            {mensagem}
          </span>
        </div>

        {/* Botão de fechar */}
        <button
          type="button"
          onClick={aoFecharMensagem}
          className="
            flex items-center justify-center
            w-4 h-4
            text-success-background
            hover:opacity-80
            transition-all duration-200 ease-out
            flex-none
          "
        >
          <BsXLg className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
