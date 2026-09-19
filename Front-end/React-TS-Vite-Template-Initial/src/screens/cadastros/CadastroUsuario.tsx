import { useState, type MouseEvent } from "react";

import { useNavigate } from "react-router-dom";

import logoMelhor from "../../images/logoMelhor.png";

import cachorro from "../../images/cachorro.png";

import { apiService } from "../../services/ApiService";

type TipoCadastro = "usuario" | "ong";

type TipoPopup = "sucesso" | "erro" | "aviso" | null;

export default function CadastroUsuario() {

  const navigate = useNavigate();

  const [tipoCadastro, setTipoCadastro] =
    useState<TipoCadastro>("usuario");

  const [nome, setNome] = useState("");
  const [nomeOng, setNomeOng] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const [criandoUsuario, setCriandoUsuario] = useState(false);

  const [popupAberto, setPopupAberto] = useState(false);
  const [tipoPopup, setTipoPopup] = useState<TipoPopup>(null);
  const [mensagemPopup, setMensagemPopup] = useState("");

  function mostrarPopup(tipo: TipoPopup, mensagem: string) {

    setTipoPopup(tipo);

    setMensagemPopup(mensagem);

    setPopupAberto(true);

  }

  function fecharPopup() {

    setPopupAberto(false);

    if (tipoPopup === "sucesso") {

      navigate("/login");

    }

  }

  async function handleCadastro(e: MouseEvent<HTMLButtonElement>) {

    e.preventDefault();

    if (!senha.trim()) {

      mostrarPopup(
        "aviso",
        "Informe uma senha para continuar."
      );

      return;

    }

    if (!confirmarSenha.trim()) {

      mostrarPopup(
        "aviso",
        "Confirme sua senha para continuar."
      );

      return;

    }

    if (senha !== confirmarSenha) {

      mostrarPopup(
        "aviso",
        "As senhas informadas não coincidem."
      );

      return;

    }

    if (
      tipoCadastro === "ong" &&
      (!nomeOng.trim() || !cnpj.trim())
    ) {

      mostrarPopup(
        "aviso",
        "Preencha o nome da ONG e o CNPJ para continuar."
      );

      return;

    }

    setCriandoUsuario(true);

    try {

      await apiService.post("/auth/register", {
        nome,
        nomeOng: tipoCadastro === "ong" ? nomeOng : null,
        cpf,
        cnpj: tipoCadastro === "ong" ? cnpj : null,
        email,
        senha,
        telefone,
        endereco,
        dataNascimento,
        tipoUsuario:
          tipoCadastro === "ong"
            ? "ROLE_ONG"
            : "ROLE_ADOTANTE",
      });

      mostrarPopup(
        "sucesso",
        "Cadastro realizado com sucesso! Clique em OK para fazer login."
      );

    } catch (error) {

      console.error(error);

      mostrarPopup(
        "erro",
        "Não foi possível realizar o cadastro. Verifique os dados e tente novamente."
      );

    } finally {

      setCriandoUsuario(false);

    }

  }

  return (

    <div className="min-h-screen bg-white">

      <header className="w-full px-8 pt-9 pb-4">

        <nav className="flex justify-end gap-8 pr-12">

          <a
            href="/"
            className="font-mono text-base text-[#aaaaaa] hover:underline">
            Home
          </a>

          <a
            href="/#sobre"
            className="font-mono text-base text-[#aaaaaa] hover:underline">
            Sobre
          </a>

          <a
            href="/#faq"
            className="font-mono text-base text-[#aaaaaa] hover:underline">
            F.A.Q
          </a>

        </nav>

      </header>

      <main className="flex items-start justify-center gap-16 px-8">

        <div className="flex flex-col">

          <div className="mx-auto">

            <a href="/">

              <img
                src={logoMelhor}
                alt="Logo Adota Pet"
                className="w-[104px] h-[90px] object-contain"/>

            </a>

          </div>

          <div className="bg-white shadow-[0_0_24px_rgba(0,0,0,0.25)] rounded-[20px] p-[30px] mt-[30px]">

            <h1 className="text-[32px] font-bold">

              Crie sua conta

            </h1>

            <div className="relative flex items-center w-[148px] h-[37px] mt-8 mb-8 bg-white rounded-[20px] shadow-[inset_0_0_8px_rgba(0,0,0,0.25)] p-1">

              <div
                className={`absolute top-0 h-[37px] bg-[#27beff] rounded-[37px] transition-all duration-300 ${
                  tipoCadastro === "usuario"
                    ? "left-0 w-[86px]"
                    : "left-[70px] w-[78px]"
                }`}/>

              <button
                type="button"
                onClick={() => setTipoCadastro("usuario")}
                className={`relative z-10 flex-1 h-[37px] text-sm transition-colors ${
                  tipoCadastro === "usuario"
                    ? "text-white"
                    : "text-black"
                }`}>

                Usuário

              </button>

              <button
                type="button"
                onClick={() => setTipoCadastro("ong")}
                className={`relative z-10 flex-1 h-[37px] text-sm transition-colors ${
                  tipoCadastro === "ong"
                    ? "text-white"
                    : "text-black"
                }`}>

                ONG

              </button>

            </div>

            {tipoCadastro === "usuario" ? (

              <div className="flex gap-5">

                <div className="flex flex-col w-full">

                  <label className="mb-2 text-base">

                    Nome completo

                  </label>

                  <input
                    type="text"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) =>
                      setNome(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    CPF

                  </label>

                  <input
                    type="text"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    value={cpf}
                    onChange={(e) => {

                      const valor = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);

                      let cpfFormatado = valor;

                      if (
                        valor.length > 3 &&
                        valor.length <= 6
                      ) {

                        cpfFormatado = `${valor.slice(
                          0,
                          3
                        )}.${valor.slice(3)}`;

                      } else if (
                        valor.length > 6 &&
                        valor.length <= 9
                      ) {

                        cpfFormatado = `${valor.slice(
                          0,
                          3
                        )}.${valor.slice(
                          3,
                          6
                        )}.${valor.slice(6)}`;

                      } else if (valor.length > 9) {

                        cpfFormatado = `${valor.slice(
                          0,
                          3
                        )}.${valor.slice(
                          3,
                          6
                        )}.${valor.slice(
                          6,
                          9
                        )}-${valor.slice(9, 11)}`;

                      }

                      setCpf(cpfFormatado);

                    }}
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Telefone

                  </label>

                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(xx) xxxxx-xxxx"
                    value={telefone}
                    onChange={(e) => {

                      const valor = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);

                      let telefoneFormatado = valor;

                      if (
                        valor.length > 2 &&
                        valor.length <= 7
                      ) {

                        telefoneFormatado = `(${valor.slice(
                          0,
                          2
                        )}) ${valor.slice(2)}`;

                      } else if (valor.length > 7) {

                        telefoneFormatado = `(${valor.slice(
                          0,
                          2
                        )}) ${valor.slice(
                          2,
                          7
                        )}-${valor.slice(7, 11)}`;

                      }

                      setTelefone(telefoneFormatado);

                    }}
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Endereço

                  </label>

                  <input
                    type="text"
                    name="endereco"
                    placeholder="Digite seu endereço"
                    value={endereco}
                    onChange={(e) =>
                      setEndereco(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                </div>

                <div className="flex flex-col w-full">

                  <label className="mt-5 mb-2 text-base">

                    Data de nascimento

                  </label>

                  <input
                    type="date"
                    name="dataNascimento"
                    value={dataNascimento}
                    onChange={(e) =>
                      setDataNascimento(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mb-2 text-base">

                    E-mail

                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Senha

                  </label>

                  <input
                    type="password"
                    name="senha"
                    placeholder="●●●●●●●"
                    value={senha}
                    onChange={(e) =>
                      setSenha(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Confirmar senha

                  </label>

                  <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="●●●●●●●"
                    value={confirmarSenha}
                    onChange={(e) =>
                      setConfirmarSenha(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                </div>

              </div>

            ) : (

              <div className="flex gap-5">

                <div className="flex flex-col w-full">

                  <label className="mb-2 text-base">

                    Nome da ONG

                  </label>

                  <input
                    type="text"
                    name="nomeOng"
                    placeholder="Nome da ONG"
                    value={nomeOng}
                    onChange={(e) =>
                      setNomeOng(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    CNPJ

                  </label>

                  <input
                    type="text"
                    name="cnpj"
                    placeholder="Digite o CNPJ"
                    value={cnpj}
                    onChange={(e) => {

                      const valor = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 14);

                      let cnpjFormatado = valor;

                      if (
                        valor.length > 2 &&
                        valor.length <= 5
                      ) {

                        cnpjFormatado = `${valor.slice(
                          0,
                          2
                        )}.${valor.slice(2)}`;

                      } else if (
                        valor.length > 5 &&
                        valor.length <= 8
                      ) {

                        cnpjFormatado = `${valor.slice(
                          0,
                          2
                        )}.${valor.slice(
                          2,
                          5
                        )}.${valor.slice(5)}`;

                      } else if (
                        valor.length > 8 &&
                        valor.length <= 12
                      ) {

                        cnpjFormatado = `${valor.slice(
                          0,
                          2
                        )}.${valor.slice(
                          2,
                          5
                        )}.${valor.slice(
                          5,
                          8
                        )}/${valor.slice(8)}`;

                      } else if (valor.length > 12) {

                        cnpjFormatado = `${valor.slice(
                          0,
                          2
                        )}.${valor.slice(
                          2,
                          5
                        )}.${valor.slice(
                          5,
                          8
                        )}/${valor.slice(
                          8,
                          12
                        )}-${valor.slice(12, 14)}`;

                      }

                      setCnpj(cnpjFormatado);

                    }}
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Telefone

                  </label>

                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(xx) xxxxx-xxxx"
                    value={telefone}
                    onChange={(e) => {

                      const valor = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);

                      let telefoneFormatado = valor;

                      if (
                        valor.length > 2 &&
                        valor.length <= 7
                      ) {

                        telefoneFormatado = `(${valor.slice(
                          0,
                          2
                        )}) ${valor.slice(2)}`;

                      } else if (valor.length > 7) {

                        telefoneFormatado = `(${valor.slice(
                          0,
                          2
                        )}) ${valor.slice(
                          2,
                          7
                        )}-${valor.slice(7, 11)}`;

                      }

                      setTelefone(telefoneFormatado);

                    }}
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Endereço

                  </label>

                  <input
                    type="text"
                    name="endereco"
                    placeholder="Digite seu endereço"
                    value={endereco}
                    onChange={(e) =>
                      setEndereco(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                </div>

                <div className="flex flex-col w-full">

                  <label className="mb-2 text-base">

                    E-mail

                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Data de Fundação

                  </label>

                  <input
                    type="date"
                    name="dataNascimento"
                    value={dataNascimento}
                    onChange={(e) =>
                      setDataNascimento(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Senha

                  </label>

                  <input
                    type="password"
                    name="senha"
                    placeholder="●●●●●●●"
                    value={senha}
                    onChange={(e) =>
                      setSenha(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                  <label className="mt-5 mb-2 text-base">

                    Confirmar senha

                  </label>

                  <input
                    type="password"
                    name="confirmarSenha"
                    placeholder="●●●●●●●"
                    value={confirmarSenha}
                    onChange={(e) =>
                      setConfirmarSenha(e.target.value)
                    }
                    className="h-[45px] w-full bg-black/5 rounded-[25px] border-[3px] border-transparent px-4 text-base outline-none focus:border-[#36c3ff]"/>

                </div>

              </div>

            )}

            <div className="mt-8 flex flex-col items-center">

              <button
                type="button"
                onClick={handleCadastro}
                disabled={criandoUsuario}
                className={`w-[220px] h-[48px] text-white font-semibold rounded-[25px] transition-colors ${
                  criandoUsuario
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#36C3FF] hover:bg-[#2db0e8]"
                }`}>

                {criandoUsuario ? "Criando..." : "Cadastrar"}

              </button>

              <p className="mt-4 text-sm text-gray-500">

                Já tem uma conta?{" "}

                <a
                  href="/login"
                  className="text-[#36C3FF] font-semibold hover:underline">

                  Fazer login

                </a>

              </p>

            </div>

          </div>

        </div>

        <img
          src={cachorro}
          alt="Cachorro"
          className="fixed right-0 bottom-0 w-[629px] h-[800px] object-contain object-right-bottom z-[1] pointer-events-none"/>

      </main>

      {popupAberto && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-[420px] rounded-[25px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-center">

            <div
              className={`mx-auto mb-5 flex h-[65px] w-[65px] items-center justify-center rounded-full text-3xl font-bold ${
                tipoPopup === "sucesso"
                  ? "bg-green-100 text-green-500"
                  : tipoPopup === "erro"
                  ? "bg-red-100 text-red-500"
                  : "bg-yellow-100 text-yellow-500"
              }`}>

              {tipoPopup === "sucesso" ? "✓" : "!"}

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">

              {tipoPopup === "sucesso"
                ? "Tudo certo!"
                : tipoPopup === "erro"
                ? "Ops!"
                : "Atenção"}

            </h2>

            <p className="text-gray-600 text-base leading-relaxed">

              {mensagemPopup}

            </p>

            <button
              type="button"
              onClick={fecharPopup}
              className="mt-7 w-full h-[45px] rounded-[25px] bg-[#36C3FF] hover:bg-[#2db0e8] text-white font-semibold transition-colors">

              OK

            </button>

          </div>

        </div>

      )}

    </div>

  );

}