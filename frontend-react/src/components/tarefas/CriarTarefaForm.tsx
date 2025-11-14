// src/components/tarefas/CriarTarefaForm.tsx
import { useState } from 'react'
import type { IdentificadorLista } from '../../types/lista'
import { PrioridadeTarefa } from '../../types/tarefa'
import { useBoard } from '../../context/BoardContext'

type Props = {
  listaId: IdentificadorLista;
  onCreate: (
    listaId: IdentificadorLista,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    data: string
  ) => Promise<void> | void;
  onCancel: () => void;
};

export function CriarTarefaForm({ listaId, onCreate, onCancel }: Props) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState<PrioridadeTarefa>(PrioridadeTarefa.LOW)
  const [data, setData] = useState('')
  const { tarefaSelecionada, exibirMensagemSnapback } = useBoard()


  const exibirMensagem = (msg: string) => {
    exibirMensagemSnapback(msg)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nomeFinal = nome.trim()
    if (!nomeFinal) {return}

    await onCreate(listaId, nomeFinal, descricao, prioridade, data)
    // limpa e fecha
    setNome('')
    setDescricao('')
    setPrioridade(PrioridadeTarefa.LOW)
    setData('')
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="card mb-3 p-3 space-y-2">
      <div>
        <label className="label" >Título</label>
        <input
          id="nome"
          className="input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Dê um nome para a tarefa"
          autoFocus
        />
      </div>

      <div>
        <label className="label" htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          className="input min-h-20"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Detalhes (opcional)"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label" htmlFor="prioridade">Prioridade</label>
          <select
            id="prioridade"
            className="input"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value as PrioridadeTarefa)}
          >
            <option value={PrioridadeTarefa.LOW}>Baixa</option>
            <option value={PrioridadeTarefa.MEDIUM}>Média</option>
            <option value={PrioridadeTarefa.HIGH}>Alta</option>
            <option value={PrioridadeTarefa.VERY_HIGH}>Altíssima</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="data">Prazo</label>
          <input
            id="data"
            type="date"
            className="input"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="btn btn-ghost cursor-pointer" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary cursor-pointer">
          Criar
        </button>
      </div>
    </form>
  )
}
