import { useState, ChangeEvent, FormEvent } from "react";
import { apiService } from "../../services/ApiService";
import { Header } from "../../components/Header";
import { SidebarOng } from "../../components/SidebarOng";
import "./GestaoOng.css";

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
}

// ─── Card de informação ───────────────────────────────────────────────────────

function InfoCard({
  label,
  children,
}: InfoCardProps) {
  return (
    <div className="bg-white w-[263px] min-h-[90px] rounded-[20px] shadow-[0px_4px_8px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center py-3">

      <label className="text-base font-bold text-black mb-2">
        {label}
      </label>

      {children}

    </div>
  );
}

// ─── Estilo dos inputs/selects ────────────────────────────────────────────────

const inputSelectClass =
  "w-4/5 h-[38px] py-1 px-2 border border-[#dce3ea] rounded-[10px] text-center text-sm bg-[#f9fbfd] outline-none";

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

    if (!file) {
      return;
    }

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
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ): void => {

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

    if (!form.nome.trim()) {
      return setErro("Informe o nome do animal.");
    }

    if (!form.raca.trim()) {
      return setErro("Informe a raça do animal.");
    }

    if (!form.idade) {
      return setErro("Informe a idade.");
    }

    if (!form.especie) {
      return setErro("Selecione a espécie.");
    }

    if (!form.sexo) {
      return setErro("Selecione o sexo.");
    }

    if (!form.porte) {
      return setErro("Selecione o porte.");
    }

    if (!form.cor.trim()) {
      return setErro("Informe a cor do animal.");
    }

    if (!form.localizacao.trim()) {
      return setErro("Informe a localização do animal.");
    }

    if (!form.historicoSaude.trim()) {
      return setErro("Informe o histórico de saúde do animal.");
    }

    if (!form.comportamento.trim()) {
      return setErro("Informe o comportamento do animal.");
    }

    if (!form.possuiChip) {
      return setErro("Informe se o animal possui microchip.");
    }

    if (!form.vacinado) {
      return setErro("Informe se o animal está vacinado.");
    }

    // ─── Foto ────────────────────────────────────────────────────────────────

    const fotoPrincipal = imagemGrande ?? "";

    // ─── Payload ─────────────────────────────────────────────────────────────

    const payload: AnimalRequestDTO = {

      nome: form.nome.trim(),

      raca: form.raca.trim(),

      idade: form.idade as Idade,

      historicoSaude:
        form.historicoSaude.trim(),

      comportamento:
        form.comportamento.trim(),

      fotos: fotoPrincipal,

      possuiChip:
        form.possuiChip === "true",

      localizacao:
        form.localizacao.trim(),

      vacinado:
        form.vacinado === "true",

      especie:
        form.especie as Especie,

      porte:
        form.porte as Porte,

      sexo:
        form.sexo as Sexo,

      status: "DISPONIVEL",

      cor:
        form.cor.trim(),
    };

    // ─── Envio para o backend ────────────────────────────────────────────────

    try {

      setLoading(true);

      await apiService.post(
        "/animal",
        payload
      );

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

      const data =
        axiosError?.response?.data;

      let msg =
        "Erro ao cadastrar animal.";

      if (typeof data === "string") {

        msg = data;

      } else if (
        typeof data === "object" &&
        data !== null
      ) {

        const obj =
          data as Record<string, unknown>;

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
    <>
      <Header />

      <div className="gestao-ong-page">

        <SidebarOng />

        <main className="container-animais">

          <h1>
            Cadastrar Animal
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[1100px] mt-[30px]">

            <div className="flex gap-[50px] items-start">

              {/* FOTO */}

              <div className="w-[400px] shrink-0">

                <div className="w-[400px] h-[400px] bg-white rounded-[20px] flex justify-center items-center shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">

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
                      className="px-5 py-3 bg-[#36c3ff] text-white font-semibold rounded-xl cursor-pointer hover:bg-[#1ab0f0] transition">

                      Alterar foto

                    </label>

                    <button
                      type="button"
                      onClick={removerFoto}
                      className="px-5 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition">

                      Remover foto

                    </button>

                  </div>
                )}

              </div>

              {/* INFORMAÇÕES */}

              <div className="flex-1">

                <div className="bg-white rounded-[20px] p-8 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome
                  </label>

                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    type="text"
                    placeholder="Digite o nome do animal"
                    className="w-full px-[18px] py-[14px] mb-5 bg-[#f9fbfd] border border-[#dce3ea] rounded-[10px] box-border font-[Inter,sans-serif] text-xl text-[#222] outline-none placeholder:text-sm"/>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comportamento do animal
                  </label>

                  <textarea
                    name="comportamento"
                    value={form.comportamento}
                    onChange={handleChange}
                    placeholder="Informe o comportamento do animal"
                    className="w-full min-h-[90px] p-[18px] bg-[#f9fbfd] rounded-[10px] border border-[#dce3ea] box-border resize-y text-base font-[Inter,sans-serif] outline-none placeholder:text-sm"/>

                  <div className="mt-5">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Histórico de saúde
                    </label>

                    <textarea
                      name="historicoSaude"
                      value={form.historicoSaude}
                      onChange={handleChange}
                      placeholder="Informe o histórico de saúde do animal"
                      rows={4}
                      className="w-full min-h-[90px] p-[18px] bg-[#f9fbfd] rounded-[10px] border border-[#dce3ea] box-border resize-y text-base font-[Inter,sans-serif] outline-none placeholder:text-sm"/>

                  </div>

                </div>

                {/* CARDS */}

                <div className="grid grid-cols-2 gap-5 mt-5 font-[Inter,sans-serif]">

                  <div className="flex flex-col items-center gap-[25px]">

                    <InfoCard label="Raça">

                      <input
                        name="raca"
                        value={form.raca}
                        onChange={handleChange}
                        type="text"
                        placeholder="Digite a raça"
                        className={inputSelectClass}/>

                    </InfoCard>

                    <InfoCard label="Idade">

                      <select
                        name="idade"
                        value={form.idade}
                        onChange={handleChange}
                        className={inputSelectClass}>

                        <option
                          value=""
                          disabled>

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

                    <InfoCard label="Espécie">

                      <select
                        name="especie"
                        value={form.especie}
                        onChange={handleChange}
                        className={inputSelectClass}>

                        <option
                          value=""
                          disabled>

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

                    <InfoCard label="Possui Microchip?">

                      <select
                        name="possuiChip"
                        value={form.possuiChip}
                        onChange={handleChange}
                        className={inputSelectClass}>

                        <option
                          value=""
                          disabled>

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

                    <InfoCard label="Localização">

                      <input
                        name="localizacao"
                        value={form.localizacao}
                        onChange={handleChange}
                        type="text"
                        placeholder="Cidade - Estado"
                        className={inputSelectClass}/>

                    </InfoCard>

                  </div>

                  <div className="flex flex-col items-center gap-[25px]">

                    <InfoCard label="Sexo">

                      <select
                        name="sexo"
                        value={form.sexo}
                        onChange={handleChange}
                        className={inputSelectClass}>

                        <option
                          value=""
                          disabled>

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

                    <InfoCard label="Porte">

                      <select
                        name="porte"
                        value={form.porte}
                        onChange={handleChange}
                        className={inputSelectClass}>

                        <option
                          value=""
                          disabled>

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

                    <InfoCard label="Cor">

                      <input
                        name="cor"
                        value={form.cor}
                        onChange={handleChange}
                        type="text"
                        placeholder="Digite a cor"
                        className={inputSelectClass}/>

                    </InfoCard>

                    <InfoCard label="Vacinado?">

                      <select
                        name="vacinado"
                        value={form.vacinado}
                        onChange={handleChange}
                        className={inputSelectClass}>

                        <option
                          value=""
                          disabled>

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

                {/* BOTÕES */}

                <div className="flex justify-center gap-5 mt-[38px] mb-10">

                  <button
                    type="button"
                    onClick={() =>
                      window.location.href = "/gestao-ong"
                    }
                    className="w-[220px] h-[55px] text-[#36c3ff] bg-white border-2 border-[#36c3ff] rounded-[40px] font-[Inter,sans-serif] font-bold text-lg cursor-pointer hover:bg-[#eef9ff] transition">

                    Cancelar

                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-[260px] h-[55px] text-white bg-[#36c3ff] border-none rounded-[40px] font-[Inter,sans-serif] font-bold text-lg cursor-pointer hover:bg-[#1ab0f0] transition disabled:opacity-50 disabled:cursor-not-allowed">

                    {loading
                      ? "Salvando..."
                      : "Confirmar Registro"}

                  </button>

                </div>

              </div>

            </div>

          </form>

        </main>

      </div>

      {/* POPUP DE ERRO */}

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
              onClick={() => setErro(null)}
              className="w-[180px] h-[50px] bg-[#36c3ff] text-white rounded-[40px] font-bold text-lg hover:bg-[#1ab0f0] transition">

              OK

            </button>

          </div>

        </div>
      )}

      {/* POPUP DE SUCESSO */}

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

    </>
  );
}