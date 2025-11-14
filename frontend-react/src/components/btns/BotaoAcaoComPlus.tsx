import { BsFillPlusCircleFill } from 'react-icons/bs'

interface BotaoAcaoComPlusProps {
  aoClicar: () => void;
  texto: string;
}

export function BotaoAcaoComPlus({ aoClicar, texto }: BotaoAcaoComPlusProps) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      className="
        flex flex-row items-center
        rounded-[12px]
        p-2
        gap-2
        font-semibold
        text-[19.2px] leading-[29px]
        input
        btn-ghost
        cursor-pointer
      "
    >
      <BsFillPlusCircleFill className="w-6 h-6 text-white" />

      <span>{texto}</span>
    </button>
  )
}
