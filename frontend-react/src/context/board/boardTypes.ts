import type { IdentificadorLista, Lista } from '../../types/lista'
import type {
  IdentificadorTarefa,
  PrioridadeTarefa,
  Tarefa,
} from '../../types/tarefa'
import type { AtualizarTarefaRequisicao } from '../../queries/tarefasApi'

export type TarefasPorLista = Record<IdentificadorLista, Tarefa[]>

export type BoardContextValue = {
  listas: Lista[]
  tarefasPorListaId: TarefasPorLista
  tarefaSelecionada: Tarefa | null
  carregandoQuadro: boolean
  mensagemErro: string | null
  mensagemSnapback: string | null
  temNotificacao: boolean

  tarefasDaLista: (id: IdentificadorLista) => Tarefa[]

  criarLista: (nome: string) => Promise<void>
  renomearLista: (id: IdentificadorLista, nome: string) => Promise<void>
  deletarLista: (id: IdentificadorLista) => Promise<void>

  criarTarefa: (
    idLista: IdentificadorLista,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    dataConclusaoEsperadaISO: string
  ) => Promise<void>

  deletarTarefa: (idTarefa: IdentificadorTarefa) => Promise<void>
  atualizarTarefa: (idTarefa: IdentificadorTarefa, dados: AtualizarTarefaRequisicao) => Promise<void>
  alternarFinalizacaoTarefa: (idTarefa: IdentificadorTarefa, tarefaJaFinalizada: boolean) => Promise<void>
  moverTarefaEntreListas: (idTarefa: IdentificadorTarefa, origem: IdentificadorLista, destino: IdentificadorLista) => Promise<void>

  abrirDetalhes: (t: Tarefa) => void
  fecharDetalhes: () => void
  marcarNotificacaoVista: () => void
  exibirMensagemSnapback: (msg: string) => void
  fecharSnapback: () => void

}
