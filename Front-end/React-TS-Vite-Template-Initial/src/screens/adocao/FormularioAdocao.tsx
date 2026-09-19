import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../services/ApiService";

interface Pergunta {
  id: number;
  texto: string;
  ativo: boolean;
  tipo: "BOOLEAN" | "TEXTO";
}

interface Resposta {
  perguntaId: number;
  resposta: string;
}

type TipoPopup = "sucesso" | "erro" | "aviso" | null;

export default function FormularioAdocao() {
  const { animalId } = useParams();
  const navigate = useNavigate();

  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const [popupAberto, setPopupAberto] = useState(false);
  const [tipoPopup, setTipoPopup] = useState<TipoPopup>(null);
  const [mensagemPopup, setMensagemPopup] = useState("");

  useEffect(() => {
    carregarPerguntas();
  }, []);

  async function carregarPerguntas() {
    try {
      const response = await apiService.get("/perguntas/listar");
      setPerguntas(response.data);
    } catch (error) {
      console.error(error);

      mostrarPopup(
        "erro",
        "Não foi possível carregar o formulário."
      );
    } finally {
      setCarregando(false);
    }
  }

  function mostrarPopup(tipo: TipoPopup, mensagem: string) {
    setTipoPopup(tipo);
    setMensagemPopup(mensagem);
    setPopupAberto(true);
  }

  function fecharPopup() {
    setPopupAberto(false);

    if (tipoPopup === "sucesso") {
      navigate(`/animais/${animalId}`);
    }
  }

  function alterarResposta(
    perguntaId: number,
    novaResposta: string
  ) {
    setRespostas((respostasAtuais) => {
      const existe = respostasAtuais.some(
        (item) => item.perguntaId === perguntaId
      );

      if (existe) {
        return respostasAtuais.map((item) =>
          item.perguntaId === perguntaId
            ? {
                ...item,
                resposta: novaResposta
              }
            : item
        );
      }

      return [
        ...respostasAtuais,
        {
          perguntaId,
          resposta: novaResposta
        }
      ];
    });
  }

  function obterResposta(perguntaId: number) {
    return (
      respostas.find(
        (resposta) => resposta.perguntaId === perguntaId
      )?.resposta || ""
    );
  }

  async function enviarFormulario(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!animalId) {
      mostrarPopup(
        "aviso",
        "Animal não identificado."
      );
      return;
    }

    const perguntasSemResposta = perguntas.filter(
      (pergunta) => !obterResposta(pergunta.id).trim()
    );

    if (perguntasSemResposta.length > 0) {
      mostrarPopup(
        "aviso",
        "Responda todas as perguntas antes de enviar."
      );
      return;
    }

    try {
      setEnviando(true);

      await apiService.post("/adocao/responder", {
        animalId: Number(animalId),
        respostas
      });

      mostrarPopup(
        "sucesso",
        "Formulário enviado com sucesso! A ONG irá analisar sua solicitação."
      );
    } catch (error: any) {
      console.error("ERRO COMPLETO:", error);

      const mensagem =
        error.response?.data?.error ||
        "Não foi possível enviar o formulário.";

      mostrarPopup("erro", mensagem);
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Carregando formulário...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() =>
            navigate(`/animais/${animalId}`)
          }
          className="mb-6 text-gray-600 hover:text-black">
          ← Voltar para o animal
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Formulário de adoção
            </h1>

            <p className="text-gray-600 mt-2">
              Responda às perguntas abaixo. Essas informações
              ajudarão a ONG a conhecer melhor o seu perfil e
              avaliar a adoção.
            </p>
          </div>

          <form
            onSubmit={enviarFormulario}
            className="space-y-8">
            {perguntas.map((pergunta, index) => {
              const respostaAtual =
                obterResposta(pergunta.id);

              return (
                <div
                  key={pergunta.id}
                  className="border-b border-gray-200 pb-7 last:border-b-0">
                  <label className="block text-lg font-medium text-gray-800 mb-4">
                    {index + 1}. {pergunta.texto}
                  </label>

                  {pergunta.tipo === "BOOLEAN" ? (
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`pergunta-${pergunta.id}`}
                          value="Sim"
                          checked={
                            respostaAtual === "Sim"
                          }
                          onChange={(e) =>
                            alterarResposta(
                              pergunta.id,
                              e.target.value
                            )
                          }
                          className="w-4 h-4"/>
                        <span>Sim</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`pergunta-${pergunta.id}`}
                          value="Não"
                          checked={
                            respostaAtual === "Não"
                          }
                          onChange={(e) =>
                            alterarResposta(
                              pergunta.id,
                              e.target.value
                            )
                          }
                          className="w-4 h-4"/>
                        <span>Não</span>
                      </label>
                    </div>
                  ) : (
                    <textarea
                      value={respostaAtual}
                      onChange={(e) =>
                        alterarResposta(
                          pergunta.id,
                          e.target.value
                        )
                      }
                      placeholder="Digite sua resposta..."
                      rows={4}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#36C3FF] resize-none"/>
                  )}
                </div>
              );
            })}

            <div className="pt-4">
              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-[#36C3FF] hover:bg-[#22b5f2] text-white font-semibold py-4 rounded-xl transition disabled:opacity-50">
                {enviando
                  ? "Enviando formulário..."
                  : "Enviar formulário de adoção"}
              </button>
            </div>
          </form>
        </div>
      </div>

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
              {tipoPopup === "sucesso"
                ? "✓"
                : "!"}
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
              className="mt-7 w-full h-[45px] rounded-[25px] bg-[#36C3FF] hover:bg-[#22b5f2] text-white font-semibold transition-colors">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}