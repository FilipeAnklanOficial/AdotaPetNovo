import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { apiService } from "../../services/ApiService";
import "./DetalhesAnimal.css";

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

export default function DetalhesAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarAnimal() {
      try {
        const response = await apiService.get(`/animal/${id}`);

        console.log("ANIMAL:", response.data);

        setAnimal(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do animal:", error);
        setErro("Não foi possível carregar os detalhes do animal.");
      } finally {
        setCarregando(false);
      }
    }

    buscarAnimal();
  }, [id]);

  function obterStatusTexto(status: string) {
    switch (status) {
      case "DISPONIVEL":
        return "Disponível";

      case "ADOTADO":
        return "Adotado";

      case "INATIVO":
        return "Inativo";

      case "EM_ANDAMENTO":
        return "Em andamento";

      default:
        return status || "Não informado";
    }
  }

  function obterClasseStatus(status: string) {
    switch (status) {
      case "DISPONIVEL":
        return "status-disponivel";

      case "ADOTADO":
        return "status-adotado";

      case "INATIVO":
        return "status-inativo";

      case "EM_ANDAMENTO":
        return "status-em-andamento";

      default:
        return "status-desconhecido";
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#36C3FF] text-xl font-semibold">
          Carregando...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {erro}
        </p>
      </div>
    );
  }

  if (!animal) {
    return null;
  }

  return (
    <div className="detalhes-page">

      <Header />

      <main className="detalhes-container">

        <div className="detalhes-content">

          {/* FOTO */}

          <div className="detalhes-foto-container">

            <div className="detalhes-foto">

              {animal.fotos ? (
                <img
                  src={animal.fotos}
                  alt={`Foto de ${animal.nome}`}/>
              ) : (
                <div className="sem-foto">
                  Sem foto disponível
                </div>
              )}

            </div>

          </div>

          {/* INFORMAÇÕES */}

          <div className="detalhes-informacoes">

            {/* STATUS */}

            <div className={`status-animal ${obterClasseStatus(animal.status)}`}>

              <span className="status-bolinha"/>

              <span>
                {obterStatusTexto(animal.status)}
              </span>

            </div>

            <h1>
              {animal.nome}
            </h1>

            <p className="detalhes-descricao">
              {animal.comportamento ||
                "Nenhuma informação sobre o comportamento."}
            </p>

            {/* CARDS */}

            <div className="detalhes-grid">

              {/* COLUNA ESQUERDA */}

              <div className="detalhes-coluna">

                <InfoCard
                  titulo="Espécie"
                  valor={animal.especie}
                />

                <InfoCard
                  titulo="Raça"
                  valor={animal.raca}
                />

                <InfoCard
                  titulo="Idade"
                  valor={animal.idade}
                />

                <InfoCard
                  titulo="Sexo"
                  valor={animal.sexo}
                />

                <InfoCard
                  titulo="Porte"
                  valor={animal.porte}
                />

              </div>

              {/* COLUNA DIREITA */}

              <div className="detalhes-coluna">

                <InfoCard
                  titulo="Cor"
                  valor={animal.cor}
                />

                <InfoCard
                  titulo="Localização"
                  valor={animal.localizacao}
                />

                <InfoCard
                  titulo="Possui Microchip?"
                  valor={animal.possuiChip ? "Sim" : "Não"}
                />

                <InfoCard
                  titulo="Vacinado?"
                  valor={animal.vacinado ? "Sim" : "Não"}
                />

                <button
                  type="button"
                  className="info-card info-card-ong"
                  onClick={() =>
                    navigate(`/perfil/ong/${animal.ongId}`)
                  }>

                  <strong>
                    ONG responsável
                  </strong>

                  <p>
                    {animal.nomeOng || "ONG não informada"}
                  </p>

                </button>

              </div>

            </div>

            {/* HISTÓRICO */}

            <div className="historico-container">

              <InfoCard
                titulo="Histórico de saúde"
                valor={animal.historicoSaude}
                grande
              />

            </div>

            {/* BOTÃO ADOTAR */}

            {animal.status === "DISPONIVEL" && (
              <button
                type="button"
                className="botao-adotar"
                onClick={() => {

                  const token = localStorage.getItem("token");

                  if (!token) {

                    localStorage.setItem(
                      "rotaDepoisLogin",
                      `/adocao/${animal.id}`
                    );

                    navigate("/login");

                    return;
                  }

                  navigate(`/adocao/${animal.id}`);
                }}>
                Adotar
              </button>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

interface InfoCardProps {
  titulo: string;
  valor: string;
  grande?: boolean;
}

function InfoCard({
  titulo,
  valor,
  grande = false,
}: InfoCardProps) {

  return (
    <div
      className={`info-card ${
        grande ? "info-card-grande" : ""
      }`}>

      <strong>
        {titulo}
      </strong>

      <p>
        {valor || "Não informado"}
      </p>

    </div>
  );
}