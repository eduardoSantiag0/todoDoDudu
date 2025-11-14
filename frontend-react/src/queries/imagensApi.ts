import type { Imagem } from '../types/imagem'

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function listarImagensDaTarefa(
  tarefaId: number,
): Promise<Imagem[]> {
  const resposta = await fetch(
    `${API_BASE_URL}/api/v1/tasks/${tarefaId}/imagens`
  );

  // if (!resposta.ok) {
  //   throw new Error('Erro ao buscar imagens da tarefa');
  // }

  return await resposta.json() as Imagem[];
}

export async function uploadImagemDaTarefa(
  tarefaId: number,
  arquivo: File,
): Promise<void> {
  const formData = new FormData();
  formData.append('image', arquivo);

  const resposta = await fetch(
    `${API_BASE_URL}/api/v1/tasks/${tarefaId}/imagens`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!resposta.ok) {
    if (resposta.status === 413) {
      const texto = await resposta.text();
      throw new Error(texto || 'Arquivo muito grande.');
    }
    throw new Error('Erro ao fazer upload da imagem');
  }
}

export async function deletarImagem(imagemId: number): Promise<void> {
  const resposta = await fetch(
    `${API_BASE_URL}/api/v1/tasks/imagens/${imagemId}`,
    { method: 'DELETE' },
  );

  if (!resposta.ok) {
    throw new Error('Erro ao deletar imagem');
  }
}

export function montarUrlImagem(imagemId: number): string {
  return `${API_BASE_URL}/api/v1/tasks/imagens/${imagemId}`;
}
