import { useBoard } from '../../../context/BoardContext'
import { BotaoFecharPainelDetalhes } from '../../btns/BotaoFecharPainelDetalhes'
import { AlertConfirmarDelecao } from '../../modals/AlertConfirmarDelecao'
import { usePainelDetalhesTarefa } from '../../../hooks/usePainelDetalhesTarefas'
import { BotaoFinalizarTarefa } from '../../btns/BotaoFinalizarTarefa'

import {
  BotaoExcluirTarefa,
  CabecalhoTarefa,
  SecaoData,
  SecaoDescricao,
  SecaoNome, 
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
    nomeEditado, setNomeEditado, lidarBlurNome
  } = usePainelDetalhesTarefa()

  const conteinerInterno  = 'mx-auto w-full max-w-[430px] md:max-w-none px-5 md:px-[68px] '
  const divisor  = 'w-full border-b border-background-secondary '
  const slide = 'transform transition-transform duration-300 ease-out '
  const overlay =
    'fixed inset-0 z-[39] bg-black/40 backdrop-blur-sm transition-opacity duration-200'
  const painelBase  = `
    fixed inset-0 md:inset-y-0 md:right-0 md:left-auto
    z-40 bg-background-main
    md:border-l md:border-background-secondary
    overflow-y-auto ${slide}
  `

  return (
    <>

      <div
        className={`${overlay} ${
          painelAberto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={fecharDetalhes}
      />

      <aside
        role="dialog"
        className={`${painelBase } ${
          painelAberto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        <div className="sticky top-0 z-10 bg-background-main/95 backdrop-blur border-b border-background-secondary/40">
          <div className={`${conteinerInterno } h-[56px] md:h-[64px] flex items-center justify-between`}>
            <BotaoFecharPainelDetalhes aoClicarFechar={fecharDetalhes} />
            {tarefaSelecionada && (
              <BotaoFinalizarTarefa
                tarefaEstaFinalizada={tarefaEstaFinalizada}
                aoClicarBotao={lidarCliqueFinalizarTarefa}
              />
            )}
          </div>
        </div>


        <div className={`${conteinerInterno } pt-4 md:pt-6 pb-10 flex flex-col gap-4`}>
          {!tarefaSelecionada && (
            <p className="text-sm text-text-muted">Nenhuma tarefa selecionada.</p>
          )}

          {tarefaSelecionada && (
            <>
              {/* <CabecalhoTarefa tarefa={tarefaSelecionada} /> */}

              {/* <div className={divisor } /> */}

              <SecaoNome
                nome={nomeEditado}
                onChangeNome={setNomeEditado}
                onSalvar={lidarBlurNome}
                // onCancelar={cancelarEdicaoNome}
                />
                
                <div className={divisor } />

              <SecaoData
                dataConclusaoISO={dataConclusaoISO}
                aoAlterarData={lidarAlterarDataConclusao}
                prioridade={tarefaSelecionada.prioridade}
                aoAlterarPrioridade={lidarAlterarPrioridade}
              />

              <div className={divisor } />

              <SecaoDescricao
                descricao={descricaoEditada}
                onChangeDescricao={setDescricaoEditada}
                onBlurDescricao={lidarBlurDescricao}
              />

              <div className={divisor } />

              <BotaoExcluirTarefa onClick={abrirConfirmacaoDelecao} />
            </>
          )}

          {confirmacaoAberta && tarefaSelecionada && (
            <AlertConfirmarDelecao
              tipo="Tarefa"
              nome={tarefaSelecionada.nome}
              aoConfirmar={confirmarDelecao}
              aoCancelar={cancelarDelecao}
            />
          )}
        </div>
      </aside>
    </>
  )
}
