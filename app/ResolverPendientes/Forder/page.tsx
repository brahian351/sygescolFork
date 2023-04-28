"use client";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Periodo = [
  { value: "1", label: "Primero" },
  { value: "2", label: "Segundo" },
  { value: "3", label: "Tercero" },
];

const Forder = () => {
  const [Data, setData] = useState({} as any);

  const searchParams = useSearchParams();

  const GrupoId = searchParams.get("GrupoId");
  const Cga = searchParams.get("cga");

  const GetData = async () => {
    const resData = await fetch(
      `/api/ResolverPendientes/Forder?GrupoId=${GrupoId}&Cga=${Cga}&ColegioId=${localStorage.colegio}`
    ).then((res) => res.json());

    setData(resData);
  };
  useEffect(() => {
    if (GrupoId && Cga) {
      GetData();
    } else {
      console.log("No hay GrupoId ni Cga");
    }
  }, [GrupoId, Cga]);

  console.log("Data", Data);

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg  py-16 px-10 sm:px-12 md:px-[60px] ">
              <form>
                <div className="mb-6">
                  <p>Grados</p>
                  <Select
                    options={Data?.InfoDb}
                    getOptionLabel={(item: any) => item.grupo_nombre}
                    getOptionValue={(item: any) => item.grupo_id}
                  />
                </div>
                <div className="mb-6">
                  <p>Asignaturas</p>

                  <Select
                    options={Data?.InfoDb}
                    getOptionLabel={(item: any) => item?.asignatura}
                    getOptionValue={(item: any) => item.AsignaturaId}
                  />
                </div>
                <div className="mb-6">
                  <p>Periodo</p>

                  <Select options={Periodo} placeholder="Seleccione periodo" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forder;
