// src/context/actions/imagemActions.ts
import type { Dispatch, SetStateAction } from 'react'
import type { IdentificadorTarefa } from '../../types/tarefa'
import type { Imagem } from '../../types/imagem'
import {
  deletarImagem as deletarImagemApi,
  listarImagensDaTarefa,
  uploadImagemDaTarefa,
} from '../../queries/imagensApi'

type Deps = {
  setImagens: Dispatch<SetStateAction<Imagem[]>>
  exibirMensagem: (msg: string) => void
  setErro: (msg: string) => void
}

export function criarAcoesDeImagem({
  setImagens,
  exibirMensagem,
  setErro,
}: Deps) {
  async function carregarImagens(tarefaId: IdentificadorTarefa) {
    try {
      const lista = await listarImagensDaTarefa(tarefaId)
      setImagens(lista)
    } catch (e) {
      console.error(e)
      setErro('Erro ao carregar imagens.')
    }
  }

  async function uploadImagem(tarefaId: IdentificadorTarefa, arquivo: File) {
    try {
      await uploadImagemDaTarefa(tarefaId, arquivo)
      const lista = await listarImagensDaTarefa(tarefaId)
      setImagens(lista)
      exibirMensagem('Imagem anexada com sucesso!')
    } catch (e) {
      console.error(e)
      const msg =
        e instanceof Error
          ? e.message
          : 'Erro ao anexar imagem.'
      setErro(msg) // aqui entra o SnapBack com "Arquivo muito grande..." se vier de 413
    }
  }

  async function deletarImagemDaTarefa(imagemId: number) {
    try {
      await deletarImagemApi(imagemId)
      setImagens((atual) => atual.filter((img) => img.id !== imagemId))
      exibirMensagem('Imagem removida com sucesso!')
    } catch (e) {
      console.error(e)
      setErro('Erro ao remover imagem.')
    }
  }

  function limparImagens() {
    setImagens([])
  }

  return {
    carregarImagens,
    uploadImagem,
    deletarImagemDaTarefa,
    limparImagens,
  }
}
