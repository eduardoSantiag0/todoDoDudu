import { BsPencilFill, BsPlusSquareDotted } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import React, { useEffect } from 'react'

interface PosicaoMenu {
  x: number
  y: number
}

interface ContextMenuTarefaProps {
  visivel: boolean
  posicao: PosicaoMenu | null
  aoFechar: () => void
  aoEditar: () => void
  aoDuplicar: () => void
  aoDeletar: () => void
}

export function ContextMenuTarefa({
  visivel,
  posicao,
  aoFechar,
  aoEditar,
  aoDuplicar,
  aoDeletar,
}: ContextMenuTarefaProps) {
  // Fecha com Esc (opcional)
  useEffect(() => {
    if (!visivel) {return}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {aoFechar()}
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visivel, aoFechar])

  if (!visivel || !posicao) {return null}

  return (
    <>
      {/* Overlay para fechar ao clicar/pressionar fora */}
      <div
        className="fixed inset-0 z-40"
        onPointerDown={(e) => { e.stopPropagation(); aoFechar() }}
        onContextMenu={(e) => e.preventDefault() } /* evita menu nativo no overlay */
        aria-hidden="true"
      />

      {/* Menu de contexto */}
      <div
        className="
          fixed z-50
          flex flex-col items-start
          bg-background-main
          border border-button-hover
          rounded-lg
          w-[109px]
          py-2 px-[1px]
        "
        style={{ top: posicao.y + 4, left: posicao.x + 4 }}
        role="menu"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Editar */}
        <button
          type="button"
          className="
            flex flex-row items-center gap-2
            w-[107px] h-10
            px-2 py-2
            bg-background-main
            hover:bg-background-secondary/70
          "
          onClick={() => { aoEditar(); aoFechar() }}
        >
          <BsPencilFill className="w-4 h-4" />
          <span className="text-[16px] leading-6 font-normal">
            Editar
          </span>
        </button>

        {/* Duplicar */}
        <button
          type="button"
          className="
            flex flex-row items-center gap-2
            w-[107px] h-10
            px-2 py-2
            bg-background-main
            hover:bg-background-secondary/70
          "
          onClick={() => { aoDuplicar(); aoFechar() }}
        >
          <BsPlusSquareDotted className="w-4 h-4 " />
          <span className="text-[16px] leading-6 font-normal  ">
            Duplicar
          </span>
        </button>

        {/* Deletar */}
        <button
          type="button"
          className="
            flex flex-row items-center gap-2
            w-[107px] h-10
            px-2 py-2
            bg-background-main
            hover:bg-button-hover
          "
          onClick={() => { aoDeletar(); aoFechar() }}
        >
          <AiFillDelete className="w-4 h-4 text-danger-background" />
          <span className="text-[16px] leading-6 font-normal  text-danger-background">
            Deletar
          </span>
        </button>
      </div>
    </>
  )
}
