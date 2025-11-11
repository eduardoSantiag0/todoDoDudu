import { useEffect, useState } from 'react'
import type { PrioridadeTarefa } from '../../../types/tarefa'
import { useBoard } from '../../../context/BoardContext'

export function usePainelDetalhesTarefa() {
  const {
    tarefaSelecionada,
    atualizarTarefa,
    deletarTarefa,
    alternarFinalizacaoTarefa,
    fecharDetalhes,
  } = useBoard()

  const [descricaoEditada, setDescricaoEditada] = useState('')
  const [dataConclusaoISO, setDataConclusaoISO] = useState('')
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)

  const tarefaEstaFinalizada = Boolean(tarefaSelecionada?.concluidoEm)

  useEffect(() => {
    setDescricaoEditada(tarefaSelecionada?.descricao ?? '')
    const prazo =
      (tarefaSelecionada as any)?.dataConclusaoEsperada ??
      (tarefaSelecionada as any)?.dataPrevistaConclusao ??
      ''
    setDataConclusaoISO(prazo || '')
  }, [tarefaSelecionada])

  function abrirConfirmacaoDelecao() { setConfirmacaoAberta(true) }
  function cancelarDelecao() { setConfirmacaoAberta(false) }

  async function confirmarDelecao() {
    if (!tarefaSelecionada) return
    await deletarTarefa(tarefaSelecionada.id)
    setConfirmacaoAberta(false)
    fecharDetalhes()
  }

  async function lidarCliqueFinalizarTarefa() {
    if (!tarefaSelecionada) return
    await alternarFinalizacaoTarefa(tarefaSelecionada.id, tarefaEstaFinalizada)
  }

  async function lidarBlurDescricao() {
    if (!tarefaSelecionada) return
    const atual = tarefaSelecionada.descricao ?? ''
    if (atual.trim() === descricaoEditada.trim()) return
    await atualizarTarefa(tarefaSelecionada.id, { descricao: descricaoEditada })
  }

  async function lidarAlterarPrioridade(nova: PrioridadeTarefa) {
    if (!tarefaSelecionada) return
    if (tarefaSelecionada.prioridade === nova) return
    await atualizarTarefa(tarefaSelecionada.id, { prioridade: nova })
  }

  async function lidarAlterarDataConclusao(novaISO: string) {
    if (!tarefaSelecionada) return
    setDataConclusaoISO(novaISO)
    await atualizarTarefa(tarefaSelecionada.id, { dataEsperadaDeConclusao: novaISO })
  }

  return {
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
  }
}
