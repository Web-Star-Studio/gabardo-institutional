import { HeaderProvider } from './contextos/Header';
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao';
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import Header from './componentes/Header';

import Login from "@/pages/Login";
import Principal from "@/pages/Painel";
import LoggedRoute from "@/pages/LoggedRoutes";

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

                  <Route element={<LoggedRoute />}>
                    <Route path="/painel" element={<Principal />} />
                  </Route>
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