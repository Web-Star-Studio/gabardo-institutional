import { HeaderProvider } from './contextos/Header'; 
import { DadosProvider } from './contextos/Dados';
import Header from './componentes/Header';
import Login from './componentes/Login';

function App() {
  return (
    <>
      <DadosProvider>
        <HeaderProvider>
            <Header />
            <Login />
        </HeaderProvider>
      </DadosProvider>
    </>
  )
}

export default App