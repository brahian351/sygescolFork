"useClient";
import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";
import Asistencia from "./Estructura/Asistencia";
import Cabecera from "./Estructura/Cabecera";
import Comportamiento from "./Estructura/Comportamiento";
import Dimension from "./Estructura/Dimension";
import Firmas from "./Estructura/Firmas";
import PersonalInfo from "./Estructura/PersonalInfo";
export type Props = {
  InfoPdf: any;
  data: any;
  firma: any;
  per: any;
};
function MyResult({ InfoPdf, data, firma, per }: Props) {
  return (
    <Document>
      {InfoPdf?.estudiante.map((inf: any, key: number) => {
        let alto = 297;
        return (
          <>
            {((localStorage?.getItem("colegio") as any) == 8 && (
              <>
                <Page size={"A4"}>
                  <View
                    style={
                      {
                        border: "2px solid black",
                        height: "96%",
                        width: "90%",
                        margin: "auto",
                        display: "block",
                      } as any
                    }
                  >
                    <Cabecera data={data} />
                    <PersonalInfo data={inf} grup={InfoPdf?.grupo} per={per} />
                    <Dimension
                      dimensiones={InfoPdf?.cga}
                      data={inf}
                      alto={alto}
                    />
                  </View>
                </Page>
                <Page size={"A4"}>
                  <View
                    style={
                      {
                        border: "2px solid black",
                        height: "96%",
                        width: "90%",
                        margin: "auto",
                        display: "block",
                      } as any
                    }
                  >
                    <Comportamiento data={inf} />
                    <Asistencia data={inf.asistencia} />
                    <Firmas firma={firma} />
                  </View>
                </Page>
              </>
            )) || (
              <>
                <Page size={"A4"}>
                  <View
                    style={
                      {
                        border: "2px solid black",
                        height: "96%",
                        width: "90%",
                        margin: "auto",
                        display: "block",
                      } as any
                    }
                  >
                    <Cabecera data={data} />
                    <PersonalInfo data={inf} grup={InfoPdf?.grupo} per={per} />
                    <Dimension
                      dimensiones={InfoPdf?.cga}
                      data={inf}
                      alto={alto}
                    />
                    <Comportamiento data={inf} />
                    <Asistencia data={inf.asistencia} />
                    <Firmas firma={firma} />
                  </View>
                </Page>
              </>
            )}
          </>
        );
      })}
    </Document>
  );
}

export default MyResult;
