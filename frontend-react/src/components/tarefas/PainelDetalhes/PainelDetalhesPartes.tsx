import type { PrioridadeTarefa, Tarefa } from '../../../types/tarefa'
import { DropdownDataConclusao } from './dropdowns/DropdownDataConclusao'
import { DropdownPrioridade } from './dropdowns/DropdownPrioridade'
import { AiFillDelete } from 'react-icons/ai'
import {
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Imagem } from '../../../types/imagem'
import { montarUrlImagem } from '../../../queries/imagensApi'
import { useBoard } from '../../../context/BoardContext'
import { criarAcoesDeImagem } from '../../../context/actions/imagemActions'

export interface CabecalhoTarefaProps {
    tarefa: Tarefa;
}

export function CabecalhoTarefa({ tarefa }: CabecalhoTarefaProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="w-full text-[27.65px] leading-[41px] font-bold ">
        {tarefa.nome}
      </h2>
    </div>
  )
}


export interface SecaoDataProps {
    dataConclusaoISO: string;
    aoAlterarData: (novaData: string) => void;
    prioridade: PrioridadeTarefa;
    aoAlterarPrioridade: (novaPrioridade: PrioridadeTarefa) => void;
}
export function SecaoData({
  dataConclusaoISO,
  aoAlterarData,
  prioridade,
  aoAlterarPrioridade,
}: SecaoDataProps) {
  return (
    <div className="flex w-full max-w-[390px] flex-col gap-5">
      <div className="flex w-full items-center justify-between gap-4">
        <span className="text-[16px] leading-6 font-semibold ">
          Data de conclusão
        </span>
        <DropdownDataConclusao valorISO={dataConclusaoISO} aoAlterarData={aoAlterarData} />
      </div>

      {/* Prioridade */}
      <div className="flex w-full items-center justify-between gap-4 ">
        <span className="text-[16px] leading-6 font-semibold ">
          Prioridade
        </span>

        <DropdownPrioridade 
          prioridadeSelecionada={prioridade}
          aoSelecionarPrioridade={aoAlterarPrioridade}
        />
      </div>
    </div>
  )
}


export interface SecaoDescricaoProps {
  descricao: string;
  onChangeDescricao: (novaDescricao: string) => void;
  onBlurDescricao: () => void;
}
export function SecaoDescricao({
  descricao,
  onChangeDescricao,
  onBlurDescricao,
}: SecaoDescricaoProps) {
  return (
    <div className="flex w-full max-w-[390px] flex-col gap-4">
      <span className="text-[16px] leading-6 font-semibold font-poppins text-text-default">
        Descrição
      </span>

      <div
        className="
          w-full min-h-[201px]
          box-border flex
          border border-button-hover rounded p-2
          btn-transition
          focus-within:border-white
        "
      >
        <textarea
          className="
            w-full min-h-[180px]
            bg-transparent outline-none resize-none
            text-[13.33px] leading-[20px]
            font-normal text-text-default
          "
          value={descricao}
          onChange={(e) => onChangeDescricao(e.target.value)}
          onBlur={onBlurDescricao}
          placeholder="Adicione uma descrição para esta tarefa..."
        />
      </div>
    </div>
  )
}



interface BotaoExcluirTarefaProps {
    onClick: () => void;
}

export function BotaoExcluirTarefa({ onClick }: BotaoExcluirTarefaProps) {
    return (
        <button
            type="button"
            onClick={onClick}
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
                cursor-pointer
            "
        >
            <AiFillDelete className="w-4 h-4 text-danger-background" />
            <span>Deletar tarefa</span>
        </button>
    )
}

interface SecaoNomeProps {
  nome: string;
  onChangeNome: (novo: string) => void;
  onSalvar: () => void;    
  // onCancelar: () => void;  
}

export function SecaoNome({ 
  nome, 
  onChangeNome, 
  onSalvar, 
  // onCancelar 
}: SecaoNomeProps) {
  
  const [editando, setEditando] = useState(false)  
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (editando && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editando])


  function lidarKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSalvar()
      setEditando(false)
      inputRef.current?.blur()
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setEditando(false)
      inputRef.current?.blur();
    }
  }

  function lidarBlur() {
    onSalvar()
    setEditando(false)
  }
  return (
    <div className="flex w-full justify-center">
      {editando ? (
        <input
          ref={inputRef}
          className="
            mx-auto
            w-[473px]
            font-bold
            text-[33.18px] leading-[50px]
            rounded-lg border
            border-text-muted
            focus:ring-success-background bg-background-main 
            text-text-default placeholder:text-text-muted
            wrap-break-word
          "
          value={nome}
          onChange={(e) => onChangeNome(e.target.value)}
          onKeyDown={lidarKeyDown}
          onBlur={lidarBlur}
        />
      ) : (
        <p
          className="
            mx-auto
            w-[473px] 
            font-poppins font-bold
            text-[33.18px] leading-[50px]
            cursor-text break-words
          "
          onClick={() => setEditando(true)}
        >
          {nome}
        </p>
      )}
    </div>
  )
}



export function SecaoImagens() {
  const { tarefaSelecionada, exibirMensagemSnapback } = useBoard()
  const [imagens, setImagens] = useState<Imagem[]>([])
  const [carregando, setCarregando] = useState(false)
  const inputArquivoRef = useRef<HTMLInputElement | null>(null)

  const tarefaId = tarefaSelecionada?.id

  const exibirMensagem = (msg: string) => {
    exibirMensagemSnapback(msg)
  }
  const setErro = (msg: string) => {
    console.error(msg)
    exibirMensagemSnapback(msg)
  }

  const {
    carregarImagens,
    uploadImagem,
    deletarImagemDaTarefa,
    limparImagens,
  } = criarAcoesDeImagem({ setImagens, exibirMensagem, setErro })

  useEffect(() => {
    if (!tarefaId) {
      limparImagens()
      return
    }

    async function carregar() {
      if (!tarefaId) {
        return
      }
      setCarregando(true)
      await carregarImagens(tarefaId)
      setCarregando(false)
    }

    void carregar()
  }, [tarefaId])


  async function lidarSelecionarArquivo(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!tarefaId) return
    const arquivos = event.target.files
    if (!arquivos || arquivos.length === 0) return

    const arquivo = arquivos[0]
    setCarregando(true)
    try {
      await uploadImagem(tarefaId, arquivo)
    } catch (erro) {
      console.error(erro)
    } finally {
      setCarregando(false)
      if (inputArquivoRef.current) {
        inputArquivoRef.current.value = ''
      }
    }
  }

  async function lidarRemoverImagem(id: number) {
    setCarregando(true)
    await deletarImagemDaTarefa(id)
    setCarregando(false)
  }

  if (!tarefaId) {
    return null
  }

  return (
    <section className="w-full flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-text-primary">Arquivos</h3>

      <button
        type="button"
        onClick={() => inputArquivoRef.current?.click()}
        className="
          inline-flex items-center justify-center
          px-3 py-2 rounded-md
          border border-button-hover
          hover:bg-button-hover
          transition
          cursor-pointer
          btn
        "
      >
        Anexar imagem
      </button>

      <input
        ref={inputArquivoRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={lidarSelecionarArquivo}
      />

      {carregando && (
        <p className="text-xs text-text-muted">Carregando imagens...</p>
      )}

    <div className="flex gap-3 overflow-x-auto pb-1">
        {imagens.map((imagem) => (
          <div
            key={imagem.id}
            className="
              relative group
              w-24 h-24 rounded-md overflow-hidden
              border border-[#4E4E4E]
            "
          >
            <a
              href={montarUrlImagem(imagem.id)}
              target="_blank"
              rel="noreferrer"
              download={imagem.nome}
              className="block w-full h-full"
            >
              <img
                src={montarUrlImagem(imagem.id)}
                alt={imagem.nome}
                className="w-full h-full object-cover"
              />
            </a>

            <button
              type="button"
              onClick={() => lidarRemoverImagem(imagem.id)}
              className="
                absolute top-1 right-1
                rounded-full px-1.5 text-[10px]
                bg-black/70 text-white
                opacity-0 group-hover:opacity-100
                transition
              "
            >
              x
            </button>
          </div>
        ))}

        {imagens.length === 0 && !carregando && (
          <p className="text-xs text-text-muted">
            Nenhuma imagem anexada ainda.
          </p>
        )}
      </div>
    </section>
  )
}