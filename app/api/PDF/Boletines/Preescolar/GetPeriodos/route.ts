import axios from "axios";
import { NextResponse } from "next/server";
import { conecctions } from "../../../../../../utils/Conexions";
export async function GET(req: any) {
  const { searchParams } = req.nextUrl;
  let colegio = searchParams.get("c");
  let grupo = searchParams.get("g");
  try {
    const conexion = conecctions[colegio];
    const [periodos]: any = await conexion.query(
      `SELECT periodo_academicos.per_id AS value, per_nombre as label FROM periodo_academicos INNER JOIN periodo_fechas ON periodo_academicos.per_id = periodo_fechas.per_id  INNER JOIN v_grupos ON v_grupos.per_con_id = periodo_academicos.per_con_id INNER JOIN grados ON v_grupos.grado_base = grados.id_grado AND grados.nivel = periodo_academicos.nivel WHERE grupo_id = ${grupo} AND periodo_academicos.inicio_ing_notas <= CURDATE()`
    );
    return NextResponse.json({ periodos: periodos }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { body: "Existe un error al consultar los periodos" },
      { status: 404 }
    );
  }
}
