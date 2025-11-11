import { useState } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'
import type { PrioridadeTarefa } from '../../../../types/tarefa'

interface PropriedadesDropdownPrioridade {
    prioridadeSelecionada: PrioridadeTarefa;
    aoSelecionarPrioridade: (nova: PrioridadeTarefa) => void;
}

export function DropdownPrioridade({
    prioridadeSelecionada,
    aoSelecionarPrioridade,
}: PropriedadesDropdownPrioridade) {
    const [aberto, setAberto] = useState(false)

    const opcoes: {
        tipo: PrioridadeTarefa;
        nome: string;
        bg: string;
        text: string;
    }[] = [
        {
            tipo: 'LOW',
            nome: 'Baixa Prioridade',
            bg: 'bg-priority-low-background',
            text: 'text-priority-low-text',
        },
        {
            tipo: 'MEDIUM',
            nome: 'Média Prioridade',
            bg: 'bg-priority-medium-background',
            text: 'text-priority-medium-text',
        },
        {
            tipo: 'HIGH',
            nome: 'Alta Prioridade',
            bg: 'bg-priority-high-background',
            text: 'text-priority-high-text',
        },
        {
            tipo: 'VERY_HIGH',
            nome: 'Altíssima Prioridade',
            bg: 'bg-priority-very-high-background',
            text: 'text-priority-very-high-text',
        },
    ]

    const prioridadeAtual = opcoes.find(
        (p) => p.tipo === prioridadeSelecionada,
    )!

    return (
        <div className="relative w-[205px] font-poppins select-none">
            {/* Estado Fechado */}
            <button
                type="button"
                onClick={() => setAberto(!aberto)}
                className="
          flex items-center justify-between
          w-full h-[36px]
          border border-[#4E4E4E] rounded
          px-2 bg-background-main
          hover:bg-background-secondary/30 transition
        "
            >
                <div
                    className={`
            flex items-center justify-center gap-2 px-4 py-1 rounded
            ${prioridadeAtual.bg}
          `}
                >
                    <span
                        className={`
              font-semibold text-[13.33px] leading-[20px]
              ${prioridadeAtual.text}
            `}
                    >
                        {prioridadeAtual.nome}
                    </span>
                </div>

                <BsCaretDownFill
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                        aberto ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Estado Aberto */}
            {aberto && (
                <div
                    className="
            absolute top-[44px] left-0
            flex flex-col gap-[4px]
            w-full
            border border-[#4E4E4E] rounded
            bg-background-main
            z-50 p-[4px]
          "
                >
                    {opcoes.map((opcao) => (
                        <button
                            key={opcao.tipo}
                            onClick={() => {
                                aoSelecionarPrioridade(opcao.tipo)
                                setAberto(false)
                            }}
                            className="
                flex items-center justify-start gap-2
                w-full h-[36px] px-2 rounded
                hover:bg-background-secondary/30 transition
              "
                        >
                            <div
                                className={`
                  flex items-center justify-center px-4 py-1 rounded
                  ${opcao.bg}
                `}
                            >
                                <span
                                    className={`
                    font-semibold text-[13.33px] leading-[20px]
                    ${opcao.text}
                  `}
                                >
                                    {opcao.nome}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
