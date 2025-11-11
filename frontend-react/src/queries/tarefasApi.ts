import { clienteApi } from "./clienteApi";
import type {
  Tarefa,
  IdentificadorTarefa,
  PrioridadeTarefa,
} from "../types/tarefa";
import type { ListId } from "../types/lista";


export interface TarefaRespostaBackend {
  id: number;
  listaId: ListId;
  nome: string;
  descricao: string | null;
  prioridade: PrioridadeTarefa;
  dataConclusaoEsperada: string | null;
  concluidaEm: string | null;
}

export interface TarefaCriadaResposta {
  id: number;
  listaId: number;
  nome: string;
  descricao: string | null;
  prioridade: PrioridadeTarefa;
  dataConclusaoEsperada: string; 
  concluidaEm?: string | null;
}

export interface CriarTarefaRequisicao {
  listaId: ListId;
  nome: string;
  descricao?: string;
  prioridade: PrioridadeTarefa;
  dataConclusaoEsperada: string; 
}

export interface AtualizarTarefaRequisicao {
  nome?: string;
  descricao?: string;
  prioridade?: PrioridadeTarefa;
  dataFinalizada?: string | null;
  dataEsperadaDeConclusao?: string;
  novaListaId?: ListId;
}

export interface TarefaRespostaDTO {
  id: number;
  listaId: ListId;
  nome: string;
  descricao: string | null;
  prioridade: PrioridadeTarefa;
  dataEsperadaDeConclusao: string;
  dataConcluida: string; 
}


// export async function buscarTodasAsTarefas(): Promise<Tarefa[]> {
//   const resposta = await clienteApi.get<TarefaRespostaDTO[]>(
//     "/tasks/all"
//   );

//   const tarefasBackend = resposta.data;

//   const tarefasConvertidas: Tarefa[] = tarefasBackend.map(
//     (tarefaResposta) => ({
//       id: tarefaResposta.id,
//       listaId: tarefaResposta.listaId,
//       nome: tarefaResposta.nome,
//       descricao: tarefaResposta.descricao ?? undefined,
//       prioridade: tarefaResposta.prioridade,
//       dataPrevistaConclusao: tarefaResposta.dataEsperadaDeConclusao,
//       dataFinalizada: tarefaResposta.dataConcluida,
//     })
//   );

//   return tarefasConvertidas;
// }

export async function buscarTodasAsTarefas(): Promise<Tarefa[]> {
  const resposta = await clienteApi.get("/tasks/all");
  const tarefas = resposta.data as Tarefa[];
  return tarefas;
}



export async function buscarTarefaPorId( idTarefa: IdentificadorTarefa ): Promise<Tarefa> {
  const resposta = await clienteApi.get(`/tasks/${idTarefa}`);
  const tarefa = resposta.data as Tarefa;
  return tarefa;
}


export async function criarNovaTarefa(
  dadosTarefa: CriarTarefaRequisicao
): Promise<Tarefa> {
  const resposta = await clienteApi.post<TarefaCriadaResposta>(
    "/tasks",
    dadosTarefa
  );

  const respostaData = resposta.data;

  const tarefaCriada: Tarefa = {
    id: respostaData.id,
    listaId: respostaData.listaId,
    nome: respostaData.nome,
    descricao: respostaData.descricao ?? undefined,
    prioridade: respostaData.prioridade,
    dataPrevistaConclusao: respostaData.dataConclusaoEsperada,
  };

  return tarefaCriada;
}


// export async function atualizarTarefaPorId(
//   idTarefa: IdentificadorTarefa,
//   dadosAtualizacao: AtualizarTarefaRequisicao
// ): Promise<Tarefa> {
//   const resposta = await clienteApi.put(`/tasks/${idTarefa}`, dadosAtualizacao);
//   return resposta.data as Tarefa;
// }

export async function atualizarTarefaPorId(
  idTarefa: IdentificadorTarefa,
  dadosAtualizacao: AtualizarTarefaRequisicao
): Promise<Tarefa> {

  const resposta = await clienteApi.put<TarefaRespostaDTO>(
    `/tasks/${idTarefa}`,
    dadosAtualizacao
  );

  const dados = resposta.data;

  const tarefaAtualizada: Tarefa = {
    id: dados.id,
    listaId: dados.listaId,
    nome: dados.nome,
    descricao: dados.descricao ?? undefined,
    prioridade: dados.prioridade,
    dataPrevistaConclusao: dados.dataEsperadaDeConclusao,
    dataFinalizada: dados.dataConcluida,
  };

  return tarefaAtualizada;
}


export async function deletarTarefaPorId(
  idTarefa: IdentificadorTarefa
): Promise<void> {
  await clienteApi.delete(`/tasks/${idTarefa}`);
}
