import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { apiService } from "../../services/ApiService";

import { Header } from "../../components/Header";

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
  cor: string;
  especie: string;
  porte: string;
  sexo: string;
  status: string;
}

export function EditarAnimal() {

  const { id } = useParams();

  const [animal, setAnimal] = useState<Animal | null>(null);

  const [erro, setErro] = useState("");

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {

    async function carregarAnimal() {

      try {

        const response = await apiService.get(`/animal/${id}`);

        const animalCarregado = response.data;

        if (
          animalCarregado.status !== "DISPONIVEL" &&
          animalCarregado.status !== "EM_ANDAMENTO"
        ) {

          setMensagem(
            `Não é possível editar um animal com status ${formatarStatus(animalCarregado.status)}.`
          );

          return;
        }

        setAnimal(animalCarregado);

      } catch (error) {

        console.error("Erro ao carregar animal:", error);

        setErro("Não foi possível carregar os dados do animal.");

      }

    }

    carregarAnimal();

  }, [id]);

  function formatarStatus(status: string): string {

    switch (status) {

      case "DISPONIVEL":
        return "Disponível";

      case "EM_ANDAMENTO":
        return "Em andamento";

      case "ADOTADO":
        return "Adotado";

      case "INATIVO":
        return "Inativo";

      default:
        return status;

    }

  }

  function atualizarCampo(
    campo: keyof Animal,
    valor: string | boolean
  ) {

    if (!animal) {
      return;
    }

    setAnimal({
      ...animal,
      [campo]: valor
    });

  }

  async function salvarAlteracoes() {

    if (!animal) {
      return;
    }

    try {

      await apiService.put(`/animal/${animal.id}`, animal);

      alert("Animal atualizado com sucesso!");

      window.location.href = "/animais-cadastrados";

    } catch (error) {

      console.error("Erro ao atualizar animal:", error);

      alert("Não foi possível atualizar o animal.");

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
            Editar Animal
          </h1>

          {erro && (

            <p>
              {erro}
            </p>

          )}

          {animal && (

            <div className="card-editar-animal">

              <div className="formulario-editar-animal">

                <div className="campo-editar">

                  <label>
                    Nome
                  </label>

                  <input
                    type="text"
                    value={animal.nome}
                    onChange={(e) =>
                      atualizarCampo("nome", e.target.value)
                    }/>

                </div>

                <div className="campo-editar">

                  <label>
                    Raça
                  </label>

                  <input
                    type="text"
                    value={animal.raca}
                    onChange={(e) =>
                      atualizarCampo("raca", e.target.value)
                    }/>

                </div>

                <div className="campo-editar">

                  <label>
                    Espécie
                  </label>

                  <select
                    value={animal.especie}
                    onChange={(e) =>
                      atualizarCampo("especie", e.target.value)
                    }>

                    <option value="CACHORRO">
                      Cachorro
                    </option>

                    <option value="GATO">
                      Gato
                    </option>

                  </select>

                </div>

                <div className="campo-editar">

                  <label>
                    Idade
                  </label>

                  <select
                    value={animal.idade}
                    onChange={(e) =>
                      atualizarCampo("idade", e.target.value)
                    }>

                    <option value="FILHOTE">
                      Filhote
                    </option>

                    <option value="ADULTO">
                      Adulto
                    </option>

                    <option value="IDOSO">
                      Idoso
                    </option>

                  </select>

                </div>

                <div className="campo-editar">

                  <label>
                    Sexo
                  </label>

                  <select
                    value={animal.sexo}
                    onChange={(e) =>
                      atualizarCampo("sexo", e.target.value)
                    }>

                    <option value="MACHO">
                      Macho
                    </option>

                    <option value="FEMEA">
                      Fêmea
                    </option>

                  </select>

                </div>

                <div className="campo-editar">

                  <label>
                    Porte
                  </label>

                  <select
                    value={animal.porte}
                    onChange={(e) =>
                      atualizarCampo("porte", e.target.value)
                    }>

                    <option value="PEQUENO">
                      Pequeno
                    </option>

                    <option value="MEDIO">
                      Médio
                    </option>

                    <option value="GRANDE">
                      Grande
                    </option>

                  </select>

                </div>

                <div className="campo-editar">

                  <label>
                    Cor
                  </label>

                  <input
                    type="text"
                    value={animal.cor}
                    onChange={(e) =>
                      atualizarCampo("cor", e.target.value)
                    }/>

                </div>

                <div className="campo-editar">

                  <label>
                    Localização
                  </label>

                  <input
                    type="text"
                    value={animal.localizacao}
                    onChange={(e) =>
                      atualizarCampo("localizacao", e.target.value)
                    }/>

                </div>

                <div className="campo-editar campo-largo">

                  <label>
                    Foto
                  </label>

                  <input
                    type="text"
                    value={animal.fotos}
                    onChange={(e) =>
                      atualizarCampo("fotos", e.target.value)
                    }/>

                </div>

                <div className="campo-editar campo-largo">

                  <label>
                    Histórico de saúde
                  </label>

                  <textarea
                    value={animal.historicoSaude}
                    onChange={(e) =>
                      atualizarCampo(
                        "historicoSaude",
                        e.target.value
                      )
                    }/>

                </div>

                <div className="campo-editar campo-largo">

                  <label>
                    Comportamento
                  </label>

                  <textarea
                    value={animal.comportamento}
                    onChange={(e) =>
                      atualizarCampo(
                        "comportamento",
                        e.target.value
                      )
                    }/>

                </div>

                <div className="opcoes-editar">

                  <label className="checkbox-editar">

                    <input
                      type="checkbox"
                      checked={animal.possuiChip}
                      onChange={(e) =>
                        atualizarCampo(
                          "possuiChip",
                          e.target.checked
                        )
                      }/>

                    Possui chip

                  </label>

                  <label className="checkbox-editar">

                    <input
                      type="checkbox"
                      checked={animal.vacinado}
                      onChange={(e) =>
                        atualizarCampo(
                          "vacinado",
                          e.target.checked
                        )
                      }/>

                    Vacinado

                  </label>

                </div>

                <div className="campo-editar">

                  <label>
                    Status
                  </label>

                  <select
                    value={animal.status}
                    onChange={(e) =>
                      atualizarCampo("status", e.target.value)
                    }
                    disabled={
                      animal.status === "ADOTADO" ||
                      animal.status === "EM_ANDAMENTO"
                    }>

                    <option value="DISPONIVEL">
                      Disponível
                    </option>

                    <option value="INATIVO">
                      Inativo
                    </option>

                  </select>

                </div>

              </div>

              <div className="acoes-editar-animal">

                <button
                  type="button"
                  className="botao-cancelar-edicao"
                  onClick={() =>
                    window.location.href = "/animais-cadastrados"
                  }>

                  Cancelar

                </button>

                <button
                  type="button"
                  className="botao-salvar-edicao"
                  onClick={salvarAlteracoes}>

                  Salvar alterações

                </button>

              </div>

            </div>

          )}

        </main>

      </div>

      {mensagem && (

        <div className="popup-overlay">

          <div className="popup">

            <h2>
              Edição não permitida
            </h2>

            <p>
              {mensagem}
            </p>

            <button
              type="button"
              onClick={() => {
                setMensagem("");
                window.location.href = "/animais-cadastrados";
              }}>

              OK

            </button>

          </div>

        </div>

      )}

    </>
  );
}