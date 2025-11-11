import { BsFillXCircleFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

interface PropriedadesConfirmarDelecao {
  tipo: "Lista" | "Tarefa";
  nome?: string;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export function ConfirmarDelecao({
  tipo,
  nome,
  aoConfirmar,
  aoCancelar,
}: PropriedadesConfirmarDelecao) {
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 
      "
    >
      <div
        className="
          flex flex-col items-center
          bg-[#252628]
          border border-white
          rounded-[12px]
          w-[413px] h-[200px]
          p-[12px_16px]
          gap-[17px]
          box-border
        "
      >
        {/* Container interno */}
        <div className="flex flex-col items-start w-[381px] h-[176px]">
          {/* Botão fechar */}
          <div className="flex justify-end w-full mb-[-4px]">
            <button
              onClick={aoCancelar}
              className="hover:opacity-80 transition-opacity"
            >
              <BsFillXCircleFill className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Conteúdo principal */}
          <div className="flex flex-col items-start gap-[17px] w-full">
            <h2
              className="
                font-poppins font-semibold text-[19.2px] leading-[29px]
                text-white
              "
            >
              Tem certeza que deseja deletar {tipo.toLowerCase()}
              {nome ? ` “${nome}”?` : "?"}
            </h2>

            <p
              className="
                font-poppins text-[16px] leading-[24px] text-white
              "
            >
              Essa ação não é reversível.
            </p>

            <button
              onClick={aoConfirmar}
              className="
                flex flex-row items-center gap-2
                px-2 py-1
                bg-[#252628]
                hover:bg-[#2e2f31]
                transition-all duration-200
                w-full h-10
                rounded-[8px]
              "
            >
              <AiFillDelete className="w-4 h-4 text-[#AF0505]" />
              <span
                className="
                  font-poppins text-[16px] leading-[24px]
                  text-[#AF0505]
                "
              >
                Deletar {tipo.toLowerCase()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
