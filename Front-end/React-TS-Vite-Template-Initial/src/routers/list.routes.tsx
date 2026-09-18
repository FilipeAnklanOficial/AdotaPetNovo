import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  HomePage,
  Login,
  GestaoOng,
  RegistrarAnimal,
  AnimaisCadastrados,
  AdocoesRecebidas,
  AdocaoDetalhes,
  DetalhesAnimal,
  CadastroUsuario,
  FormularioAdocao,
  EditarAnimal,
  VisualizarAnimal,
  Perfil,
  EditarPerfil,
  PerfilOng
} from "../screens";

export const routesList = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/animais",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/gestao-ong",
    element: <GestaoOng />,
  },
  { 
    path: "/perfil", 
    element: <Perfil /> 
  },
  { 
    path: "/perfil/ong/:id", 
    element: <PerfilOng /> 
  },
  { 
    path: "/perfil/edicao", 
    element: <EditarPerfil /> 
  },
  {
    path: "/registrar-animal",
    element: <RegistrarAnimal />,
  },
  {
    path: "/animais/:id",
    element: <DetalhesAnimal />,
  },
  { 
    path: "/cadastro", 
    element: <CadastroUsuario /> 
  },
  {
    path: "/adocao/:animalId",
    element: <FormularioAdocao />
  },
  { 
    path: "/animais-cadastrados", 
    element: <AnimaisCadastrados /> 
  },
  { 
    path: "/adocoes-recebidas", 
    element: <AdocoesRecebidas /> 
  },
  {
    path: "/adocoes-recebidas/:id",
    element: <AdocaoDetalhes />
  },
  { 
    path: "/adocoes-enviadas/:id", 
    element: <AdocaoDetalhes /> 
  },
  { 
    path: "/animais/:id/editar", 
    element: <EditarAnimal /> 
  },
  { 
    path: "/animais-cadastrados/:id", 
    element: <VisualizarAnimal /> 
  },
  
]);