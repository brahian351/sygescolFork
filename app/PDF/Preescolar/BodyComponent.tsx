"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactSelect from "react-select";
import { BlobProvider } from "@react-pdf/renderer";
import MyResult from "./MyResult";

function BodyComponent() {
  const [per, setPer] = useState({ idPeriodo: 0 });
  const [dataPer, setDataPer] = useState<any>(null); // Establecer un tipo inicial any
  const [data, setData] = useState({});
  const [dataInfo, setInfo] = useState(null);
  const [firma, setFirma] = useState(null);

  const GetInfoBase = async () => {
    setData(JSON.parse(localStorage?.datosColegio || "{}"));
    setFirma(JSON.parse(localStorage?.datosUsu)?.firma);
    try {
      const response = await axios.get(
        `/api/PDF/Boletines/Preescolar/GetPeriodos?c=${localStorage.colegio}&g=${JSON.parse(localStorage?.Grupo)?.grupo_id}`
      );
      if (response.status === 200) {
        setDataPer(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Existe un error al consultar la información");
    }
  };

  const GetDataStudents = async () => {
    try {
      const response = await axios.get(
        `/api/PDF/Boletines/Preescolar/GetStudents?c=${localStorage.colegio}&g=${JSON.parse(localStorage?.Grupo)?.grupo_id}&p=${per.idPeriodo}`
      );
      if (response.status === 200) {
        setInfo(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Existe un error al consultar la información");
    }
  };

  useEffect(() => {
    GetInfoBase();
  }, []);

  useEffect(() => {
    if (per.idPeriodo !== 0) {
      GetDataStudents();
    }
  }, [per]);

  function eliminarDuplicados(arr:any) {

    if (Array.isArray(arr)) {
      let resultado: any = [];
      for (let i = 0; i < arr.length; i++) {
        if (!resultado.some((obj: any) => JSON.stringify(obj) === JSON.stringify(arr[i]))) {
          resultado.push(arr[i]);
        }
      }
      return resultado;
    }

  }

  return (
    <>
      <div className="uppercase text-center font-bold lg:text-2xl py-4 bg-blue-900 text-white rounded-b-2xl">
        Impresión de boletines de Preescolar
      </div>
      <div className="container mx-auto bg-light-blue-200 w-3/5 rounded-md mt-5 p-2">
        <div className="text-2xl font-bold text-center p-2">
          Seleccione el periodo al cual desea generar boletines
        </div>
        <ReactSelect
          className="mb-4"
          options={eliminarDuplicados(dataPer?.periodos) || []}
          onChange={(e: any) => {
            setPer({ ...per, idPeriodo: e.value });
          }}
        />
        {dataInfo && Object.keys(dataInfo).length > 0 && (
          <>
            <BlobProvider
              document={
                <MyResult InfoPdf={dataInfo} data={data} firma={firma} per={per} />
              }
            >
              {({ url, loading }: any) =>
                loading ? (
                  "Cargando boletín..."
                ) : (
                  <a
                    className="mt-8 bg-blue-500 px-10 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Reporte
                  </a>
                )
              }
            </BlobProvider>
          </>
        )}
      </div>
    </>
  );
}

export default BodyComponent;
