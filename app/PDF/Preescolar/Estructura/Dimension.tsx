import { Image, Page, Text, View } from "@react-pdf/renderer";
import React from "react";
export type Props = {
  dimensiones?: any;
  data?: any;
  alto: number;
};
function Dimension({ dimensiones, data, alto }: Props) {
  let escala2: any = "";
  let desempeño: any = [
    {
      value: 1,
      label: "Superior",
      img: "caraSuperior",
    },
    {
      value: 2,
      label: "Alto",
      img: "caraAlto",
    },
    {
      value: 3,
      label: "Básico",
      img: "caraBasico",
    },
    {
      value: 4,
      img: "caraBajo",
      label: "Bajo",
    },
  ];
  const style: any = {
    marginHeader: {
      // border: "2px solid black",
      width: "96%",
      height: 600,
      display: "flex",
    },
    table: {
      // display: "table" as any,
      width: "auto",
      heigth: "100%",
      borderStyle: "solid",
      borderWidth: 0,
      margin: "1%",
      marginTop: "3%",
    },
    table2: {
      display: "table" as any,
      width: "30%",
      // heigth: "100%",
      borderStyle: "solid",
      borderWidth: 0,
      marginLeft: -1,
    },
    tableRow: {
      flexDirection: "row",
      // height: "100%",
    },
    tableColText: {
      width: "90%",
      margin: "auto",
      borderStyle: "solid",
      borderWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCellTitle: {
      border: 1,
      width: "75%",
      textAlign: "center",
      height: 20,
      fontSize: 10,
      padding: "0.5%",
      fontWeight: "bold",
    },
    tableCell: {
      border: 1,
      textAlign: "center",
      height: 20,
      fontSize: 10,
      padding: "0.5%",
      fontWeight: "bold",
      marginLeft: -1,
    },
  };
  return (
    <>
      <View style={style.marginHeader} wrap>
        <View style={style.table}>
          <View style={style.tableRow}>
            <Text style={style.tableCellTitle}>DIMENSIONES</Text>
            <Text style={style.tableCell}>I.H.S</Text>
            <View style={style.table2}>
              <View style={style.tableRow}>
                <Text
                  style={{
                    border: 1,
                    textAlign: "center",
                    width: "100%",
                    height: 10,
                    fontSize: 8,
                    fontWeight: "bold",
                  }}
                >
                  Valoración
                </Text>
              </View>
              <View style={style.tableRow}>
                <Text
                  style={{
                    border: 1,
                    textAlign: "center",
                    width: "100%",
                    height: 10,
                    fontSize: 8,
                    fontWeight: "bold",
                    marginTop: 4,
                  }}
                >
                  Desempeño
                </Text>
              </View>
            </View>
          </View>
          {dimensiones.map((dim: any, key: number) => {
            const notas = data?.notas?.find(
              (est: any) => dim.Asignaturas[0]?.id == est.Asignatura
            );
            let escala = desempeño.find(
              (des: any) => des.value == notas?.escala
            );

            return (
              <>
                <View style={style.tableRow} key={key}>
                  <Text
                    style={{
                      border: 1,
                      width: "73%",
                      fontSize: 10,
                      height: 12,
                      fontWeight: "bold",
                      marginTop: 7,
                    }}
                  >
                    {dim.Area}
                  </Text>
                  <Text
                    style={{
                      border: 1,
                      width: "27%",
                      fontSize: 10,
                      textAlign: "center",
                      fontWeight: "bold",
                      height: 12,
                      marginTop: 7,
                      marginLeft: -1,
                    }}
                  >
                    {escala?.label || ""}
                  </Text>
                </View>
                {dim.Asignaturas.map((asig: any, key2: number) => {
                  const notas = data?.notas?.find(
                    (est: any) => asig?.id == est.Asignatura
                  );
                  let escala = desempeño.find(
                    (des: any) => des.value == notas?.escala
                  );
                  const procesos = data?.notas?.filter(
                    (est: any) => asig?.id == est.Asignatura
                  );
                  const observaciones = data?.observaciones?.filter(
                    (obs: any) => asig?.id == obs.Asignatura
                  );
                  return (
                    <>
                      <View style={style.tableRow} key={key2}>
                        <Text
                          style={{
                            border: 1,
                            width: 340,
                            fontSize: 8,
                            height: 10,
                            fontWeight: "bold",
                            marginTop: 9,
                          }}
                        >
                          {asig.asignatura}
                        </Text>
                        <Text
                          style={{
                            border: 1,
                            width: 26,
                            height: 10,
                            fontSize: 8,
                            textAlign: "center",
                            fontWeight: "bold",
                            marginTop: 9,
                            marginLeft: -1,
                          }}
                        >
                          {asig.Horas}
                        </Text>
                        <Text
                          style={{
                            border: 1,
                            width: 136,
                            textAlign: "center",
                            height: 10,
                            fontSize: 8,
                            fontWeight: "bold",
                            marginLeft: -1,
                            marginTop: 9,
                          }}
                        >
                          {escala?.label || ""}
                        </Text>
                      </View>
                      {procesos?.map((pro: any, key3: number) => {
                        let total = (procesos.length - 1) * 34;
                        escala2 = desempeño.find(
                          (des: any) => des.value == pro?.escala
                        );

                        console.log(
                          "escala2..",
                          escala2,
                          "othe",
                          Object.keys(escala2).length
                        );

                        console.log(
                          "image",
                          `/Descriptores/${escala2?.img}.png`
                        );

                        console.log(
                          "Object.keys(escala2).length",
                          Object.keys(escala2).length
                        );

                        alto = alto - 50;
                        // console.log(alto);
                        if (alto == 47) {
                          alto = 297;
                          <Page />;
                        }
                        return (
                          <>
                            <View style={style.tableRow}>
                              <Text
                                style={{
                                  width: 365,
                                  height: 30,
                                  borderRightWidth: 1,
                                  borderLeftWidth: 1,
                                  fontSize: 8,
                                  fontWeight: "bold",
                                  marginTop: 8,
                                }}
                              >
                                {pro.texto.charAt(0).toUpperCase() +
                                  pro.texto.slice(1).toLowerCase()}
                              </Text>
                              {/* {Object.keys(escala2).length > 0 && (
                                <View
                                  style={{
                                    marginTop: 9,
                                    borderRightWidth: 1,
                                    width: 135,
                                    height: total,
                                  }}
                                >
                                  <Image
                                    src={`/Descriptores/${escala2?.img}.png`}
                                    style={{
                                      width: "50",
                                      height: "50",
                                      margin: "auto",
                                    }}
                                  />
                                </View>
                              )} */}

                              <Image
                                src={`/Descriptores/${escala2?.img}.png`}
                                style={{
                                  width: "50",
                                  height: "50",
                                  margin: "auto",
                                }}
                              />
                            </View>
                          </>
                        );
                      })}

                      {observaciones?.map((obs: any) => {
                        return (
                          <>
                            <View style={style?.tableRow}>
                              <Text
                                style={{
                                  border: 0,
                                  width: "20%",
                                  fontSize: 11,
                                  padding: "1%",
                                  fontWeight: "bold",
                                  marginTop: -1,
                                }}
                              >
                                Observación:
                              </Text>
                              <Text
                                style={{
                                  border: 0,
                                  width: "85%",
                                  fontSize: 10,
                                  padding: "1%",
                                  fontWeight: "bold",
                                  marginTop: -1,
                                  marginLeft: -1,
                                }}
                              >
                                {obs.texto}
                              </Text>
                            </View>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </>
            );
          })}
        </View>
      </View>
    </>
  );
}

export default Dimension;
