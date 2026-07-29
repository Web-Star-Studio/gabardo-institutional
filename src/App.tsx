import { HeaderProvider } from './contextos/Header'; 
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao'; 
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import Header from './componentes/Header';
import Inicio from './paginas/Inicio';
//import TemplateGraficos from "@/componentes/dashboard/inicio";

function App() {
  return (
    <>
      <DadosProvider>
        <AutenticacaoProvider>
          <FiltrosChamadasProvider>
            <HeaderProvider>
                <Header />
                  <Inicio />
                {/* TemplateGraficos / */}
            </HeaderProvider>
          </FiltrosChamadasProvider>
        </AutenticacaoProvider>
      </DadosProvider>
    </>
  )
}

export default App