import { HeaderProvider } from './contextos/Header'; 
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao'; 
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import Header from './componentes/Header';
import Login from "@/paginas/Login";

function App() {
  return (
    <>
      <DadosProvider>
        <AutenticacaoProvider>
          <FiltrosChamadasProvider>
            <HeaderProvider>
                <Header />
                <Login />
            </HeaderProvider>
          </FiltrosChamadasProvider>
        </AutenticacaoProvider>
      </DadosProvider>
    </>
  )
}

export default App