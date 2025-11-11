import type { Tarefa, IdentificadorTarefa } from "../types/tarefa";
import { PriorityTag } from "./TagPrioridade";
import { BotaoFinalizarTarefa } from "./btns/BotaoFinalizarTarefa";
import { BsFillCalendarWeekFill } from "react-icons/bs";


interface PropriedadesTaskCard {
  tarefa: Tarefa;
  aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
  aoIniciarArrasteTarefa: (tarefa: Tarefa) => void;
  aoAbrirDetalhesTarefa: (tarefa: Tarefa) => void; 
  aoAlternarFinalizacaoTarefa: (
    idTarefa: IdentificadorTarefa,
    tarefaJaFinalizada: boolean
  ) => void;

}

export function TaskCard({
  tarefa,
  aoDeletarTarefa,
  aoIniciarArrasteTarefa,
  aoAbrirDetalhesTarefa,
  aoAlternarFinalizacaoTarefa,
}: PropriedadesTaskCard) {

  console.log("TaskCard tarefa:", tarefa);

  function lidarInicioArraste() {
    aoIniciarArrasteTarefa(tarefa);
  }
  
  function lidarCliqueDireito(evento: React.MouseEvent) {
    evento.preventDefault(); 
    const desejaDeletar = window.confirm(
      `Deseja deletar a tarefa "${tarefa.nome}"?`
    );
    if (desejaDeletar) {
      aoDeletarTarefa(tarefa.id);
    }
  }

  function lidarCliqueEsquerdo() {
    aoAbrirDetalhesTarefa(tarefa);
  }

  const tarefaEstaFinalizada = Boolean(tarefa.dataFinalizada);

  function lidarCliqueFinalizar() {
    aoAlternarFinalizacaoTarefa(
      tarefa.id,
      tarefaEstaFinalizada
    );
  }


  return (
    <div
      className="
        box-border
        flex flex-col 
        w-[445px]
        border border-[#4E4E4E]
        rounded-lg
        px-2 py-3
        gap-3

      mb-3
      cursor-pointer 
      select-none 
      active:cursor-grabbing
        bg-background-main
        " 
      draggable
      onDragStart={lidarInicioArraste}
      onContextMenu={lidarCliqueDireito} 
      onClick={lidarCliqueEsquerdo}
    >

      <div className="flex items-center justify-between">
        <PriorityTag prioridade={tarefa.prioridade} />
        <BotaoFinalizarTarefa
          tarefaEstaFinalizada={tarefaEstaFinalizada}
          aoClicarBotao={lidarCliqueFinalizar}
        />
      </div>

      <div className="mb-1 text-sm font-semibold">
        {tarefa.nome}
      </div>

      {tarefa.descricao && (
        <p
          className="
            mb-2
            text-xs
            text-text-muted
            truncate
            max-w-full
          "
          title={tarefa.descricao}
        >
          {tarefa.descricao}
        </p>
      )}

      {tarefa.dataPrevistaConclusao && (

          <div
          className="
            flex flex-row items-center justify-center
            px-2 py-1
            gap-2
            w-[126px] h-[28px]
            bg-[#E0E0E0]
            rounded-[4px]
          "
        >
          <BsFillCalendarWeekFill className="w-4 h-4 text-[#646570]" />
          <span
            className="
              text-[13.33px]
              leading-[20px]
              font-semibold
              font-poppins
              text-[#646570]
            "
          >
            {new Date(
              tarefa.dataPrevistaConclusao
            ).toLocaleDateString("pt-BR")}
          </span>
        </div>
      )}


    </div>
  );
}