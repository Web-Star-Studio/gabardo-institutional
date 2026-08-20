import { HeaderProvider } from './contextos/Header';
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao';
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import Header from './componentes/Header';

import Login from "@/pages/Login";
import Painel from "@/pages/Login";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <DadosProvider>
        <AutenticacaoProvider>
          <FiltrosChamadasProvider>
            <HeaderProvider>
              <Header />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/painel" element={<Painel />} />
                </Routes>
              </BrowserRouter>
              {/*<DashboardHeader />*/}
            </HeaderProvider>
          </FiltrosChamadasProvider>
        </AutenticacaoProvider>
      </DadosProvider>
    </>
  )
}

export default App