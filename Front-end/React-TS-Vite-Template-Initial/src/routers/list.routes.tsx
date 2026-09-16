import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  HomePage,
  Login,
  GestaoOng,
  RegistrarAnimal,
  DetalhesAnimal,
  CadastroUsuario
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
  
]);