import { BsFillPlusCircleFill } from "react-icons/bs";

interface PropriedadesBotaoAcaoComPlus {
  aoClicar: () => void;
  texto: string;
}

export function BotaoAcaoComPlus({ aoClicar, texto }: PropriedadesBotaoAcaoComPlus) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      className="
        flex flex-row items-center
        w-[300px] h-[45px]
        rounded-[12px]
        p-2
        gap-2
        text-white
        font-poppins font-semibold
        text-[19.2px] leading-[29px]
        bg-transparent
        transition-all duration-300 ease-out
        hover:bg-[#4E4E4E]
        active:bg-[#343333]
      "
    >
      <BsFillPlusCircleFill className="w-6 h-6 text-white" />

      {/* Texto dinâmico */}
      <span>{texto}</span>
    </button>
  );
}
