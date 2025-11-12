interface CampoNomeNovaListaProps {
  valorNomeLista: string;
  aoAlterarNomeLista: (novoNome: string) => void;
  aoConfirmarNomeLista: () => void;
}

export function CampoNomeNovaLista({
  valorNomeLista,
  aoAlterarNomeLista,
  aoConfirmarNomeLista,
}: CampoNomeNovaListaProps) {
  function lidarPressionarTecla(evento: React.KeyboardEvent<HTMLInputElement>) {
    if (evento.key === 'Enter') {
      aoConfirmarNomeLista()
    }
  }

  return (
    <div
      className="
        flex flex-row items-center justify-center
        w-[300px] h-[45px]
        rounded-xl
        p-2
        gap-2.5
      "
    >
      <input
        type="text"
        value={valorNomeLista}
        onChange={(evento) => aoAlterarNomeLista(evento.target.value)}
        onKeyDown={lidarPressionarTecla}
        className="
          w-[284px] h-[29px]
          text-[19.2px]
          font-normal
          transition-colors  duration-200
          input
        "
      />
    </div>
  )
}
