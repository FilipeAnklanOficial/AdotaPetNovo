import { Header } from "../../components/Header";
import { SidebarOng } from "../../components/SidebarOng";
import "./GestaoOng.css";

export function GestaoOng() {
  return (
    <>
      <Header />

      <div className="gestao-ong-page">

        <SidebarOng />

        <main className="container-animais">

          <h1>
            Painel de Gestão
          </h1>

          <p>
            Bem-vindo ao painel de gestão da ONG.
          </p>

        </main>

      </div>
    </>
  );
}