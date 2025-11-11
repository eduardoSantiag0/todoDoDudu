// src/components/BotaoOpcoesLista.tsx
import { useState } from "react";

interface PropriedadesBotaoOpcoesLista {
  aoClicarRenomearLista: () => void;
  aoClicarExcluirLista: () => void;
}

export function BotaoOpcoesLista({
  aoClicarRenomearLista,
  aoClicarExcluirLista,
}: PropriedadesBotaoOpcoesLista) {
  const [menuAberto, setMenuAberto] = useState(false);

  function lidarCliqueBotao() {
    setMenuAberto(!menuAberto);
  }

  function lidarCliqueRenomear() {
    aoClicarRenomearLista();
    setMenuAberto(false);
  }

  function lidarCliqueExcluir() {
    aoClicarExcluirLista();
    setMenuAberto(false);
  }

  return (
    <div className="relative">
      {/* Botão de três pontinhos */}
      <button
        type="button"
        onClick={lidarCliqueBotao}
        className="
          flex items-center justify-center
          w-8 h-8
          rounded-lg
          text-text-default
          hover:bg-background-secondary/80
          transition-all duration-200 ease-out
        "
      >
        <span className="text-xl leading-none">⋯</span>
      </button>

      {/* Mini menu */}
      {menuAberto && (
        <div
          className="
            absolute right-0 mt-2
            w-40
            rounded-lg
            bg-background-main
            shadow-lg
            ring-1 ring-background-secondary/60
            z-20
          "
        >
          <button
            type="button"
            onClick={lidarCliqueRenomear}
            className="
              w-full px-3 py-2
              text-left text-xs
              text-text-default
              hover:bg-background-secondary/60
            "
          >
            Renomear lista
          </button>

          <button
            type="button"
            onClick={lidarCliqueExcluir}
            className="
              w-full px-3 py-2
              text-left text-xs
              text-danger-background
              hover:bg-danger-background/20
            "
          >
            Excluir lista
          </button>
        </div>
      )}
    </div>
  );
}
