import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { BotaoOpcoesLista } from './BotaoOpcoesLista'

export interface CabecalhoCardProps {
    nomeLista: string;
    onRenomear: (novoTitulo: string) => void | Promise<void>;
    onExcluir: () => void;
    className?: string;
    iniciarEditando?: boolean;
}

export function CabecalhoCard({
    nomeLista,
    onRenomear,
    onExcluir,
    className,
    iniciarEditando = false,
}: CabecalhoCardProps) {
    const [editandoTitulo, setEditandoTitulo] = useState(iniciarEditando)
    const [tituloEditado, setTituloEditado] = useState(nomeLista)

    function abrirEdicao() {
        setTituloEditado(nomeLista)
        setEditandoTitulo(true)
    }

    async function confirmarEdicao() {
        const novo = tituloEditado.trim()
        if (novo && novo !== nomeLista) {
            await onRenomear(novo)
        }
        setEditandoTitulo(false)
    }

    function lidarChange(e: ChangeEvent<HTMLInputElement>) {
        setTituloEditado(e.target.value)
    }

    function lidarKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault()
            void confirmarEdicao()
        }
        if (e.key === 'Escape') {
            e.preventDefault()
            setEditandoTitulo(false)
            setTituloEditado(nomeLista)
        }
    }

    return (
        <div className={`mb-2 flex items-center justify-between gap-2 ${ className ?? '' }`} >

            {!editandoTitulo ? (
                <div className="flex-1 text-left text-sm font-semibold btn-text"  >
                    {nomeLista}
                </div>
            ) : <input
                    autoFocus
                    value={tituloEditado}
                    onChange={lidarChange}
                    onBlur={confirmarEdicao}
                    onKeyDown={lidarKeyDown}
                    className="input flex-1 text-left text-[20px]font-medium"
                />
            }

            <div className="flex items-center gap-1">
                <BotaoOpcoesLista
                    aoClicarRenomearLista={abrirEdicao}
                    aoClicarExcluirLista={onExcluir}
                />
            </div>
        </div>
    )
}

export default CabecalhoCard
