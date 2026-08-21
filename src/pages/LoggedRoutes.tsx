import { Navigate, Outlet } from "react-router-dom";
import { useAutenticacao } from "@/contextos/Autenticacao";

export default function LoggedRoute() {
  const { sessao, carregando } = useAutenticacao();

  if (carregando) {
    return null;
  }

  if (!sessao) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}