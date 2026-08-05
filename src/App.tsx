import { HeaderProvider } from './contextos/Header';
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao';
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import Header from './componentes/Header';
import Login from "@/paginas/Login";
import DashboardHeader from "@/paginas/Dashboard";

function App() {
  return (
    <>
      <DadosProvider>
        <AutenticacaoProvider>
          <FiltrosChamadasProvider>
            <HeaderProvider>
              <Header />
              {/*<Login />*/}
              <DashboardHeader />
            </HeaderProvider>
          </FiltrosChamadasProvider>
        </AutenticacaoProvider>
      </DadosProvider>
    </>
  )
}

export default App