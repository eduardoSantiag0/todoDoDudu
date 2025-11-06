// src/pages/PaginaQuadro.tsx
import { useEffect, useState } from "react";
import type { Lista, ListId } from "../types/lista";

import { ColunaLista } from "../components/ListaColuna";
import type { Tarefa, IdentificadorTarefa, PrioridadeTarefa, } from "../types/tarefa";

import { buscarTodasAsListas, criarNovaLista, atualizarNomeLista, deletarListaPorId } from "../queries/listasApi";
import { criarNovaTarefa, deletarTarefaPorId, atualizarTarefaPorId, } from "../queries/tarefasApi";


export function BoardPage() {
  const [listas, setListas] = useState<Lista[]>([]);
  const [tarefasPorListaId, setTarefasPorListaId] = useState<
    Record<ListId, Tarefa[]>
  >({});
  const [carregandoQuadro, setCarregandoQuadro] = useState(true);
  const [mensagemErro, setMensagemErro] = useState<string | null>(
    null
  );

  useEffect(() => {
    carregarDadosQuadro();
  }, []);

    async function carregarDadosQuadro() {
    try {
      setCarregandoQuadro(true);
      setMensagemErro(null);

      const listasBuscadas = await buscarTodasAsListas();

      
      const novoMapaTarefas: Record<ListId, Tarefa[]> = {};
      
      listasBuscadas.forEach((lista) => {
          // se já existirem tarefas em memória para essa lista, reaproveita
          novoMapaTarefas[lista.id] = tarefasPorListaId[lista.id] ?? [];
        });
        
      console.log("Buscand3")
      setListas(listasBuscadas);
      setTarefasPorListaId(novoMapaTarefas);
    } catch (erro) {
      console.error(erro);
      setMensagemErro("Não foi possível carregar o quadro.");
    } finally {
      setCarregandoQuadro(false);
    }
  }

  async function lidarCriarLista() {
    const nome = window.prompt("Nome da nova lista:")?.trim();
    if (!nome) return;

    try {
      const listaCriada = await criarNovaLista(nome);
      setListas((listasAtuais) => [...listasAtuais, listaCriada]);
      setTarefasPorListaId((mapaAtual) => ({
        ...mapaAtual,
        [listaCriada.id]: [],
      }));
    } catch (erro) {
      console.error(erro);
      setMensagemErro("Erro ao criar lista.");
    }
  }

  async function lidarRenomearLista(
    idLista: ListId,
    nome: string
  ) {
  try {

    const listaAtualizada = await atualizarNomeLista(
      idLista,
      nome
    );

    setListas((listasAnteriores) =>
      listasAnteriores.map((listaAtual) =>
        listaAtual.id === idLista ? listaAtualizada : listaAtual
      )
    );
    } catch (erro) {
      console.error(erro);
      setMensagemErro("Erro ao renomear lista.");
    }
  }

  async function lidarDeletarLista(idLista: ListId) {
  try {
    await deletarListaPorId(idLista);

    setListas((listasAtuais) =>
      listasAtuais.filter((lista) => lista.id !== idLista)
    );

    setTarefasPorListaId((mapaAtual) => {
      const novoMapa: Record<ListId, Tarefa[]> = { ...mapaAtual };
      delete novoMapa[idLista];
      return novoMapa;
    });
  } catch (erro) {
    console.error("Erro ao deletar lista:", erro);
    setMensagemErro("Erro ao deletar lista.");
  }
}

  async function lidarCriarTarefaNaLista(
    idLista: ListId,
    nome: string,
    descricao: string,
    prioridade: PrioridadeTarefa,
    dataPrevistaConclusao: string
  ) {
    try {
      const tarefaCriada = await criarNovaTarefa({
        nome,
        descricao: descricao || undefined,
        prioridade,
        dataPrevistaConclusao:
          dataPrevistaConclusao || undefined,
        listaId: idLista,
      });

      setTarefasPorListaId((mapaAtual) => {
        const tarefasDaLista = mapaAtual[idLista] ?? [];
        return {
          ...mapaAtual,
          [idLista]: [...tarefasDaLista, tarefaCriada],
        };
      });
    } catch (erro) {
      console.error(erro);
      setMensagemErro("Erro ao criar tarefa.");
    }
  }

  async function lidarDeletarTarefa(idTarefa: IdentificadorTarefa) {
    try {
      await deletarTarefaPorId(idTarefa);
      setTarefasPorListaId((mapaAtual) => {
        const novoMapa: Record<ListId, Tarefa[]> = {};
        for (const chave in mapaAtual) {
          const idLista = Number(chave) as ListId;
          novoMapa[idLista] = mapaAtual[idLista].filter(
            (tarefa) => tarefa.id !== idTarefa
          );
        }
        return novoMapa;
      });
    } catch (erro) {
      console.error(erro);
      setMensagemErro("Erro ao deletar tarefa.");
    }
  }

  async function lidarMoverTarefa(
    idTarefa: IdentificadorTarefa,
    listaOrigemId: ListId,
    listaDestinoId: ListId,
    indiceNovo: number
  ) {
    setTarefasPorListaId((mapaAtual) => {
      const copiaMapa: Record<ListId, Tarefa[]> = {};
      for (const chave in mapaAtual) {
        const idLista = Number(chave) as ListId;
        copiaMapa[idLista] = [...mapaAtual[idLista]];
      }

      const tarefasOrigem = copiaMapa[listaOrigemId];
      const posicao = tarefasOrigem.findIndex(
        (tarefa) => tarefa.id === idTarefa
      );
      if (posicao === -1) return mapaAtual;

      const [tarefaMovida] = tarefasOrigem.splice(posicao, 1);

      const tarefasDestino =
        listaOrigemId === listaDestinoId
          ? tarefasOrigem
          : copiaMapa[listaDestinoId] ?? [];

      const indiceSeguro = Math.max(
        0,
        Math.min(indiceNovo, tarefasDestino.length)
      );

      tarefasDestino.splice(indiceSeguro, 0, {
        ...tarefaMovida,
        listaId: listaDestinoId,
      });

      copiaMapa[listaOrigemId] = tarefasOrigem;
      copiaMapa[listaDestinoId] = tarefasDestino;

      return copiaMapa;
    });

    try {
      await atualizarTarefaPorId(idTarefa, {
        listaId: listaDestinoId,
      });
    } catch (erro) {
      console.error(erro);
      setMensagemErro(
        "Erro ao mover tarefa. Recarregando quadro."
      );
      await carregarDadosQuadro();
    }
  }

return (
  <div className="min-h-screen flex flex-col">
    <header className="sticky top-0 z-10 mb-4 flex items-center justify-between bg-background-main/80 px-4 py-3 backdrop-blur">
      <h1 className="text-lg font-semibold">
        Quadro de Tarefas
      </h1>
      <button
        className="btn btn-primary"
        onClick={lidarCriarLista}
      >
        + Nova lista
      </button>
    </header>

    {mensagemErro && (
      <div className="mx-4 mb-3 rounded-lg bg-danger-background/20 px-3 py-2 text-sm">
        {mensagemErro}
      </div>
    )}

    {carregandoQuadro && (
      <p className="mx-4 text-sm text-text-muted">
        Carregando quadro...
      </p>
    )}

    {!carregandoQuadro && (
      <main className="flex gap-3 overflow-x-auto px-3 pb-6">
        {listas.map((lista) => (
          <ColunaLista
            key={lista.id}
            idLista={lista.id}
            nomeLista={lista.nome}
            tarefasDaLista={tarefasPorListaId[lista.id] ?? []}
            aoRenomearLista={lidarRenomearLista}
            aoCriarTarefaNaLista={lidarCriarTarefaNaLista}
            aoDeletarTarefa={lidarDeletarTarefa}
            aoMoverTarefaParaPosicao={lidarMoverTarefa}
            aoDeletarLista={lidarDeletarLista} 
          />
        ))}
      </main>
    )}
  </div>
)
};