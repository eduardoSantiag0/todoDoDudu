import { clienteApi } from './clienteApi'
import type { IdentificadorLista, Lista } from '../types/lista'
import type { Tarefa } from '../types/tarefa'

export interface ListaComTarefas extends Lista {
  tarefas?: Tarefa[];
}

export async function buscarTodasAsListas(): Promise<Lista[]> {
  const resposta = await clienteApi.get('/lists')
  const listas = resposta.data as Lista[]
  return listas
}

export async function criarNovaLista(
  nomeLista: string,
): Promise<Lista> {
    const resposta = await clienteApi.post('/lists', { nomeLista })
    const listaCriada = resposta.data as Lista
    return listaCriada
  }


export async function atualizarNomeLista(
  id: number,
  novoNome: string,
): Promise<Lista> {
  const corpoRequisicao = { nome: novoNome }
  const resposta = await clienteApi.put( `/lists/${id}`, corpoRequisicao   )
  return resposta.data as Lista
}

export async function deletarListaPorId(idLista: IdentificadorLista): Promise<void> {
  await clienteApi.delete(`/lists/${idLista}`)
}
