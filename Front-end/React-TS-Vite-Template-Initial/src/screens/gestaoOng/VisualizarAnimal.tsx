import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../services/ApiService";
import { Header } from "../../components/Header";
import { SidebarOng } from "../../components/SidebarOng";
import "./GestaoOng.css";

interface Animal {
  id: number;
  nome: string;
  raca: string;
  idade: string;
  historicoSaude: string;
  comportamento: string;
  fotos: string;
  possuiChip: boolean;
  localizacao: string;
  vacinado: boolean;
  ongId: number;
  nomeOng: string;
  especie: string;
  porte: string;
  sexo: string;
  status: string;
  cor: string;
}

export function VisualizarAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] =
    useState<Animal | null>(null);

  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAnimal() {
      try {
        const response = await apiService.get(
          `/animal/${id}`
        );

        setAnimal(response.data);
      } catch (error) {
        console.error(
          "Erro ao carregar animal:",
          error
        );

        setErro(
          "Não foi possível carregar as informações do animal."
        );
      }
    }

    carregarAnimal();
  }, [id]);

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

  function formatarEspecie(especie: string): string {
    switch (especie) {
      case "CACHORRO":
        return "Cachorro";

      case "GATO":
        return "Gato";

      default:
        return especie;
    }
  }

  function formatarPorte(porte: string): string {
    switch (porte) {
      case "PEQUENO":
        return "Pequeno";

      case "MEDIO":
        return "Médio";

      case "GRANDE":
        return "Grande";

      default:
        return porte;
    }
  }

  function formatarStatus(status: string): string {
    switch (status) {
      case "DISPONIVEL":
        return "Disponível";

      case "ADOTADO":
        return "Adotado";

      case "EM_ANDAMENTO":
        return "Adoção em andamento";

      case "INATIVO":
        return "Inativo";

      default:
        return status;
    }
  }

  if (erro) {
    return (
      <>
        <Header />

        <div className="gestao-ong-page">

          <SidebarOng />

          <main className="container-animais">

            <h1>
              Visualizar animal
            </h1>

            <p>
              {erro}
            </p>

          </main>

        </div>
      </>
    );
  }

  if (!animal) {
    return (
      <>
        <Header />

        <div className="gestao-ong-page">

          <SidebarOng />

          <main className="container-animais">

            <h1>
              Carregando animal...
            </h1>

          </main>

        </div>
      </>
    );
  }

  function editarAnimal() {
    navigate(
      `/animais/${animal!.id}/editar`
    );
  }

  function visualizarPaginaAnimal() {
    navigate(
      `/animais/${animal!.id}`
    );
  }

  return (
    <>
      <Header />

      <div className="gestao-ong-page">

        <SidebarOng />

        <main className="container-animais">

          <h1>
            Visualizar animal
          </h1>

          <div className="card-visualizar-animal">

            <div className="topo-visualizar-animal">

              <div className="foto-visualizar-animal">

                {animal.fotos ? (
                  <img
                    src={animal.fotos}
                    alt={`Foto de ${animal.nome}`}/>
                ) : (
                  <span>
                    Sem foto
                  </span>
                )}

              </div>

              <div className="informacoes-principais-animal">

                <h2>
                  {animal.nome}
                </h2>

                <p>
                  <strong>
                    Espécie:
                  </strong>{" "}
                  {formatarEspecie(
                    animal.especie
                  )}
                </p>

                <p>
                  <strong>
                    Raça:
                  </strong>{" "}
                  {animal.raca ||
                    "Não informado"}
                </p>

                <p>
                  <strong>
                    Idade:
                  </strong>{" "}
                  {formatarIdade(
                    animal.idade
                  )}
                </p>

                <p>
                  <strong>
                    Sexo:
                  </strong>{" "}
                  {formatarSexo(
                    animal.sexo
                  )}
                </p>

                <p>
                  <strong>
                    Porte:
                  </strong>{" "}
                  {formatarPorte(
                    animal.porte
                  )}
                </p>

                <p>
                  <strong>
                    Cor:
                  </strong>{" "}
                  {animal.cor ||
                    "Não informado"}
                </p>

              </div>

            </div>

            <div className="informacoes-completas-animal">

              <h2>
                Informações do animal
              </h2>

              <p>
                <strong>
                  Localização:
                </strong>{" "}
                {animal.localizacao ||
                  "Não informado"}
              </p>

              <p>
                <strong>
                  Vacinado:
                </strong>{" "}
                {animal.vacinado
                  ? "Sim"
                  : "Não"}
              </p>

              <p>
                <strong>
                  Possui chip:
                </strong>{" "}
                {animal.possuiChip
                  ? "Sim"
                  : "Não"}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {formatarStatus(
                  animal.status
                )}
              </p>

              <p>
                <strong>
                  Histórico de saúde:
                </strong>{" "}
                {animal.historicoSaude ||
                  "Não informado"}
              </p>

              <p>
                <strong>
                  Comportamento:
                </strong>{" "}
                {animal.comportamento ||
                  "Não informado"}
              </p>

              <p>
                <strong>
                  ONG responsável:
                </strong>{" "}
                {animal.nomeOng ||
                  "Não informado"}
              </p>

            </div>

            <div className="acoes-visualizar-animal">

              <button
                type="button"
                className="botao-editar-animal"
                onClick={editarAnimal}>
                Editar
              </button>

              {(animal.status === "DISPONIVEL" ||
                animal.status === "INATIVO") && (
                <button
                  type="button"
                  className={
                    animal.status === "INATIVO"
                      ? "botao-status-animal botao-ativar-animal"
                      : "botao-status-animal botao-inativar-animal"
                  }
                  onClick={async () => {
                    try {
                      if (
                        animal.status ===
                        "INATIVO"
                      ) {
                        await apiService.put(
                          `/animal/${animal.id}/ativar`
                        );

                        setAnimal({
                          ...animal,
                          status: "DISPONIVEL"
                        });
                      } else {
                        await apiService.put(
                          `/animal/${animal.id}/inativar`
                        );

                        setAnimal({
                          ...animal,
                          status: "INATIVO"
                        });
                      }
                    } catch (error) {
                      console.error(
                        "Erro ao alterar status do animal:",
                        error
                      );
                    }
                  }}>
                  {animal.status === "INATIVO"
                    ? "Ativar"
                    : "Inativar"}
                </button>
              )}

              <button
                type="button"
                className="botao-excluir-animal">
                Excluir
              </button>

              <button
                type="button"
                className="botao-visualizar-publico"
                onClick={visualizarPaginaAnimal}>
                Visualizar animal
              </button>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}