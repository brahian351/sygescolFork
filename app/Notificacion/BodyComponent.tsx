"use client";
import React, { useEffect } from "react";
import BotonGrados from "./BotonGrados";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import TablaModifica from "./TablaModifica";

const BodyComponent = () => {
  const [Data, setData] = React.useState([] as any);
  const [size, setSize] = React.useState(null);
  const [PendientesSelected, setPendientesSelected] = React.useState([] as any);

  const handleOpen = (value: any) => setSize(value);

  const GetData = (Colegio: any, InfoUser: any) => {
    const url = `/api/CierrePeriodo/InfoCierre?IdDocente='${InfoUser.Id}'&colegio=${Colegio}&IdRol=${InfoUser.usu_rol}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.Pendientes || []);
        data.body && alert(data.body);
      })
      .catch((error) => {
        alert("Error al cargar los datos");
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    const Colegio = localStorage?.colegio || "";
    const InfoUser = JSON.parse(localStorage?.datosUsu || {});
    if (Colegio && Object.keys(InfoUser).length > 0) {
      GetData(Colegio, InfoUser);
    }
  }, []);

  return (
    <>
      <Dialog open={size === "xl"} size={size || "xl"} handler={handleOpen}>
        <DialogHeader>Relación de los Pendientes Hallados</DialogHeader>
        <DialogBody divider>
          <div className="max-h-[75vh] overflow-auto">
            <TablaModifica Pendientes={PendientesSelected} />
          </div>
        </DialogBody>

        <DialogFooter>
          {/* <Button
                variant="text"
                color="red"
                onClick={() => handleOpen(null)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button> */}
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="text-secondary flex-1 p-1">
        <div className="mb-5 text-center font-bold font-regular relative block w-full rounded-lg bg-blue-900 p-4 text-xl leading-5 text-white opacity-100">
          <h1>Notificación Docente</h1>
        </div>
        <p className="font-bold text-lg mb-2">Señor Profesor Brahian Orozco:</p>
        <p className="text-justify font-semibold mb-4">
          En el proceso de cierre del 1 periodo académico, el sistema a
          detectado algunos pendientes de registro en los módulos asignados a su
          rol, los cuales describiremos a continuación de manera detallada, para
          que por favor los verifique, ingrese a la planilla(s) y realice las
          actualizaciones correspondientes.
        </p>
      </div>
      {Data?.length > 0 &&
        Data?.map((item: any) => (
          <BotonGrados
            key={item.IdAuditoria}
            handleOpen={handleOpen}
            Grados={item}
            setPendientesSelected={setPendientesSelected}
          />
        ))}

      <div className="w-16 h-8 py-1 px-2 ml-3 font-bold text-center text-white rounded-md bg-blue-500 shadow-lg">
        <button>Enviar</button>
      </div>
    </>
  );
};

export default BodyComponent;
