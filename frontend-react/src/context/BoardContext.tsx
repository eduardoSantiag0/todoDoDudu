import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { Lista, ListId } from '../types/lista'
import type {
  Tarefa,
  IdentificadorTarefa,
  PrioridadeTarefa,
} from '../types/tarefa'
import type { AtualizarTarefaRequisicao } from '../queries/tarefasApi'

import {
  atualizarNomeLista,
  buscarTodasAsListas,
  criarNovaLista,
  deletarListaPorId,
} from '../queries/listasApi'
import {
  atualizarTarefaPorId,
  buscarTodasAsTarefas,
  criarNovaTarefa,
  deletarTarefaPorId,
} from '../queries/tarefasApi'

type TarefasPorLista = Record<ListId, Tarefa[]>

type BoardContextValue = {
  listas: Lista[]
  tarefasPorListaId: TarefasPorLista
  tarefaSelecionada: Tarefa | null
  carregandoQuadro: boolean
  mensagemErro: string | null
  mensagemSnapback: string | null
  temNotificacao: boolean

  tarefasDaLista: (id: ListId) => Tarefa[]

  criarLista: (nome: string) => Promise<void>
  renomearLista: (id: ListId, nome: string) => Promise<void>
  deletarLista: (id: ListId) => Promise<void>

  criarTarefa: (
    idLista: ListId,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    dataConclusaoEsperada: string
  ) => Promise<void>

  deletarTarefa: (idTarefa: IdentificadorTarefa) => Promise<void>
  atualizarTarefa: (idTarefa: IdentificadorTarefa, dados: AtualizarTarefaRequisicao) => Promise<void>
  alternarFinalizacaoTarefa: (idTarefa: IdentificadorTarefa, jaFinalizada: boolean) => Promise<void>
  moverTarefaEntreListas: (idTarefa: IdentificadorTarefa, origem: ListId, destino: ListId) => Promise<void>

  abrirDetalhes: (t: Tarefa) => void
  fecharDetalhes: () => void
  marcarNotificacaoVista: () => void
  fecharSnapback: () => void
}

const BoardContext = createContext<BoardContextValue | null>(null)

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard deve ser usado dentro de <BoardProvider>')
  return ctx
}

export function BoardProvider({ children }: { children: ReactNode }) {
  const [listas, setListas] = useState<Lista[]>([])
  const [tarefasPorListaId, setTarefasPorListaId] = useState<TarefasPorLista>({})
  const [carregandoQuadro, setCarregandoQuadro] = useState(true)
  const [mensagemErro, setMensagemErro] = useState<string | null>(null)
  const [mensagemSnapback, setMensagemSnapback] = useState<string | null>(null)
  const [temNotificacao, setTemNotificacao] = useState(false)
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null)

  function mostrarSnapback(msg: string) {
    setMensagemSnapback(msg)
    setTimeout(() => setMensagemSnapback(null), 3000)
  }

  async function carregarDadosQuadro() {
    try {
      setCarregandoQuadro(true)
      setMensagemErro(null)

      const [listasBuscadas, tarefasBuscadas] = await Promise.all([
        buscarTodasAsListas(),
        buscarTodasAsTarefas(),
      ])

      const mapa: TarefasPorLista = {}
      listasBuscadas.forEach((l) => (mapa[l.id] = []))
      tarefasBuscadas.forEach((t) => {
        const lid = t.listaId as ListId
        if (!mapa[lid]) mapa[lid] = []
        mapa[lid].push(t)
      })

      setListas(listasBuscadas)
      setTarefasPorListaId(mapa)
    } catch (e) {
      console.error(e)
      setMensagemErro('Não foi possível carregar o quadro.')
    } finally {
      setCarregandoQuadro(false)
    }
  }

  useEffect(() => {
    void carregarDadosQuadro()
  }, [])

  function tarefasDaLista(id: ListId) {
    return tarefasPorListaId[id] ?? []
  }

  // ---- Listas
  async function criarLista(nome: string) {
    const n = nome.trim()
    if (!n) return
    try {
      const nova = await criarNovaLista(n)
      setListas((prev) => [...prev, nova])
      setTarefasPorListaId((m) => ({ ...m, [nova.id]: [] }))
      mostrarSnapback('Lista criada!')
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao criar lista.')
    }
  }

  async function renomearLista(id: ListId, nome: string) {
    try {
      const atual = await atualizarNomeLista(id, nome)
      setListas((prev) => prev.map((l) => (l.id === id ? atual : l)))
      mostrarSnapback('Lista renomeada!')
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao renomear lista.')
    }
  }

  async function deletarLista(id: ListId) {
    try {
      await deletarListaPorId(id)
      setListas((prev) => prev.filter((l) => l.id !== id))
      setTarefasPorListaId((m) => {
        const novo = { ...m }
        delete novo[id]
        return novo
      })
      mostrarSnapback('Lista deletada com sucesso!')
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao deletar lista.')
    }
  }

  // ---- Tarefas
  async function criarTarefa(
    idLista: ListId,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    dataConclusaoEsperada: string
  ) {
    if (!dataConclusaoEsperada) {
      alert('Escolha uma data de conclusão para a tarefa.')
      return
    }
    try {
      const criada = await criarNovaTarefa({
        listaId: idLista,
        nome,
        descricao: descricao || undefined,
        prioridade,
        dataConclusaoEsperada,
      })
      setTarefasPorListaId((m) => ({
        ...m,
        [idLista]: [...(m[idLista] ?? []), criada],
      }))
      setTemNotificacao(true)
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao criar tarefa.')
    }
  }

  async function deletarTarefa(idTarefa: IdentificadorTarefa) {
    try {
      await deletarTarefaPorId(idTarefa)
      setTarefasPorListaId((m) => {
        const novo: TarefasPorLista = {}
        Object.entries(m).forEach(([k, lista]) => {
          const lid = Number(k) as ListId
          novo[lid] = lista.filter((t) => t.id !== idTarefa)
        })
        return novo
      })
      if (tarefaSelecionada?.id === idTarefa) setTarefaSelecionada(null)
      mostrarSnapback('Tarefa deletada com sucesso!')
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao deletar tarefa.')
    }
  }

  async function atualizarTarefa(idTarefa: IdentificadorTarefa, dados: AtualizarTarefaRequisicao) {
    try {
      const atualizada = await atualizarTarefaPorId(idTarefa, dados)
      setTarefasPorListaId((m) => {
        const novo: TarefasPorLista = {}
        const destino = atualizada.listaId as ListId

        Object.entries(m).forEach(([k, lista]) => {
          const lid = Number(k) as ListId
          novo[lid] = lista.filter((t) => t.id !== idTarefa)
        })
        novo[destino] = [...(novo[destino] ?? []), atualizada]
        return novo
      })
      setTarefaSelecionada((sel) => (sel?.id === idTarefa ? atualizada : sel))
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao atualizar tarefa.')
    }
  }

  async function alternarFinalizacaoTarefa(idTarefa: IdentificadorTarefa, jaFinalizada: boolean) {
    try {
      const concluidoEm = jaFinalizada ? null : new Date().toISOString().slice(0, 10)
      const atualizada = await atualizarTarefaPorId(idTarefa, { concluidoEm })

      setTarefasPorListaId((m) => {
        const novo: TarefasPorLista = {}
        Object.entries(m).forEach(([k, lista]) => {
          const lid = Number(k) as ListId
          novo[lid] = lista.map((t) => (t.id === idTarefa ? atualizada : t))
        })
        return novo
      })
      setTarefaSelecionada((sel) => (sel?.id === idTarefa ? atualizada : sel))
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao atualizar finalização da tarefa.')
    }
  }

  async function moverTarefaEntreListas(idTarefa: IdentificadorTarefa, origem: ListId, destino: ListId) {
    if (origem === destino) return

    // otimista
    setTarefasPorListaId((m) => {
      const novo: TarefasPorLista = {}
      Object.entries(m).forEach(([k, lista]) => {
        novo[Number(k) as ListId] = [...lista]
      })
      const origemArr = novo[origem] ?? []
      const idx = origemArr.findIndex((t) => t.id === idTarefa)
      if (idx === -1) return m
      const [movida] = origemArr.splice(idx, 1)
      novo[origem] = origemArr
      novo[destino] = [...(novo[destino] ?? []), { ...movida, listaId: destino }]
      return novo
    })

    try {
      await atualizarTarefaPorId(idTarefa, { novaListaId: destino })
    } catch (e) {
      console.error(e)
      setMensagemErro('Erro ao mover tarefa entre listas. Recarregando quadro.')
      await carregarDadosQuadro()
    }
  }

  // UI helpers
  function abrirDetalhes(t: Tarefa) { setTarefaSelecionada(t) }
  function fecharDetalhes() { setTarefaSelecionada(null) }
  function marcarNotificacaoVista() { setTemNotificacao(false) }
  function fecharSnapback() { setMensagemSnapback(null) }

  const value: BoardContextValue = {
    listas,
    tarefasPorListaId,
    tarefaSelecionada,
    carregandoQuadro,
    mensagemErro,
    mensagemSnapback,
    temNotificacao,

    tarefasDaLista,

    criarLista,
    renomearLista,
    deletarLista,

    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    alternarFinalizacaoTarefa,
    moverTarefaEntreListas,

    abrirDetalhes,
    fecharDetalhes,
    marcarNotificacaoVista,
    fecharSnapback,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}