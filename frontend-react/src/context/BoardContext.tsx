import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react'

import { buscarTodasAsListas } from '../queries/listasApi'
import { buscarTodasAsTarefas } from '../queries/tarefasApi'

import type { IdentificadorLista, Lista } from '../types/lista'
import type { Tarefa } from '../types/tarefa'

import type { BoardContextValue } from './board/boardTypes'
import { agruparTarefasPorLista } from './board/boardUtils'
import { criarAcoesDeLista } from './actions/listActions'
import { criarAcoesDeTarefa } from './actions/taskActions'
import type { TarefasPorLista } from './board/boardTypes'

const BoardContext = createContext<BoardContextValue | null>(null)

export function useBoard() {
    const ctx = useContext(BoardContext)
    if (!ctx)
        {throw new Error('useBoard deve ser usado dentro de <BoardProvider>')}
    return ctx
}

function selecionarTarefasDaLista(
    mapa: TarefasPorLista,
    id: IdentificadorLista,
): Tarefa[] {
    return mapa[id] ?? []
}

export function BoardProvider({ children }: { children: ReactNode }) {
    const [listas, setListas] = useState<Lista[]>([])
    const [tarefasPorListaId, setTarefasPorListaId] = useState<TarefasPorLista>(
        {},
    )
    const [carregandoQuadro, setCarregandoQuadro] = useState(true)
    const [mensagemErro, setMensagemErro] = useState<string | null>(null)
    const [mensagemSnapback, setMensagemSnapback] = useState<string | null>(
        null,
    )
    const [temNotificacao, setTemNotificacao] = useState(false)
    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(
        null,
    )

    function exibirMensagemSnapback(msg: string) {
        setMensagemSnapback(msg)
        setTimeout(() => setMensagemSnapback(null), 3000)
    }

    async function carregarQuadro() {
        try {
            setCarregandoQuadro(true)
            setMensagemErro(null)
            const [listasBuscadas, tarefasBuscadas] = await Promise.all([
                buscarTodasAsListas(),
                buscarTodasAsTarefas(),
            ])
            setListas(listasBuscadas)
            setTarefasPorListaId(
                agruparTarefasPorLista(listasBuscadas, tarefasBuscadas),
            )
        } catch (e) {
            console.error(e)
            setMensagemErro('Não foi possível carregar o quadro.')
        } finally {
            setCarregandoQuadro(false)
        }
    }

    useEffect(() => {
        void carregarQuadro()
    }, [])

    const { criarLista, renomearLista, deletarLista } = criarAcoesDeLista({
        setListas,
        setTarefasPorListaId,
        exibirMensagem: exibirMensagemSnapback,
        setErro: setMensagemErro,
    })

    const {
        criarTarefa,
        deletarTarefa,
        atualizarTarefa,
        alternarFinalizacaoTarefa,
        moverTarefaEntreListas,
    } = criarAcoesDeTarefa({
        setMapa: setTarefasPorListaId,
        setSelecionada: setTarefaSelecionada,
        setNotificacao: setTemNotificacao,
        setErro: setMensagemErro,
        exibirMensagem: exibirMensagemSnapback,
        recarregarQuadro: carregarQuadro,
        getListas: () => listas,
    })

    function tarefasDaLista(id: IdentificadorLista) {
        return selecionarTarefasDaLista(tarefasPorListaId, id)
    }

    function abrirDetalhes(t: Tarefa) {
        setTarefaSelecionada(t)
    }
    function fecharDetalhes() {
        setTarefaSelecionada(null)
    }
    function marcarNotificacaoVista() {
        setTemNotificacao(false)
    }
    function fecharSnapback() {
        setMensagemSnapback(null)
        }

    const value = useMemo<BoardContextValue>(
    () => ({
        listas,
        tarefasPorListaId,
        tarefaSelecionada,
        carregandoQuadro,
        mensagemErro,
        mensagemSnapback,
        temNotificacao,

        tarefasDaLista,

        criarLista,
        renomearLista,
        deletarLista,

        criarTarefa,
        deletarTarefa,
        atualizarTarefa,
        alternarFinalizacaoTarefa,
        moverTarefaEntreListas,

        abrirDetalhes,
        fecharDetalhes,
        marcarNotificacaoVista,
        fecharSnapback,
        exibirMensagemSnapback,
    }),
    [
        listas,
        tarefasPorListaId,
        tarefaSelecionada,
        carregandoQuadro,
        mensagemErro,
        mensagemSnapback,
        temNotificacao,
    ],
    )
    

    return (
        <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
    )
}
