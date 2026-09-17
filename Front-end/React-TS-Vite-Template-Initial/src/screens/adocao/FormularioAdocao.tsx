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

const opcoesPergunta: Record<number, string[]> = {
  2: ["Não possuo outros animais", "Cães", "Gatos", "Cães e gatos", "Outros"],
  3: ["Sim, todos", "Alguns", "Não"],
  4: ["Casa", "Apartamento", "Chácara/Sítio"],
  5: ["Próprio", "Alugado"],
  8: ["Dentro de casa", "Área externa", "Dentro e fora de casa", "Outro local"],
  9: ["Dentro de casa", "Área externa", "Dentro e fora de casa", "Outro local"],
  10: ["Menos de 2 horas", "2 a 4 horas", "4 a 8 horas", "Mais de 8 horas"],
  11: ["Não tenho crianças pequenas", "Sim, menores de 5 anos", "Sim, de 5 a 10 anos", "Sim, maiores de 10 anos"],
  13: ["Levarei o animal comigo", "Buscarei alguém de confiança", "Entrarei em contato com a ONG", "Ainda não sei"],
};

export default function FormularioAdocao() {
  const { animalId } = useParams();
  const navigate = useNavigate();

  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    carregarPerguntas();
  }, []);

  async function carregarPerguntas() {
    try {
      const response = await apiService.get("/perguntas/listar");
      setPerguntas(response.data);
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar o formulário.");
    } finally {
      setCarregando(false);
    }
  }

    function alterarResposta(perguntaId: number, novaResposta: string) {
    setRespostas((respostasAtuais) => {
        const existe = respostasAtuais.some(
        (item) => item.perguntaId === perguntaId
        );

        if (existe) {
        return respostasAtuais.map((item) =>
            item.perguntaId === perguntaId
            ? { ...item, resposta: novaResposta }
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
    return respostas.find(
      (resposta) => resposta.perguntaId === perguntaId
    )?.resposta || "";
  }

  async function enviarFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!animalId) {
      alert("Animal não identificado.");
      return;
    }

    const perguntasSemResposta = perguntas.filter(
      (pergunta) => !obterResposta(pergunta.id).trim()
    );

    if (perguntasSemResposta.length > 0) {
      alert("Responda todas as perguntas antes de enviar.");
      return;
    }

    try {
      setEnviando(true);

      await apiService.post("/adocao/responder", {
        animalId: Number(animalId),
        respostas,
      });
      

      alert("Formulário enviado com sucesso!");
      navigate(`/animais/${animalId}`);
    } catch (error) {
      console.error(error);
      alert("Não foi possível enviar o formulário.");
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <button
          type="button"
          onClick={() => navigate(`/animais/${animalId}`)}
          className="mb-6 text-gray-600 hover:text-black">
          ← Voltar para o animal
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Formulário de adoção
            </h1>

            <p className="text-gray-600 mt-2">
              Responda às perguntas abaixo. Essas informações ajudarão a ONG
              a conhecer melhor o seu perfil e avaliar a adoção.
            </p>
          </div>

          <form onSubmit={enviarFormulario} className="space-y-8">

            {perguntas.map((pergunta, index) => {
              const respostaAtual = obterResposta(pergunta.id);
              const opcoes = opcoesPergunta[pergunta.id];

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
                          checked={respostaAtual === "Sim"}
                          onChange={(e) =>
                            alterarResposta(pergunta.id, e.target.value)
                          }
                          className="w-4 h-4"/>
                        <span>Sim</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`pergunta-${pergunta.id}`}
                          value="Não"
                          checked={respostaAtual === "Não"}
                          onChange={(e) =>
                            alterarResposta(pergunta.id, e.target.value)
                          }
                          className="w-4 h-4"/>
                        <span>Não</span>
                      </label>

                    </div>
                  ) : opcoes ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {opcoes.map((opcao) => (
                        <label
                          key={opcao}
                          className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${
                            respostaAtual === opcao
                              ? "border-[#36C3FF] bg-blue-50"
                              : "border-gray-200 hover:border-[#36C3FF]"
                          }`}>

                          <input
                            type="radio"
                            name={`pergunta-${pergunta.id}`}
                            value={opcao}
                            checked={respostaAtual === opcao}
                            onChange={(e) =>
                              alterarResposta(pergunta.id, e.target.value)
                            }
                            className="w-4 h-4"/>

                          <span className="text-gray-700">
                            {opcao}
                          </span>

                        </label>
                      ))}

                    </div>
                  ) : (
                    <textarea
                      value={respostaAtual}
                      onChange={(e) =>
                        alterarResposta(pergunta.id, e.target.value)
                      }
                      placeholder="Digite sua resposta..."
                      rows={3}
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
    </div>
  );
}