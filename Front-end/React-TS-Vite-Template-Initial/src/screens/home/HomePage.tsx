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
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

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
          className="botao-registre">
          Registre-se agora
        </a>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <h1 className="titulo-preto">Perguntas frequentes</h1>

        <div className="container-grid-faq">
          <div className="faq-coluna">
            <div className="faq-item">
              <button
                type="button"
                className="botao-faq"
                onClick={() =>
                  setFaqAberto(faqAberto === 1 ? null : 1)
                }>
                <span>
                  Como o site garante a segurança da adoção?
                </span>

                <span className="faq-simbolo">
                  {faqAberto === 1 ? "−" : "+"}
                </span>
              </button>

              {faqAberto === 1 && (
                <div className="resposta-faq">
                  O Adota Pet organiza o processo de adoção e permite
                  que as ONGs analisem as informações fornecidas pelo
                  interessado antes de aprovar uma solicitação.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                type="button"
                className="botao-faq"
                onClick={() =>
                  setFaqAberto(faqAberto === 2 ? null : 2)
                }>
                <span>
                  Como faço para adotar um pet pelo site?
                </span>

                <span className="faq-simbolo">
                  {faqAberto === 2 ? "−" : "+"}
                </span>
              </button>

              {faqAberto === 2 && (
                <div className="resposta-faq">
                  Acesse a área de adoção, escolha um animal disponível,
                  visualize suas informações e preencha o formulário
                  de adoção. Depois, a ONG responsável analisará sua
                  solicitação.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                type="button"
                className="botao-faq"
                onClick={() =>
                  setFaqAberto(faqAberto === 3 ? null : 3)
                }>
                <span>
                  Posso adotar um pet de outra cidade/estado?
                </span>

                <span className="faq-simbolo">
                  {faqAberto === 3 ? "−" : "+"}
                </span>
              </button>

              {faqAberto === 3 && (
                <div className="resposta-faq">
                  Sim. A possibilidade de adoção depende da ONG e das
                  condições para realizar o processo, incluindo a
                  localização do animal e possíveis visitas.
                </div>
              )}
            </div>
          </div>

          <div className="faq-coluna">
            <div className="faq-item">
              <button
                type="button"
                className="botao-faq"
                onClick={() =>
                  setFaqAberto(faqAberto === 4 ? null : 4)
                }>
                <span>
                  Quais informações são obrigatórias para a adoção?
                </span>

                <span className="faq-simbolo">
                  {faqAberto === 4 ? "−" : "+"}
                </span>
              </button>

              {faqAberto === 4 && (
                <div className="resposta-faq">
                  O interessado precisa estar cadastrado na plataforma
                  e responder ao formulário de adoção com as informações
                  solicitadas.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                type="button"
                className="botao-faq"
                onClick={() =>
                  setFaqAberto(faqAberto === 5 ? null : 5)
                }>
                <span>
                  Como minha ONG pode se cadastrar no site?
                </span>

                <span className="faq-simbolo">
                  {faqAberto === 5 ? "−" : "+"}
                </span>
              </button>

              {faqAberto === 5 && (
                <div className="resposta-faq">
                  A ONG pode realizar seu cadastro pela opção de cadastro
                  disponível na plataforma, informando os dados solicitados.
                </div>
              )}
            </div>

            <div className="faq-item">
              <button
                type="button"
                className="botao-faq"
                onClick={() =>
                  setFaqAberto(faqAberto === 6 ? null : 6)
                }>
                <span>
                  Existe algum custo para usar a plataforma?
                </span>

                <span className="faq-simbolo">
                  {faqAberto === 6 ? "−" : "+"}
                </span>
              </button>

              {faqAberto === 6 && (
                <div className="resposta-faq">
                  Não. O Adota Pet é uma plataforma voltada para facilitar
                  a conexão entre animais resgatados, ONGs e pessoas
                  interessadas em adotar.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* POPUP LOGIN */}
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
                  const tipoUsuario =
                    localStorage.getItem("tipoUsuario");

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