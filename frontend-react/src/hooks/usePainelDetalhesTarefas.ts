import { useEffect, useState } from 'react'
import type { PrioridadeTarefa } from '../types/tarefa'
import { useBoard } from '../context/BoardContext'
// import type { Imagem } from '../../../types/imagem'

export function usePainelDetalhesTarefa() {
    const {
        tarefaSelecionada,
        atualizarTarefa,
        deletarTarefa,
        alternarFinalizacaoTarefa,
        fecharDetalhes,
    } = useBoard()

    const [nomeEditado, setNomeEditado] = useState('')
    const [descricaoEditada, setDescricaoEditada] = useState('')
    const [dataConclusaoISO, setDataConclusaoISO] = useState('')
    const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)

    const tarefaEstaFinalizada = Boolean(tarefaSelecionada?.concluidoEm);

    useEffect(() => {
        setNomeEditado(tarefaSelecionada?.nome ?? '')
        setDescricaoEditada(tarefaSelecionada?.descricao ?? '')
        const prazo = tarefaSelecionada?.dataEsperadaDeConclusao || ''
        setDataConclusaoISO(prazo || '')
    }, [tarefaSelecionada]);

    function abrirConfirmacaoDelecao() {
        setConfirmacaoAberta(true);
    }
    function cancelarDelecao() {
        setConfirmacaoAberta(false);
    }

    async function confirmarDelecao() {
        if (!tarefaSelecionada) {return}
        await deletarTarefa(tarefaSelecionada.id)
        setConfirmacaoAberta(false)
        fecharDetalhes()
    }

    async function lidarBlurNome() {
        if (!tarefaSelecionada) return
        const atual = tarefaSelecionada.nome ?? ''
        const novo = nomeEditado.trim()
        if (novo === atual.trim() || novo.length === 0) {
        setNomeEditado(atual)
        return
        }
        await atualizarTarefa(tarefaSelecionada.id, { nome: novo })
    }


    function lidarKeyDownNome(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
        e.preventDefault()
        void lidarBlurNome()
        }
        if (e.key === 'Escape') {
            e.preventDefault()
            setNomeEditado(tarefaSelecionada?.nome ?? '');
        (e.target as HTMLInputElement).blur()
        }
    }

    async function lidarCliqueFinalizarTarefa() {
        if (!tarefaSelecionada) {return}
        await alternarFinalizacaoTarefa(
            tarefaSelecionada.id,
            tarefaEstaFinalizada,
        )
    }

    async function lidarBlurDescricao() {
        if (!tarefaSelecionada) {return}
        const atual = tarefaSelecionada.descricao ?? ''
        if (atual.trim() === descricaoEditada.trim()) {return}
        await atualizarTarefa(tarefaSelecionada.id, {
            descricao: descricaoEditada,
        })
    }

    async function lidarAlterarPrioridade(nova: PrioridadeTarefa) {
        if (!tarefaSelecionada) {return}
        if (tarefaSelecionada.prioridade === nova) {return}
        await atualizarTarefa(tarefaSelecionada.id, { prioridade: nova })
    }

    async function lidarAlterarDataConclusao(novaISO: string) {
        if (!tarefaSelecionada) {return}
        setDataConclusaoISO(novaISO)
        await atualizarTarefa(tarefaSelecionada.id, {
            dataEsperadaDeConclusao: novaISO,
        })
    }

    return {
        nomeEditado, setNomeEditado, lidarBlurNome,
        descricaoEditada, setDescricaoEditada,
        dataConclusaoISO, tarefaEstaFinalizada,
        confirmacaoAberta,
        abrirConfirmacaoDelecao, cancelarDelecao,
        confirmarDelecao,
        lidarCliqueFinalizarTarefa,
        lidarBlurDescricao,
        lidarAlterarPrioridade,
        lidarAlterarDataConclusao,
    }
}
