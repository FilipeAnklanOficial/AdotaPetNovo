import { useEffect, useState } from "react";

import { apiService } from "../../services/ApiService";

import { Header } from "../../components/Header";

import "./GestaoOng.css";

interface Adocao {

  id: number;

  animalId: number;

  animalNome: string;

  animalFoto: string;

  usuarioId: number;

  usuarioNome: string;

  usuarioEmail: string;

  usuarioEndereco: string;

  usuarioTelefone: string;

  dataResposta: string;

  status: string;
}

export function AdocoesRecebidas() {

  const [adocoes, setAdocoes] = useState<Adocao[]>([]);

  const [erro, setErro] = useState("");

  useEffect(() => {

    async function carregarAdocoes() {

      try {

        const response = await apiService.get("/adocao/ong");

        setAdocoes(response.data);

      } catch (error) {

        console.error("Erro ao carregar adoções:", error);

        setErro("Não foi possível carregar as adoções.");
      }
    }

    carregarAdocoes();

  }, []);

  function formatarData(data: string): string {

    const dataFormatada = new Date(data);

    return dataFormatada.toLocaleDateString("pt-BR");
  }

  function visualizarFormulario(id: number): void {

    window.location.href = `/adocoes-recebidas/${id}`;
  }

  function formatarStatus(status: string): {
    texto: string;
    classe: string;
    } {

    switch (status) {

        case "EM_ANALISE":
        return {
            texto: "Em análise",
            classe: "status-em-analise"
        };

        case "APROVADO":
        return {
            texto: "Aprovado",
            classe: "status-aprovado"
        };

        case "REPROVADO":
        return {
            texto: "Reprovado",
            classe: "status-reprovado"
        };

        case "AGUARDANDO_APROVACAO":
        return {
            texto: "Aguardando aprovação",
            classe: "status-em-analise"
        };

        default:
        return {
            texto: status,
            classe: ""
        };
    }
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
            Adoções Recebidas
          </h1>

          {erro && (

            <p>
              {erro}
            </p>

          )}

          {adocoes.length === 0 && !erro && (

            <p>
              Nenhuma candidatura de adoção recebida.
            </p>

          )}

          {adocoes.map((adocao) => (

            <div
              className="card-animal"
              key={adocao.id}>

              <div className="foto-animal">

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

              <div className="informacoes-animal">

                <h2>
                  {adocao.animalNome}
                </h2>

                <p>
                  <strong>
                    Adotante:
                  </strong>{" "}
                  {adocao.usuarioNome}
                </p>

                <p>
                  <strong>
                    Endereço:
                  </strong>{" "}
                  {adocao.usuarioEndereco}
                </p>

                <p>
                  <strong>
                    Telefone:
                  </strong>{" "}
                  {adocao.usuarioTelefone}
                </p>

                <p>
                  <strong>
                    Data do formulário:
                  </strong>{" "}
                  {formatarData(adocao.dataResposta)}
                </p>

              </div>

              <div className="acoes-animal">

                <div className="flex flex-col items-center gap-4">

                    <span
                    className={`status-adocao ${formatarStatus(adocao.status).classe}`}>

                    {formatarStatus(adocao.status).texto}

                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            visualizarFormulario(adocao.id)
                        }
                        className="botao-visualizar">

                        Visualizar formulário

                    </button>

                </div>

                </div>

            </div>

          ))}

        </main>

      </div>
    </>
  );
}