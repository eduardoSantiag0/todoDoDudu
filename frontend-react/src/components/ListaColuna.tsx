import { useState } from "react";
import type { ListId } from "../types/lista";
import type {
  Tarefa,
  IdentificadorTarefa,
  PrioridadeTarefa,
} from "../types/tarefa";
import { TaskCard } from "./CardsTarefas";
import { BotaoOpcoesLista } from "./btns/BotaoOpcoesLista";
import { ConfirmarDelecao } from "./popups/ConfirmarDelecao"; 
import { BotaoAcaoComPlus } from "./btns/BotaoAcaoComPlus";


interface PropriedadesColunaLista {
  idLista: ListId;
  nomeLista: string;
  tarefasDaLista: Tarefa[];
  aoRenomearLista: (idLista: ListId, novoNome: string) => void;
  aoCriarTarefaNaLista: (
    idLista: ListId,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    dataConclusaoEsperada: string
  ) => void;
  aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
  aoMoverTarefaParaPosicao: (
    idTarefa: IdentificadorTarefa,
    idListaOrigem: ListId,
    idListaDestino: ListId,
    indiceNovo: number
  ) => void;
  aoDeletarLista: (idLista: ListId) => void; 
  aoAbrirDetalhesTarefa: (tarefa: Tarefa) => void;
  aoAlternarFinalizacaoTarefa: (   
    idTarefa: IdentificadorTarefa,
    tarefaJaFinalizada: boolean
  ) => void;
}

export function ColunaLista({
  idLista,
  nomeLista,
  tarefasDaLista,
  aoRenomearLista,
  aoCriarTarefaNaLista,
  aoDeletarTarefa,
  aoMoverTarefaParaPosicao,
  aoDeletarLista,
  aoAbrirDetalhesTarefa,
  aoAlternarFinalizacaoTarefa
}: PropriedadesColunaLista) {
  const [criandoTarefa, setCriandoTarefa] = useState(false);
  const [novoNomeTarefa, setNovoNomeTarefa] = useState("");
  const [novaDescricaoTarefa, setNovaDescricaoTarefa] = useState("");
  const [novaPrioridadeTarefa, setNovaPrioridadeTarefa] =
    useState<PrioridadeTarefa>("LOW");
  const [novaDataTarefa, setNovaDataTarefa] = useState("");

  const [idTarefaSendoArrastada, setIdTarefaSendoArrastada] =
    useState<IdentificadorTarefa | null>(null);
  const [idListaOrigemArraste, setIdListaOrigemArraste] =
    useState<ListId | null>(null);

  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);


  function lidarEnvioNovaTarefa(evento: React.FormEvent) {
    evento.preventDefault();

    if (novoNomeTarefa.trim().length === 0) {
      return;
    }

    aoCriarTarefaNaLista(
      idLista,
      novoNomeTarefa,
      novaDescricaoTarefa,
      novaPrioridadeTarefa,
      novaDataTarefa,
    );

    setNovoNomeTarefa("");
    setNovaDescricaoTarefa("");
    setNovaPrioridadeTarefa("LOW");
    setNovaDataTarefa("");
    setCriandoTarefa(false);
  }

  function lidarInicioArraste(tarefa: Tarefa) {
    setIdTarefaSendoArrastada(tarefa.id);
    setIdListaOrigemArraste(tarefa.listaId);
    console.log("Arrastando tarefa", tarefa.id, "da lista", tarefa.listaId);

  }

  function lidarSoltarNaPosicao(indicePosicao: number) {
    if (idTarefaSendoArrastada === null || idListaOrigemArraste === null) {
      return;
    }

    console.log(
      "✅ Soltando tarefa:",  idTarefaSendoArrastada, 
      "de lista",  idListaOrigemArraste, 
      "para lista",  idLista, 
      "na posição",  indicePosicao
    );

    aoMoverTarefaParaPosicao(
      idTarefaSendoArrastada,
      idListaOrigemArraste,
      idLista,
      indicePosicao
    );

    setIdTarefaSendoArrastada(null);
    setIdListaOrigemArraste(null);
  }

  function lidarCliqueTituloLista() {
    const novoNome = window
      .prompt("Novo nome da lista:", nomeLista)
      ?.trim();

    if (novoNome && novoNome.length > 0) {
      aoRenomearLista(idLista, novoNome);
    }
  }

  // function lidarCliqueDeletarLista() {
  //   const desejaDeletar = window.confirm(
  //     `Tem certeza que deseja deletar a lista "${nomeLista}"?`
  //   );

  //   if (desejaDeletar) {
  //     aoDeletarLista(idLista);
  //   }
  // }

  function lidarCliqueDeletarLista() {
    setConfirmacaoAberta(true); 
  }

  function confirmarDelecaoLista() {
    aoDeletarLista(idLista);
    setConfirmacaoAberta(false); 
  }

  return (
    <section className="
      box-border 
      w-[477px]
      min-h-[859px]
      shrink-0 
      flex-col 
      rounded-xl     
      bg-background-main  
      p-3         
      border border-[#4E4E4E]
      px-4 pt-4 pb-6
      gap-3 ">
      
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          className="flex-1 text-sm font-semibold text-text-default text-left"
          onClick={lidarCliqueTituloLista}
        >
          {nomeLista}
        </button>

        <div className="flex items-center gap-1">
          <BotaoOpcoesLista
            aoClicarRenomearLista={lidarCliqueTituloLista}
            aoClicarExcluirLista={lidarCliqueDeletarLista}
          />
        </div>
      </div>
      

      {/* Zona de drop antes do primeiro card */}
      <div
        className="my-1 h-3 w-full rounded hover:bg-success-background/30"
        onDragOver={(evento) => evento.preventDefault()}
        onDrop={() => lidarSoltarNaPosicao(0)}
      />

      
      {tarefasDaLista.map((tarefa, indice) => (
        <div key={tarefa.id} >
          <TaskCard
            tarefa={tarefa}
            aoDeletarTarefa={aoDeletarTarefa}
            aoIniciarArrasteTarefa={lidarInicioArraste}
            aoAbrirDetalhesTarefa={aoAbrirDetalhesTarefa}
            aoAlternarFinalizacaoTarefa={aoAlternarFinalizacaoTarefa}
          />
          <div
            className="my-1 h-3 w-full rounded hover:bg-success-background/30"
            onDragOver={(evento) => evento.preventDefault()}
            onDrop={() => lidarSoltarNaPosicao(indice + 1)}
          />
        </div>
      ))}

      {/* <button
        type="button"
        className="btn-criar-tarefa"
        onClick={() => setCriandoTarefa(!criandoTarefa)}
      >
        + Nova tarefa
      </button> */}

      <BotaoAcaoComPlus
        texto="Nova tarefa"
        aoClicar={() => setCriandoTarefa(!criandoTarefa)}
      />


      {criandoTarefa && (
        <form
          onSubmit={lidarEnvioNovaTarefa}
          className="card mb-3 p-3 space-y-2"
        >
          <div>
            <label className="label">Título</label>
            <input
              className="input"
              value={novoNomeTarefa}
              onChange={(evento) =>
                setNovoNomeTarefa(evento.target.value)
              }
            />
          </div>

          <div>
            <label className="label">Descrição</label>
            <textarea
              className="input min-h-20"
              value={novaDescricaoTarefa}
              onChange={(evento) =>
                setNovaDescricaoTarefa(evento.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label">Prioridade</label>
              <select
                className="input"
                value={novaPrioridadeTarefa}
                onChange={(evento) =>
                  setNovaPrioridadeTarefa(
                    evento.target.value as PrioridadeTarefa
                  )
                }
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
                <option value="VERY_HIGH">Altíssima</option>
              </select>
            </div>
            <div>
              <label className="label">Prazo</label>
              <input
                type="date"
                className="input"
                value={novaDataTarefa}
                onChange={(evento) =>
                  setNovaDataTarefa(evento.target.value)
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setCriandoTarefa(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Criar
            </button>
          </div>
        </form>
      )}

      {confirmacaoAberta && (
        <ConfirmarDelecao
          tipo="Lista"
          nome={nomeLista}
          aoConfirmar={confirmarDelecaoLista}
          aoCancelar={() => setConfirmacaoAberta(false)}
        />
      )}

    </section>
    
  );
}
