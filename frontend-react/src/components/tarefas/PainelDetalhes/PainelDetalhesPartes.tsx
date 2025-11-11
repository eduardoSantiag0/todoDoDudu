import type { PrioridadeTarefa, Tarefa } from '../../../types/tarefa'
import { BotaoFinalizarTarefa } from '../../btns/BotaoFinalizarTarefa'
import { DropdownDataConclusao } from './dropdowns/DropdownDataConclusao'
import { DropdownPrioridade } from './dropdowns/DropdownPrioridade'
import { AiFillDelete } from 'react-icons/ai'

export interface CabecalhoTarefaProps {
    tarefa: Tarefa;
    tarefaEstaFinalizada: boolean;
    aoClicarFinalizar: () => void;
}

export function CabecalhoTarefa({
    tarefa,
    tarefaEstaFinalizada,
    aoClicarFinalizar,
}: CabecalhoTarefaProps) {
    return (
        <div className="flex flex-col items-end gap-2 w-full">
            <BotaoFinalizarTarefa
                tarefaEstaFinalizada={tarefaEstaFinalizada}
                aoClicarBotao={aoClicarFinalizar}
            />

            <div className="flex flex-col w-full gap-2 pt-2">
                <h2 className="w-full text-[33.18px] leading-[50px] font-bold font-poppins text-white">
                    {tarefa.nome}
                </h2>
                <div className="w-full border-b border-[#4E4E4E]" />
            </div>
        </div>
    )
}

export interface SecaoDataProps {
    dataConclusaoISO: string;
    aoAlterarData: (novaData: string) => void;
    prioridade: PrioridadeTarefa;
    aoAlterarPrioridade: (novaPrioridade: PrioridadeTarefa) => void;
}

export function SecaoData({
    dataConclusaoISO,
    aoAlterarData,
    prioridade,
    aoAlterarPrioridade,
}: SecaoDataProps) {
    return (
        <div className="flex flex-col items-start gap-5 w-[399px]">
            {/* Data de conclusão */}
            <div className="flex flex-row items-center gap-[40px] w-[521px] h-7">
                <span className="text-[16px] leading-6 font-semibold font-poppins text-white">
                    Data de conclusão
                </span>

                <DropdownDataConclusao
                    valorISO={dataConclusaoISO}
                    aoAlterarData={aoAlterarData}
                />
            </div>

            {/* Prioridade */}
            <div className="flex flex-row items-start justify-between w-[399px] h-9">
                <span className="text-[16px] leading-6 font-semibold font-poppins text-white">
                    Prioridade
                </span>

                <DropdownPrioridade
                    prioridadeSelecionada={prioridade}
                    aoSelecionarPrioridade={aoAlterarPrioridade}
                />
            </div>
        </div>
    )
}
export interface SecaoDescricaoProps {
  descricao: string;
  onChangeDescricao: (novaDescricao: string) => void;
  onBlurDescricao: () => void;
}

export function SecaoDescricao({
  descricao,
  onChangeDescricao,
  onBlurDescricao,
}: SecaoDescricaoProps) {
  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <span className="text-[16px] leading-6 font-semibold font-poppins text-text-default">
        Descrição
      </span>

      <div
        className="
          w-full h-[232px]
          box-border
          flex
          border border-[#4E4E4E]
          rounded
          p-2
          transition-colors duration-150
          focus-within:border-white
        "
      >
        <textarea
          className="
            w-full h-full
            bg-transparent
            outline-none
            resize-none
            text-[16px]
            leading-6
            font-normal
            font-poppins
            text-text-default
          "
          value={descricao}
          onChange={(evento) => onChangeDescricao(evento.target.value)}
          onBlur={onBlurDescricao}
          placeholder="Adicione uma descrição para esta tarefa..."
        />
      </div>
    </div>
  )
}


interface BotaoExcluirTarefaProps {
    onClick: () => void;
}

export function BotaoExcluirTarefa({ onClick }: BotaoExcluirTarefaProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex flex-row items-center
                w-full h-10
                px-2 py-2
                gap-2
                bg-background-main
                hover:bg-background-secondary/40
                text-danger-background
                font-poppins
                text-[16px]
                leading-6
                rounded-sm
                transition-all duration-200
            "
        >
            <AiFillDelete className="w-4 h-4 text-danger-background" />
            <span>Deletar tarefa</span>
        </button>
    )
}
