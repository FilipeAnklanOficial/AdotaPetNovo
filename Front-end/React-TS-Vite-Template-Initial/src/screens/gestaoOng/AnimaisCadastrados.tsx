import { useEffect, useState } from "react";
import { apiService } from "../../services/ApiService";
import { Header } from "../../components/Header";
import { SidebarOng } from "../../components/SidebarOng";
import "./GestaoOng.css";

interface Animal {
  id: number;
  nome: string;
  fotos: string;
  sexo: string;
  idade: string;
  porte: string;
  localizacao: string;
  status: string;
}

export function AnimaisCadastrados() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [erro, setErro] = useState("");
  const [animalParaExcluir, setAnimalParaExcluir] =
    useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarAnimais() {
      try {
        const response = await apiService.get("/animal/ong");
        setAnimais(response.data);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
        setErro("Não foi possível carregar os animais.");
      }
    }

    carregarAnimais();
  }, []);

  function excluirAnimal(id: number) {
    setAnimalParaExcluir(id);
  }

  async function confirmarExclusao() {
    if (animalParaExcluir === null) {
      return;
    }

    try {
      await apiService.delete(
        `/animal/${animalParaExcluir}`
      );

      setAnimais((animaisAtuais) =>
        animaisAtuais.filter(
          (animal) => animal.id !== animalParaExcluir
        )
      );

      setAnimalParaExcluir(null);
      setMensagem("Animal excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir animal:", error);
      setAnimalParaExcluir(null);
      setMensagem("Não foi possível excluir o animal.");
    }
  }

  function visualizarAnimal(id: number): void {
    window.location.href = `/animais-cadastrados/${id}`;
  }

  return (
    <>
      <Header />

      <div className="gestao-ong-page">

        <SidebarOng />

        <main className="container-animais">

          <h1>
            Animais Cadastrados
          </h1>

          {erro && (
            <p>
              {erro}
            </p>
          )}

          {animais.map((animal) => (
            <div
              className="card-animal card-animal-clicavel"
              key={animal.id}
              onClick={() =>
                visualizarAnimal(animal.id)
              }>

              <div className="foto-animal">

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

              <div className="informacoes-animal">

                <h2>
                  {animal.nome}
                </h2>

                <p>
                  Sexo: {animal.sexo}
                </p>

                <p>
                  Idade: {animal.idade}
                </p>

                <p>
                  Porte: {animal.porte}
                </p>

                <p>
                  Localização: {animal.localizacao}
                </p>

                <p>
                  Status: {animal.status}
                </p>

              </div>

              <div className="acoes-animal">

                <button
                  type="button"
                  title="Editar animal"
                  onClick={(event) => {
                    event.stopPropagation();
                    window.location.href =
                      `/animais/${animal.id}/editar`;
                  }}>
                  ✏️
                </button>

                <button
                  type="button"
                  title="Excluir animal"
                  onClick={(event) => {
                    event.stopPropagation();
                    excluirAnimal(animal.id);
                  }}>
                  🗑️
                </button>

              </div>

            </div>
          ))}

        </main>

      </div>

      {animalParaExcluir !== null && (
        <div className="popup-overlay">

          <div className="popup">

            <h2>
              Excluir animal?
            </h2>

            <p>
              Tem certeza que deseja excluir este animal?
            </p>

            <div className="popup-acoes">

              <button
                type="button"
                onClick={() =>
                  setAnimalParaExcluir(null)
                }>
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarExclusao}>
                Excluir
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
              onClick={() =>
                setMensagem("")
              }>
              OK
            </button>

          </div>

        </div>
      )}

    </>
  );
}