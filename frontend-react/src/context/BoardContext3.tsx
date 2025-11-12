// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from 'react'

// import type { Lista, ListId } from '../types/lista'
// import type {
//   Tarefa,
//   IdentificadorTarefa,
//   PrioridadeTarefa,
// } from '../types/tarefa'
// import type { AtualizarTarefaRequisicao } from '../queries/tarefasApi'

// import {
//   atualizarNomeLista,
//   buscarTodasAsListas,
//   criarNovaLista,
//   deletarListaPorId,
// } from '../queries/listasApi'
// import {
//   atualizarTarefaPorId,
//   buscarTodasAsTarefas,
//   criarNovaTarefa,
//   deletarTarefaPorId,
// } from '../queries/tarefasApi'

// type TarefasPorLista = Record<ListId, Tarefa[]>

// type BoardContextValue = {
//   listas: Lista[]
//   tarefasPorListaId: TarefasPorLista
//   tarefaSelecionada: Tarefa | null
//   carregandoQuadro: boolean
//   mensagemErro: string | null
//   mensagemSnapback: string | null
//   temNotificacao: boolean

//   tarefasDaLista: (id: ListId) => Tarefa[]

//   criarLista: (nome: string) => Promise<void>
//   renomearLista: (id: ListId, nome: string) => Promise<void>
//   deletarLista: (id: ListId) => Promise<void>

//   criarTarefa: (
//     idLista: ListId,
//     nome: string,
//     descricao: string,
//     prioridade: PrioridadeTarefa,
//     dataConclusaoEsperada: string
//   ) => Promise<void>

//   deletarTarefa: (idTarefa: IdentificadorTarefa) => Promise<void>
//   atualizarTarefa: (idTarefa: IdentificadorTarefa, dados: AtualizarTarefaRequisicao) => Promise<void>
//   alternarFinalizacaoTarefa: (idTarefa: IdentificadorTarefa, jaFinalizada: boolean) => Promise<void>
//   moverTarefaEntreListas: (idTarefa: IdentificadorTarefa, origem: ListId, destino: ListId) => Promise<void>

//   abrirDetalhes: (t: Tarefa) => void
//   fecharDetalhes: () => void
//   marcarNotificacaoVista: () => void
//   fecharSnapback: () => void
// }

// const BoardContext = createContext<BoardContextValue | null>(null)

// export function useBoard() {
//   const contexto = useContext(BoardContext)
//   if (!contexto) throw new Error('useBoard deve ser usado dentro de <BoardProvider>')
//   return contexto
// }

// export function BoardProvider({ children }: { children: ReactNode }) {
//   const [listas, setListas] = useState<Lista[]>([])
//   const [tarefasPorListaId, setTarefasPorListaId] = useState<TarefasPorLista>({})
//   const [carregandoQuadro, setCarregandoQuadro] = useState(true)
//   const [mensagemErro, setMensagemErro] = useState<string | null>(null)
//   const [mensagemSnapback, setMensagemSnapback] = useState<string | null>(null)
//   const [temNotificacao, setTemNotificacao] = useState(false)
//   const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null)

//   function exibirMensagemSnapback(textoMensagem: string) {
//     setMensagemSnapback(textoMensagem)
//     setTimeout(() => setMensagemSnapback(null), 3000)
//   }

//   async function carregarDadosDoQuadro() {
//     try {
//       setCarregandoQuadro(true)
//       setMensagemErro(null)

//       const [listasObtidas, tarefasObtidas] = await Promise.all([
//         buscarTodasAsListas(),
//         buscarTodasAsTarefas(),
//       ])

//       const tarefasAgrupadasPorListaId: TarefasPorLista = {}
//       listasObtidas.forEach((lista) => { tarefasAgrupadasPorListaId[lista.id] = [] })
//       tarefasObtidas.forEach((tarefa) => {
//         const listaDestinoId = tarefa.listaId as ListId
//         if (!tarefasAgrupadasPorListaId[listaDestinoId]) tarefasAgrupadasPorListaId[listaDestinoId] = []
//         tarefasAgrupadasPorListaId[listaDestinoId].push(tarefa)
//       })

//       setListas(listasObtidas)
//       setTarefasPorListaId(tarefasAgrupadasPorListaId)
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Não foi possível carregar o quadro.')
//     } finally {
//       setCarregandoQuadro(false)
//     }
//   }

//   useEffect(() => {
//     void carregarDadosDoQuadro()
//   }, [])

//   function tarefasDaLista(idLista: ListId) {
//     return tarefasPorListaId[idLista] ?? []
//   }

//   // ---- Listas
//   async function criarLista(nomeLista: string) {
//     const nomeListaTrimado = nomeLista.trim()
//     if (!nomeListaTrimado) return
//     try {
//       const novaLista = await criarNovaLista(nomeListaTrimado)
//       setListas((listasAnteriores) => [...listasAnteriores, novaLista])
//       setTarefasPorListaId((mapaAnterior) => ({ ...mapaAnterior, [novaLista.id]: [] }))
//       exibirMensagemSnapback('Lista criada!')
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao criar lista.')
//     }
//   }

//   async function renomearLista(idLista: ListId, novoNomeLista: string) {
//     try {
//       const listaAtualizada = await atualizarNomeLista(idLista, novoNomeLista)
//       setListas((listasAnteriores) =>
//         listasAnteriores.map((lista) => (lista.id === idLista ? listaAtualizada : lista)),
//       )
//       exibirMensagemSnapback('Lista renomeada!')
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao renomear lista.')
//     }
//   }

//   async function deletarLista(idLista: ListId) {
//     try {
//       await deletarListaPorId(idLista)
//       setListas((listasAnteriores) => listasAnteriores.filter((lista) => lista.id !== idLista))
//       setTarefasPorListaId((mapaAnterior) => {
//         const novoMapa = { ...mapaAnterior }
//         delete novoMapa[idLista]
//         return novoMapa
//       })
//       exibirMensagemSnapback('Lista deletada com sucesso!')
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao deletar lista.')
//     }
//   }

//   // ---- Tarefas
//   async function criarTarefa(
//     idLista: ListId,
//     tituloTarefa: string,
//     descricaoTarefa: string,
//     prioridadeTarefa: PrioridadeTarefa,
//     dataConclusaoEsperadaISO: string
//   ) {
//     if (!dataConclusaoEsperadaISO) {
//       alert('Escolha uma data de conclusão para a tarefa.')
//       return
//     }
//     try {
//       const tarefaCriada = await criarNovaTarefa({
//         listaId: idLista,
//         nome: tituloTarefa,
//         descricao: descricaoTarefa || undefined,
//         prioridade: prioridadeTarefa,
//         dataConclusaoEsperada: dataConclusaoEsperadaISO,
//       })
//       setTarefasPorListaId((mapaAnterior) => ({
//         ...mapaAnterior,
//         [idLista]: [...(mapaAnterior[idLista] ?? []), tarefaCriada],
//       }))
//       setTemNotificacao(true)
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao criar tarefa.')
//     }
//   }

//   async function deletarTarefa(idTarefa: IdentificadorTarefa) {
//     try {
//       await deletarTarefaPorId(idTarefa)
//       setTarefasPorListaId((mapaAnterior) => {
//         const novoMapa: TarefasPorLista = {}
//         Object.entries(mapaAnterior).forEach(([chaveLista, listaDeTarefas]) => {
//           const chaveListaComoId = Number(chaveLista) as ListId
//           novoMapa[chaveListaComoId] = listaDeTarefas.filter((tarefa) => tarefa.id !== idTarefa)
//         })
//         return novoMapa
//       })
//       if (tarefaSelecionada?.id === idTarefa) setTarefaSelecionada(null)
//       exibirMensagemSnapback('Tarefa deletada com sucesso!')
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao deletar tarefa.')
//     }
//   }

//   async function atualizarTarefa(idTarefa: IdentificadorTarefa, dadosAtualizacao: AtualizarTarefaRequisicao) {
//     try {
//       const tarefaAtualizada = await atualizarTarefaPorId(idTarefa, dadosAtualizacao)
//       setTarefasPorListaId((mapaAnterior) => {
//         const novoMapa: TarefasPorLista = {}
//         const listaDestinoId = tarefaAtualizada.listaId as ListId

//         Object.entries(mapaAnterior).forEach(([chaveLista, listaDeTarefas]) => {
//           const chaveListaComoId = Number(chaveLista) as ListId
//           novoMapa[chaveListaComoId] = listaDeTarefas.filter((tarefa) => tarefa.id !== idTarefa)
//         })
//         novoMapa[listaDestinoId] = [...(novoMapa[listaDestinoId] ?? []), tarefaAtualizada]
//         return novoMapa
//       })
//       setTarefaSelecionada((tarefaSel) => (tarefaSel?.id === idTarefa ? tarefaAtualizada : tarefaSel))
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao atualizar tarefa.')
//     }
//   }

//   async function alternarFinalizacaoTarefa(idTarefa: IdentificadorTarefa, tarefaJaFinalizada: boolean) {
//     try {
//       const concluidoEmISO = tarefaJaFinalizada ? null : new Date().toISOString().slice(0, 10)
//       const tarefaAtualizada = await atualizarTarefaPorId(idTarefa, { concluidoEm: concluidoEmISO })

//       setTarefasPorListaId((mapaAnterior) => {
//         const novoMapa: TarefasPorLista = {}
//         Object.entries(mapaAnterior).forEach(([chaveLista, listaDeTarefas]) => {
//           const chaveListaComoId = Number(chaveLista) as ListId
//           novoMapa[chaveListaComoId] = listaDeTarefas.map((tarefa) =>
//             tarefa.id === idTarefa ? tarefaAtualizada : tarefa,
//           )
//         })
//         return novoMapa
//       })
//       setTarefaSelecionada((tarefaSel) => (tarefaSel?.id === idTarefa ? tarefaAtualizada : tarefaSel))
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao atualizar finalização da tarefa.')
//     }
//   }

//   async function moverTarefaEntreListas(
//     idTarefa: IdentificadorTarefa,
//     listaOrigemId: ListId,
//     listaDestinoId: ListId
//   ) {
//     if (listaOrigemId === listaDestinoId) return

//     // Atualização otimista
//     setTarefasPorListaId((mapaAnterior) => {
//       const novoMapa: TarefasPorLista = {}
//       Object.entries(mapaAnterior).forEach(([chaveLista, listaDeTarefas]) => {
//         novoMapa[Number(chaveLista) as ListId] = [...listaDeTarefas]
//       })

//       const tarefasDaListaOrigem = novoMapa[listaOrigemId] ?? []
//       const indiceNaOrigem = tarefasDaListaOrigem.findIndex((t) => t.id === idTarefa)
//       if (indiceNaOrigem === -1) return mapaAnterior

//       const [tarefaMovida] = tarefasDaListaOrigem.splice(indiceNaOrigem, 1)
//       novoMapa[listaOrigemId] = tarefasDaListaOrigem
//       novoMapa[listaDestinoId] = [...(novoMapa[listaDestinoId] ?? []), { ...tarefaMovida, listaId: listaDestinoId }]

//       return novoMapa
//     })

//     try {
//       await atualizarTarefaPorId(idTarefa, { novaListaId: listaDestinoId })
//     } catch (erro) {
//       console.error(erro)
//       setMensagemErro('Erro ao mover tarefa entre listas. Recarregando quadro.')
//       await carregarDadosDoQuadro()
//     }
//   }

//   // UI helpers
//   function abrirDetalhes(tarefa: Tarefa) { setTarefaSelecionada(tarefa) }
//   function fecharDetalhes() { setTarefaSelecionada(null) }
//   function marcarNotificacaoVista() { setTemNotificacao(false) }
//   function fecharSnapback() { setMensagemSnapback(null) }

//   const value: BoardContextValue = {
//     listas,
//     tarefasPorListaId,
//     tarefaSelecionada,
//     carregandoQuadro,
//     mensagemErro,
//     mensagemSnapback,
//     temNotificacao,

//     tarefasDaLista,

//     criarLista,
//     renomearLista,
//     deletarLista,

//     criarTarefa,
//     deletarTarefa,
//     atualizarTarefa,
//     alternarFinalizacaoTarefa,
//     moverTarefaEntreListas,

//     abrirDetalhes,
//     fecharDetalhes,
//     marcarNotificacaoVista,
//     fecharSnapback,
//   }

//   return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
// }
