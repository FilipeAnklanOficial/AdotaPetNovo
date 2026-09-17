import { Header } from "../../components/Header";

import "./GestaoOng.css";

export function GestaoOng() {

  return (
    <>
      <Header />

      <div className="gestao-ong-page">

        <aside className="gestao-sidebar">

          <a href="/">Página Inicial</a>

          <a href="/gestao-ong">Painel de Gestão</a>

          <a href="/registrar-animal">Cadastrar Animais</a>

          <a href="/animais-cadastrados">Animais Cadastrados</a>

          <a href="/adocoes-recebidas">Adoções Recebidas</a>

          <a href="#">Editar perfil</a>

        </aside>

        <main className="container-animais">

          <h1>Painel de Gestão</h1>

          <p>
            Bem-vindo ao painel de gestão da ONG.
          </p>

        </main>

      </div>
    </>
  );
}