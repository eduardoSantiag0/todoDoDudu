// src/components/TaskCard.tsx
import type { Tarefa, IdentificadorTarefa } from "../types/tarefa";
import { PriorityTag } from "./TagPrioridade";

interface PropriedadesTaskCard {
  tarefa: Tarefa;
  aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
  aoIniciarArrasteTarefa: (tarefa: Tarefa) => void;
}

export function TaskCard({
  tarefa,
  aoDeletarTarefa,
  aoIniciarArrasteTarefa,
}: PropriedadesTaskCard) {
  function lidarInicioArraste() {
    aoIniciarArrasteTarefa(tarefa);
  }
  
  function lidarCliqueDireito(evento: React.MouseEvent) {
    evento.preventDefault(); // impede menu padrão do navegador
    const desejaDeletar = window.confirm(
      `Deseja deletar a tarefa "${tarefa.nome}"?`
    );
    if (desejaDeletar) {
      aoDeletarTarefa(tarefa.id);
    }
  }

  return (
    <div
      className="card mb-2 cursor-grab select-none p-3 active:cursor-grabbing"
      draggable
      onDragStart={lidarInicioArraste}
      onContextMenu={lidarCliqueDireito} // 👈 botão direito
    >
      <div className="mb-1 text-sm font-semibold">
        {tarefa.nome}
      </div>

      {tarefa.descricao && (
        <p className="mb-2 text-xs text-text-muted">
          {tarefa.descricao}
        </p>
      )}

      <div className="flex items-center justify-between">
        <PriorityTag prioridade={tarefa.prioridade} />
        {tarefa.dataPrevistaConclusao && (
          <span className="text-xs text-text-muted">
            {new Date(
              tarefa.dataPrevistaConclusao
            ).toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>
    </div>
  );
}