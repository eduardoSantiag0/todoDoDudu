import { useEffect, useState } from "react";
import type {
    Tarefa,
    IdentificadorTarefa,
    PrioridadeTarefa,
} from "../types/tarefa";
import type { AtualizarTarefaRequisicao } from "../queries/tarefasApi";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { BotaoFinalizarTarefa } from "./btns/BotaoFinalizarTarefa";
import { BotaoFecharPainelDetalhes } from "./btns/BotaoFecharPainelDetalhes";
import { DropdownPrioridade } from "./DropdownPrioridade";

interface PropriedadesPainelDetalhesTarefa {
    tarefaSelecionada: Tarefa | null;
    aoFecharPainel: () => void;
    aoDeletarTarefa: (idTarefa: IdentificadorTarefa) => void;
    aoAtualizarTarefa: (
        idTarefa: IdentificadorTarefa,
        dadosAtualizados: AtualizarTarefaRequisicao
    ) => void;
}

export function PainelDetalhesTarefa({
    tarefaSelecionada,
    aoFecharPainel,
    aoDeletarTarefa,
    aoAtualizarTarefa,
}: PropriedadesPainelDetalhesTarefa) {
    const painelAberto = Boolean(tarefaSelecionada);

    const [descricaoEditada, setDescricaoEditada] = useState("");

    useEffect(() => {
        if (tarefaSelecionada) {
            setDescricaoEditada(tarefaSelecionada.descricao ?? "");
        } else {
            setDescricaoEditada("");
        }
    }, [tarefaSelecionada]);

    const tarefaEstaFinalizada = Boolean(
        (tarefaSelecionada as any)?.dataFinalizada ??
            (tarefaSelecionada as any)?.dataConcluida
    );

    function formatarDataConclusao(): string {
        if (!tarefaSelecionada) return "Sem data";

        const dataBruta =
            (tarefaSelecionada as any).dataPrevistaConclusao ??
            (tarefaSelecionada as any).dataEsperadaDeConclusao;

        if (!dataBruta) return "Sem data";

        const data = new Date(dataBruta);
        if (Number.isNaN(data.getTime())) {
            return String(dataBruta);
        }

        const texto = data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return texto.toUpperCase(); // 23 JAN 2024
    }

    function lidarCliqueFinalizarTarefa() {
        if (!tarefaSelecionada) return;

        const tarefaJaFinalizada = tarefaEstaFinalizada;
        const novaDataFinalizada = tarefaJaFinalizada
            ? null
            : new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

        const dadosAtualizados: AtualizarTarefaRequisicao = {
            dataFinalizada: novaDataFinalizada,
        };

        aoAtualizarTarefa(tarefaSelecionada.id, dadosAtualizados);
    }

    function lidarBlurDescricao() {
        if (!tarefaSelecionada) return;

        const descricaoOriginal = tarefaSelecionada.descricao ?? "";
        if (descricaoEditada === descricaoOriginal) {
            return;
        }

        const dadosAtualizados: AtualizarTarefaRequisicao = {
            descricao: descricaoEditada,
        };

        aoAtualizarTarefa(tarefaSelecionada.id, dadosAtualizados);
    }

    function lidarCliqueDeletar() {
        if (!tarefaSelecionada) return;

        const desejaDeletar = window.confirm(
            `Tem certeza que deseja deletar a tarefa "${tarefaSelecionada.nome}"?`
        );

        if (desejaDeletar) {
            aoDeletarTarefa(tarefaSelecionada.id);
            aoFecharPainel();
        }
    }

    function lidarAlterarPrioridade(novaPrioridade: PrioridadeTarefa) {
        if (!tarefaSelecionada) return;
        if (novaPrioridade === tarefaSelecionada.prioridade) return;

        const dadosAtualizados: AtualizarTarefaRequisicao = {
            prioridade: novaPrioridade,
        };

        aoAtualizarTarefa(tarefaSelecionada.id, dadosAtualizados);
    }

    return (
        <aside
            className={`
        fixed right-0 top-0 z-30
        h-screen w-[608px]
        bg-background-main
        border-l border-white
        overflow-y-auto
        transform transition-transform duration-300 ease-out
        ${painelAberto ? "translate-x-0" : "translate-x-full"}
      `}
        >
            {/* Botão fechar no canto esquerdo do painel */}
            <div className="absolute left-5 top-14">
                <BotaoFecharPainelDetalhes aoClicarFechar={aoFecharPainel} />
            </div>

            <div
                className="
          h-full
          px-[68px] pt-10 pb-10
          flex flex-col
          gap-4
        "
            >
                {!tarefaSelecionada && (
                    <p className="text-sm text-text-muted">
                        Nenhuma tarefa selecionada.
                    </p>
                )}

                {tarefaSelecionada && (
                    <div
                        className="
              flex flex-col items-start
              gap-4
              w-[473px]
            "
                    >
                        {/* Topo: botão finalizar + título + linha */}
                        <div
                            className="
                flex flex-col items-end
                gap-2
                w-full
              "
                        >
                            <BotaoFinalizarTarefa
                                tarefaEstaFinalizada={tarefaEstaFinalizada}
                                aoClicarBotao={lidarCliqueFinalizarTarefa}
                            />

                            <div
                                className="
                  flex flex-col
                  w-full
                  gap-2
                  pt-2
                "
                            >
                                <h2
                                    className="
                    w-full
                    text-[33.18px]
                    leading-[50px]
                    font-bold
                    font-poppins
                    text-white
                  "
                                >
                                    {tarefaSelecionada.nome}
                                </h2>

                                <div className="w-full border-b border-[#4E4E4E]" />
                            </div>
                        </div>

                        {/* Data de conclusão + Prioridade */}
                        <div
                            className="
                flex flex-col items-start
                gap-5
                w-[399px]
              "
                        >
                            {/* Data de conclusão */}
                            <div
                                className="
                  flex flex-row items-start
                  gap-[42px]
                  w-[321px] h-7
                "
                            >
                                <span
                                    className="
                    text-[16px]
                    leading-6
                    font-semibold
                    font-poppins
                    text-white
                  "
                                >
                                    Data de conclusão
                                </span>

                                <div
                                    className="
                    flex flex-row items-start justify-center
                    h-7 w-[126px]
                    px-2 py-1
                    gap-2
                    border border-[#4E4E4E]
                    rounded-sm
                  "
                                >
                                    <BsFillCalendarWeekFill className="w-4 h-4 text-white" />
                                    <span
                                        className="
                      text-[13.33px]
                      leading-5
                      font-semibold
                      font-poppins
                      text-white
                    "
                                    >
                                        {formatarDataConclusao()}
                                    </span>
                                </div>
                            </div>

                            {/* Prioridade com DropdownPrioridade */}
                            <div
                                className="
                  flex flex-row items-start justify-between
                  w-[399px] h-9
                "
                            >
                                <span
                                    className="
                    text-[16px]
                    leading-6
                    font-semibold
                    font-poppins
                    text-white
                  "
                                >
                                    Prioridade
                                </span>

                                <DropdownPrioridade
                                    prioridadeSelecionada={
                                        tarefaSelecionada.prioridade
                                    }
                                    aoSelecionarPrioridade={
                                        lidarAlterarPrioridade
                                    }
                                />
                            </div>
                        </div>

                        {/* Linha divisória */}
                        <div className="w-full border-b border-[#4E4E4E]" />

                        {/* Descrição */}
                        <div
                            className="
                flex flex-col items-start
                gap-4
                w-full
              "
                        >
                            <span
                                className="
                  text-[16px]
                  leading-6
                  font-semibold
                  font-poppins
                  text-white
                "
                            >
                                Descrição
                            </span>

                            <div
                                className="
                  w-full h-[232px]
                  border border-[#4E4E4E]
                  rounded-sm
                  p-2
                  flex
                "
                            >
                                <textarea
                                    className="
                    w-full h-full
                    bg-transparent
                    outline-none
                    resize-none
                    text-[16px]
                    leading-6
                    font-normal
                    font-poppins
                    text-white
                  "
                                    value={descricaoEditada}
                                    onChange={(evento) =>
                                        setDescricaoEditada(evento.target.value)
                                    }
                                    onBlur={lidarBlurDescricao}
                                    placeholder="Adicione uma descrição para esta tarefa..."
                                />
                            </div>
                        </div>

                        {/* Linha divisória inferior */}
                        <div className="w-full border-b border-[#4E4E4E]" />

                        {/* Ação de deletar tarefa */}
                        <button
                            type="button"
                            onClick={lidarCliqueDeletar}
                            className="
                flex flex-row items-center
                w-full h-10
                px-2 py-2
                gap-2
                bg-background-main
                hover:bg-background-secondary/40
                text-danger-background
                font-poppins
                text-[16px]
                leading-6
                rounded-sm
                transition-all duration-200
              "
                        >
                            <AiFillDelete className="w-4 h-4 text-danger-background" />
                            <span>Deletar tarefa</span>
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
