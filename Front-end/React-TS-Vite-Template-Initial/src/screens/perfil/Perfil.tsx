import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { apiService } from "../../services/ApiService";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import "./Perfil.css";

interface Perfil {
  id: number;
  nome: string;
  nomeOng: string;
  email: string;
  telefone: string;
  endereco: string;
  fotoPerfil: string;
  cpf: string;
  dataNascimento: string;
  cnpj: string;
  descricaoOng: string;
  tipoUsuario: string;
}

interface FormularioEnviado {
  id: number;
  animalId: number;
  animalNome: string;
  animalFoto: string;
  dataResposta: string;
  status: string;
}

export function Perfil() {
  const navigate = useNavigate();
  const location = useLocation();

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [formularios, setFormularios] = useState<FormularioEnviado[]>([]);
  const [mostrarFormularios, setMostrarFormularios] = useState(false);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const response = await apiService.get("/perfil");
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setErro("Não foi possível carregar o perfil.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  useEffect(() => {
    if (location.state?.abrirFormularios) {
      carregarFormularios();

      navigate("/perfil", {
        replace: true,
        state: {}
      });
    }
  }, [location.state, navigate]);

  function formatarData(data: string): string {
    if (!data) {
      return "Não informado";
    }

    const dataParte = data.split("T")[0];
    const partes = dataParte.split("-");

    if (partes.length !== 3) {
      return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function formatarStatus(status: string): string {
    switch (status) {
      case "APROVADO":
        return "Aprovado";
      case "REPROVADO":
        return "Reprovado";
      case "EM_ANALISE":
        return "Em análise";
      default:
        return status;
    }
  }

  async function carregarFormularios() {
    try {
      const response = await apiService.get(
        "/adocao/meus-formularios"
      );

      setFormularios(response.data);
      setMostrarFormularios(true);
    } catch (error) {
      console.error(
        "Erro ao carregar formulários:",
        error
      );

      setErro(
        "Não foi possível carregar os formulários."
      );
    }
  }

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("tipoUsuario");
    navigate("/login");
  }

  if (carregando) {
    return (
      <>
        <Header />

        <div className="perfil-carregando">
          <p>
            Carregando perfil...
          </p>
        </div>
      </>
    );
  }

  if (erro) {
    return (
      <>
        <Header />

        <div className="perfil-erro">
          <p>
            {erro}
          </p>
        </div>
      </>
    );
  }

  if (!perfil) {
    return null;
  }

  if (perfil.tipoUsuario === "ROLE_ONG") {
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
                  <strong>
                    E-mail
                  </strong>

                  <span>
                    {perfil.email ||
                      "Não informado"}
                  </span>
                </div>

                <div className="perfil-ong-contato">
                  <strong>
                    Telefone
                  </strong>

                  <span>
                    {perfil.telefone ||
                      "Não informado"}
                  </span>
                </div>

                <div className="perfil-ong-contato">
                  <strong>
                    Endereço
                  </strong>

                  <span>
                    {perfil.endereco ||
                      "Não informado"}
                  </span>
                </div>

                <div className="perfil-ong-contato">
                  <strong>
                    CNPJ
                  </strong>

                  <span>
                    {perfil.cnpj ||
                      "Não informado"}
                  </span>
                </div>

              </div>

            </section>

            <div className="perfil-ong-acoes">

              <button
                type="button"
                className="botao-editar-perfil"
                onClick={() =>
                  navigate("/perfil/edicao")
                }>
                Editar perfil
              </button>

            </div>

          </div>

        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="perfil-container">

        <div className="perfil-painel-adotante">

          <aside className="perfil-sidebar">

            <div className="perfil-sidebar-topo">

              <div className="perfil-foto perfil-foto-sidebar">

                {perfil.fotoPerfil ? (
                  <img
                    src={perfil.fotoPerfil}
                    alt={`Foto de ${perfil.nome || "usuário"}`}/>
                ) : (
                  <span>
                    Sem foto
                  </span>
                )}

              </div>

              <h1>
                Olá, {perfil.nome || "usuário"}!
              </h1>

            </div>

            <nav className="perfil-menu">

              <button
                type="button"
                onClick={() =>
                  setMostrarFormularios(false)
                }>
                Minhas informações
              </button>

              <button
                type="button"
                onClick={carregarFormularios}>
                Formulários enviados
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/perfil/edicao")
                }>
                Editar perfil
              </button>

              <button
                type="button"
                onClick={() => {}}>
                Mudar senha
              </button>

              <button
                type="button"
                onClick={sair}>
                Sair
              </button>

            </nav>

          </aside>

          <section className="perfil-conteudo-adotante">

            {!mostrarFormularios ? (
              <>

                <h2>
                  Minhas informações
                </h2>

                <div className="perfil-grid">

                  <div className="perfil-item">
                    <strong>
                      Nome
                    </strong>

                    <p>
                      {perfil.nome ||
                        "Não informado"}
                    </p>
                  </div>

                  <div className="perfil-item">
                    <strong>
                      E-mail
                    </strong>

                    <p>
                      {perfil.email ||
                        "Não informado"}
                    </p>
                  </div>

                  <div className="perfil-item">
                    <strong>
                      Telefone
                    </strong>

                    <p>
                      {perfil.telefone ||
                        "Não informado"}
                    </p>
                  </div>

                  <div className="perfil-item">
                    <strong>
                      Endereço
                    </strong>

                    <p>
                      {perfil.endereco ||
                        "Não informado"}
                    </p>
                  </div>

                  <div className="perfil-item">
                    <strong>
                      Data de nascimento
                    </strong>

                    <p>
                      {formatarData(
                        perfil.dataNascimento
                      )}
                    </p>
                  </div>

                  <div className="perfil-item">
                    <strong>
                      CPF
                    </strong>

                    <p>
                      {perfil.cpf ||
                        "Não informado"}
                    </p>
                  </div>

                </div>

              </>
            ) : (
              <>

                <h2>
                  Formulários enviados
                </h2>

                {formularios.length === 0 ? (
                  <p>
                    Você ainda não enviou nenhum
                    formulário de adoção.
                  </p>
                ) : (
                  <div className="lista-formularios">

                    {formularios.map(
                      (formulario) => (
                        <div
                          className="card-formulario"
                          key={formulario.id}
                          onClick={() =>
                            navigate(
                              `/adocoes-enviadas/${formulario.id}`
                            )
                          }>

                          <div className="foto-formulario">

                            {formulario.animalFoto ? (
                              <img
                                src={formulario.animalFoto}
                                alt={`Foto de ${formulario.animalNome}`}/>
                            ) : (
                              <span>
                                Sem foto
                              </span>
                            )}

                          </div>

                          <div className="dados-formulario">

                            <h3>
                              {formulario.animalNome}
                            </h3>

                            <p>
                              <strong>
                                Data do envio:
                              </strong>{" "}
                              {formatarData(
                                formulario.dataResposta
                              )}
                            </p>

                            <p>
                              <strong>
                                Status:
                              </strong>{" "}

                              <span
                                className={`status-formulario status-${formulario.status.toLowerCase()}`}>
                                {formatarStatus(
                                  formulario.status
                                )}
                              </span>
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

              </>
            )}

          </section>

        </div>

      </main>
    </>
  );
}