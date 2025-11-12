import type { PrioridadeTarefa, Tarefa } from '../../../types/tarefa'
import { DropdownDataConclusao } from './dropdowns/DropdownDataConclusao'
import { DropdownPrioridade } from './dropdowns/DropdownPrioridade'
import { AiFillDelete } from 'react-icons/ai'
import { useRef } from 'react';

export interface CabecalhoTarefaProps {
    tarefa: Tarefa;
}

export function CabecalhoTarefa({ tarefa }: CabecalhoTarefaProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="w-full text-[27.65px] leading-[41px] font-bold ">
        {tarefa.nome}
      </h2>
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
    <div className="flex w-full max-w-[390px] flex-col gap-5">
      <div className="flex w-full items-center justify-between gap-4">
        <span className="text-[16px] leading-6 font-semibold ">
          Data de conclusão
        </span>
        <DropdownDataConclusao valorISO={dataConclusaoISO} aoAlterarData={aoAlterarData} />
      </div>

      {/* Prioridade */}
      <div className="flex w-full items-center justify-between gap-4">
        <span className="text-[16px] leading-6 font-semibold ">
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
    <div className="flex w-full max-w-[390px] flex-col gap-4">
      <span className="text-[16px] leading-6 font-semibold font-poppins text-text-default">
        Descrição
      </span>

      <div
        className="
          w-full min-h-[201px]
          box-border flex
          border border-button-hover rounded p-2
          btn-transition
          focus-within:border-white
        "
      >
        <textarea
          className="
            w-full min-h-[180px]
            bg-transparent outline-none resize-none
            text-[13.33px] leading-[20px]
            font-normal text-text-default
          "
          value={descricao}
          onChange={(e) => onChangeDescricao(e.target.value)}
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

interface SecaoNomeProps {
  nome: string;
  onChangeNome: (novo: string) => void;
  onSalvar: () => void;    
  // onCancelar: () => void;  
}

export function SecaoNome({ nome, onChangeNome, onSalvar, 
  // onCancelar 
}: SecaoNomeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function lidarKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSalvar();
      // opcional: mantem foco
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      // onCancelar();
      inputRef.current?.blur();
    }
  }

  return (
    <div className="flex w-full max-w-[390px] flex-col gap-2">
      {/* <label className="label">Nome da tarefa</label> */}
      <input
        ref={inputRef}
        className="input"
        value={nome}
        onChange={(e) => onChangeNome(e.target.value)}
        onKeyDown={lidarKeyDown}
        onBlur={onSalvar}
        placeholder="Dê um título claro para a tarefa…"
        aria-label="Editar nome da tarefa"
      />
    </div>
  );
}
