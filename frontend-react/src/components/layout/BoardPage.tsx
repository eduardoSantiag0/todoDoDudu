// import { useEffect, useState } from 'react'
// import type { Lista, ListId } from '../../types/lista'
// import { MensagemSnapback } from '../modals/MensagemSnapback'
// import { ColunaLista } from '../listas/ColunaLista'
// import type {
//     IdentificadorTarefa,
//     PrioridadeTarefa,
//     Tarefa,
// } from '../../types/tarefa'
// import { PainelDetalhesTarefa } from '../tarefas/PainelDetalhes/PainelDetalhesTarefa'

// import {
//     atualizarNomeLista,
//     buscarTodasAsListas,
//     criarNovaLista,
//     deletarListaPorId,
// } from '../../queries/listasApi'
// import {
//     atualizarTarefaPorId,
//     AtualizarTarefaRequisicao,
//     buscarTodasAsTarefas,
//     criarNovaTarefa,
//     deletarTarefaPorId,
// } from '../../queries/tarefasApi'
// import { BotaoAcaoComPlus } from '../btns/BotaoAcaoComPlus'
// import { CampoNomeNovaLista } from '../listas/CampoNomeNovaLista'
// import { CabecalhoAplicacao } from './Cabecalho'

// export function BoardPage() {
//     const [listas, setListas] = useState<Lista[]>([])
//     const [tarefasPorListaId, setTarefasPorListaId] = useState<
//         Record<ListId, Tarefa[]>
//     >({})

//     const [carregandoQuadro, setCarregandoQuadro] = useState(true)
//     const [mensagemErro, setMensagemErro] = useState<string | null>(null)

//     const [mensagemSnapback, setMensagemSnapback] = useState<string | null>(
//         null,
//     )

//     const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(
//         null,
//     )

//     const [mostrandoCampoNovaLista, setMostrandoCampoNovaLista] =
//         useState(false)
//     const [nomeNovaLista, setNomeNovaLista] = useState('')

//     const [temNotificacao, setTemNotificacao] = useState(false)

//     useEffect(() => {
//         carregarDadosQuadro()
//     }, [])

//     function mostrarSnapback(mensagem: string) {
//         setMensagemSnapback(mensagem)

//         setTimeout(() => {
//             setMensagemSnapback(null)
//         }, 3000)
//     }

//     async function carregarDadosQuadro() {
//         try {
//             setCarregandoQuadro(true)
//             setMensagemErro(null)

//             const [listasBuscadas, tarefasBuscadas] = await Promise.all([
//                 buscarTodasAsListas(),
//                 buscarTodasAsTarefas(),
//             ])

//             const novoMapaTarefas: Record<ListId, Tarefa[]> = {}

//             listasBuscadas.forEach((lista) => {
//                 novoMapaTarefas[lista.id] = []
//             })

//             tarefasBuscadas.forEach((tarefa) => {
//                 const idLista = tarefa.listaId as ListId

//                 if (!idLista) {
//                     console.warn('Tarefa sem listaId:', tarefa)
//                     return
//                 }

//                 if (!novoMapaTarefas[idLista]) {
//                     novoMapaTarefas[idLista] = []
//                 }

//                 novoMapaTarefas[idLista].push(tarefa)
//             })

//             setListas(listasBuscadas)
//             setTarefasPorListaId(novoMapaTarefas)
//         } catch (erro) {
//             console.error('Erro ao carregar quadro:', erro)
//             setMensagemErro('Não foi possível carregar o quadro.')
//         } finally {
//             setCarregandoQuadro(false)
//         }
//     }

//     async function lidarCriarLista(nomeLista: string) {
//         const nomeTratado = nomeLista.trim()
//         if (!nomeTratado) {
//             return
//         }

//         try {
//             const listaCriada = await criarNovaLista(nomeTratado)

//             setListas((listasAtuais) => [...listasAtuais, listaCriada])

//             setTarefasPorListaId((mapaAtual) => ({
//                 ...mapaAtual,
//                 [listaCriada.id]: [],
//             }))
//         } catch (erro) {
//             console.error(erro)
//             setMensagemErro('Erro ao criar lista.')
//         }
//     }

//     async function lidarRenomearLista(idLista: ListId, nome: string) {
//         try {
//             const listaAtualizada = await atualizarNomeLista(idLista, nome)

//             setListas((listasAnteriores) =>
//                 listasAnteriores.map((listaAtual) =>
//                     listaAtual.id === idLista ? listaAtualizada : listaAtual,
//                 ),
//             )
//         } catch (erro) {
//             console.error(erro)
//             setMensagemErro('Erro ao renomear lista.')
//         }
//     }

//     async function lidarDeletarLista(idLista: ListId) {
//         try {
//             await deletarListaPorId(idLista)

//             setListas((listasAtuais) =>
//                 listasAtuais.filter((lista) => lista.id !== idLista),
//             )

//             setTarefasPorListaId((mapaAtual) => {
//                 const novoMapa: Record<ListId, Tarefa[]> = { ...mapaAtual }
//                 delete novoMapa[idLista]
//                 return novoMapa
//             })

//             mostrarSnapback('Lista deletada com sucesso!')
//         } catch (erro) {
//             console.error('Erro ao deletar lista:', erro)
//             setMensagemErro('Erro ao deletar lista.')
//         }
//     }

//     async function lidarCriarTarefaNaLista(
//         idLista: ListId,
//         nome: string,
//         descricao: string,
//         prioridade: PrioridadeTarefa,
//         dataConclusaoTexto: string,
//     ) {
//         if (!dataConclusaoTexto) {
//             alert('Escolha uma data de conclusão para a tarefa.')
//             return
//         }

//         try {
//             const tarefaCriada = await criarNovaTarefa({
//                 listaId: idLista,
//                 nome: nome,
//                 descricao: descricao || undefined,
//                 prioridade,
//                 dataConclusaoEsperada: dataConclusaoTexto,
//             })

//             setTarefasPorListaId((mapaAtual) => {
//                 const tarefasDaLista = mapaAtual[idLista] ?? []
//                 return {
//                     ...mapaAtual,
//                     [idLista]: [...tarefasDaLista, tarefaCriada],
//                 }
//             })

//             setTemNotificacao(true)
//         } catch (erro) {
//             console.error('Erro ao criar tarefa:', erro)
//             setMensagemErro('Erro ao criar tarefa.')
//         }
//     }

//     function lidarAbrirDetalhesTarefa(tarefa: Tarefa) {
//         setTarefaSelecionada(tarefa)
//     }

//     function lidarFecharPainelDetalhes() {
//         setTarefaSelecionada(null)
//     }

//     async function lidarDeletarTarefa(idTarefa: IdentificadorTarefa) {
//         try {
//             await deletarTarefaPorId(idTarefa)
//             setTarefasPorListaId((mapaAtual) => {
//                 const novoMapa: Record<ListId, Tarefa[]> = {}
//                 for (const chave in mapaAtual) {
//                     const idLista = Number(chave) as ListId
//                     novoMapa[idLista] = mapaAtual[idLista].filter(
//                         (tarefa) => tarefa.id !== idTarefa,
//                     )
//                 }
//                 mostrarSnapback('Tarefa deletada com sucesso!')
//                 return novoMapa
//             })
//             if (tarefaSelecionada?.id === idTarefa) {
//                 setTarefaSelecionada(null)
//             }
//         } catch (erro) {
//             console.error(erro)
//             setMensagemErro('Erro ao deletar tarefa.')
//         }
//     }

//     async function lidarAtualizarDetalhesTarefa(
//         idTarefa: IdentificadorTarefa,
//         dadosAtualizados: AtualizarTarefaRequisicao,
//     ) {
//         try {
//             const tarefaAtualizada = await atualizarTarefaPorId(
//                 idTarefa,
//                 dadosAtualizados,
//             )

//             setTarefasPorListaId((mapaAtual) => {
//                 const novoMapa: Record<ListId, Tarefa[]> = {}
//                 const listaDestinoId = tarefaAtualizada.listaId as ListId

//                 // 1) remove a tarefa de TODAS as listas
//                 Object.entries(mapaAtual).forEach(([chave, lista]) => {
//                     const idLista = Number(chave) as ListId
//                     const listaSemTarefa = lista.filter(
//                         (tarefa) => tarefa.id !== idTarefa,
//                     )
//                     novoMapa[idLista] = listaSemTarefa
//                 })

//                 // 2) garante que a lista destino existe
//                 const listaDestino = novoMapa[listaDestinoId] ?? []

//                 // 3) adiciona a tarefa atualizada na lista destino
//                 novoMapa[listaDestinoId] = [...listaDestino, tarefaAtualizada]

//                 return novoMapa
//             })

//             // Atualiza o painel com os dados novos
//             setTarefaSelecionada(tarefaAtualizada)
//         } catch (erro) {
//             console.error('Erro ao atualizar tarefa:', erro)
//             setMensagemErro('Erro ao atualizar tarefa.')
//         }
//     }

//     async function lidarAlternarFinalizacaoTarefa(
//         idTarefa: IdentificadorTarefa,
//         tarefaJaFinalizada: boolean,
//     ) {
//         try {
//             let novaDataFinalizada: string | null

//             if (tarefaJaFinalizada) {
//                 // já estava finalizada → desfaz (manda null pro backend)
//                 novaDataFinalizada = null
//             } else {
//                 // não estava finalizada → define hoje
//                 novaDataFinalizada = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"
//             }

//             const dadosAtualizados: AtualizarTarefaRequisicao = {
//                 concluidoEm: novaDataFinalizada,
//             }

//             const tarefaAtualizada = await atualizarTarefaPorId(
//                 idTarefa,
//                 dadosAtualizados,
//             )

//             // atualiza o mapa de tarefas na tela
//             setTarefasPorListaId((mapaAtual) => {
//                 const novoMapa: Record<ListId, Tarefa[]> = {}

//                 for (const chave in mapaAtual) {
//                     const idLista = Number(chave) as ListId
//                     const tarefasDaLista = mapaAtual[idLista]

//                     novoMapa[idLista] = tarefasDaLista.map((tarefa) =>
//                         tarefa.id === idTarefa ? tarefaAtualizada : tarefa,
//                     )
//                 }

//                 return novoMapa
//             })

//             // se a tarefa estiver aberta no painel lateral, atualiza também lá
//             if (tarefaSelecionada && tarefaSelecionada.id === idTarefa) {
//                 setTarefaSelecionada(tarefaAtualizada)
//             }
//         } catch (erro) {
//             console.error('Erro ao alternar finalização da tarefa:', erro)
//             setMensagemErro('Erro ao atualizar finalização da tarefa.')
//         }
//     }

//     async function lidarMoverTarefaEntreListas(
//         idTarefa: IdentificadorTarefa,
//         listaOrigemId: ListId,
//         listaDestinoId: ListId,
//     ) {
//         // Ignora se arrastou para a mesma lista
//         if (listaOrigemId === listaDestinoId) {
//             return
//         }

//         // Atualiza o estado local imediatamente (UX otimista)
//         setTarefasPorListaId((mapaAtual) => {
//             const novoMapa: Record<ListId, Tarefa[]> = {}

//             // Copia todas as listas existentes
//             Object.entries(mapaAtual).forEach(([chave, lista]) => {
//                 novoMapa[Number(chave) as ListId] = [...lista]
//             })

//             // Remove da lista de origem
//             const tarefasOrigem = novoMapa[listaOrigemId] ?? []
//             const indiceNaOrigem = tarefasOrigem.findIndex(
//                 (t) => t.id === idTarefa,
//             )
//             if (indiceNaOrigem === -1) {
//                 return mapaAtual
//             }

//             const [tarefaMovida] = tarefasOrigem.splice(indiceNaOrigem, 1)
//             novoMapa[listaOrigemId] = tarefasOrigem

//             // Adiciona na lista de destino, atualizando o listaId
//             const tarefasDestino = novoMapa[listaDestinoId] ?? []
//             novoMapa[listaDestinoId] = [
//                 ...tarefasDestino,
//                 { ...tarefaMovida, listaId: listaDestinoId },
//             ]

//             return novoMapa
//         })

//         // Atualiza o backend (persistência)
//         try {
//             await atualizarTarefaPorId(idTarefa, {
//                 novaListaId: listaDestinoId,
//             })
//         } catch (erro) {
//             console.error('Erro ao atualizar lista da tarefa:', erro)
//             setMensagemErro(
//                 'Erro ao mover tarefa entre listas. Recarregando quadro.',
//             )
//             await carregarDadosQuadro() // fallback
//         }
//     }

//     function lidarCliqueNovaLista() {
//         setMostrandoCampoNovaLista(true)
//     }

//     function lidarCliqueNotificacao() {
//         setTemNotificacao(false)
//     }

//     async function lidarConfirmarNovaLista() {
//         const nome = nomeNovaLista.trim()
//         if (!nome) {
//             return
//         }

//         try {
//             const listaCriada = await criarNovaLista(nome)
//             setListas((listasAtuais) => [...listasAtuais, listaCriada])
//             setTarefasPorListaId((mapaAtual) => ({
//                 ...mapaAtual,
//                 [listaCriada.id]: [],
//             }))
//             setNomeNovaLista('')
//             setMostrandoCampoNovaLista(false)
//         } catch (erro) {
//             console.error(erro)
//             setMensagemErro('Erro ao criar lista.')
//         }
//     }
// return (
//   <div className="h-screen flex flex-col overflow-hidden">
//     <CabecalhoAplicacao
//       temNotificacao={temNotificacao}
//       aoCliqueNotificacao={lidarCliqueNotificacao}
//     />

//     <div className="flex-1 min-h-0 flex flex-col bg-background-main/80">
//       {mensagemErro && (
//         <div className="mx-4 mb-3 rounded-lg bg-danger-background/20 px-3 py-2 text-sm">
//           {mensagemErro}
//         </div>
//       )}

//       <div className="px-4 py-3 backdrop-blur">
//         {mensagemSnapback && (
//           <MensagemSnapback
//             mensagem={mensagemSnapback}
//             aoFecharMensagem={() => setMensagemSnapback(null)}
//           />
//         )}
//         {carregandoQuadro && (
//           <p className="mx-4 text-sm text-text-muted">Carregando quadro...</p>
//         )}
//       </div>

//       {!carregandoQuadro && (
//         <main className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden px-3 pb-6">
//           <div className="flex gap-3 h-full">
//             {listas.map((lista) => (
//               <ColunaLista
//                 key={lista.id}
//                 idLista={lista.id}
//                 nomeLista={lista.nome}
//                 tarefasDaLista={tarefasPorListaId[lista.id] ?? []}
//                 aoRenomearLista={lidarRenomearLista}
//                 aoCriarTarefaNaLista={lidarCriarTarefaNaLista}
//                 aoDeletarTarefa={lidarDeletarTarefa}
//                 aoMoverTarefaDeLista={lidarMoverTarefaEntreListas}
//                 aoDeletarLista={lidarDeletarLista}
//                 aoAbrirDetalhesTarefa={lidarAbrirDetalhesTarefa}
//                 aoAlternarFinalizacaoTarefa={lidarAlternarFinalizacaoTarefa}
//               />
//             ))}

//             <div className="self-start px-1 py-1">
//               {mostrandoCampoNovaLista ? (
//                 <CampoNomeNovaLista
//                   valorNomeLista={nomeNovaLista}
//                   aoAlterarNomeLista={setNomeNovaLista}
//                   aoConfirmarNomeLista={lidarConfirmarNovaLista}
//                 />
//               ) : (
//                 <BotaoAcaoComPlus
//                   texto="Nova Lista"
//                   aoClicar={lidarCliqueNovaLista}
//                 />
//               )}
//             </div>
//           </div>
//         </main>
//       )}
//     </div>

//     <PainelDetalhesTarefa
//       tarefaSelecionada={tarefaSelecionada}
//       aoFecharPainel={lidarFecharPainelDetalhes}
//       aoDeletarTarefa={lidarDeletarTarefa}
//       aoAtualizarTarefa={lidarAtualizarDetalhesTarefa}
//     />
//   </div>
// )
// }

import { useState } from 'react'
import { useBoard } from '../../context/BoardContext'
import { CabecalhoAplicacao } from './Cabecalho'
import { MensagemSnapback } from '../modals/MensagemSnapback'
import { ColunaLista } from '../listas/ColunaLista'
import { CampoNomeNovaLista } from '../listas/CampoNomeNovaLista'
import { BotaoAcaoComPlus } from '../btns/BotaoAcaoComPlus'
import { PainelDetalhesTarefa } from '../tarefas/PainelDetalhes/PainelDetalhesTarefa'

export function BoardPage() {
  const {
    listas,
    carregandoQuadro,
    mensagemErro,
    mensagemSnapback,
    fecharSnapback,
    temNotificacao,
    marcarNotificacaoVista,
  } = useBoard()

  const [mostrandoCampoNovaLista, setMostrandoCampoNovaLista] = useState(false)
  const [nomeNovaLista, setNomeNovaLista] = useState('')

  const { criarLista } = useBoard()

  async function confirmarNovaLista() {
    const nome = nomeNovaLista.trim()
    if (!nome) {return}
    await criarLista(nome)
    setNomeNovaLista('')
    setMostrandoCampoNovaLista(false)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <CabecalhoAplicacao
        temNotificacao={temNotificacao}
        aoCliqueNotificacao={marcarNotificacaoVista}
      />

      <div className="flex-1 min-h-0 flex flex-col bg-background-main/80">
        {mensagemErro && (
          <div className="mx-4 mb-3 rounded-lg bg-danger-background/20 px-3 py-2 text-sm">
            {mensagemErro}
          </div>
        )}

        <div className="px-4 py-3 backdrop-blur">
          {mensagemSnapback && (
            <MensagemSnapback
              mensagem={mensagemSnapback}
              aoFecharMensagem={fecharSnapback}
            />
          )}
          {carregandoQuadro && (
            <p className="mx-4 text-sm text-text-muted">Carregando quadro...</p>
          )}
        </div>

        {!carregandoQuadro && (
          <main className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden px-3 pb-6">
            <div className="flex gap-3 h-full">
              {listas.map((lista) => (
                <ColunaLista
                  key={lista.id}
                  idLista={lista.id}
                  nomeLista={lista.nome}
                />
              ))}

              <div className="self-start px-1 py-1">
                {mostrandoCampoNovaLista ? (
                  <CampoNomeNovaLista
                    valorNomeLista={nomeNovaLista}
                    aoAlterarNomeLista={setNomeNovaLista}
                    aoConfirmarNomeLista={confirmarNovaLista}
                  />
                ) : (
                  <BotaoAcaoComPlus
                    texto="Nova Lista"
                    aoClicar={() => setMostrandoCampoNovaLista(true)}
                  />
                )}
              </div>
            </div>
          </main>
        )}
      </div>

      {/* O Painel pode ler tudo do contexto também */}
      <PainelDetalhesTarefa />
    </div>
  )
}


