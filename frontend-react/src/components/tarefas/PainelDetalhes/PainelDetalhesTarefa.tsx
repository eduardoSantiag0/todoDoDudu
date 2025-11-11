// import type { Tarefa } from '../../../types/tarefa'
// import type { AtualizarTarefaRequisicao } from '../../../queries/tarefasApi'
// import type {
//     IdentificadorTarefa,
// } from '../../../types/tarefa'
// import { BotaoFecharPainelDetalhes } from '../../btns/BotaoFecharPainelDetalhes'
// import { ConfirmarDelecao } from '../../modals/ConfirmarDelecao'
// import { usePainelDetalhesTarefa } from './usePainelDetalhesTarefas'

// import {
//     BotaoExcluirTarefa,
//     CabecalhoTarefa,
//     SecaoData,
//     SecaoDescricao,
// } from './PainelDetalhesPartes'

// interface PropriedadesPainelDetalhesTarefa {
//     tarefaSelecionada: Tarefa | null;
//     aoFecharPainel: () => void;
//     aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
//     aoAtualizarTarefa: (
//         idTarefa: IdentificadorTarefa,
//         dadosAtualizados: AtualizarTarefaRequisicao
//     ) => void;
// }

// export function PainelDetalhesTarefa(props: PropriedadesPainelDetalhesTarefa) {
//     const { tarefaSelecionada, aoFecharPainel } = props
//     const painelAberto = Boolean(tarefaSelecionada)

//     const {
//         descricaoEditada,
//         setDescricaoEditada,
//         dataConclusaoISO,
//         tarefaEstaFinalizada,
//         confirmacaoAberta,
//         abrirConfirmacaoDelecao,
//         cancelarDelecao,
//         confirmarDelecao,
//         lidarCliqueFinalizarTarefa,
//         lidarBlurDescricao,
//         lidarAlterarPrioridade,
//         lidarAlterarDataConclusao,
//     } = usePainelDetalhesTarefa(props)

//     return (
//         <aside
//             className={`
//         fixed right-0 top-0 z-30
//         h-screen w-[608px]
//         bg-background-main
//         border-l border-white
//         overflow-y-auto
//         transform transition-transform duration-300 ease-out
//         ${painelAberto ? 'translate-x-0' : 'translate-x-full opacity-0'}
//       `}
//         >
//             <div className="absolute left-5 top-14">
//                 <BotaoFecharPainelDetalhes aoClicarFechar={aoFecharPainel} />
//             </div>

//             <div className="h-full px-[68px] pt-10 pb-10 flex flex-col gap-4">
//                 {!tarefaSelecionada && (
//                     <p className="text-sm text-text-muted">
//                         Nenhuma tarefa selecionada.
//                     </p>
//                 )}

//                 {tarefaSelecionada && (
//                     <>
//                         <CabecalhoTarefa
//                             tarefa={tarefaSelecionada}
//                             tarefaEstaFinalizada={tarefaEstaFinalizada}
//                             aoClicarFinalizar={lidarCliqueFinalizarTarefa}
//                         />

//                         <SecaoData
//                             dataConclusaoISO={dataConclusaoISO}
//                             aoAlterarData={lidarAlterarDataConclusao}
//                             prioridade={tarefaSelecionada.prioridade}
//                             aoAlterarPrioridade={lidarAlterarPrioridade}
//                         />

//                         <SecaoDescricao
//                             descricao={descricaoEditada}
//                             onChangeDescricao={setDescricaoEditada}
//                             onBlurDescricao={lidarBlurDescricao}
//                         />

//                         <BotaoExcluirTarefa onClick={abrirConfirmacaoDelecao} />
//                     </>
//                 )}

//                 {confirmacaoAberta && tarefaSelecionada && (
//                     <ConfirmarDelecao
//                         tipo="Tarefa"
//                         nome={tarefaSelecionada.nome}
//                         aoConfirmar={confirmarDelecao}
//                         aoCancelar={cancelarDelecao}
//                     />
//                 )}
//             </div>
//         </aside>
//     )
// }



import { useBoard } from '../../../context/BoardContext'
import { BotaoFecharPainelDetalhes } from '../../btns/BotaoFecharPainelDetalhes'
import { ConfirmarDelecao } from '../../modals/ConfirmarDelecao'
import { usePainelDetalhesTarefa } from './usePainelDetalhesTarefas'

import {
  BotaoExcluirTarefa,
  CabecalhoTarefa,
  SecaoData,
  SecaoDescricao,
} from './PainelDetalhesPartes'

export function PainelDetalhesTarefa() {
  const { tarefaSelecionada, fecharDetalhes } = useBoard()
  const painelAberto = Boolean(tarefaSelecionada)

  const {
    descricaoEditada,
    setDescricaoEditada,
    dataConclusaoISO,
    tarefaEstaFinalizada,
    confirmacaoAberta,
    abrirConfirmacaoDelecao,
    cancelarDelecao,
    confirmarDelecao,
    lidarCliqueFinalizarTarefa,
    lidarBlurDescricao,
    lidarAlterarPrioridade,
    lidarAlterarDataConclusao,
  } = usePainelDetalhesTarefa()

  return (
    <aside
      className={`
        fixed right-0 top-0 z-30
        h-screen w-[608px]
        bg-background-main
        border-l border-white
        overflow-y-auto
        transform transition-transform duration-300 ease-out
        ${painelAberto ? 'translate-x-0' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="absolute left-5 top-14">
        <BotaoFecharPainelDetalhes aoClicarFechar={fecharDetalhes} />
      </div>

      <div className="h-full px-[68px] pt-10 pb-10 flex flex-col gap-4">
        {!tarefaSelecionada && (
          <p className="text-sm text-text-muted">Nenhuma tarefa selecionada.</p>
        )}

        {tarefaSelecionada && (
          <>
            <CabecalhoTarefa
              tarefa={tarefaSelecionada}
              tarefaEstaFinalizada={tarefaEstaFinalizada}
              aoClicarFinalizar={lidarCliqueFinalizarTarefa}
            />

            <SecaoData
              dataConclusaoISO={dataConclusaoISO}
              aoAlterarData={lidarAlterarDataConclusao}
              prioridade={tarefaSelecionada.prioridade}
              aoAlterarPrioridade={lidarAlterarPrioridade}
            />

            <SecaoDescricao
              descricao={descricaoEditada}
              onChangeDescricao={setDescricaoEditada}
              onBlurDescricao={lidarBlurDescricao}
            />

            <BotaoExcluirTarefa onClick={abrirConfirmacaoDelecao} />
          </>
        )}

        {confirmacaoAberta && tarefaSelecionada && (
          <ConfirmarDelecao
            tipo="Tarefa"
            nome={tarefaSelecionada.nome}
            aoConfirmar={confirmarDelecao}
            aoCancelar={cancelarDelecao}
          />
        )}
      </div>
    </aside>
  )
}
