// src/components/BotaoFecharPainelDetalhes.tsx
import { BsArrowBarRight } from "react-icons/bs";

interface PropriedadesBotaoFecharPainelDetalhes {
  aoClicarFechar: () => void;
}

export function BotaoFecharPainelDetalhes({
  aoClicarFechar,
}: PropriedadesBotaoFecharPainelDetalhes) {
  function lidarClique(
    evento: React.MouseEvent<HTMLButtonElement>
  ) {
    evento.stopPropagation();
    aoClicarFechar();
  }

  return (
    <button
      type="button"
      onClick={lidarClique}
      className="
        flex flex-row items-center justify-center
        w-8 h-8
        p-1
        rounded-[2px]
        bg-transparent
        transition-all duration-300 ease-out
        hover:bg-[#4E4E4E]
        active:bg-[#343333]
      "
      aria-label="Fechar painel de detalhes"
    >
      <BsArrowBarRight className="w-6 h-6 text-white" />
    </button>
  );
}
