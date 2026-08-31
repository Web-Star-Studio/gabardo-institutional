import { HeaderProvider } from './contextos/Header';
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao';
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import Header from './componentes/Header';

import Login from "@/pages/Login";
import Principal from "@/pages/Painel";
import Softwares from "@/pages/Softwares";
import Usuarios from "@/pages/Usuarios";
import LoggedRoute from "@/pages/LoggedRoutes";
import Psi from "@/pages/Psi";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <AutenticacaoProvider>
          <DadosProvider>

            <FiltrosChamadasProvider>
              <HeaderProvider>
                <Header />

                <Routes>
                  <Route path="/" element={<Login />} />

                  <Route element={<LoggedRoute />}>
                    <Route path="/Painel" element={<Principal />} />
                    <Route path="/Softwares" element={<Softwares />} />
                    <Route path="/Usuarios" element={<Usuarios />} />
                    <Route path="/PSI" element={<Psi />} />
                  </Route>
                </Routes>

                {/*<DashboardHeader />*/}
              </HeaderProvider>
            </FiltrosChamadasProvider>
          </DadosProvider>
        </AutenticacaoProvider>
      </BrowserRouter>
    </>
  )
}

export default App