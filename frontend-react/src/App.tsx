import { BoardPage } from './components/layout/BoardPage'
import { CabecalhoAplicacao } from './components/layout/Cabecalho'
import { BoardProvider } from './context/BoardContext'

// function App() {
//     return (
//         <div className="min-h-screen bg-background-main text-text-default font-poppins">
//             {/* <CabecalhoAplicacao /> */}
//             <BoardPage />
//         </div>
//     )
// }

function App() {
  return (
    <div className="min-h-screen bg-background-main text-text-default font-poppins">
      <BoardProvider>
        <BoardPage />
      </BoardProvider>
    </div>
  )
}

export default App
