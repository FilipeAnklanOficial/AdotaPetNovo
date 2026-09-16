import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { apiService } from "@/services/ApiService";

interface AnimalType {
  id: number;
  img: string;
  name: string;
  gender: string;
  porte: string;
  local: string;
}

const ListarAnimais = () => {
  const navigate = useNavigate();

  const [animais, setAnimais] = useState<AnimalType[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [filtro, setFiltro] = useState({
    especie: "",
    raca: "",
    sexo: "",
    cor: "",
    idade: "",
    porte: "",
    possuiChip: "",
    localizacao: "",
    vacinado: "",
  });

  const buscarAnimais = async (pagina = paginaAtual) => {

  console.log("Aplicando filtros...");

  try {

    const payload = {
      especie: filtro.especie || null,
      raca: filtro.raca || null,
      sexo: filtro.sexo || null,
      cor: filtro.cor || null,
      idade: filtro.idade || null,
      porte: filtro.porte || null,
      possuiChip:
        filtro.possuiChip === ""
          ? null
          : filtro.possuiChip === "true",
      localizacao: filtro.localizacao || null,
      vacinado:
        filtro.vacinado === ""
          ? null
          : filtro.vacinado === "true",
    };

    console.log("Payload enviado:", payload);

    const response = await apiService.post(
      `/animal/buscar?page=${pagina}&size=16`,
      payload
    );

    console.log("Status:", response.status);
    console.log("Resposta:", response.data);

    setAnimais(
      response.data.content.map((pet: any) => ({
        id: pet.id,
        img: pet.fotos,
        name: pet.nome,
        gender: pet.sexo,
        porte: pet.porte,
        local: pet.localizacao,
      }))
    );

    setTotalPaginas(response.data.totalPages);

    } catch (error) {
      console.error("Erro ao buscar animais com filtros:", error);
    }
  };

  useEffect(() => {
    const carregarAnimais = async () => {
      try {
        const response = await apiService.get(
          "/animal?page=0&size=16"
        );

        setAnimais(
          response.data.content.map((pet: any) => ({
            id: pet.id,
            img: pet.fotos,
            name: pet.nome,
            gender: pet.sexo,
            porte: pet.porte,
            local: pet.localizacao,
          }))
        );

        setTotalPaginas(response.data.totalPages);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
      }
    };

    carregarAnimais();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans w-full">
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-8">
        <aside className="w-full md:w-1/4 space-y-6">
          <div className="mb-6">
            <h1 className="text-[#36C3FF] text-2xl font-normal m-0">
              Filtros
            </h1>

            <p className="text-[#7085a0] text-sm mt-1">
              Refine sua busca
            </p>
          </div>

          <div className="space-y-4">
            <FilterCard label="Espécie do animal">
              <Select
                value={filtro.especie || "todos"}
                onValueChange={(value) =>
                  setFiltro((prev) => ({
                    ...prev,
                    especie: value === "todos" ? "" : value,
                  }))
                }>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="CACHORRO">Cachorro</SelectItem>
                  <SelectItem value="GATO">Gato</SelectItem>
                </SelectContent>
              </Select>
            </FilterCard>

            <FilterCard label="Raça">
              <Input
                placeholder="Digite a raça"
                value={filtro.raca}
                onChange={(e) =>
                  setFiltro((prev) => ({
                    ...prev,
                    raca: e.target.value,
                  }))
                }/>
            </FilterCard>

            <FilterCard label="Sexo">
              <Select
                value={filtro.sexo || "todos"}
                onValueChange={(value) =>
                  setFiltro((prev) => ({
                    ...prev,
                    sexo: value === "todos" ? "" : value,
                  }))
                }>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="MACHO">Macho</SelectItem>
                  <SelectItem value="FEMEA">Fêmea</SelectItem>
                </SelectContent>
              </Select>
            </FilterCard>

            <FilterCard label="Cor">
              <Input
                placeholder="Digite a cor"
                value={filtro.cor}
                onChange={(e) =>
                  setFiltro((prev) => ({
                    ...prev,
                    cor: e.target.value,
                  }))
                }/>
            </FilterCard>

            <FilterCard label="Idade">
              <Select
                value={filtro.idade || "todos"}
                onValueChange={(value) =>
                  setFiltro((prev) => ({
                    ...prev,
                    idade: value === "todos" ? "" : value,
                  }))
                }>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="FILHOTE">Filhote</SelectItem>
                  <SelectItem value="ADULTO">Adulto</SelectItem>
                  <SelectItem value="IDOSO">Idoso</SelectItem>
                </SelectContent>
              </Select>
            </FilterCard>

            <FilterCard label="Porte do animal">
              <Select
                value={filtro.porte || "todos"}
                onValueChange={(value) =>
                  setFiltro((prev) => ({
                    ...prev,
                    porte: value === "todos" ? "" : value,
                  }))
                }>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="PEQUENO">Pequeno</SelectItem>
                  <SelectItem value="MEDIO">Médio</SelectItem>
                  <SelectItem value="GRANDE">Grande</SelectItem>
                </SelectContent>
              </Select>
            </FilterCard>

            <FilterCard label="Possui Microchip?">
              <Select
                value={filtro.possuiChip || "todos"}
                onValueChange={(value) =>
                  setFiltro((prev) => ({
                    ...prev,
                    possuiChip: value === "todos" ? "" : value,
                  }))
                }>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </FilterCard>

            <FilterCard label="Localização">
              <Input
                placeholder="Digite a localização"
                value={filtro.localizacao}
                onChange={(e) =>
                  setFiltro((prev) => ({
                    ...prev,
                    localizacao: e.target.value,
                  }))
                }/>
            </FilterCard>

            <FilterCard label="Vacinado">
              <Select
                value={filtro.vacinado || "todos"}
                onValueChange={(value) =>
                  setFiltro((prev) => ({
                    ...prev,
                    vacinado: value === "todos" ? "" : value,
                  }))
                }>
                <SelectTrigger className="border-none focus:ring-0">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </FilterCard>

            <Button
              className="w-full bg-[#36C3FF] hover:bg-[#2db0e8] text-white rounded-[30px] py-6"
              onClick={() => {
                setPaginaAtual(0);
                buscarAnimais(0);
              }}>
              Aplicar Filtros
            </Button>
          </div>
        </aside>

        <section className="flex-1 bg-violet-200/30 rounded-3xl p-6 min-h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animais.map((pet) => (
              <div
                key={pet.id}
                onClick={() => navigate(`/animais/${pet.id}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer hover:scale-[1.02] transition-transform">
                <img
                  src={pet.img}
                  alt={pet.name}
                  className="w-full h-48 object-cover"/>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase">
                    {pet.name}
                  </h2>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Gênero:
                      </span>{" "}
                      {pet.gender}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Porte:
                      </span>{" "}
                      {pet.porte}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Local:
                      </span>{" "}
                      {pet.local}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                disabled={paginaAtual === 0}
                onClick={() => {
                  const novaPagina = paginaAtual - 1;
                  setPaginaAtual(novaPagina);
                  buscarAnimais(novaPagina);
                }}>
                ←
              </Button>

              {Array.from({ length: totalPaginas }, (_, index) => (
                <Button
                  key={index}
                  variant={paginaAtual === index ? "default" : "outline"}
                  className={
                    paginaAtual === index
                      ? "bg-[#36C3FF] hover:bg-[#2db0e8]"
                      : ""
                  }
                  onClick={() => {
                    setPaginaAtual(index);
                    buscarAnimais(index);
                  }}>
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={paginaAtual === totalPaginas - 1}
                onClick={() => {
                  const novaPagina = paginaAtual + 1;
                  setPaginaAtual(novaPagina);
                  buscarAnimais(novaPagina);
                }}>
                →
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const FilterCard = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Card className="p-4 rounded-[30px] border-none shadow-sm flex flex-row items-center">
    <Label className="text-[#7085a0] text-[16px] mb-2 block">
      {label}
    </Label>

    {children}
  </Card>
);

export default ListarAnimais;