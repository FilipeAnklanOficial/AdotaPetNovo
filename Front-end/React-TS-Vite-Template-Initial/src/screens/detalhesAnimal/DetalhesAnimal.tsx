import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                alt={`Foto de ${animal.nome}`}
              />
            ) : (
              <div className="sem-foto">
                Sem foto disponível
              </div>
            )}
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className="detalhes-informacoes">

          <h1>{animal.nome}</h1>

          <p className="detalhes-descricao">
            {animal.comportamento}
          </p>

          <div className="detalhes-grid">

            {/* COLUNA ESQUERDA */}
            <div className="detalhes-coluna">
              <InfoCard
                titulo="Raça"
                valor={animal.raca}
              />

              <InfoCard
                titulo="Idade"
                valor={animal.idade}
              />

              <InfoCard
                titulo="Localização"
                valor={animal.localizacao}
              />

              <InfoCard
                titulo="Possui Microchip?"
                valor={animal.possuiChip ? "Sim" : "Não"}
              />
            </div>

            {/* COLUNA DIREITA */}
            <div className="detalhes-coluna">
              <InfoCard
                titulo="Sexo"
                valor={animal.sexo}
              />

              <InfoCard
                titulo="Porte do animal"
                valor={animal.porte}
              />

              <InfoCard
                titulo="Cor"
                valor={animal.cor}
              />

              <InfoCard
                titulo="ONG de resgate"
                valor={animal.nomeOng}
              />
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

          <button
            type="button"
            className="botao-adotar"
          >
            Adotar
          </button>

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
    <div className={`info-card ${grande ? "info-card-grande" : ""}`}>
      <strong>{titulo}</strong>

      <p>
        {valor || "Não informado"}
      </p>
    </div>
  );
}