import { clienteApi } from './clienteApi'
import type {
  IdentificadorTarefa,
  PrioridadeTarefa,
  Tarefa,
} from '../types/tarefa'
import type { IdentificadorLista } from '../types/lista'


export interface CriarTarefaRequisicao {
  listaId: IdentificadorLista;
  nome: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataEsperadaDeConclusao: string;
}

export interface AtualizarTarefaRequisicao {
  nome?: string;
  descricao?: string;
  prioridade?: PrioridadeTarefa;
  concluidoEm?: string | null;
  dataEsperadaDeConclusao?: string;
  novaListaId?: IdentificadorLista;
}

export interface TarefaRespostaDTO {
  id: number;
  listaId: IdentificadorLista;
  nome: string;
  descricao: string | null;
  prioridade: PrioridadeTarefa;
  dataEsperadaDeConclusao: string;
  concluidoEm: string;
}

export interface TarefaCriadaResposta {
  id: number;
  listaId: number;
  nome: string;
  descricao: string | null;
  prioridade: PrioridadeTarefa;
  dataEsperadaDeConclusao: string;
  concluidoEm?: string | null;
}

export async function buscarTodasAsTarefas(): Promise<Tarefa[]> {
  const resposta = await clienteApi.get<TarefaCriadaResposta[]>(
    '/tasks/all',
  )

  const dados = resposta.data

  const tarefasConvertidas: Tarefa[] = dados.map(
    (tarefaResposta) => ({
      id: tarefaResposta.id,
      listaId: tarefaResposta.listaId,
      nome: tarefaResposta.nome,
      descricao: tarefaResposta.descricao ?? undefined,
      prioridade: tarefaResposta.prioridade,
      dataEsperadaDeConclusao: tarefaResposta.dataEsperadaDeConclusao,
      concluidoEm: tarefaResposta.concluidoEm ?? null,
    }),
  )

  return tarefasConvertidas
}


export async function buscarTarefaPorId(
  idTarefa: IdentificadorTarefa,
): Promise<Tarefa> {
  const resposta = await clienteApi.get<TarefaRespostaDTO>(`/tasks/${idTarefa}`)
  const dados = resposta.data

  const tarefa: Tarefa = {
    id: dados.id,
    listaId: dados.listaId,
    nome: dados.nome,
    descricao: dados.descricao ?? undefined,
    prioridade: dados.prioridade,
    dataEsperadaDeConclusao: dados.dataEsperadaDeConclusao,
    concluidoEm: dados.concluidoEm,
  }

  return tarefa
}

export async function criarNovaTarefa(
  dadosTarefa: CriarTarefaRequisicao,
): Promise<Tarefa> {
  const resposta = await clienteApi.post<TarefaCriadaResposta>(
    '/tasks',
    dadosTarefa,
  )

  const dados = resposta.data

  const tarefaCriada: Tarefa = {
    id: dados.id,
    listaId: dados.listaId,
    nome: dados.nome,
    descricao: dados.descricao ?? undefined,
    prioridade: dados.prioridade,
    dataEsperadaDeConclusao: dados.dataEsperadaDeConclusao,
    concluidoEm: dados.concluidoEm ?? undefined,

  }

  return tarefaCriada
}



export async function atualizarTarefaPorId(
  idTarefa: IdentificadorTarefa,
  dadosAtualizacao: AtualizarTarefaRequisicao,
): Promise<Tarefa> {

  const resposta = await clienteApi.put<TarefaRespostaDTO>(
    `/tasks/${idTarefa}`,
    dadosAtualizacao,
  )

  const dados = resposta.data

  const tarefaAtualizada: Tarefa = {
    id: dados.id,
    listaId: dados.listaId,
    nome: dados.nome,
    descricao: dados.descricao ?? undefined,
    prioridade: dados.prioridade,
    dataEsperadaDeConclusao: dados.dataEsperadaDeConclusao,
    concluidoEm: dados.concluidoEm,
  }

  return tarefaAtualizada
}


export async function deletarTarefaPorId(
  idTarefa: IdentificadorTarefa,
): Promise<void> {
  await clienteApi.delete(`/tasks/${idTarefa}`)
}
