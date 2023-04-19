"use client";
import {
  BlobProvider,
  Document,
  Page,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

import MyResult from "./MyResult";

function BodyComponent() {
  const [per, setPer] = useState({ idPeriodo: 0 } as any);
  const [dataPer, setDataPer] = useState(null as any);
  const [data, setData] = useState({} as any);
  const [dataInfo, setInfo] = useState(null as any);
  const [firma, setFirma] = useState(null as any);

  const GetInfoBase = async () => {
    setData(JSON.parse(localStorage?.datosColegio || {}));
    setFirma(JSON.parse(localStorage?.datosUsu)?.firma);
    await axios
      .get(
        `/api/PDF/Boletines/Preescolar/GetPeriodos?c=${
          localStorage.colegio
        }&g=${JSON.parse(localStorage?.Grupo)?.grupo_id}`
      )
      .then((res) => {
        if (res.status == 200) {
          // alert("Información consultada con exito");
          setDataPer(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Existe un error al consultar la información");
      });
  };
  const GetDataStudents = async () => {
    axios
      .get(
        `/api/PDF/Boletines/Preescolar/GetStudents?c=${
          localStorage.colegio
        }&g=${JSON.parse(localStorage?.Grupo)?.grupo_id}&p=${per.idPeriodo}`
      )
      .then((res) => {
        if (res.status == 200) {
          // alert("Información consultada con exito");
          setInfo(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Existe un error al consultar la información");
      });
  };
  useEffect(() => {
    GetInfoBase();
    if (per.idPeriodo != 0) {
      GetDataStudents();
    }
  }, [per]);
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
          options={dataPer?.periodos}
          onChange={(e: any) => {
            setPer({ ...per, idPeriodo: e.value });
          }}
        />
        {dataInfo && Object.keys(dataInfo).length > 0 && (
          <>
            {" "}
            <BlobProvider
              document={
                <MyResult InfoPdf={dataInfo} data={data} firma={firma} />
              }
            >
              {({ blob, url, loading, error }: any) =>
                loading ? (
                  "Cargando boletín..."
                ) : (
                  <a
                    className="mt-8 bg-blue-500 px-10 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    href={url}
                    target="_blank"
                  >
                    Ver Reporte
                  </a>
                )
              }
            </BlobProvider>
          </>
        )}
      </div>
      {/* {(data && dataInfo && (
        <PDFViewer style={{ width: "100%", height: "100Vh" }}>
          
        </PDFViewer>
      )) ||
        "Cargando Información del Grupo"} */}
    </>
  );
}

export default BodyComponent;
