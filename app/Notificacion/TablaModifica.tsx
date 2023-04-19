"use client";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from "@material-tailwind/react";

const TablaModifica = ({ Pendientes }: any) => {
  const [showInfo, setShowInfo] = useState({} as any);
  const [open, setOpen] = useState({ status: false, Estudiantes: [] } as any);

  return (
    <>
      <Dialog
        className="overflow-y-scroll h-86"
        open={open?.status}
        handler={() => {
          setOpen({
            status: false,
            Estudiantes: [],
          });
        }}
      >
        <DialogHeader>Listado Estudiantes</DialogHeader>
        <DialogBody divider>
          <div className="max-h-[30vh] lg:max-h-[70vh]  overflow-auto">
            {open?.Estudiantes?.map((item: any, index: number) => {
              return (
                <p key={index}>
                  {item.Nombre} {item.Apellido}
                </p>
              );
            })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setOpen({
                status: false,
                Estudiantes: [],
              });
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {/* <Button
                    variant="gradient"
                    color="green"
                    onClick={handleOpen}
                  >
                    <span>Confirm</span>
                  </Button> */}
        </DialogFooter>
      </Dialog>
      <div className=" font-bold m-3 overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100 ">
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Docente {showInfo?.IdDocente || ""}
              </th>
              <th scope="col" className="px-6 py-3">
                Asignatura
              </th>
              <th scope="col" className="px-6 py-3">
                Grado
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo Pendiente
              </th>
              <th scope="col" className="px-6 py-3">
                Ver estudiantes
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          {Pendientes?.length > 0 &&
            Pendientes?.map((item: any) => (
              <>
                <tbody>
                  {Pendientes?.map((pendiente: any) => (
                    <>
                      <tr
                        key={pendiente?.id}
                        className="bg-blue-500 border-b border-blue-400"
                      >
                        <th scope="row" className="px-6 py-4 text-white">
                          {pendiente?.Apellidos || ""} {pendiente?.Nombre || ""}
                        </th>
                        <td className="px-6 py-4 text-white font-semibold">
                          {pendiente?.asignatura || ""}
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {pendiente?.grupo_nombre || ""}
                        </td>
                        <td className="px-6 py-4 text-white font-semibold capitalize">
                          {pendiente?.tipo_pendiente || ""}
                        </td>
                        <td>
                          {" "}
                          {pendiente?.estudiantes?.length > 0 && (
                            <Button
                              onClick={() => {
                                setOpen({
                                  status: true,
                                  Estudiantes: pendiente?.estudiantes,
                                });
                              }}
                              className="mx-10"
                            >
                              Ver estudiantes
                            </Button>
                          )}
                        </td>
                        <td className="px-6 py-4 text-white font-semibold capitalize">
                          <Button
                            onClick={(e: any) => {
                              e.preventDefault();
                              alert("Resolver Pendientes");
                            }}
                          >
                            Resolver Pendientes
                          </Button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </>
            ))}
        </table>
      </div>
    </>
  );
};

export default TablaModifica;
