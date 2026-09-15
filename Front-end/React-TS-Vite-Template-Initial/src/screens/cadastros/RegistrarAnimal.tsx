import { useState, ChangeEvent, FormEvent } from "react";

import { apiService } from "../../services/ApiService";
import logoMelhor from "../../images/logoMelhor.png";

// ─── Enums ────────────────────────────────────────────────────────────────────

type Especie = "CACHORRO" | "GATO";

type Porte = "PEQUENO" | "MEDIO" | "GRANDE";

type Sexo = "MACHO" | "FEMEA";

type Status = "DISPONIVEL" | "INATIVO" | "ADOTADO";

type Idade = "FILHOTE" | "ADULTO" | "IDOSO";

// ─── DTO de requisição ────────────────────────────────────────────────────────

interface AnimalRequestDTO {
  nome: string;
  raca: string;
  idade: Idade;
  historicoSaude: string;
  comportamento: string;
  fotos: string;
  possuiChip: boolean;
  localizacao: string;
  vacinado: boolean;
  especie: Especie;
  porte: Porte;
  sexo: Sexo;
  status: Status;
  cor: string;
}

// ─── Estado do formulário ─────────────────────────────────────────────────────

interface FormState {
  nome: string;
  raca: string;
  idade: Idade | "";
  historicoSaude: string;
  comportamento: string;
  possuiChip: string;
  localizacao: string;
  vacinado: string;
  especie: Especie | "";
  porte: Porte | "";
  sexo: Sexo | "";
  cor: string;
}

// ─── Props dos cards ──────────────────────────────────────────────────────────

interface InfoCardProps {
  label: string;
  children: React.ReactNode;
  side?: "left" | "right";
}

// ─── Card de informação ───────────────────────────────────────────────────────

function InfoCard({
  label,
  children,
  side = "left",
}: InfoCardProps) {
  const margin = side === "left" ? "mr-6" : "ml-6";

  return (
    <div
      className={`bg-white w-[263px] rounded-[20px] shadow-[0px_4px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center py-2 ${margin}`}>
      <label className="text-base font-bold text-black mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Estilo dos inputs/selects ────────────────────────────────────────────────

const inputSelectClass =
  "w-4/5 h-full py-1 px-0.5 border border-[#dce3ea] rounded-[10px] text-center text-sm bg-[#f9fbfd] outline-none";

// ─── Componente principal ─────────────────────────────────────────────────────

export default function RegistrarAnimal() {
  // ─── Foto do animal ────────────────────────────────────────────────────────

  const [imagemGrande, setImagemGrande] = useState<string | null>(null);

  // ─── Estado do formulário ──────────────────────────────────────────────────

  const [form, setForm] = useState<FormState>({
    nome: "",
    raca: "",
    idade: "",
    historicoSaude: "",
    comportamento: "",
    possuiChip: "",
    localizacao: "",
    vacinado: "",
    especie: "",
    porte: "",
    sexo: "",
    cor: "",
  });

  // ─── Estado de feedback ────────────────────────────────────────────────────

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  // ─── Handler da foto ───────────────────────────────────────────────────────

const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>
): void => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (ev) => {
    const result = ev.target?.result as string;
    setImagemGrande(result);
  };

  reader.readAsDataURL(file);
  e.target.value = "";
};

const removerFoto = (): void => {
  setImagemGrande(null);
};

// ─── Handler dos campos ────────────────────────────────────────────────────
const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (
    e: FormEvent
  ): Promise<void> => {
    e.preventDefault();

    setErro(null);
    setSucesso(false);

    // ─── Validações ──────────────────────────────────────────────────────────

    if (!form.nome.trim())
      return setErro("Informe o nome do animal.");

    if (!form.raca.trim())
      return setErro("Informe a raça do animal.");

    if (!form.idade)
      return setErro("Informe a idade.");

    if (!form.especie)
      return setErro("Selecione a espécie.");

    if (!form.sexo)
      return setErro("Selecione o sexo.");

    if (!form.porte)
      return setErro("Selecione o porte.");

    if (!form.cor.trim())
      return setErro("Informe a cor do animal.");

    if (!form.localizacao.trim())
      return setErro("Informe a localização do animal.");

    if (!form.historicoSaude.trim())
      return setErro("Informe o histórico de saúde do animal.");

    if (!form.comportamento.trim())
      return setErro("Informe o comportamento do animal.");

    if (!form.possuiChip)
      return setErro("Informe se o animal possui microchip.");

    if (!form.vacinado)
      return setErro("Informe se o animal está vacinado.");

    // ─── Foto ────────────────────────────────────────────────────────────────

    const fotoPrincipal = imagemGrande ?? "";

    // ─── Payload ─────────────────────────────────────────────────────────────

    const payload: AnimalRequestDTO = {
      nome: form.nome.trim(),
      raca: form.raca.trim(),
      idade: form.idade as Idade,
      historicoSaude: form.historicoSaude.trim(),
      comportamento: form.comportamento.trim(),
      fotos: fotoPrincipal,
      possuiChip: form.possuiChip === "true",
      localizacao: form.localizacao.trim(),
      vacinado: form.vacinado === "true",
      especie: form.especie as Especie,
      porte: form.porte as Porte,
      sexo: form.sexo as Sexo,
      status: "DISPONIVEL",
      cor: form.cor.trim(),
    };

    // ─── Envio para o backend ────────────────────────────────────────────────

    try {
      setLoading(true);

      // O apiService envia o token JWT automaticamente
      await apiService.post("/animal", payload);

      setSucesso(true);

    } catch (err: unknown) {
      const axiosError = err as {
        response?: {
          data?: unknown;
        };
      };

      console.log(
        "ERRO COMPLETO:",
        axiosError?.response?.data
      );

      const data = axiosError?.response?.data;

      let msg = "Erro ao cadastrar animal.";

      if (typeof data === "string") {
        msg = data;

      } else if (
        typeof data === "object" &&
        data !== null
      ) {
        const obj = data as Record<string, unknown>;

        msg = String(
          obj.message ??
          obj.error ??
          obj.detail ??
          JSON.stringify(data)
        );

      } else if (err instanceof Error) {
        msg = err.message;
      }

      setErro(msg);

    } finally {
      setLoading(false);
    }
  };
  

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-[Inter,sans-serif]">

      {/* Header */}
      <header className="bg-white w-full py-10 flex justify-center">

        <nav className="flex items-center justify-center gap-20">

          <a
            href="/login"
            className="no-underline text-black font-mono hover:underline">
            Entrar
          </a>

          <a
            href="/animais"
            className="no-underline text-black font-mono hover:underline">
            Adotar
          </a>

          <a href="/">
            <img
              src={logoMelhor}
              alt="Logo Adota Pet"
              className="h-[70px] w-[80px] object-contain"/>
          </a>

          <a
            href="/#sobre"
            className="no-underline text-black font-mono hover:underline">
            Sobre
          </a>

          <a
            href="/#faq"
            className="no-underline text-black font-mono hover:underline">
            F.A.Q
          </a>

        </nav>

      </header>

      {/* ─── Popup de erro ─────────────────────────────────────────────────── */}

      {erro && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[420px] rounded-[20px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] p-8 text-center">

            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <h2 className="text-2xl font-bold text-[#36c3ff] mb-3">
              Atenção!
            </h2>

            <p className="text-gray-600 mb-6">
              {erro}
            </p>

            <button
              type="button"
              onClick={() => setErro("")}
              className="w-[180px] h-[50px] bg-[#36c3ff] text-white rounded-[40px] font-bold text-lg hover:bg-[#1ab0f0] transition">
              OK
            </button>

          </div>

        </div>
      )}

      {/* ─── Popup de sucesso ──────────────────────────────────────────────── */}

      {sucesso && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[420px] rounded-[20px] shadow-[0px_4px_15px_rgba(0,0,0,0.25)] p-8 text-center">

            <div className="text-5xl mb-4">
              ✅
            </div>

            <h2 className="text-2xl font-bold text-[#36c3ff] mb-3">
              Animal cadastrado com sucesso!
            </h2>

            <p className="text-gray-600 mb-6">
              O animal foi cadastrado e já está disponível no sistema.
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.href = "/gestao-ong"
              }
              className="w-[180px] h-[50px] bg-[#36c3ff] text-white rounded-[40px] font-bold text-lg hover:bg-[#1ab0f0] transition">
              OK
            </button>

          </div>

        </div>
      )}

      {/* ─── Formulário ────────────────────────────────────────────────────── */}

      <form
        onSubmit={handleSubmit}
        className="bg-white flex justify-center max-w-[1440px] w-full px-[90px] mt-[30px]">

        {/* ─── Foto ───────────────────────────────────────────────────────── */}

        <div className="mr-[107px]">

          <div className="w-[549px] h-[549px] bg-white rounded-[20px] flex justify-center items-center">

            {imagemGrande ? (
              <img
                src={imagemGrande}
                alt="Foto principal do animal"
                className="w-full h-full object-cover rounded-[20px] border-[3px] border-[#36c3ff]"/>
            ) : (
              <label
                htmlFor="foto-animal"
                className="w-full h-full rounded-[20px] border-[3px] border-dashed border-[#36c3ff] bg-[#f4f8fb] flex flex-col items-center justify-center text-[#aab8c4] text-lg cursor-pointer hover:bg-[#eef7fc] transition">
                <span className="text-5xl mb-3">
                  📷
                </span>
                <span>
                  Clique para adicionar uma foto
                </span>
              </label>
            )}

            <input
              id="foto-animal"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}/>
          </div>

          {imagemGrande && (
            <div className="flex justify-center gap-3 mt-5">
              <label
                htmlFor="foto-animal"
                className="px-6 py-3 bg-[#36c3ff] text-white font-semibold rounded-xl cursor-pointer hover:bg-[#1ab0f0] transition">
                Alterar foto
              </label>
                <button
                  type="button"
                  onClick={removerFoto}
                  className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition">
                  Remover foto
                </button>
            </div>
          )}

        </div>

        {/* ─── Coluna de informações ───────────────────────────────────────── */}

        <div>

          {/* Nome + comportamento + histórico */}

          <div className="bg-white w-[603px] rounded-[20px] p-10 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome
            </label>

            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              type="text"
              placeholder="Digite o nome do animal"
              className="w-full px-[18px] py-[14px] mb-4 bg-[#f9fbfd] border border-[#dce3ea] rounded-[10px] box-border font-[Montserrat,sans-serif] font-bold text-[42px] text-[#222] outline-none placeholder:text-sm placeholder:font-medium placeholder:font-[Inter,sans-serif]"/>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Comportamento do animal
            </label>

            <textarea
              name="comportamento"
              value={form.comportamento}
              onChange={handleChange}
              placeholder="Informe o comportamento do animal"
              className="w-full min-h-[80px] p-[18px] bg-[#f9fbfd] rounded-[10px] border border-[#dce3ea] box-border resize-y text-base font-[Inter,sans-serif] outline-none placeholder:text-sm placeholder:font-medium"/>

            <div className="mt-4">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Histórico de saúde
              </label>

              <textarea
                name="historicoSaude"
                value={form.historicoSaude}
                onChange={handleChange}
                placeholder="Informe o histórico de saúde do animal"
                rows={4}
                className="w-full min-h-[80px] p-[18px] bg-[#f9fbfd] rounded-[10px] border border-[#dce3ea] box-border resize-y text-base font-[Inter,sans-serif] outline-none placeholder:text-sm placeholder:font-medium"/>

            </div>

          </div>

          {/* ─── Cards de informações ─────────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-5 mt-5 font-[Inter,sans-serif]">

            {/* Coluna esquerda */}

            <div className="flex flex-col items-center gap-[34px]">

              <InfoCard label="Raça" side="left">
                <input
                  name="raca"
                  value={form.raca}
                  onChange={handleChange}
                  type="text"
                  placeholder="Digite a raça"
                  className={inputSelectClass}/>
              </InfoCard>

              <InfoCard label="Idade" side="left">

                <select
                  name="idade"
                  value={form.idade}
                  onChange={handleChange}
                  className={inputSelectClass}>

                  <option value="" disabled>
                    Selecione
                  </option>

                  <option value="FILHOTE">
                    Filhote
                  </option>

                  <option value="ADULTO">
                    Adulto
                  </option>

                  <option value="IDOSO">
                    Idoso
                  </option>

                </select>

              </InfoCard>

              <InfoCard label="Espécie" side="left">

                <select
                  name="especie"
                  value={form.especie}
                  onChange={handleChange}
                  className={inputSelectClass}>

                  <option value="" disabled>
                    Selecione
                  </option>

                  <option value="CACHORRO">
                    Cachorro
                  </option>

                  <option value="GATO">
                    Gato
                  </option>

                </select>

              </InfoCard>

              <InfoCard
                label="Possui Microchip?"
                side="left">

                <select
                  name="possuiChip"
                  value={form.possuiChip}
                  onChange={handleChange}
                  className={inputSelectClass}>

                  <option value="" disabled>
                    Selecione
                  </option>

                  <option value="true">
                    Sim
                  </option>

                  <option value="false">
                    Não
                  </option>

                </select>

              </InfoCard>

              <InfoCard label="Localização" side="left">

                <input
                  name="localizacao"
                  value={form.localizacao}
                  onChange={handleChange}
                  type="text"
                  placeholder="Cidade - Estado"
                  className={inputSelectClass}/>

              </InfoCard>

            </div>

            {/* Coluna direita */}

            <div className="flex flex-col items-center gap-[34px]">

              <InfoCard label="Sexo" side="right">

                <select
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                  className={inputSelectClass}>

                  <option value="" disabled>
                    Selecione
                  </option>

                  <option value="MACHO">
                    Macho
                  </option>

                  <option value="FEMEA">
                    Fêmea
                  </option>

                </select>

              </InfoCard>

              <InfoCard label="Porte" side="right">

                <select
                  name="porte"
                  value={form.porte}
                  onChange={handleChange}
                  className={inputSelectClass}>

                  <option value="" disabled>
                    Selecione
                  </option>

                  <option value="PEQUENO">
                    Pequeno
                  </option>

                  <option value="MEDIO">
                    Médio
                  </option>

                  <option value="GRANDE">
                    Grande
                  </option>

                </select>

              </InfoCard>

              <InfoCard label="Cor" side="right">

                <input
                  name="cor"
                  value={form.cor}
                  onChange={handleChange}
                  type="text"
                  placeholder="Digite a cor"
                  className={inputSelectClass}/>

              </InfoCard>

              <InfoCard label="Vacinado?" side="right">

                <select
                  name="vacinado"
                  value={form.vacinado}
                  onChange={handleChange}
                  className={inputSelectClass}>

                  <option value="" disabled>
                    Selecione
                  </option>

                  <option value="true">
                    Sim
                  </option>

                  <option value="false">
                    Não
                  </option>

                </select>

              </InfoCard>

            </div>

          </div>

          {/* ─── Botão confirmar ───────────────────────────────────────────── */}

          <button
            type="submit"
            disabled={loading}
            className="w-[350px] h-[59px] text-white bg-[#36c3ff] border-none rounded-[40px] font-[Inter,sans-serif] font-bold text-2xl block text-center mx-auto mt-[38px] leading-[59px] cursor-pointer hover:bg-[#1ab0f0] transition disabled:opacity-50 disabled:cursor-not-allowed">
            {loading
              ? "Salvando..."
              : "Confirmar Registro"}
          </button>

        </div>

      </form>

    </div>
  );
}