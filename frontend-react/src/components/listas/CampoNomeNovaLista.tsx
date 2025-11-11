interface PropriedadesCampoNomeNovaLista {
  valorNomeLista: string;
  aoAlterarNomeLista: (novoNome: string) => void;
  aoConfirmarNomeLista: () => void;
}

export function CampoNomeNovaLista({
  valorNomeLista,
  aoAlterarNomeLista,
  aoConfirmarNomeLista,
}: PropriedadesCampoNomeNovaLista) {
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
        border border-white
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
          bg-transparent
          outline-none
          font-poppins
          text-[19.2px]
          leading-[29px]
          font-normal
          text-white
        "
      />
    </div>
  )
}
