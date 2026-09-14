import { useEffect, useState } from "react";
import { apiService } from "../../services/ApiService";

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

export function GestaoOng() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [erro, setErro] = useState("");

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

  return (
    <div className="gestao-ong-page">
      <aside className="gestao-sidebar">
        <a href="/">Página Inicial</a>
        <a href="#">Painel de Gestão</a>
        <a href="/registrar-animal">Cadastrar Animais</a>
        <a href="#">Animais Cadastrados</a>
        <a href="#">Adoções Recebidas</a>
        <a href="#">Editar perfil</a>
      </aside>

      <main className="container-animais">
        {erro && <p>{erro}</p>}

        {animais.map((animal) => (
          <div className="card-animal" key={animal.id}>
            <div className="foto-animal">
              {animal.fotos ? (
                <img
                  src={animal.fotos}
                  alt={`Foto de ${animal.nome}`}
                />
              ) : (
                <span>Sem foto</span>
              )}
            </div>

            <div className="informacoes-animal">
              <h2>{animal.nome}</h2>

              <p>Sexo: {animal.sexo}</p>
              <p>Idade: {animal.idade}</p>
              <p>Porte: {animal.porte}</p>
              <p>Localização: {animal.localizacao}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}