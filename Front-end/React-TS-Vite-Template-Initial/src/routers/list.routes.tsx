import { createBrowserRouter } from "react-router-dom";
import { ROOT_PATH } from "../constants/route.constant";
import { Home } from "../screens";
import EditarAnimal from "../screens/editar/EditarAnimal";
import FormularioAdocao from "../screens/formularios/FormularioAdocao.tsx";
import RegistrarAnimal from "@/screens/cadastros/RegistrarAnimal.tsx";
import { Login } from "@/screens/login/Login.tsx";

export const routesList = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <Home />,
  },

  {
    path: "/editar",
    element: <EditarAnimal />,
  },

  {
    path: "formularios",
    element: <FormularioAdocao />,
  },

  {
    path: "cadastros",
    element: <RegistrarAnimal/>,
  },

  {
    path: "login",
    element: <Login />,
  }
]);
