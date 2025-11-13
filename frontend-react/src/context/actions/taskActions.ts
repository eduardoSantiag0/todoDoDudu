import {
  atualizarTarefaPorId,
  buscarTodasAsTarefas,
  criarNovaTarefa,
  deletarTarefaPorId,
} from '../../queries/tarefasApi'
import type { IdentificadorLista } from '../../types/lista'
import type {
  IdentificadorTarefa,
  PrioridadeTarefa,
  Tarefa,
} from '../../types/tarefa'
import type { AtualizarTarefaRequisicao } from '../../queries/tarefasApi'
import type { TarefasPorLista } from '../board/boardTypes'
import {
  moverTarefaOtimista,
  removerTarefaDeTodas,
  substituirTarefaEmTodas,
} from '../board/boardUtils'
import { agruparTarefasPorLista } from '../board/boardUtils'
import type { Lista } from '../../types/lista'

type Deps = {
  setMapa: React.Dispatch<React.SetStateAction<TarefasPorLista>>
  setSelecionada: React.Dispatch<React.SetStateAction<Tarefa | null>>
  setNotificacao: React.Dispatch<React.SetStateAction<boolean>>
  setErro: (msg: string) => void
  exibirMensagem: (msg: string) => void
  recarregarQuadro: () => Promise<void>
  getListas: () => Lista[]
}

export function criarAcoesDeTarefa({
  setMapa,
  setSelecionada,
  setNotificacao,
  setErro,
  exibirMensagem,
  recarregarQuadro,
  getListas,
}: Deps) {
  async function criarTarefa(
    listaId: IdentificadorLista,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    dataEsperadaDeConclusaoISO: string,
  ) {
    // if (!dataEsperadaDeConclusaoISO) {
    //   alert('Escolha uma data de conclusão para a tarefa.')
    //   return
    // }

    if (dataEsperadaDeConclusaoISO == null) {
      exibirMensagem('É necessário escolher uma data de conclusão')
    }
    try {
      const criada = await criarNovaTarefa({
        listaId: listaId,
        nome: nome,
        descricao: descricao || undefined,
        prioridade,
        dataEsperadaDeConclusao: dataEsperadaDeConclusaoISO,
      })
      setMapa(m => ({ ...m, [listaId]: [...(m[listaId] ?? []), criada] }))
      setNotificacao(true)
    } catch (e) {
      console.error(e)
      setErro('Erro ao criar tarefa.')
    }
  }

  async function deletarTarefa(idTarefa: IdentificadorTarefa) {
    try {
      await deletarTarefaPorId(idTarefa)
      setMapa(m => removerTarefaDeTodas(m, idTarefa))
      setSelecionada(sel => (sel?.id === idTarefa ? null : sel))
      exibirMensagem('Tarefa deletada com sucesso!')
    } catch (e) {
      console.error(e)
      setErro('Erro ao deletar tarefa.')
    }
  }

  async function atualizarTarefa(idTarefa: IdentificadorTarefa, dados: AtualizarTarefaRequisicao) {
    try {
      const atualizada = await atualizarTarefaPorId(idTarefa, dados)
      // se mudou de lista, removemos e reinserimos no destino
      setMapa(m => {
        const destino = atualizada.listaId as IdentificadorLista
        const semAntiga = removerTarefaDeTodas(m, idTarefa)
        return { ...semAntiga, [destino]: [...(semAntiga[destino] ?? []), atualizada] }
      })
      setSelecionada(sel => (sel?.id === idTarefa ? atualizada : sel))
    } catch (e) {
      console.error(e)
      setErro('Erro ao atualizar tarefa.')
    }
  }

  async function alternarFinalizacaoTarefa(idTarefa: IdentificadorTarefa, tarefaJaFinalizada: boolean) {
    try {
      const concluidoEm = tarefaJaFinalizada ? null : new Date().toISOString().slice(0, 10)
      const atualizada = await atualizarTarefaPorId(idTarefa, { concluidoEm })
      setMapa(m => substituirTarefaEmTodas(m, atualizada))
      setSelecionada(sel => (sel?.id === idTarefa ? atualizada : sel))
    } catch (e) {
      console.error(e)
      setErro('Erro ao atualizar finalização da tarefa.')
    }
  }

  async function moverTarefaEntreListas(idTarefa: IdentificadorTarefa, origem: IdentificadorLista, destino: IdentificadorLista) {
    if (origem === destino) {return}
    // otimista
    setMapa(m => moverTarefaOtimista(m, idTarefa, origem, destino))
    try {
      await atualizarTarefaPorId(idTarefa, { novaListaId: destino })
    } catch (e) {
      console.error(e)
      setErro('Erro ao mover tarefa entre listas. Recarregando quadro.')
      const tarefas = await buscarTodasAsTarefas()
      const listas = getListas()
      setMapa(agruparTarefasPorLista(listas, tarefas))
      await recarregarQuadro()
    }
  }

  return { criarTarefa, deletarTarefa, atualizarTarefa, alternarFinalizacaoTarefa, moverTarefaEntreListas }
}
