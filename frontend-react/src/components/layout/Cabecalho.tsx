import { RiAccountCircleFill } from 'react-icons/ri'
import logoPeugeotTasks from '../../assets/765dc596f0cbc7a5cb63a9bc701bb5fcf6c6c278.png'
import { BotaoNotificacao } from '../btns/BotaoNotificacao'

interface PropriedadesCabecalhoAplicacao {
  temNotificacao?: boolean;
  aoCliqueNotificacao?: () => void;
}

export function CabecalhoAplicacao({
  temNotificacao = false,
  aoCliqueNotificacao,
}: PropriedadesCabecalhoAplicacao) {
  return (
    <header
      className="
        flex items-center justify-between
        h-[84px] w-full
        px-20 py-3
        border-b border-button-create-task-hover
        bg-linear-to-r
        from-background-secondary/30
        to-background-main/30
        backdrop-blur-[80px]
      "
    >
      {/* Lado esquerdo: logo + nome Peugeot Tasks */}
      <div
        className="
          flex items-center gap-1
          w-[128px] h-[60px]
        "
      >
        {/* Logo */}
        <img
          src={logoPeugeotTasks}
          alt="Logo Peugeot Tasks"
          className="
            w-[54.668px] h-[60px]
            object-contain
          "
        />

        {/* Textos Peugeot / Tasks */}
        <div
          className="
            flex flex-col justify-center
            w-[68px] h-[44px]
          "
        >
          <span
            className="
              text-[16px]
              leading-[100%]
              font-semibold
              font-poppins
              text-text-default
            "
          >
            Peugeot
          </span>
          <span
            className="
              text-[16px]
              leading-[100%]
              font-semibold
              font-poppins
              text-text-default
            "
          >
            Tasks
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <BotaoNotificacao
          temNotificacao={temNotificacao}
          aoClicar={aoCliqueNotificacao}
        />

        <button
          type="button"
          className="
            flex items-center
            w-[128px] h-9
            rounded-[12px]
            px-4 py-1
            gap-2
            bg-profile-button-background
            text-white
            transition-all duration-300 ease-out
            hover:bg-button-create-task-hover
            hover:text-text-default
          "
        >
          <RiAccountCircleFill className="text-2xl" />

          <span
            className="
              text-[16px]
              leading-[100%]
              font-semibold
              font-poppins
            "
          >
            José
          </span>
        </button>

      </div>
    </header>
  )
}
