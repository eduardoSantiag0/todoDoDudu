// import { useState } from 'react'
// import type { ListId } from '../../types/lista'
// import type {
//     IdentificadorTarefa,
//     PrioridadeTarefa,
//     Tarefa,
// } from '../../types/tarefa'
// import { TaskCard } from '../tarefas/CardsTarefas/CardsTarefas'
// import { BotaoOpcoesLista } from '../btns/BotaoOpcoesLista'
// import { ConfirmarDelecao } from '../modals/ConfirmarDelecao'
// import { BotaoAcaoComPlus } from '../btns/BotaoAcaoComPlus'
// import { log } from 'console'

// interface PropriedadesColunaLista {
//     idLista: ListId;
//     nomeLista: string;
//     tarefasDaLista: Tarefa[];
//     aoRenomearLista: (idLista: ListId, novoNome: string) => void;
//     aoCriarTarefaNaLista: (
//         idLista: ListId,
//         nome: string,
//         descricao: string,
//         prioridade: PrioridadeTarefa,
//         dataConclusaoEsperada: string
//     ) => void;
//     aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
//     // aoMoverTarefaParaPosicao: (
//     //     idTarefa: IdentificadorTarefa,
//     //     idListaOrigem: ListId,
//     //     idListaDestino: ListId,
//     //     indiceNovo: number
//     // ) => void;
//     aoDeletarLista: (idLista: ListId) => void;
//     aoAbrirDetalhesTarefa: (tarefa: Tarefa) => void;
//     aoAlternarFinalizacaoTarefa: (
//         idTarefa: IdentificadorTarefa,
//         tarefaJaFinalizada: boolean
//     ) => void;

//     aoMoverTarefaDeLista?: (
//         idTarefa: IdentificadorTarefa,
//         listaOrigemId: ListId,
//         listaDestinoId: ListId
//     ) => void;
// }

// export function ColunaLista({
//     idLista,
//     nomeLista,
//     tarefasDaLista,
//     aoRenomearLista,
//     aoCriarTarefaNaLista,
//     aoDeletarTarefa,
//     aoMoverTarefaDeLista,
//     aoDeletarLista,
//     aoAbrirDetalhesTarefa,
//     aoAlternarFinalizacaoTarefa,
// }: PropriedadesColunaLista) {
//     const [criandoTarefa, setCriandoTarefa] = useState(false)
//     const [novoNomeTarefa, setNovoNomeTarefa] = useState('')
//     const [novaDescricaoTarefa, setNovaDescricaoTarefa] = useState('')
//     const [novaPrioridadeTarefa, setNovaPrioridadeTarefa] =
//         useState<PrioridadeTarefa>('LOW')
//     const [novaDataTarefa, setNovaDataTarefa] = useState('')

//     const [idTarefaSendoArrastada, setIdTarefaSendoArrastada] =
//         useState<IdentificadorTarefa | null>(null)
//     const [idListaOrigemArraste, setIdListaOrigemArraste] =
//         useState<ListId | null>(null)

//     const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)

//     const [editandoTitulo, setEditandoTitulo] = useState(false)
//     const [tituloEditado, setTituloEditado] = useState(nomeLista)

//     function iniciarEdicaoTitulo() {
//         setEditandoTitulo(true)
//         setTituloEditado(nomeLista)
//     }

//     function confirmarEdicaoTitulo() {
//         const nomeFinal = tituloEditado.trim()
//         if (nomeFinal && nomeFinal !== nomeLista) {
//             aoRenomearLista(idLista, nomeFinal)
//         }
//         setEditandoTitulo(false)
//     }

//     function lidarEnvioNovaTarefa(evento: React.FormEvent) {
//         evento.preventDefault()

//         if (novoNomeTarefa.trim().length === 0) {
//             return
//         }

//         aoCriarTarefaNaLista(
//             idLista,
//             novoNomeTarefa,
//             novaDescricaoTarefa,
//             novaPrioridadeTarefa,
//             novaDataTarefa,
//         )

//         setNovoNomeTarefa('')
//         setNovaDescricaoTarefa('')
//         setNovaPrioridadeTarefa('LOW')
//         setNovaDataTarefa('')
//         setCriandoTarefa(false)
//     }

//     function lidarInicioArraste(tarefa: Tarefa) {
//         setIdTarefaSendoArrastada(tarefa.id)
//         setIdListaOrigemArraste(tarefa.listaId)
//         console.log('Arrastando tarefa', tarefa.id, 'da lista', tarefa.listaId)
//     }

//     function lidarSoltarNaPosicao(indicePosicao: number) {
//         if (idTarefaSendoArrastada === null || idListaOrigemArraste === null) {
//             return
//         }

//         setIdTarefaSendoArrastada(null)
//         setIdListaOrigemArraste(null)
//     }

//     function lidarCliqueDeletarLista() {
//         setConfirmacaoAberta(true)
//     }

//     function confirmarDelecaoLista() {
//         aoDeletarLista(idLista)
//         setConfirmacaoAberta(false)
//     }


//   function lidarDuplicarTarefa(tarefa: Tarefa) {

//     const dataPrevistaConclusao = tarefa.dataPrevistaConclusao ?? ''

//     if (!dataPrevistaConclusao) {
//       console.warn('Tarefa sem data de conclusão para duplicar:', tarefa)
//     }

//     aoCriarTarefaNaLista(
//       tarefa.listaId as ListId,
//       `${tarefa.nome} (cópia)`,
//       tarefa.descricao ?? '',
//       tarefa.prioridade,
//       dataPrevistaConclusao,
//     )

//   }

//     return (
//         <section
//             className="
//             box-border
//             w-[477px]
//             min-h-[859px]
//             shrink-0
//             flex-col
//             rounded-xl
//             bg-background-main
//             p-3
//             border border-[#4E4E4E]
//             px-4 pt-4 pb-6
//             gap-3 "
//             onDragOver={(evento) => evento.preventDefault()}
//             onDrop={(e) => {
//                 e.preventDefault()
//                 const idTarefa = Number(e.dataTransfer.getData('tarefaId'))
//                 const listaOrigemId = Number(
//                     e.dataTransfer.getData('listaOrigemId'),
//                 )
//                 if (idTarefa && listaOrigemId && aoMoverTarefaDeLista) {
//                     aoMoverTarefaDeLista(idTarefa, listaOrigemId, idLista)
//                 }
//             }}
//         >
//             <div className="mb-2 flex items-center justify-between gap-2">
//                 {editandoTitulo ? (
//                     <input
//                         autoFocus
//                         className="
//                     flex-1 text-sm font-medium text-white text-left
//                     bg-transparent border border-white/60 rounded-xl
//                     px-3 py-2 font-poppins text-[20px]
//                     outline-none focus:border-white focus:ring-1 focus:ring-white/40
//                     transition-all duration-150
//                     "
//                         value={tituloEditado}
//                         onChange={(e) => setTituloEditado(e.target.value)}
//                         onBlur={confirmarEdicaoTitulo}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 confirmarEdicaoTitulo()
//                             }
//                             if (e.key === 'Escape') {
//                                 setEditandoTitulo(false)
//                             }
//                         }}
//                     />
//                 ) : (
//                     <button
//                         className="
//                     flex-1 text-sm font-semibold text-text-default text-left
//                     hover:text-white transition-colors
//                     "
//                         onClick={iniciarEdicaoTitulo}
//                     >
//                         {nomeLista}
//                     </button>
//                 )}

//                 <div className="flex items-center gap-1">
//                     <BotaoOpcoesLista
//                         aoClicarRenomearLista={iniciarEdicaoTitulo}
//                         aoClicarExcluirLista={lidarCliqueDeletarLista}
//                     />
//                 </div>
//             </div>
//             {tarefasDaLista.map((tarefa, indice) => (
//                 <div key={tarefa.id}>
//                     <TaskCard
//                         tarefa={tarefa}
//                         aoDeletarTarefa={aoDeletarTarefa}
//                         aoIniciarArrasteTarefa={lidarInicioArraste}
//                         aoAbrirDetalhesTarefa={aoAbrirDetalhesTarefa}
//                         aoAlternarFinalizacaoTarefa={
//                             aoAlternarFinalizacaoTarefa
//                         }
//                         aoDuplicarTarefa={lidarDuplicarTarefa}
//                     />
//                     <div
//                         className="my-1 h-3 w-full rounded hover:bg-success-background/30"
//                         onDragOver={(evento) => evento.preventDefault()}
//                         onDrop={() => lidarSoltarNaPosicao(indice + 1)}
//                     />
//                 </div>
//             ))}

//             <BotaoAcaoComPlus
//                 texto="Nova tarefa"
//                 aoClicar={() => setCriandoTarefa(!criandoTarefa)}
//             />

//             {criandoTarefa && (
//                 <form
//                     onSubmit={lidarEnvioNovaTarefa}
//                     className="card mb-3 p-3 space-y-2"
//                 >
//                     <div>
//                         <label className="label">Título</label>
//                         <input
//                             className="input"
//                             value={novoNomeTarefa}
//                             onChange={(evento) =>
//                                 setNovoNomeTarefa(evento.target.value)
//                             }
//                         />
//                     </div>

//                     <div>
//                         <label className="label">Descrição</label>
//                         <textarea
//                             className="input min-h-20"
//                             value={novaDescricaoTarefa}
//                             onChange={(evento) =>
//                                 setNovaDescricaoTarefa(evento.target.value)
//                             }
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-2">
//                         <div>
//                             <label className="label">Prioridade</label>
//                             <select
//                                 className="input"
//                                 value={novaPrioridadeTarefa}
//                                 onChange={(evento) =>
//                                     setNovaPrioridadeTarefa(
//                                         evento.target.value as PrioridadeTarefa,
//                                     )
//                                 }
//                             >
//                                 <option value="LOW">Baixa</option>
//                                 <option value="MEDIUM">Média</option>
//                                 <option value="HIGH">Alta</option>
//                                 <option value="VERY_HIGH">Altíssima</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="label">Prazo</label>
//                             <input
//                                 type="date"
//                                 className="input"
//                                 value={novaDataTarefa}
//                                 onChange={(evento) =>
//                                     setNovaDataTarefa(evento.target.value)
//                                 }
//                             />
//                         </div>
//                     </div>

//                     <div className="flex justify-end gap-2 pt-2">
//                         <button
//                             type="button"
//                             className="btn btn-ghost"
//                             onClick={() => setCriandoTarefa(false)}
//                         >
//                             Cancelar
//                         </button>
//                         <button type="submit" className="btn btn-primary">
//                             Criar
//                         </button>
//                     </div>
//                 </form>
//             )}

//             {confirmacaoAberta && (
//                 <ConfirmarDelecao
//                     tipo="Lista"
//                     nome={nomeLista}
//                     aoConfirmar={confirmarDelecaoLista}
//                     aoCancelar={() => setConfirmacaoAberta(false)}
//                 />
//             )}
//         </section>
//     )
// }


import { useState } from 'react'
import type { ListId } from '../../types/lista'
import type {
  IdentificadorTarefa,
  PrioridadeTarefa,
  Tarefa,
} from '../../types/tarefa'
import { useBoard } from '../../context/BoardContext'
import { TaskCard } from '../tarefas/CardsTarefas/CardsTarefas'
import { BotaoOpcoesLista } from '../btns/BotaoOpcoesLista'
import { ConfirmarDelecao } from '../modals/ConfirmarDelecao'
import { BotaoAcaoComPlus } from '../btns/BotaoAcaoComPlus'

interface Props {
  idLista: ListId
  nomeLista: string
}

export function ColunaLista({ idLista, nomeLista }: Props) {
  const {
    tarefasDaLista,
    renomearLista,
    deletarLista,
    criarTarefa,
    deletarTarefa,
    moverTarefaEntreListas,
    alternarFinalizacaoTarefa,
    abrirDetalhes,
  } = useBoard()

  const tarefas = tarefasDaLista(idLista)

  const [criandoTarefa, setCriandoTarefa] = useState(false)
  const [novoNomeTarefa, setNovoNomeTarefa] = useState('')
  const [novaDescricaoTarefa, setNovaDescricaoTarefa] = useState('')
  const [novaPrioridadeTarefa, setNovaPrioridadeTarefa] =
    useState<PrioridadeTarefa>('LOW')
  const [novaDataTarefa, setNovaDataTarefa] = useState('')

  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)
  const [editandoTitulo, setEditandoTitulo] = useState(false)
  const [tituloEditado, setTituloEditado] = useState(nomeLista)

  function iniciarEdicaoTitulo() {
    setEditandoTitulo(true)
    setTituloEditado(nomeLista)
  }
  function confirmarEdicaoTitulo() {
    const nomeFinal = tituloEditado.trim()
    if (nomeFinal && nomeFinal !== nomeLista) {
      void renomearLista(idLista, nomeFinal)
    }
    setEditandoTitulo(false)
  }

  async function enviarNovaTarefa(e: React.FormEvent) {
    e.preventDefault()
    if (!novoNomeTarefa.trim()) {return}

    await criarTarefa(
      idLista,
      novoNomeTarefa,
      novaDescricaoTarefa,
      novaPrioridadeTarefa,
      novaDataTarefa,
    )

    setNovoNomeTarefa('')
    setNovaDescricaoTarefa('')
    setNovaPrioridadeTarefa('LOW')
    setNovaDataTarefa('')
    setCriandoTarefa(false)
  }

  function lidarDuplicarTarefa(t: Tarefa) {
    // Ajuste o campo conforme seu tipo real:
    const prazo =
      (t as any).dataConclusaoEsperada ??
      (t as any).dataPrevistaConclusao ??
      ''
    void criarTarefa(
      t.listaId as ListId,
      `${t.nome} (cópia)`,
      t.descricao ?? '',
      t.prioridade,
      prazo,
    )
  }

  return (
    <section
      className="
        box-border w-[477px] min-h-[859px] shrink-0 flex-col rounded-xl
        bg-background-main p-3 border border-[#4E4E4E] px-4 pt-4 pb-6 gap-3
      "
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const idTarefa = Number(e.dataTransfer.getData('tarefaId')) as IdentificadorTarefa
        const listaOrigemId = Number(e.dataTransfer.getData('listaOrigemId')) as ListId
        if (idTarefa && listaOrigemId) {
          void moverTarefaEntreListas(idTarefa, listaOrigemId, idLista)
        }
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        {editandoTitulo ? (
          <input
            autoFocus
            className="
              flex-1 text-sm font-medium text-white text-left
              bg-transparent border border-white/60 rounded-xl
              px-3 py-2 font-poppins text-[20px]
              outline-none focus:border-white focus:ring-1 focus:ring-white/40
              transition-all duration-150
            "
            value={tituloEditado}
            onChange={(e) => setTituloEditado(e.target.value)}
            onBlur={confirmarEdicaoTitulo}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {confirmarEdicaoTitulo()}
              if (e.key === 'Escape') {setEditandoTitulo(false)}
            }}
          />
        ) : (
          <button
            className="
              flex-1 text-sm font-semibold text-text-default text-left
              hover:text-white transition-colors
            "
            onClick={iniciarEdicaoTitulo}
          >
            {nomeLista}
          </button>
        )}

        <div className="flex items-center gap-1">
          <BotaoOpcoesLista
            aoClicarRenomearLista={iniciarEdicaoTitulo}
            aoClicarExcluirLista={() => setConfirmacaoAberta(true)}
          />
        </div>
      </div>

      {tarefas.map((tarefa) => (
        <div key={tarefa.id}>
          <TaskCard
            tarefa={tarefa}
            aoDeletarTarefa={(id) => void deletarTarefa(id)}
            aoIniciarArrasteTarefa={(t) => {
              // você já tem os dataTransfer no Card; se não tiver, mantenha aqui
              // e.dataTransfer.setData('tarefaId', String(t.id))
              // e.dataTransfer.setData('listaOrigemId', String(t.listaId))
            }}
            aoAbrirDetalhesTarefa={abrirDetalhes}
            aoAlternarFinalizacaoTarefa={(id, done) =>
              void alternarFinalizacaoTarefa(id, done)
            }
            aoDuplicarTarefa={lidarDuplicarTarefa}
          />
          <div
            className="my-1 h-3 w-full rounded hover:bg-success-background/30"
            onDragOver={(e) => e.preventDefault()}
          />
        </div>
      ))}

      <BotaoAcaoComPlus
        texto="Nova tarefa"
        aoClicar={() => setCriandoTarefa((v) => !v)}
      />

      {criandoTarefa && (
        <form onSubmit={enviarNovaTarefa} className="card mb-3 p-3 space-y-2">
          <div>
            <label className="label">Título</label>
            <input
              className="input"
              value={novoNomeTarefa}
              onChange={(e) => setNovoNomeTarefa(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Descrição</label>
            <textarea
              className="input min-h-20"
              value={novaDescricaoTarefa}
              onChange={(e) => setNovaDescricaoTarefa(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label">Prioridade</label>
              <select
                className="input"
                value={novaPrioridadeTarefa}
                onChange={(e) =>
                  setNovaPrioridadeTarefa(e.target.value as PrioridadeTarefa)
                }
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
                <option value="VERY_HIGH">Altíssima</option>
              </select>
            </div>
            <div>
              <label className="label">Prazo</label>
              <input
                type="date"
                className="input"
                value={novaDataTarefa}
                onChange={(e) => setNovaDataTarefa(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setCriandoTarefa(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Criar
            </button>
          </div>
        </form>
      )}

      {confirmacaoAberta && (
        <ConfirmarDelecao
          tipo="Lista"
          nome={nomeLista}
          aoConfirmar={() => {
            void deletarLista(idLista)
            setConfirmacaoAberta(false)
          }}
          aoCancelar={() => setConfirmacaoAberta(false)}
        />
      )}
    </section>
  )
}
