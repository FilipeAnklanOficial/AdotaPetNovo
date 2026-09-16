import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logoMelhor from "../images/logoMelhor.png";

import { Button } from "./ui/button";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  const estaLogado = !!token;

  const handlePerfil = () => {
    if (tipoUsuario === "ROLE_ONG") {
      navigate("/gestao-ong");
      return;
    }

    navigate("/animais");
  };

  const handleSair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipoUsuario");
    navigate("/");
  };

  return (
    <header className="w-full bg-[#F8FAFC] px-8 py-4 md:px-12">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="hover:opacity-80 transition-opacity">
            <img
              src={logoMelhor}
              alt="Logo Adota Pet"
              className="w-20 h-[70px] object-contain"/>
          </a>

          <div className="hidden md:flex gap-8">
            <a
              href="/animais"
              className="text-black hover:underline font-mono">
              Adotar
            </a>

            <a
              href="#sobre"
              className="text-black hover:underline font-mono">
              Sobre
            </a>

            <a
              href="#faq"
              className="text-black hover:underline font-mono">
              F.A.Q
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {estaLogado ? (
            <>
              <Button
                variant="secondary"
                className="rounded-full flex items-center gap-2 px-4"
                onClick={handlePerfil}>
                <User className="h-5 w-5" />

                <span>
                  {tipoUsuario === "ROLE_ONG"
                    ? "Gestão"
                    : "Perfil"}
                </span>
              </Button>

              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleSair}>
                Sair
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              className="rounded-full flex items-center gap-2 px-4"
              onClick={() => navigate("/login")}>
              <User className="h-5 w-5" />

              <span>Entrar</span>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};