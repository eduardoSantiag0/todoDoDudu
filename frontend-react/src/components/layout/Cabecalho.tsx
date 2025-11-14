import { RiAccountCircleFill } from 'react-icons/ri'
import logoPeugeotTasks from '../../assets/765dc596f0cbc7a5cb63a9bc701bb5fcf6c6c278.png'
import { BotaoNotificacao } from '../btns/BotaoNotificacao'

interface CabecalhoAplicacaoProps {
  temNotificacao?: boolean;
  aoCliqueNotificacao?: () => void;
}

export function CabecalhoAplicacao({
  temNotificacao = false,
  aoCliqueNotificacao,
}: CabecalhoAplicacaoProps) {
  return (
    <header
      className="
        sticky top-0 z-40
        flex items-center justify-between
        h-[75px] md:h-[84px] w-full
        px-4 md:px-8 lg:px-20
        border-b border-button-hover
        header-grad-custom
        backdrop-blur-md md:backdrop-blur-[80px]
      "
    >
      {/* Esquerda: logo + marca */}
      <div className="flex items-center gap-2 md:gap-1">
        <img
          src={logoPeugeotTasks}
          alt="Logo Peugeot Tasks"
          className="w-10 h-10 md:w-[54.668px] md:h-[60px] object-contain"
        />
        <div className="flex flex-col justify-center leading-none">
          <span className="text-sm md:text-base font-semibold">Peugeot</span>
          <span className="text-sm md:text-base font-semibold -mt-1 md:mt-0">Tasks</span>
        </div>
      </div>

      {/* Notificação + perfil  */}
      <div className="flex items-center gap-3">
        <BotaoNotificacao
          temNotificacao={temNotificacao}
          aoClicar={aoCliqueNotificacao}
        />

        <button
          type="button"
          className="
            flex md:hidden items-center justify-center
            w-9 h-9 rounded-md
            btn-transition hover:bg-button-hover
          "
        >
          <RiAccountCircleFill className="text-xl" />
        </button>

        <button
          type="button"
          className="
            hidden md:flex items-center
            h-9 rounded-xl px-4 gap-2
            btn-transition hover:bg-button-hover
            cursor-pointer
          "
        >
          <RiAccountCircleFill className="text-2xl" />
          <span className="text-sm md:text-base font-semibold ">Dudu</span>
        </button>
      </div>
    </header>
  )
}