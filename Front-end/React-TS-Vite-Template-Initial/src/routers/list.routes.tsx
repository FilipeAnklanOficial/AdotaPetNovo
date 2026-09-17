import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  HomePage,
  Login,
  GestaoOng,
  RegistrarAnimal,
  AnimaisCadastrados,
  AdocoesRecebidas,
  EditarAnimal,
  DetalhesAnimal,
  CadastroUsuario,
  FormularioAdocao,
  AdocaoDetalhes,
  VisualizarAnimal
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
  path: "/registrar-animal",
  element: <RegistrarAnimal />,
  },
  {
    path: "/animais/:id",
    element: <DetalhesAnimal />,
  },
  { path: "/cadastro", 
    element: <CadastroUsuario />,
  },
  {
  path: "/adocao/:animalId",
  element: <FormularioAdocao />
  },
  { path: "/animais-cadastrados", 
    element: <AnimaisCadastrados /> 
  },
  { path: "/adocoes-recebidas", 
    element: <AdocoesRecebidas /> 
  },
  { path: "/animais/:id/editar", 
    element: <EditarAnimal /> 
  },
  {
  path: "/adocoes-recebidas/:id",
  element: <AdocaoDetalhes />
  },
  { path: "/animais-cadastrados/:id", 
    element: <VisualizarAnimal /> 
  },
  
]);