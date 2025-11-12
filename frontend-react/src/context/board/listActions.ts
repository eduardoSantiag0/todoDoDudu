import {
  atualizarNomeLista,
  criarNovaLista,
  deletarListaPorId,
} from '../../queries/listasApi'
import type { IdentificadorLista, Lista } from '../../types/lista'
import type { TarefasPorLista } from './boardTypes'

type Deps = {
  setListas: React.Dispatch<React.SetStateAction<Lista[]>>
  setTarefasPorListaId: React.Dispatch<React.SetStateAction<TarefasPorLista>>
  exibirMensagem: (msg: string) => void
  setErro: (msg: string) => void
}

export function criarAcoesDeLista({
  setListas,
  setTarefasPorListaId,
  exibirMensagem,
  setErro,
}: Deps) {
  async function criarLista(nome: string) {
    const n = nome.trim()
    if (!n) {return}
    try {
      const nova = await criarNovaLista(n)
      setListas(prev => [...prev, nova])
      setTarefasPorListaId(m => ({ ...m, [nova.id]: [] }))
      exibirMensagem('Lista criada!')
    } catch (e) {
      console.error(e)
      setErro('Erro ao criar lista.')
    }
  }

  async function renomearLista(id: IdentificadorLista, nome: string) {
    try {
      const atual = await atualizarNomeLista(id, nome)
      setListas(prev => prev.map(l => (l.id === id ? atual : l)))
      exibirMensagem('Lista renomeada!')
    } catch (e) {
      console.error(e)
      setErro('Erro ao renomear lista.')
    }
  }

  async function deletarLista(id: IdentificadorLista) {
    try {
      await deletarListaPorId(id)
      setListas(prev => prev.filter(l => l.id !== id))
      setTarefasPorListaId(m => {
        const novo = { ...m }
        delete novo[id]
        return novo
      })
      exibirMensagem('Lista deletada com sucesso!')
    } catch (e) {
      console.error(e)
      setErro('Erro ao deletar lista.')
    }
  }

  return { criarLista, renomearLista, deletarLista }
}
