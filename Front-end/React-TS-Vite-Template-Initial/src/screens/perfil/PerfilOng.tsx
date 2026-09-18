import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { apiService } from "../../services/ApiService";
import "./Perfil.css";

interface PerfilOng {
  id: number;
  nome: string;
  nomeOng: string;
  email: string;
  telefone: string;
  endereco: string;
  fotoPerfil: string;
  dataNascimento: string;
  cnpj: string;
  descricaoOng: string;
}

export function PerfilOng() {
  const { id } = useParams();

  const [perfil, setPerfil] = useState<PerfilOng | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const response = await apiService.get(`/perfil/ong/${id}`);
        setPerfil(response.data);
        } catch (error: any) {
        console.error("Erro ao carregar perfil da ONG:", error);

        if (error.response?.status === 404) {
            setErro("ONG não encontrada.");
        } else {
            setErro("Não foi possível carregar o perfil da ONG.");
        }
        } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, [id]);

  if (carregando) {
    return (
      <>
        <Header />
        <main className="perfil-ong-container">
          <p>Carregando perfil...</p>
        </main>
      </>
    );
  }

    if (erro || !perfil) {
    return (
        <>
        <Header />

        <main className="perfil-ong-container">

            <div className="perfil-ong-nao-encontrada">

            <h1>
                ONG não encontrada
            </h1>

            <p>
                A ONG que você está procurando não existe
                ou não está mais disponível.
            </p>

            <button
                type="button"
                className="botao-voltar-animais"
                onClick={() => window.location.href = "/animais"}>
                Voltar para animais
            </button>

            </div>

        </main>
        </>
    );
    }

  return (
    <>
      <Header />

      <main className="perfil-ong-container">

        <div className="perfil-ong-card">

          <div className="perfil-ong-topo">

            <div className="perfil-ong-foto">

              {perfil.fotoPerfil ? (
                <img
                  src={perfil.fotoPerfil}
                  alt={`Foto de ${perfil.nomeOng || "ONG"}`}/>
              ) : (
                <span>
                  Sem foto
                </span>
              )}

            </div>

            <h1>
              {perfil.nomeOng || perfil.nome || "ONG"}
            </h1>

            <p>
              Cuidando de animais desde{" "}
              {perfil.dataNascimento
                ? new Date(perfil.dataNascimento).getFullYear()
                : "alguns anos"}
            </p>

          </div>

          <div className="perfil-ong-separador"/>

          <section className="perfil-ong-secao">

            <h2>
              Sobre a ONG
            </h2>

            <p className="perfil-ong-descricao">
              {perfil.descricaoOng ||
                "Nenhuma descrição informada."}
            </p>

          </section>

          <section className="perfil-ong-secao">

            <h2>
              Informações de contato
            </h2>

            <div className="perfil-ong-contatos">

              <div className="perfil-ong-contato">
                <strong>E-mail</strong>
                <span>{perfil.email || "Não informado"}</span>
              </div>

              <div className="perfil-ong-contato">
                <strong>Telefone</strong>
                <span>{perfil.telefone || "Não informado"}</span>
              </div>

              <div className="perfil-ong-contato">
                <strong>Endereço</strong>
                <span>{perfil.endereco || "Não informado"}</span>
              </div>

              <div className="perfil-ong-contato">
                <strong>CNPJ</strong>
                <span>{perfil.cnpj || "Não informado"}</span>
              </div>

            </div>

          </section>

        </div>

      </main>
    </>
  );
}