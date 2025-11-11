import { BoardPage } from "./components/BoardPage"
import { CabecalhoAplicacao } from "./components/header/Cabecalho"


function App() {
  return (
    <div className="min-h-screen bg-background-main text-text-default font-poppins">
      {/* <CabecalhoAplicacao /> */}
      <BoardPage />
    </div>
  );
}

export default App
