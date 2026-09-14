import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiService } from "../../services/ApiService";
import logoMelhor from "../../images/logoMelhor.png";
import cachorro from "../../images/cachorro.png";

import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  function obterTipoUsuario(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const response = await apiService.post("/auth/login", {
        email,
        senha,
      });

      console.log("Resposta do login:", response.data);

    const token = response.data;

    localStorage.setItem("token", token);

    const tipoUsuario = obterTipoUsuario(token);

    localStorage.setItem("tipoUsuario", tipoUsuario ?? "");

    if (tipoUsuario === "ROLE_ONG") {
      navigate("/gestao-ong");
    } else {
      navigate("/animais");
    }
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <nav className="login-nav">
          <a href="/" className="login-nav-link">
            Home
          </a>

          <a href="/#sobre" className="login-nav-link">
            Sobre
          </a>

          <a href="/#faq" className="login-nav-link">
            F.A.Q
          </a>
        </nav>
      </header>

      <div className="login-container">
        <div className="login-inner">

          <div className="login-logo-container">
            <a href="/">
              <img
                src={logoMelhor}
                alt="Logo Adota Pet"
                className="login-logo"
              />
            </a>
          </div>

          <div className="login-card">

            {/* <div className="login-toggle">
              <div
                className="login-slider"
                style={{
                  left:
                    tipo === "usuario"
                      ? 0
                      : "calc(100% - 78px)",
                  width:
                    tipo === "usuario"
                      ? 86
                      : 78,
                }}
              />

              <span
                className={`login-option ${
                  tipo === "usuario" ? "active" : ""
                }`}
                onClick={() => setTipo("usuario")}
              >
                Usuário
              </span>

              <span
                className={`login-option ${
                  tipo === "ong" ? "active" : ""
                }`}
                onClick={() => setTipo("ong")}
              >
                ONG
              </span>
            </div> */}

            <form
              onSubmit={handleLogin}
              className="login-form"
            >
              <input
                className="login-input"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />

              <input
                className="login-input"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                autoComplete="off"
              />

              {erro && (
                <p className="login-error">
                  {erro}
                </p>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Log in"}
              </button>
            </form>

            <a
              href="/cadastro"
              className="login-register-link"
            >
              Cadastrar-se
            </a>

            <a
              href="#"
              className="login-forgot-link"
            >
              Esqueceu a senha?
            </a>

          </div>
        </div>

        <img
          src={cachorro}
          alt="Cachorro"
          className="login-dog"
        />
      </div>
    </div>
  );
}