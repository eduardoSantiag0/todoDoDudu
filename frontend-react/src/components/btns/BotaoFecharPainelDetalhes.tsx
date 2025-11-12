// src/components/BotaoFecharPainelDetalhes.tsx
import { BsArrowBarRight } from 'react-icons/bs'

interface BotaoFecharPainelDetalhesProps {
  aoClicarFechar: () => void;
}

export function BotaoFecharPainelDetalhes({
  aoClicarFechar,
}: BotaoFecharPainelDetalhesProps) {
  function lidarClique(
    evento: React.MouseEvent<HTMLButtonElement>,
  ) {
    evento.stopPropagation()
    aoClicarFechar()
  }

  return (
    <button
      type="button"
      onClick={lidarClique}
      className="btn btn-ghost"
    >
      <BsArrowBarRight className="w-6 h-6 text-white" />
    </button>
  )
}
