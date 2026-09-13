import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/ApiService";

type TipoUsuario = "usuario" | "ong";

export function Login() {
  const [tipo, setTipo] = useState<TipoUsuario>("usuario");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await apiService.post("/auth/login", { email, senha });
      console.log("Resposta do login:", response.data);
      const token = response.data;

      localStorage.setItem("token", token);       

      localStorage.setItem("token", token);
      localStorage.setItem("tipoUsuario", tipo);

      // Redireciona conforme o tipo
      if (tipo === "ong") {
        navigate("/cadastros");
      } else {
        navigate("/#");
      }
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <a href="/home" style={styles.navLink}>Home</a>
          <a href="/home" style={styles.navLink}>Sobre</a>
          <a href="#" style={{ ...styles.navLink, marginRight: 72 }}>F.A.Q</a>
        </nav>
      </header>

      <div style={styles.container}>
        <div style={styles.inner}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <a href="/home">
              <img src="/imagens/DetalhesAnimal/logoMelhor.png" alt="Logo" style={styles.logo} />
            </a>
          </div>

          {/* Card */}
          <div style={styles.card}>
            {/* Toggle Usuário / ONG */}
            <div style={styles.toggle}>
              <div
                style={{
                  ...styles.slider,
                  left: tipo === "usuario" ? 0 : "calc(100% - 78px)",
                  width: tipo === "usuario" ? 86 : 78,
                }}
              />
              <span
                style={{
                  ...styles.option,
                  color: tipo === "usuario" ? "#fff" : "#000",
                }}
                onClick={() => setTipo("usuario")}
              >
                Usuário
              </span>
              <span
                style={{
                  ...styles.option,
                  color: tipo === "ong" ? "#fff" : "#000",
                }}
                onClick={() => setTipo("ong")}
              >
                ONG
              </span>
            </div>

            {/* Formulário */}
            <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
              <input
                style={styles.input}
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
              <input
                style={styles.input}
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                autoComplete="off"
              />

              {erro && <p style={styles.erro}>{erro}</p>}

              <button type="submit" style={styles.botao} disabled={carregando}>
                {carregando ? "Entrando..." : "Log in"}
              </button>
            </form>

            <a href="/cadastro" style={styles.linkCadastro}>Cadastrar-se</a>
            <a href="#" style={styles.linkEsqueceu}>Esqueceu a senha?</a>
          </div>
        </div>

        <img src="/imagens/cachorro.png" alt="cachorro" style={styles.imagemCachorro} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: '"Inter", "Courier Prime", sans-serif',
    margin: 0,
  },
  header: {
    width: "100%",
    padding: "38px 0 17px 0",
  },
  nav: {
    height: 18,
    textAlign: "end",
  },
  navLink: {
    fontFamily: '"Courier Prime", monospace',
    fontSize: 16,
    textDecoration: "none",
    color: "#AAAAAA",
    margin: "0 33px",
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: 104,
    height: 90,
  },
  card: {
    backgroundColor: "white",
    boxShadow: "0px 0px 24px rgba(0,0,0,0.25)",
    width: 450,
    height: 500,
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
  },
  toggle: {
    position: "relative",
    width: 132,
    height: 37,
    margin: "59px 0 43px 0",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "inset 0 0 8px rgba(0,0,0,0.25)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8px",
    cursor: "pointer",
  },
  slider: {
    position: "absolute",
    top: 0,
    height: 37,
    backgroundColor: "#27BEFF",
    borderRadius: 37,
    transition: "left 0.3s, width 0.3s",
    zIndex: 1,
  },
  option: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    zIndex: 2,
    userSelect: "none",
    lineHeight: "37px",
    transition: "color 0.3s",
  },
  input: {
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.5)",
    outline: "none",
    width: 300,
    fontFamily: '"Inter", sans-serif',
    fontSize: 16,
    marginBottom: 40,
    padding: "0 0 11px 0",
    textAlign: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  erro: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginTop: -24,
  },
  botao: {
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#36C3FF",
    border: "none",
    color: "white",
    borderRadius: 20,
    fontWeight: 300,
    width: 100,
    height: 35,
    cursor: "pointer",
    marginBottom: 41,
    fontSize: 14,
  },
  linkCadastro: {
    textDecoration: "none",
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 22,
  },
  linkEsqueceu: {
    textDecoration: "none",
    color: "rgba(0,0,0,0.5)",
  },
  imagemCachorro: {
    width: 629,
    height: 929,
    marginLeft: 506,
    marginBottom: 2,
  },
};