import { NextResponse } from "next/server";
import { conecctions } from "../../../../../../utils/Conexions";

export async function GET(req: any) {
  const { searchParams } = req.nextUrl;
  let colegio = searchParams.get("colegio");
  let id = searchParams.get("id");
  try {
    const conexion = conecctions[colegio];
    const [delet]: any = await conexion.query(
      `DELETE FROM newObservacionesEstudiante WHERE id = ${id}`
    );
    console.log(delet);
    return NextResponse.json(
      { body: "El registro se ha eliminado con éxito...!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("este es el error al eliminar el proceso", error);
    return;
  }
}
