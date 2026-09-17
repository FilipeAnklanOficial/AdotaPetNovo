import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiService } from "../../services/ApiService";
import { Header } from "../../components/Header";

import "./GestaoOng.css";

interface Resposta {
  perguntaId: number;
  resposta: string;
}

interface AdocaoDetalhesData {
  id: number;

  animalId: number;
  animalNome: string;
  animalFoto: string;
  animalIdade: string;
  animalSexo: string;

  usuarioId: number;
  usuarioNome: string;
  usuarioEmail: string;
  usuarioDataNascimento: string | null;
  usuarioEndereco: string;

  dataResposta: string;
  status: string;

  respostas: Resposta[];
}

interface Pergunta {
  id: number;
  texto: string;
}

export function AdocaoDetalhes() {

  const { id } = useParams();

  const [adocao, setAdocao] = useState<AdocaoDetalhesData | null>(null);
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [erro, setErro] = useState("");

  const [statusParaAtualizar, setStatusParaAtualizar] = useState<
    "APROVADO" | "REPROVADO" | null
  >(null);

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {

    async function carregarDados() {

      try {

        const [adocaoResponse, perguntasResponse] = await Promise.all([
          apiService.get(`/adocao/${id}`),
          apiService.get("/perguntas/listar")
        ]);

        setAdocao(adocaoResponse.data);
        setPerguntas(perguntasResponse.data);

      } catch (error) {

        console.error("Erro ao carregar formulário:", error);

        setErro("Não foi possível carregar o formulário.");

      }
    }

    carregarDados();

  }, [id]);

  function formatarData(data: string): string {

    return new Date(data).toLocaleDateString("pt-BR");
  }

  function formatarDataNascimento(data: string | null): string {

    if (!data) {
      return "Não informado";
    }

    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
  }

  function formatarIdade(idade: string): string {

    switch (idade) {

      case "FILHOTE":
        return "Filhote";

      case "ADULTO":
        return "Adulto";

      case "IDOSO":
        return "Idoso";

      default:
        return idade;
    }
  }

  function formatarSexo(sexo: string): string {

    switch (sexo) {

      case "MACHO":
        return "Macho";

      case "FEMEA":
        return "Fêmea";

      default:
        return sexo;
    }
  }

  function formatarStatus(status: string): string {

    switch (status) {

      case "EM_ANALISE":
        return "Em análise";

      case "AGUARDANDO_APROVACAO":
        return "Aguardando aprovação";

      case "APROVADO":
        return "Aprovado";

      case "REPROVADO":
        return "Reprovado";

      default:
        return status;
    }
  }

  function encontrarResposta(perguntaId: number): string {

    const resposta = adocao?.respostas.find(
      (item) => item.perguntaId === perguntaId
    );

    return resposta?.resposta || "Não respondido";
  }

  function solicitarAtualizacaoStatus(
    status: "APROVADO" | "REPROVADO"
  ) {

    setStatusParaAtualizar(status);
  }

  async function confirmarAtualizacaoStatus() {

    if (!adocao || !statusParaAtualizar) {
      return;
    }

    try {

      await apiService.patch(
        `/adocao/${adocao.id}/status?status=${statusParaAtualizar}`
      );

      setAdocao({
        ...adocao,
        status: statusParaAtualizar
      });

      setStatusParaAtualizar(null);

      if (statusParaAtualizar === "APROVADO") {

        setMensagem("Solicitação aprovada com sucesso!");

      } else {

        setMensagem("Solicitação reprovada com sucesso!");

      }

    } catch (error) {

      console.error("Erro ao atualizar status:", error);

      setStatusParaAtualizar(null);

      setMensagem(
        "Não foi possível atualizar o status da solicitação."
      );
    }
  }

  if (erro) {

    return (
      <>
        <Header />

        <div className="gestao-ong-page">

          <aside className="gestao-sidebar">

            <a href="/">
              Página Inicial
            </a>

            <a href="/gestao-ong">
              Painel de Gestão
            </a>

            <a href="/registrar-animal">
              Cadastrar Animais
            </a>

            <a href="/animais-cadastrados">
              Animais Cadastrados
            </a>

            <a href="/adocoes-recebidas">
              Adoções Recebidas
            </a>

            <a href="#">
              Editar perfil
            </a>

          </aside>

          <main className="container-animais">

            <h1>
              Formulário de adoção
            </h1>

            <p>
              {erro}
            </p>

          </main>

        </div>
      </>
    );
  }

  if (!adocao) {

    return (
      <>
        <Header />

        <div className="gestao-ong-page">

          <aside className="gestao-sidebar">

            <a href="/">
              Página Inicial
            </a>

            <a href="/gestao-ong">
              Painel de Gestão
            </a>

            <a href="/registrar-animal">
              Cadastrar Animais
            </a>

            <a href="/animais-cadastrados">
              Animais Cadastrados
            </a>

            <a href="/adocoes-recebidas">
              Adoções Recebidas
            </a>

            <a href="#">
              Editar perfil
            </a>

          </aside>

          <main className="container-animais">

            <h1>
              Carregando formulário...
            </h1>

          </main>

        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="gestao-ong-page">

        <aside className="gestao-sidebar">

          <a href="/">
            Página Inicial
          </a>

          <a href="/gestao-ong">
            Painel de Gestão
          </a>

          <a href="/registrar-animal">
            Cadastrar Animais
          </a>

          <a href="/animais-cadastrados">
            Animais Cadastrados
          </a>

          <a href="/adocoes-recebidas">
            Adoções Recebidas
          </a>

          <a href="#">
            Editar perfil
          </a>

        </aside>

        <main className="container-animais">

          <h1>
            Formulário de adoção
          </h1>

          <div className="card-adocao-detalhes">

            <div className="topo-adocao">

              <div className="bloco-animal">

                <h2>
                  Animal
                </h2>

                <div className="dados-animal-adocao">

                  <div className="foto-animal-detalhes">

                    {adocao.animalFoto ? (

                      <img
                        src={adocao.animalFoto}
                        alt={`Foto de ${adocao.animalNome}`}/>

                    ) : (

                      <span>
                        Sem foto
                      </span>

                    )}

                  </div>

                  <div className="informacoes-topo">

                    <p>
                      <strong>Nome:</strong>{" "}
                      {adocao.animalNome}
                    </p>

                    <p>
                      <strong>Idade:</strong>{" "}
                      {formatarIdade(adocao.animalIdade)}
                    </p>

                    <p>
                      <strong>Sexo:</strong>{" "}
                      {formatarSexo(adocao.animalSexo)}
                    </p>

                  </div>

                </div>

              </div>

              <div className="bloco-adotante">

                <h2>
                  Adotante
                </h2>

                <div className="informacoes-topo">

                  <p>
                    <strong>Nome:</strong>{" "}
                    {adocao.usuarioNome}
                  </p>

                  <p>
                    <strong>Data de nascimento:</strong>{" "}
                    {formatarDataNascimento(
                      adocao.usuarioDataNascimento
                    )}
                  </p>

                  <p>
                    <strong>Endereço:</strong>{" "}
                    {adocao.usuarioEndereco || "Não informado"}
                  </p>

                  <p>
                    <strong>E-mail:</strong>{" "}
                    {adocao.usuarioEmail}
                  </p>

                </div>

              </div>

            </div>

            <div className="candidatura-adocao">

              <h2>
                Informações da candidatura
              </h2>

              <div className="informacoes-candidatura">

                <p>
                  <strong>Número:</strong>{" "}
                  {adocao.id}
                </p>

                <p>
                  <strong>Data de abertura:</strong>{" "}
                  {formatarData(adocao.dataResposta)}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {formatarStatus(adocao.status)}
                </p>

              </div>

            </div>

          </div>

          <div className="card-adocao-detalhes">

            <h2>
              Perguntas e respostas
            </h2>

            <div className="lista-perguntas">

              {perguntas.map((pergunta, index) => (

                <div
                  className="pergunta-resposta"
                  key={pergunta.id}>

                  <h3>
                    {index + 1}. {pergunta.texto}
                  </h3>

                  <p>
                    {encontrarResposta(pergunta.id)}
                  </p>

                </div>

              ))}

            </div>

            {adocao.status === "EM_ANALISE" && (

              <div className="acoes-formulario">

                <button
                  type="button"
                  className="botao-reprovar"
                  onClick={() =>
                    solicitarAtualizacaoStatus("REPROVADO")
                  }>

                  Reprovar

                </button>

                <button
                  type="button"
                  className="botao-aprovar"
                  onClick={() =>
                    solicitarAtualizacaoStatus("APROVADO")
                  }>

                  Aprovar

                </button>

              </div>

            )}

          </div>

        </main>

      </div>

      {statusParaAtualizar && (

        <div className="popup-overlay">

          <div className="popup">

            <h2>
              {statusParaAtualizar === "APROVADO"
                ? "Aprovar solicitação?"
                : "Reprovar solicitação?"}
            </h2>

            <p>
              {statusParaAtualizar === "APROVADO"
                ? "Você tem certeza que deseja aprovar esta solicitação de adoção?"
                : "Você tem certeza que deseja reprovar esta solicitação de adoção?"}
            </p>

            <div className="popup-acoes">

              <button
                type="button"
                onClick={() => setStatusParaAtualizar(null)}>

                Cancelar

              </button>

              <button
                type="button"
                onClick={confirmarAtualizacaoStatus}>

                Confirmar

              </button>

            </div>

          </div>

        </div>

      )}

      {mensagem && (

        <div className="popup-overlay">

          <div className="popup">

            <p>
              {mensagem}
            </p>

            <button
              type="button"
              onClick={() => setMensagem("")}>

              OK

            </button>

          </div>

        </div>

      )}

    </>
  );
}