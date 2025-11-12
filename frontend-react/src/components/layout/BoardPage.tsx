import { useEffect, useState } from 'react'
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

    const [mostrandoCampoNovaLista, setMostrandoCampoNovaLista] =
        useState(false)
    const [nomeNovaLista, setNomeNovaLista] = useState('')

    const { criarLista } = useBoard()

    useEffect(() => {
        function onKeyDown(ev: KeyboardEvent) {
        if (ev.key === 'Escape' && mostrandoCampoNovaLista) {
            ev.preventDefault()
            setMostrandoCampoNovaLista(false)
            setNomeNovaLista('')
        }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [mostrandoCampoNovaLista])


    async function confirmarNovaLista() {
        const nome = nomeNovaLista.trim()
        if (!nome) {
            return
        }
        await criarLista(nome)
        setNomeNovaLista('')
        setMostrandoCampoNovaLista(false)
    }

    return (
        <div className="h-dvh flex flex-col overflow-hidden bg-background-main">
            <CabecalhoAplicacao
                temNotificacao={temNotificacao}
                aoCliqueNotificacao={marcarNotificacaoVista}
            />

            <div className="min-h-0 flex flex-col bg-background-main">
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
                        <p className="mx-4 text-sm text-text-muted">
                            Carregando quadro...
                        </p>
                    )}
                </div>

                {!carregandoQuadro && (
                    <main
                        className="
                                flex-1 min-h-0
                                overflow-y-auto overflow-x-hidden           /* mobile: Y */
                                md:overflow-y-hidden md:overflow-x-auto     /* md+: X   */
                                px-4 md:px-6 pb-4
                                bg-background-main
                            ">
                        <div
                            className="
                                flex items-stretch
                                flex-col gap-6 w-full h-auto
                                md:flex-row md:items-start md:gap-6
                                md:w-max md:h-full
                                "
                        >
                            {listas.map((lista) => (
                                <ColunaLista
                                    key={lista.id}
                                    idLista={lista.id}
                                    nomeLista={lista.nome}
                                />
                            ))}

                            <div className="w-full md:w-auto self-stretch md:self-start">
                                {mostrandoCampoNovaLista ? (
                                    <div className="w-full md:w-[401px] md:min-w-[401px]">
                                        <CampoNomeNovaLista
                                            valorNomeLista={nomeNovaLista}
                                            aoAlterarNomeLista={
                                                setNomeNovaLista
                                            }
                                            aoConfirmarNomeLista={
                                                confirmarNovaLista
                                            }
                                        />
                                    </div>
                                ) : (
                                    <BotaoAcaoComPlus
                                        texto="Nova Lista"
                                        aoClicar={() =>
                                            setMostrandoCampoNovaLista(true)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </main>
                )}
            </div>

            <PainelDetalhesTarefa />
        </div>
    )

}