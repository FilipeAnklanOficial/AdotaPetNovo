import "./HomePage.css";

import abracoDog from "../../images/abracoDog.png";
import dogTransparente from "../../images/dogtransparente.png";
import logoEscrita from "../../images/logoEscrita01.png";
import logoMelhor from "../../images/logoMelhor.png";
import pessoaEcachorro from "../../images/pessoaEcachorro.png";
import pessoas from "../../images/pessoas.png";
import circuloPessoas from "../../images/circuloPessoas.png";
import { useState } from "react";



export const HomePage = (): JSX.Element => {

  const [mostrarPopupLogin, setMostrarPopupLogin] = useState(false);
  return (
    <div className="home-page">
      {/* HEADER */}
      <header className="home-header">
        <nav className="home-nav">
          <a
            href="/login"
            onClick={(event) => {

              const token = localStorage.getItem("token");

              if (token) {

                event.preventDefault();

                setMostrarPopupLogin(true);

              }

            }}>
            Entrar
          </a>

          <a href="/animais">Adotar</a>

          <a href="/">
            <img
              src={logoEscrita}
              alt="Logo Adota Pet"
              className="logo-escrita"
            />
          </a>

          <a href="#sobre">Sobre</a>

          <a href="#faq">F.A.Q</a>
        </nav>
      </header>

      {/* BANNER INICIAL */}
      <section className="div-inicial">
        <div className="banner-conteudo">
          <p className="texto-adote">ADOTE</p>

          <img
            src={dogTransparente}
            alt="Gato e cachorro"
            className="dog-transparente"
          />

          <p className="texto-cor">
            Adicione <span>cor</span> à
            <br />
            vida deles
          </p>
        </div>
      </section>

      {/* LOGO CENTRAL */}
      <div className="logo-central">
        <img
          src={logoMelhor}
          alt="Logo completa Adota Pet"
        />
      </div>

      {/* SOBRE */}
      <section id="sobre" className="sobre-section">
        <h1 className="titulo-preto">Sobre</h1>

        <p className="texto-info">
          Bem-vindo ao Adota Pet, a plataforma que conecta ONGs de proteção
          animal a pessoas dispostas a dar um lar cheio de amor a gatos e
          cachorros resgatados!
          <br />
          <strong>Adote! Não compre! Salve vidas!</strong>
        </p>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="imagem-info">
        <img
          src={pessoaEcachorro}
          alt="Pessoa com cachorro"
          className="imagem-pessoa-cachorro"
        />

        <div className="imagem-info-conteudo">
          <h1>O que fazemos?</h1>

          <p>Nosso site é uma ponte digital entre:</p>

          <div className="card-container">
            <div className="card-info">
              <h3>ONGs e Protetores</h3>

              <p>
                Que podem cadastrar os animais resgatados e encontrar pessoas
                interessadas em oferecer um novo lar.
              </p>
            </div>

            <div className="card-info">
              <h3>Pessoas que querem adotar</h3>

              <p>
                Que encontram perfis de animais disponíveis para adoção e
                podem iniciar o processo de adoção.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="como-funciona">
        <h1 className="titulo-preto">Como funciona?</h1>

        <div className="container-grid">
          {/* ONG */}
          <div className="item-grid">
            <div className="card-grid">
              <img
                src={circuloPessoas}
                alt="ONGs e protetores"
              />
            </div>

            <h3>ONGs/Protetores</h3>

            <p>
              Se cadastram e adicionam os pets resgatados.
            </p>
          </div>

          {/* ADOTANTES */}
          <div className="item-grid">
            <div className="card-grid">
              <img
                src={abracoDog}
                alt="Pessoa abraçando cachorro"
              />
            </div>

            <h3>Adotantes</h3>

            <p>
              Buscam por animais, entram em contato e agendam visitas.
            </p>
          </div>

          {/* ADOÇÃO */}
          <div className="item-grid">
            <div className="card-grid">
              <img
                src={pessoas}
                alt="Pessoas juntas"
              />
            </div>

            <h3>Juntos, fazemos a adoção acontecer</h3>

            <p>
              Com segurança e responsabilidade.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h1 className="titulo-preto">Quer fazer parte disso?</h1>

        <a
          href="/cadastro"
          className="botao-registre"
        >
          Registre-se agora
        </a>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <h1>Perguntas frequentes</h1>

        <div className="container-grid-faq">
          <div className="faq-coluna">
            <button className="botao-faq">
              Como o site garante a segurança da adoção?
            </button>

            <button className="botao-faq">
              Como faço para adotar um pet pelo site?
            </button>

            <button className="botao-faq">
              Posso adotar um pet de outra cidade/estado?
            </button>
          </div>

          <div className="faq-coluna">
            <button className="botao-faq">
              Quais informações são obrigatórias para a adoção?
            </button>

            <button className="botao-faq">
              Como minha ONG pode se cadastrar no site?
            </button>

            <button className="botao-faq">
              Existe algum custo para usar a plataforma?
            </button>
          </div>
        </div>
      </section>
      {mostrarPopupLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Você já está logado
            </h2>

            <p className="text-gray-600 mb-6">
              Você já possui uma sessão ativa no Adota Pet.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setMostrarPopupLogin(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition">
                Fechar
              </button>

              <button
                type="button"
                onClick={() => {
                  const tipoUsuario = localStorage.getItem("tipoUsuario");
                  setMostrarPopupLogin(false);
                  if (tipoUsuario === "ROLE_ONG") {
                    window.location.href = "/gestao-ong";
                    return;
                  }
                  window.location.href = "/animais";
                }}
                className="bg-[#36C3FF] hover:bg-[#22b5f2] text-white font-semibold px-6 py-3 rounded-xl transition">
                Ir para meu perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};