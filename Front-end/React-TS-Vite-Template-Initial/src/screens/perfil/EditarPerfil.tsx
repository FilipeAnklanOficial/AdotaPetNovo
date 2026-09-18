import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { apiService } from "../../services/ApiService";
import "./Perfil.css";

interface Perfil {
  nome: string;
  nomeOng: string;
  email: string;
  telefone: string;
  endereco: string;
  fotoPerfil: string;
  dataNascimento: string;
  descricaoOng: string;
  tipoUsuario: string;
}

export function EditarPerfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [editarFoto, setEditarFoto] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

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

  function atualizarCampo(campo: keyof Perfil, valor: string) {
    if (!perfil) {
      return;
    }

    setPerfil({
      ...perfil,
      [campo]: valor
    });
  }

  async function salvarPerfil() {
    if (!perfil) {
      return;
    }

    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      const dados = {
        nome: perfil.nome,
        nomeOng:
          perfil.tipoUsuario === "ROLE_ONG"
            ? perfil.nomeOng
            : null,
        email: perfil.email,
        telefone: perfil.telefone,
        endereco: perfil.endereco,
        fotoPerfil: perfil.fotoPerfil,
        dataNascimento:
          perfil.dataNascimento || null,
        descricaoOng:
          perfil.tipoUsuario === "ROLE_ONG"
            ? perfil.descricaoOng
            : null
      };

      const response = await apiService.patch(
        "/perfil/edicao",
        dados
        );

        localStorage.setItem(
        "token",
        response.data.token
        );

        setPerfil({
        ...perfil,
        ...response.data.perfil
        });

      setEditarFoto(false);
      setMensagem("Perfil atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
      setErro("Não foi possível atualizar o perfil.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <>
        <Header />

        <div className="perfil-carregando">
          <p>Carregando perfil...</p>
        </div>
      </>
    );
  }

  if (erro && !perfil) {
    return (
      <>
        <Header />

        <div className="perfil-erro">
          <p>{erro}</p>
        </div>
      </>
    );
  }

  if (!perfil) {
    return null;
  }

  return (
    <>
      <Header />

      <main className="perfil-container">
        <div className="perfil-card">

          <h1 className="titulo-editar-perfil">
            Editar perfil
          </h1>

          <div className="foto-edicao-container">

            <div className="foto-edicao-wrapper">

              {perfil.fotoPerfil ? (
                <img
                  src={perfil.fotoPerfil}
                  alt="Foto de perfil"
                  className="foto-edicao"/>
              ) : (
                <div className="foto-edicao-sem-foto">
                  <span>Sem foto</span>
                </div>
              )}

              <button
                type="button"
                className="botao-editar-foto"
                onClick={() =>
                  setEditarFoto(!editarFoto)
                }
                aria-label="Editar foto de perfil">
                ✎
              </button>

            </div>

            {editarFoto && (
              <div className="campo-foto-edicao">
                <strong>
                  Link da foto de perfil
                </strong>

                <input
                  type="text"
                  value={perfil.fotoPerfil || ""}
                  placeholder="Cole aqui o link da imagem"
                  onChange={(event) =>
                    atualizarCampo(
                      "fotoPerfil",
                      event.target.value
                    )
                  }/>
              </div>
            )}

          </div>

          <div className="perfil-grid">

            <div className="perfil-item">
              <strong>Nome do Responsável</strong>

              <input
                type="text"
                value={perfil.nome || ""}
                onChange={(event) =>
                  atualizarCampo(
                    "nome",
                    event.target.value
                  )
                }/>
            </div>

            {perfil.tipoUsuario === "ROLE_ONG" && (
              <div className="perfil-item">
                <strong>Nome da ONG</strong>

                <input
                  type="text"
                  value={perfil.nomeOng || ""}
                  onChange={(event) =>
                    atualizarCampo(
                      "nomeOng",
                      event.target.value
                    )
                  }/>
              </div>
            )}

            <div className="perfil-item">
              <strong>E-mail</strong>

              <input
                type="email"
                value={perfil.email || ""}
                onChange={(event) =>
                  atualizarCampo(
                    "email",
                    event.target.value
                  )
                }/>
            </div>

            <div className="perfil-item">
              <strong>Telefone</strong>

              <input
                type="text"
                value={perfil.telefone || ""}
                onChange={(event) =>
                  atualizarCampo(
                    "telefone",
                    event.target.value
                  )
                }/>
            </div>

            <div className="perfil-item">
              <strong>Endereço</strong>

              <input
                type="text"
                value={perfil.endereco || ""}
                onChange={(event) =>
                  atualizarCampo(
                    "endereco",
                    event.target.value
                  )
                }/>
            </div>

            <div className="perfil-item">
              <strong>Data de nascimento</strong>

              <input
                type="date"
                value={perfil.dataNascimento || ""}
                onChange={(event) =>
                  atualizarCampo(
                    "dataNascimento",
                    event.target.value
                  )
                }/>
            </div>

            {perfil.tipoUsuario === "ROLE_ONG" && (
              <div className="perfil-item">
                <strong>Descrição da ONG</strong>

                <textarea
                  value={perfil.descricaoOng || ""}
                  onChange={(event) =>
                    atualizarCampo(
                      "descricaoOng",
                      event.target.value
                    )
                  }/>
              </div>
            )}

          </div>

          {erro && (
            <div className="perfil-erro">
              <p>{erro}</p>
            </div>
          )}

          <div className="perfil-acoes">

            <button
              type="button"
              className="botao-cancelar-perfil"
              onClick={() =>
                navigate("/perfil")
              }>
              Cancelar
            </button>

            <button
                type="button"
                className="botao-editar-perfil"
                onClick={() => setMostrarConfirmacao(true)}
                disabled={salvando}>
                Salvar alterações
            </button>

          </div>

        </div>
      </main>

      {mostrarConfirmacao && (
        <div className="popup-overlay">

            <div className="popup">

            <h2>
                Salvar alterações?
            </h2>

            <p>
                Deseja realmente salvar as alterações do seu perfil?
            </p>

            <div className="popup-acoes">

                <button
                type="button"
                className="popup-botao-cancelar"
                onClick={() =>
                    setMostrarConfirmacao(false)
                }>
                Cancelar
                </button>

                <button
                type="button"
                className="popup-botao-confirmar"
                onClick={() => {
                    setMostrarConfirmacao(false);
                    salvarPerfil();
                }}>
                Confirmar
                </button>

            </div>

            </div>

        </div>
        )}

        {mensagem && (
        <div className="popup-overlay">

            <div className="popup">

            <h2>
                Perfil atualizado!
            </h2>

            <p>
                Seu perfil foi atualizado com sucesso.
            </p>

            <button
                type="button"
                className="popup-botao-confirmar"
                onClick={() => navigate("/perfil")}>
                Fechar
            </button>

            </div>

        </div>
        )}
    </>
  );
}