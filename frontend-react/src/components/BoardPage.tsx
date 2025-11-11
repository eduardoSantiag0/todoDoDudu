import { useEffect, useState } from "react";
import type { Lista, ListId } from "../types/lista";
import { MensagemSnapback } from "./popups/MensagemSnapback";
import { ColunaLista } from "../components/ListaColuna";
import type {
    Tarefa,
    IdentificadorTarefa,
    PrioridadeTarefa,
} from "../types/tarefa";
import { PainelDetalhesTarefa } from "../components/PainelDetalhesTarefa";

import {
    buscarTodasAsListas,
    criarNovaLista,
    atualizarNomeLista,
    deletarListaPorId,
} from "../queries/listasApi";
import {
    criarNovaTarefa,
    deletarTarefaPorId,
    atualizarTarefaPorId,
    buscarTodasAsTarefas,
    AtualizarTarefaRequisicao,
} from "../queries/tarefasApi";
import { BotaoAcaoComPlus } from "./btns/BotaoAcaoComPlus";
import { CampoNomeNovaLista } from "../components/CampoNomeNovaLista";
import { CabecalhoAplicacao } from "../components/header/Cabecalho"; 


export function BoardPage() {
    const [listas, setListas] = useState<Lista[]>([]);
    const [tarefasPorListaId, setTarefasPorListaId] = useState<
        Record<ListId, Tarefa[]>
    >({});

    const [carregandoQuadro, setCarregandoQuadro] = useState(true);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);

    const [mensagemSnapback, setMensagemSnapback] = useState<string | null>(
        null
    );

    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(
        null
    );

    const [mostrandoCampoNovaLista, setMostrandoCampoNovaLista] =
        useState(false);
    const [nomeNovaLista, setNomeNovaLista] = useState("");

    const [temNotificacao, setTemNotificacao] = useState(false);

    useEffect(() => {
        carregarDadosQuadro();
    }, []);

    function mostrarSnapback(mensagem: string) {
        setMensagemSnapback(mensagem);

        setTimeout(() => {
            setMensagemSnapback(null);
        }, 3000);
    }

    async function carregarDadosQuadro() {
        try {
            setCarregandoQuadro(true);
            setMensagemErro(null);

            const [listasBuscadas, tarefasBuscadas] = await Promise.all([
                buscarTodasAsListas(),
                buscarTodasAsTarefas(),
            ]);

            const novoMapaTarefas: Record<ListId, Tarefa[]> = {};

            listasBuscadas.forEach((lista) => {
                novoMapaTarefas[lista.id] = [];
            });

            tarefasBuscadas.forEach((tarefa) => {
                const idLista = tarefa.listaId as ListId;

                if (!idLista) {
                    console.warn("Tarefa sem listaId:", tarefa);
                    return;
                }

                if (!novoMapaTarefas[idLista]) {
                    novoMapaTarefas[idLista] = [];
                }

                novoMapaTarefas[idLista].push(tarefa);
            });

            setListas(listasBuscadas);
            setTarefasPorListaId(novoMapaTarefas);
        } catch (erro) {
            console.error("Erro ao carregar quadro:", erro);
            setMensagemErro("Não foi possível carregar o quadro.");
        } finally {
            setCarregandoQuadro(false);
        }
    }

    async function lidarCriarLista(nomeLista: string) {
        const nomeTratado = nomeLista.trim();
        if (!nomeTratado) {
            return;
        }

        try {
            const listaCriada = await criarNovaLista(nomeTratado);

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

    async function lidarRenomearLista(idLista: ListId, nome: string) {
        try {
            const listaAtualizada = await atualizarNomeLista(idLista, nome);

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

            mostrarSnapback("Lista deletada com sucesso!");
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
        dataConclusaoTexto: string
    ) {
        if (!dataConclusaoTexto) {
            alert("Escolha uma data de conclusão para a tarefa.");
            return;
        }

        try {
            const tarefaCriada = await criarNovaTarefa({
                listaId: idLista,
                nome: nome,
                descricao: descricao || undefined,
                prioridade,
                dataConclusaoEsperada: dataConclusaoTexto,
            });

            setTarefasPorListaId((mapaAtual) => {
                const tarefasDaLista = mapaAtual[idLista] ?? [];
                console.log(mapaAtual);
                return {
                    ...mapaAtual,
                    [idLista]: [...tarefasDaLista, tarefaCriada],
                };
            });

            setTemNotificacao(true);

        } catch (erro) {
            console.error("Erro ao criar tarefa:", erro);
            setMensagemErro("Erro ao criar tarefa.");
        }
    }

    function lidarAbrirDetalhesTarefa(tarefa: Tarefa) {
        setTarefaSelecionada(tarefa);
    }

    function lidarFecharPainelDetalhes() {
        setTarefaSelecionada(null);
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
                mostrarSnapback("Tarefa deletada com sucesso!");
                return novoMapa;
            });
            if (tarefaSelecionada?.id === idTarefa) {
                setTarefaSelecionada(null);
            }
        } catch (erro) {
            console.error(erro);
            setMensagemErro("Erro ao deletar tarefa.");
        }
    }

    // async function lidarAtualizarDetalhesTarefa(
    //   idTarefa: IdentificadorTarefa,
    //   dadosAtualizados: AtualizarTarefaRequisicao
    // ) {
    //   try {
    //     const tarefaAtualizada = await atualizarTarefaPorId(
    //       idTarefa,
    //       dadosAtualizados
    //     );

    //     // Atualiza mapa de tarefas
    //     setTarefasPorListaId((mapaAtual) => {
    //       const novoMapa: Record<ListId, Tarefa[]> = {};

    //       for (const chave in mapaAtual) {
    //         const idLista = Number(chave) as ListId;
    //         const listaOriginal = mapaAtual[idLista];

    //         // se essa lista é a da tarefa atualizada
    //         if (idLista === tarefaAtualizada.listaId) {
    //           novoMapa[idLista] = listaOriginal.map((tarefa) =>
    //             tarefa.id === idTarefa ? tarefaAtualizada : tarefa
    //           );
    //         } else {
    //           novoMapa[idLista] = [...listaOriginal];
    //         }
    //       }

    //       return novoMapa;
    //     });

    //     // Atualiza o painel com os dados novos
    //     setTarefaSelecionada(tarefaAtualizada);
    //   } catch (erro) {
    //     console.error("Erro ao atualizar tarefa:", erro);
    //     setMensagemErro("Erro ao atualizar tarefa.");
    //   }
    // }

    async function lidarAtualizarDetalhesTarefa(
        idTarefa: IdentificadorTarefa,
        dadosAtualizados: AtualizarTarefaRequisicao
    ) {
        try {
            const tarefaAtualizada = await atualizarTarefaPorId(
                idTarefa,
                dadosAtualizados
            );

            setTarefasPorListaId((mapaAtual) => {
                const novoMapa: Record<ListId, Tarefa[]> = {};
                const listaDestinoId = tarefaAtualizada.listaId as ListId;

                // 1) remove a tarefa de TODAS as listas
                Object.entries(mapaAtual).forEach(([chave, lista]) => {
                    const idLista = Number(chave) as ListId;
                    const listaSemTarefa = lista.filter(
                        (tarefa) => tarefa.id !== idTarefa
                    );
                    novoMapa[idLista] = listaSemTarefa;
                });

                // 2) garante que a lista destino existe
                const listaDestino = novoMapa[listaDestinoId] ?? [];

                // 3) adiciona a tarefa atualizada na lista destino
                novoMapa[listaDestinoId] = [...listaDestino, tarefaAtualizada];

                return novoMapa;
            });

            // Atualiza o painel com os dados novos
            setTarefaSelecionada(tarefaAtualizada);
        } catch (erro) {
            console.error("Erro ao atualizar tarefa:", erro);
            setMensagemErro("Erro ao atualizar tarefa.");
        }
    }

    async function lidarAlternarFinalizacaoTarefa(
        idTarefa: IdentificadorTarefa,
        tarefaJaFinalizada: boolean
    ) {
        try {
            let novaDataFinalizada: string | null;

            if (tarefaJaFinalizada) {
                // já estava finalizada → desfaz (manda null pro backend)
                novaDataFinalizada = null;
            } else {
                // não estava finalizada → define hoje
                novaDataFinalizada = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
            }

            const dadosAtualizados: AtualizarTarefaRequisicao = {
                dataFinalizada: novaDataFinalizada,
            };

            const tarefaAtualizada = await atualizarTarefaPorId(
                idTarefa,
                dadosAtualizados
            );

            // atualiza o mapa de tarefas na tela
            setTarefasPorListaId((mapaAtual) => {
                const novoMapa: Record<ListId, Tarefa[]> = {};

                for (const chave in mapaAtual) {
                    const idLista = Number(chave) as ListId;
                    const tarefasDaLista = mapaAtual[idLista];

                    novoMapa[idLista] = tarefasDaLista.map((tarefa) =>
                        tarefa.id === idTarefa ? tarefaAtualizada : tarefa
                    );
                }

                return novoMapa;
            });

            // se a tarefa estiver aberta no painel lateral, atualiza também lá
            if (tarefaSelecionada && tarefaSelecionada.id === idTarefa) {
                setTarefaSelecionada(tarefaAtualizada);
            }
        } catch (erro) {
            console.error("Erro ao alternar finalização da tarefa:", erro);
            setMensagemErro("Erro ao atualizar finalização da tarefa.");
        }
    }

    async function lidarMoverTarefa(
        idTarefa: IdentificadorTarefa,
        listaOrigemId: ListId,
        listaDestinoId: ListId
    ) {
        if (listaOrigemId === listaDestinoId) {
            return;
        }

        // Atualiza visualmente: tira da origem e coloca no final da lista destino
        setTarefasPorListaId((mapaAtual) => {
            const novoMapa: Record<ListId, Tarefa[]> = {};

            // cópia rasa das listas
            Object.entries(mapaAtual).forEach(([chave, lista]) => {
                const idLista = Number(chave) as ListId;
                novoMapa[idLista] = [...lista];
            });

            const tarefasOrigem = novoMapa[listaOrigemId] ?? [];
            const tarefasDestino = novoMapa[listaDestinoId] ?? [];

            const indiceNaOrigem = tarefasOrigem.findIndex(
                (tarefa) => tarefa.id === idTarefa
            );

            if (indiceNaOrigem === -1) {
                console.warn(
                    "Tarefa não encontrada na lista de origem ao mover:",
                    { idTarefa, listaOrigemId }
                );
                return mapaAtual;
            }

            const [tarefaMovida] = tarefasOrigem.splice(indiceNaOrigem, 1);

            novoMapa[listaOrigemId] = tarefasOrigem;
            novoMapa[listaDestinoId] = [
                ...tarefasDestino,
                { ...tarefaMovida, listaId: listaDestinoId },
            ];

            return novoMapa;
        });

        // Atualiza SOMENTE o id da lista no backend
        try {
            await atualizarTarefaPorId(idTarefa, {
                novaListaId: listaDestinoId,
            });
            console.log(idTarefa);
        } catch (erro) {
            console.error("Erro ao mover tarefa:", erro);
            setMensagemErro("Erro ao mover tarefa. Recarregando quadro.");
            await carregarDadosQuadro();
        }
    }

    function lidarCliqueNovaLista() {
        setMostrandoCampoNovaLista(true);
    }

    function lidarCliqueNotificacao() {
      setTemNotificacao(false);
    }

    async function lidarConfirmarNovaLista() {
        const nome = nomeNovaLista.trim();
        if (!nome) return;

        try {
            const listaCriada = await criarNovaLista(nome);
            setListas((listasAtuais) => [...listasAtuais, listaCriada]);
            setTarefasPorListaId((mapaAtual) => ({
                ...mapaAtual,
                [listaCriada.id]: [],
            }));
            setNomeNovaLista("");
            setMostrandoCampoNovaLista(false);
        } catch (erro) {
            console.error(erro);
            setMensagemErro("Erro ao criar lista.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <CabecalhoAplicacao
              temNotificacao={temNotificacao}
              aoCliqueNotificacao={lidarCliqueNotificacao}
            /> 

          <div className="sticky top-0 z-10 mb-4 flex items-center justify-between bg-background-main/80 px-4 py-12 backdrop-blur">

              {mensagemSnapback && (
                  <MensagemSnapback
                      mensagem={mensagemSnapback}
                      aoFecharMensagem={() => setMensagemSnapback(null)}
                  />
              )}

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
                              aoAbrirDetalhesTarefa={lidarAbrirDetalhesTarefa}
                              aoAlternarFinalizacaoTarefa={
                                  lidarAlternarFinalizacaoTarefa
                              }
                          />
                      ))}

                      <div
                          className="
                sticky top-0 z-10 mb-4
                flex items-start
                bg-background-main/80
                px-1 py-1
                backdrop-blur
              "
                      >
                          {mostrandoCampoNovaLista ? (
                              <CampoNomeNovaLista
                                  valorNomeLista={nomeNovaLista}
                                  aoAlterarNomeLista={setNomeNovaLista}
                                  aoConfirmarNomeLista={lidarConfirmarNovaLista}
                              />
                          ) : (
                              <BotaoAcaoComPlus
                                  texto="Nova Lista"
                                  aoClicar={lidarCliqueNovaLista}
                              />
                          )}
                      </div>
                  </main>
              )}

              <PainelDetalhesTarefa
                  tarefaSelecionada={tarefaSelecionada}
                  aoFecharPainel={lidarFecharPainelDetalhes}
                  aoDeletarTarefa={lidarDeletarTarefa}
                  aoAtualizarTarefa={lidarAtualizarDetalhesTarefa}
              />
        </div>
        </div>

    );
}
