import { HeaderProvider } from './contextos/Header'; 
import { DadosProvider } from './contextos/Dados';
import Header from './componentes/Header';
//import Login from './paginas/Login';
import Dashboard from "./paginas/dashboards/Dashboards";
import Teste  from "./Testes";

function App() {
  return (
    <>
      <DadosProvider>
        <HeaderProvider>
            <Header />
            {/* <Teste /> */}
            <Dashboard />
            {/* <Login /> */}
        </HeaderProvider>
      </DadosProvider>
    </>
  )
}

export default App