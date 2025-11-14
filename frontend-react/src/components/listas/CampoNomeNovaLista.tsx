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
      box-border
      p-2 gap-2.5
      border border-white
      rounded-xl
    "
  >
    <input
      type="text"
      value={valorNomeLista}
      onChange={(evento) => aoAlterarNomeLista(evento.target.value)}
      onKeyDown={lidarPressionarTecla}
      className="
        w-[284px] h-[29px]
        text-[19.2px] leading-[29px]
        font-normal
        text-white
        bg-transparent
        outline-none
      "
      placeholder="Escreva o nome da sua lista"
    />
  </div>
)
}
